import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/database'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBJFJU_MkxC3_KHUIkTXIaxeGyho6yu364',
  authDomain: 'formular-46918.firebaseapp.com',
  projectId: 'formular-46918',
  storageBucket: 'formular-46918.appspot.com',
  messagingSenderId: '1015742499899',
  appId: '1:1015742499899:web:b941c9ef190d9e2208a01e',
  measurementId: 'G-4997D3GPQ0',
}

initializeApp(firebaseConfig)

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
