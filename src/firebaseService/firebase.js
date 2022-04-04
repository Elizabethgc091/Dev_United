import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);

export const logout = () => auth.signOut();
