import firebase from "firebase/app";
import { firebaseConfig } from "./config";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
//data base firestore
export const db = firebase.firestore();
//authentication
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const loginWithGoogle = () => auth.signInWithPopup(provider);
export const logout = () => auth.signOut();
export default firebase;
