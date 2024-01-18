// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI_L2aOCsIJ-mFhKW8w2Btirzd9FmgFFs",
  authDomain: "chat-app-9eba1.firebaseapp.com",
  projectId: "chat-app-9eba1",
  storageBucket: "chat-app-9eba1.appspot.com",
  messagingSenderId: "505880946602",
  appId: "1:505880946602:web:db729b40c859be27aaedd3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export {auth,db}
