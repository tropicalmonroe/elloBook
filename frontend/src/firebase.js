// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4DTwpMrrAr1HMiy6RNfTZoGbiI9m5hwA",
  authDomain: "books-c6e6d.firebaseapp.com",
  projectId: "books-c6e6d",
  storageBucket: "books-c6e6d.appspot.com",
  messagingSenderId: "450072040158",
  appId: "1:450072040158:web:7fb80d2afd6fd1f4d8e84f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default app;