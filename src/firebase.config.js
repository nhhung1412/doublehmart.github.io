// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2pi4uXrnZDv1qmoae2yBr8D0Q4alakKQ",
  authDomain: "doublehmart-ce801.firebaseapp.com",
  projectId: "doublehmart-ce801",
  storageBucket: "doublehmart-ce801.appspot.com",
  messagingSenderId: "590512205919",
  appId: "1:590512205919:web:49cbcf7a7f3b356fa16bea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
