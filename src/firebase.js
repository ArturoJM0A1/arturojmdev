

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoo5aLu9fqW2-Cwz8i_JbWCFtbTvAmeAc",
  authDomain: "comentarioscv-fc57e.firebaseapp.com",
  projectId: "comentarioscv-fc57e",
  storageBucket: "comentarioscv-fc57e.firebasestorage.app",
  messagingSenderId: "59407502615",
  appId: "1:59407502615:web:9ab4239163c65ddf723b52",
  measurementId: "G-F92Z7E5G37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);