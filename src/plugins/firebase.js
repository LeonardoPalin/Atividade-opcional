import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAqnxwal72kuqvz6ewGkrG2LF6swvT8fsU",
  authDomain: "appwebpinia.firebaseapp.com",
  projectId: "appwebpinia",
  storageBucket: "appwebpinia.firebasestorage.app", // ⚠️ Aqui está diferente, veja observação abaixo
  messagingSenderId: "576959713418",
  appId: "1:576959713418:web:3af09c7372c5ce15729d73",
  measurementId: "G-EG4L1674DN"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
