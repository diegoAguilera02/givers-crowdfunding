// Import the functions you need from the SDKs you need
import { FirebaseApp as FireApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore"


interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // Opcional
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyA6yHsUD5q96h5MTgzXRQkVK6Es_sX58Sg",
  authDomain: "givers-48277.firebaseapp.com",
  projectId: "givers-48277",
  storageBucket: "givers-48277.appspot.com",
  messagingSenderId: "424043764291",
  appId: "1:424043764291:web:f9bb69c8d404e5998092f6",
  measurementId: "G-0HYR079WKV"
};

// Initialize Firebase
const FirebaseApp: FireApp = initializeApp(firebaseConfig);
export const FirebaseAuth: Auth = getAuth(FirebaseApp);
export const FirebaseDB: Firestore = getFirestore(FirebaseApp);