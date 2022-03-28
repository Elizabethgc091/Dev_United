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
export const fetchLatestTweet = (setTimeLine) => {
  db.collection("tweets")
    .orderBy("created_at", "desc")
    .onSnapshot((querySnapshot) => {
      console.log("Hola" + querySnapshot);
      const tweets = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const temp = {
          id,
          ...doc.data(),
        };
        tweets.push(temp);
      });
      setTimeLine(tweets);
    });
};
