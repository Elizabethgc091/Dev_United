import {
  collection,
  orderBy,
  query,
  addDoc,
  doc,
  onSnapshot,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
} from "firebase/firestore";

import { db, auth } from "../firebaseService/firebase";

export const deleteTweet = async function (id) {
  await deleteDoc(doc(db, "tweets", id));
};

export const getTweetUserData = async function (tweet, setUser) {
  const tweetUser = await getDoc(tweet.user);
  if (tweetUser.exists()) {
    setUser({
      id: tweetUser.id,
      ...tweetUser.data(),
    });
  }
};

const likeTweet = async function (id, likesCount) {
  const tweet = doc(db, "tweets", id);
  await updateDoc(tweet, {
    likesCount: likesCount + 1,
  });
};
const dislikeTweet = async function (id, likesCount) {
  const tweet = doc(db, "tweets", id);
  await updateDoc(tweet, {
    likesCount: likesCount - 1,
  });
};

const addToFavorites = async function (tweetId) {
  const user = doc(db, "users", auth.currentUser.uid);
  await updateDoc(user, {
    favorites: arrayUnion(tweetId),
  });
};
const removeFromFavorites = async function (tweetId) {
  const user = doc(db, "users", auth.currentUser.uid);
  await updateDoc(user, {
    favorites: arrayRemove(tweetId),
  });
};
export const onLikeTweetUseCase = async function (tweet) {
  const currentUserRef = doc(db, "users", auth.currentUser.uid);
  const currentUser = await (await getDoc(currentUserRef)).data();
  console.log(currentUser);
  if (currentUser.favorites.includes(tweet.id)) {
    dislikeTweet(tweet.id, tweet.likesCount);
    removeFromFavorites(tweet.id);
  } else {
    likeTweet(tweet.id, tweet.likesCount);
    addToFavorites(tweet.id);
  }
};

export const addTweet = async function (content) {
  await addDoc(collection(db, "tweets"), {
    content,
    created_at: new Date(),
    likesCount: 0,
    user: doc(db, "users", auth.currentUser.uid),
  });
};

export const getTweets = async function (setTimeLine) {
  const q = query(collection(db, "tweets"), orderBy("created_at", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

/** Obtener tweets de usuario logeado */
export const getUserTweets = async function (setTimeLine, uid) {
  const userRef = doc(db, "users", uid);
  const q = query(
    collection(db, "tweets"),
    orderBy("created_at", "desc"),
    where("user", "==", userRef)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
