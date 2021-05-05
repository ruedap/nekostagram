import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'

const firebaseClientConfig = {
  apiKey: 'AIzaSyCPJc4Y4WO9XDIVE9ZM32mY2PsWV5u5UlQ',
  authDomain: 'nekostagram-com.firebaseapp.com',
  databaseURL: 'https://nekostagram-com.firebaseio.com',
  projectId: 'nekostagram-com',
  storageBucket: 'nekostagram-com.appspot.com',
  messagingSenderId: '839591093104',
  appId: '1:839591093104:web:27f75e76110e209488e5b5',
}

export const firebaseClient = ((config) => {
  firebase.initializeApp(config)
  return firebase
})(firebaseClientConfig)

export const storage = firebaseClient.storage()

export const constants = {
  STORAGE_REF: 'nekos',
} as const
