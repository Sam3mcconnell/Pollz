// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQbdRTPjPDtuROyv09NjT1tjealoLxMU0",
  authDomain: "pollz-9b176.firebaseapp.com",
  projectId: "pollz-9b176",
  storageBucket: "pollz-9b176.appspot.com",
  messagingSenderId: "399578126316",
  appId: "1:399578126316:web:b82d9e91b787533f8992c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}