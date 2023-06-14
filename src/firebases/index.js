import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBJFJU_MkxC3_KHUIkTXIaxeGyho6yu364',
  authDomain: 'formular-46918.firebaseapp.com',
  projectId: 'formular-46918',
  storageBucket: 'formular-46918.appspot.com',
  messagingSenderId: '1015742499899',
  appId: '1:1015742499899:web:b941c9ef190d9e2208a01e',
  measurementId: 'G-4997D3GPQ0',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
