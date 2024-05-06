// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAldUCFoRa76I-VwACf4O-Qv_9YeaZw7Rw",
  authDomain: "fir-basics-a6f19.firebaseapp.com",
  projectId: "fir-basics-a6f19",
  storageBucket: "fir-basics-a6f19.appspot.com",
  messagingSenderId: "1032415843577",
  appId: "1:1032415843577:web:a675f7c3fd002c05da7e28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider =  new GoogleAuthProvider();
export const db = getFirestore(app);