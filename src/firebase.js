// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDD29_0DyHGF2J6804sOothQileESrLuA",
  authDomain: "fragen-katalog.firebaseapp.com",
  projectId: "fragen-katalog",
  storageBucket: "fragen-katalog.firebasestorage.app",
  messagingSenderId: "208859056966",
  appId: "1:208859056966:web:039f86d0b8722e4395f347",
  measurementId: "G-STMLG4PCQ1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// 👇 Make sure debug_mode is enabled globally
window.gtag = window.gtag || function () {};
gtag('set', 'debug_mode', true);

console.log("📈 Firebase Analytics initialized");

export { db, analytics };
