
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAr2yREN93uuPtFkt0u1iKSKKhlsUMoDPI",
  authDomain: "signup-7ce94.firebaseapp.com",
  projectId: "signup-7ce94",
  storageBucket: "signup-7ce94.appspot.com",
  messagingSenderId: "130676249790",
  appId: "1:130676249790:web:32d95ca8e6dc6d364f3aef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);