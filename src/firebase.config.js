// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyActyUZYejzr19QUXD0nwtBslECw7y_D_U",
  authDomain: "doublehmart-460f2.firebaseapp.com",
  projectId: "doublehmart-460f2",
  storageBucket: "doublehmart-460f2.appspot.com",
  messagingSenderId: "242131459985",
  appId: "1:242131459985:web:10d124e38db35ddde68430"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
