// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCboETknSO2EgUVzxOK2UpSgd3Z7fRPog",
  authDomain: "carpooling-app-8f96f.firebaseapp.com",
  projectId: "carpooling-app-8f96f",
  storageBucket: "carpooling-app-8f96f.appspot.com",
  messagingSenderId: "458989825536",
  appId: "1:458989825536:web:1615723065232b366272e5",
  measurementId: "G-PERD266WJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
//const analytics = getAnalytics(app);