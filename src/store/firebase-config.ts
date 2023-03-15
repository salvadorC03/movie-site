// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCSskKbO04VwACfw-fmKaRNUaDSWaEHf8g",
  authDomain: "movie-site-975c1.firebaseapp.com",
  projectId: "movie-site-975c1",
  storageBucket: "movie-site-975c1.appspot.com",
  messagingSenderId: "49482940750",
  appId: "1:49482940750:web:2235c71fb33066d5ec9e1f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);

export function userState() {
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => setUser(user));

  return user;
}
