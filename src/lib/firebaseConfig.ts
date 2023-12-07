// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4QpZVOIRJhLKCt2EXo0U1jKEjmhv_Cp8",
  authDomain: "ticketri.firebaseapp.com",
  projectId: "ticketri",
  storageBucket: "ticketri.appspot.com",
  messagingSenderId: "422304469416",
  appId: "1:422304469416:web:0853cf6626e0c622180d9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// gs://ticketri.appspot.com
