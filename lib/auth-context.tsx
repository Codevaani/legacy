"use client"
import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'

declare global {
  interface Window {
    __authToken?: string
    __fetchPatched?: boolean
  }
}

function patchFetch() {
  if (typeof window === 'undefined' || window.__fetchPatched) {
    return
  }

  const originalFetch = window.fetch.bind(window)

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url

    let requestInit = init ? { ...init } : undefined

    if (typeof url === 'string' && url.startsWith('/api/')) {
      const token =
        window.__authToken ||
        (auth.currentUser ? await auth.currentUser.getIdToken().catch(() => null) : null)

      if (token) {
        const baseHeaders = requestInit?.headers ||
          (typeof input !== 'string' && !(input instanceof URL) ? input.headers : undefined)
        const headers = new Headers(baseHeaders)
        headers.set('Authorization', `Bearer ${token}`)

        if (requestInit) {
          requestInit.headers = headers
        } else if (typeof input === 'string' || input instanceof URL) {
          requestInit = { headers }
        } else {
          input = new Request(input, { headers })
          requestInit = undefined
        }
      }
    }

    return originalFetch(input, requestInit)
  }

  window.__fetchPatched = true
}

interface MongoUser {
  _id: string
  uid: string
  displayName: string
  email: string
  role: 'guest' | 'partner' | 'admin'
  status: 'active' | 'suspended' | 'banned'
  phoneNumber?: string
  photoURL?: string
  bookingsCount: number
  propertiesCount: number
  totalSpent: number
  totalRevenue: number
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  businessInfo?: {
    companyName?: string
    taxId?: string
    businessLicense?: string
  }
}

interface AuthContextType {
  user: User | null
  mongoUser: MongoUser | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  mongoUser: null,
  loading: true,
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mongoUser, setMongoUser] = useState<MongoUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    patchFetch()
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        // Fetch MongoDB user profile
        try {
          const token = await firebaseUser.getIdToken()
          if (typeof window !== 'undefined') {
            window.__authToken = token
            const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
            document.cookie = `firebase_token=${token}; Path=/; SameSite=Strict${secureFlag}`
          }

          let mongoUserData = null

          // First try to find user by Firebase UID
          const uidResponse = await fetch(`/api/users?firebaseId=${firebaseUser.uid}`)
          if (uidResponse.ok) {
            mongoUserData = await uidResponse.json()
          } else {
            // If not found by UID, try to find by email
            const emailResponse = await fetch(`/api/users?email=${firebaseUser.email}`)
            if (emailResponse.ok) {
              mongoUserData = await emailResponse.json()
              // Update the user's UID to match Firebase Auth
              await fetch(`/api/users/${mongoUserData._id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid: firebaseUser.uid,
                  lastLogin: new Date()
                })
              })
              // Update local data
              mongoUserData.uid = firebaseUser.uid
              mongoUserData.lastLogin = new Date()
            }
          }

          if (mongoUserData) {
            setMongoUser(mongoUserData)
          } else {
            // User doesn't exist in MongoDB, create them
            const newUserData = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || '',
              role: 'guest' as const,
              status: 'active' as const
            }

            try {
              const createResponse = await fetch('/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
              })

              if (createResponse.ok) {
                const newUser = await createResponse.json()
                setMongoUser(newUser.user)
              } else {
                // If creation failed, try to find existing user by email again
                const emailResponse = await fetch(`/api/users?email=${firebaseUser.email}`)
                if (emailResponse.ok) {
                  const existingUser = await emailResponse.json()
                  setMongoUser(existingUser)
                } else {
                  console.error('Failed to create or find user:', await createResponse.text())
                }
              }
            } catch (error) {
              console.error('Error creating user:', error)
            }
          }
        } catch (error) {
          console.error('Failed to fetch/create MongoDB user:', error)
        }
      } else {
        setMongoUser(null)
        if (typeof window !== 'undefined') {
          window.__authToken = undefined
          const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
          document.cookie = `firebase_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict${secureFlag}`
        }
      }

      setLoading(false)
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setMongoUser(null)
    if (typeof window !== 'undefined') {
      window.__authToken = undefined
      const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `firebase_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict${secureFlag}`
    }
  }

  return (
    <AuthContext.Provider value={{ user, mongoUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
