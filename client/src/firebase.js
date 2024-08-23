// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-acd63.firebaseapp.com",
  projectId: "mern-auth-acd63",
  storageBucket: "mern-auth-acd63.appspot.com",
  messagingSenderId: "509118648995",
  appId: "1:509118648995:web:204895649cbd85fc73a516",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
