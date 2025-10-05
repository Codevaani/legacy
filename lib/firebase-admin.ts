import * as admin from 'firebase-admin'

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  })
}

export const authAdmin = admin.apps.length ? admin.auth() : null
export const firestoreAdmin = admin.apps.length ? admin.firestore() : null
export default admin