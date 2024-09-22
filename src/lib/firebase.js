// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEVE2Mop7_sHht4HIr9PrkIX-7ZrDP3nU",
  authDomain: "sogram-11499.firebaseapp.com",
  projectId: "sogram-11499",
  storageBucket: "sogram-11499.appspot.com",
  messagingSenderId: "9061806189",
  appId: "1:9061806189:web:6f364ea62f241e46cb8f64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);