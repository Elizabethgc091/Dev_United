import { auth, db } from "../firebaseService/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/** Operacion de Update */

const saveUserData = async (userName, color) => {
  const uid = auth.currentUser.uid;
  const userData = await setDoc(doc(db, "users", uid), {
    color: color,
    userName: userName,
    photoURL: auth.currentUser.photoURL,
  });
};

export const trySaveUserData = (userName, color, navigateToFeed) => {
  try {
    saveUserData(userName, color);
    navigateToFeed();
  } catch (error) {
    console.log("Hubo un error: " + error);
  }
};

/** Operación de Lectura */

const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
};

export const tryGetUserData = (uid) => {
  try {
    return getUserData(uid);
  } catch (error) {
    return null;
  }
};
