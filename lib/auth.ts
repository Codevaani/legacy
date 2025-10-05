import { authAdmin } from './firebase-admin'
import { NextRequest } from 'next/server'

export interface AuthUser {
  uid: string
  email?: string
  role?: string
  // Add other user properties as needed
}

export async function verifyToken(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No auth header or not Bearer token')
      return null
    }

    const token = authHeader.substring(7) // Remove 'Bearer '
    console.log('Token received:', token.substring(0, 50) + '...')

    let decodedToken: any = null

    if (authAdmin) {
      // Production: verify the token
      console.log('Using Firebase Admin to verify token')
      decodedToken = await authAdmin.verifyIdToken(token)
    } else {
        // Development: decode JWT payload without verification
        console.log('Decoding JWT without verification')
        try {
          const parts = token.split('.')
          if (parts.length === 3) {
            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
            decodedToken = payload
            console.log('Decoded token payload:', { sub: decodedToken.sub, email: decodedToken.email })
          }
        } catch (error) {
          console.error('Failed to decode token:', error)
          return null
        }
    }

    if (!decodedToken) {
      console.log('No decoded token')
      return null
    }

    // Get user role from database
    const { default: User } = await import('@/models/User')
    const userRecord = await User.findOne({ uid: decodedToken.uid || decodedToken.sub })
    console.log('User record from DB:', userRecord ? { uid: userRecord.uid, role: userRecord.role } : 'No user record')

    const role = userRecord?.role || 'guest'

    return {
      uid: decodedToken.uid || decodedToken.sub,
      email: decodedToken.email,
      role
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await verifyToken(request)
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireRole(request: NextRequest, requiredRole: string): Promise<AuthUser> {
  const user = await requireAuth(request)
  if (user.role !== requiredRole && user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return user
}