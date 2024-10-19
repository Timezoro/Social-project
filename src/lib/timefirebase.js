// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC3SdDeS32Bq7iq9VGZxHywuiiDnypYMvw",
  authDomain: "calendar-project-72fa0.firebaseapp.com",
  projectId: "calendar-project-72fa0",
  storageBucket: "calendar-project-72fa0.appspot.com",
  messagingSenderId: "553707791205",
  appId: "1:553707791205:web:04a88d38a2d30b244ab78c",
  measurementId: "G-NQDY8FRLZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);