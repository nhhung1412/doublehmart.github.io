// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwLHv_CcpAvJKQm2rHKLA3HWG9oLJ8nsc",
  authDomain: "doublehmart-1412.firebaseapp.com",
  projectId: "doublehmart-1412",
  storageBucket: "doublehmart-1412.appspot.com",
  messagingSenderId: "524029219854",
  appId: "1:524029219854:web:95624325091714518a585f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
