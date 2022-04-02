import firebase from "firebase";
import { db } from "../firebaseService/firebase";

//Metodo para agregar tweets
export const addTweet = ({ content }) => {
  return db.collection("tweets").add({
    content,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    user: db.doc("users/" + firebase.auth().currentUser.uid),
  });
};

//Metodo para borrar tweets
export function deleteTweet(id) {
  db.collection("tweets")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}
