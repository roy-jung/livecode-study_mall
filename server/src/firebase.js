import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import env from './envLoader'

const firebaseConfig = {
  apiKey: env.fb_apiKey,
  authDomain: env.fb_authDomain,
  projectId: env.fb_projectId,
  storageBucket: env.fb_storageBucket,
  messagingSenderId: env.fb_messagingSenderId,
  appId: env.fb_appId,
}

const app = initializeApp(firebaseConfig)
export default app

export const db = getFirestore(app)
