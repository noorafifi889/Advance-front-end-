// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSm1JiS_vIXPW5_sm7v4agQfkoNf0MqsY",
    authDomain: "user-managment-25588.firebaseapp.com",
  projectId: "user-managment-25588",
  storageBucket: "user-managment-25588.firebasestorage.app",
  messagingSenderId: "173515701225",
  appId: "1:173515701225:web:d617c30ad328ba7a6e6978"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
     const db = getFirestore();
     export  {db}