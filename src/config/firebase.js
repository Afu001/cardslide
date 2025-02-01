import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDyfb9AyKiPzhBLI6hdyRQ9D-Lb6WjAmDs",
  
    authDomain: "cardslider01.firebaseapp.com",
  
    projectId: "cardslider01",
  
    storageBucket: "cardslider01.firebasestorage.app",
  
    messagingSenderId: "116217111758",
  
    appId: "1:116217111758:web:9ab7957fa73e9cbf945c9f"
  
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);