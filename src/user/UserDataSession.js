import { auth, db } from "../firebaseService/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/** Operacion de Update */

const saveUserData = async (userName, color) => {
  const uid = auth.currentUser.uid;
  await setDoc(doc(db, "users", uid), {
    color: color,
    userName: userName,
    photoURL: auth.currentUser.photoURL,
    favorites: [],
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

export const getUserData = async function (uid, saveUserData) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    saveUserData(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    saveUserData(null);
  }
};

/* export const tryGetUserData = (uid) => {
  try {
    return getUserData(uid);
  } catch (error) {
    return null;
  }
};
 */
