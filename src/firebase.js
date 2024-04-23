// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import  {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATK1eDUpFDs7jwC0XVYsV9qzF0RNgodTA",
  authDomain: "blogpost-bacbc.firebaseapp.com",
  projectId: "blogpost-bacbc",
  storageBucket: "blogpost-bacbc.appspot.com",
  messagingSenderId: "655030631080",
  appId: "1:655030631080:web:de7ef8d4c9a96e5237209d",
  measurementId: "G-BB6NCCLFNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)
export default app;