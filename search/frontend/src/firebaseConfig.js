// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr0MTBjH8yR6tHgyVsAYr_rKpnZ2SrhgQ",
  authDomain: "church-app-9d201.firebaseapp.com",
  projectId: "church-app-9d201",
  storageBucket: "church-app-9d201.appspot.com",
  messagingSenderId: "11146466416",
  appId: "1:11146466416:web:156eb701231634240310b5",
  measurementId: "G-TMC7TZL5SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); //returns the authentication instance