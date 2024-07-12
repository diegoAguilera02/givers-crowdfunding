// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc9cPrl8kaT8i-I5q0NUx-ovb6QG-NcvA",
  authDomain: "administrative-spa.firebaseapp.com",
  projectId: "administrative-spa",
  storageBucket: "administrative-spa.appspot.com",
  messagingSenderId: "903859524654",
  appId: "1:903859524654:web:1898ab731c34d21baebbbf",
  measurementId: "G-YXW6LH11WN"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);