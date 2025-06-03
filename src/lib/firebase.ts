
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCE17zVS7T991xcjVAKfBrAy-GaOmlNo_w",
  authDomain: "moviesavy.firebaseapp.com",
  projectId: "moviesavy",
  storageBucket: "moviesavy.firebasestorage.app",
  messagingSenderId: "149603063090",
  appId: "1:149603063090:web:e9ed4f405c48d166f1b32b",
  measurementId: "G-FWPQ89XX3M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
