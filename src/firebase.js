import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8q4tw8ugcfCJI3hsz-rOwzZnM-BOUgCg",
  authDomain: "comentarioscvajm.firebaseapp.com",
  projectId: "comentarioscvajm",
  storageBucket: "comentarioscvajm.firebasestorage.app",
  messagingSenderId: "456154483789",
  appId: "1:456154483789:web:49d0da60ee011558d5e004"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);