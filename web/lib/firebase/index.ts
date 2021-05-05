import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'

const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

export const firebaseClient = ((config) => {
  firebase.initializeApp(config)
  return firebase
})(firebaseClientConfig)

export const storage = firebaseClient.storage()

export const constants = {
  STORAGE_REF: 'nekos',
} as const
