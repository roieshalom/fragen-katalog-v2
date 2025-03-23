// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDD29_0DyHGF2J6804sOothQileESrLuA",
  authDomain: "fragen-katalog.firebaseapp.com",
  projectId: "fragen-katalog",
  storageBucket: "fragen-katalog.firebasestorage.app",
  messagingSenderId: "208859056966",
  appId: "1:208859056966:web:039f86d0b8722e4395f347",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
