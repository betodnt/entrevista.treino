import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBXopd2V6G4rT7YNwjFmFRT62wEIhRjhjM',
  authDomain: 'entrevistatreino.firebaseapp.com',
  projectId: 'entrevistatreino',
  storageBucket: 'entrevistatreino.firebasestorage.app',
  messagingSenderId: '940779640770',
  appId: '1:940779640770:web:2269b92cb8dd727def685b',
  measurementId: 'G-060NCR4W72',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
