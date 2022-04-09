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

/**
 * @description Función que borra un tweet
 * @param {*} id
 */

export const deleteTweet = async function (id) {
  await deleteDoc(doc(db, "tweets", id));
};

/**
 * @description Función qu obtiene los datos del usuario del tweet
 * @param {*} tweet
 * @param {*} setUser
 */
export const getTweetUserData = async function (tweet, setUser) {
  const tweetUser = await getDoc(tweet.user);
  if (tweetUser.exists()) {
    setUser({
      id: tweetUser.id,
      ...tweetUser.data(),
    });
  }
};

/**
 * @description Función que actualiza el likeCount del tweet a +1
 * @param {*} id
 * @param {*} likesCount
 */

const likeTweet = async function (id, likesCount) {
  const tweet = doc(db, "tweets", id);
  await updateDoc(tweet, {
    likesCount: likesCount + 1,
  });
};

/**
 * @description Función que actualiza el likeCount del tweet a -1
 * @param {*} id
 * @param {*} likesCount
 */
const dislikeTweet = async function (id, likesCount) {
  const tweet = doc(db, "tweets", id);
  await updateDoc(tweet, {
    likesCount: likesCount - 1,
  });
};

/**
 * @description Función que agrega tweets favoritos al user
 * @param {*} tweetId
 */

const addToFavorites = async function (tweetId) {
  const user = doc(db, "users", auth.currentUser.uid);
  await updateDoc(user, {
    favorites: arrayUnion(tweetId),
  });
};

/**
 * @description Función que elimina tweets favoritos al user
 * @param {*} tweetId
 * */

const removeFromFavorites = async function (tweetId) {
  const user = doc(db, "users", auth.currentUser.uid);
  await updateDoc(user, {
    favorites: arrayRemove(tweetId),
  });
};

/**
 * @description Casos de uso de like
 * @param {} tweet
 */

export const onLikeTweetUseCase = async function (tweet) {
  const currentUserRef = doc(db, "users", auth.currentUser.uid);
  const currentUser = await (await getDoc(currentUserRef)).data();
  if (currentUser.favorites.includes(tweet.id)) {
    dislikeTweet(tweet.id, tweet.likesCount);
    removeFromFavorites(tweet.id);
  } else {
    likeTweet(tweet.id, tweet.likesCount);
    addToFavorites(tweet.id);
  }
};

/**
 * @description Fucnión que agrega un tweet
 */

export const addTweet = async function (content) {
  await addDoc(collection(db, "tweets"), {
    content,
    created_at: new Date(),
    likesCount: 0,
    user: doc(db, "users", auth.currentUser.uid),
  });
};

/**
 * @description Funciòn que obtiene todos los tweets
 * @param {*} setTimeLine
 * @returns
 */

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
  return () => {
    unsubscribe();
  };
};

/**
 * @description Funcion que obtiene tweets de un usuario logeado
 * @param {*} setTimeLine
 * @param {*} uid
 */
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

/**
 * @description Función que obtiene los tweet favoritos del usuario logeado
 * @param {*} uid
 * @param {*} setTimeLine
 */

export const getFavoritesTweet = async function (uid, setTimeLine) {
  const tweets = [];
  const user = doc(db, "users", uid);
  const docSnap = await getDoc(user);
  if (docSnap.exists()) {
    const favorites = docSnap.data().favorites;
    for (const favoriteTweetId of favorites) {
      const tweet = doc(db, "tweets", favoriteTweetId);
      const id = tweet.id;
      const tweetSnap = await getDoc(tweet);
      const temp = {
        id,
        ...tweetSnap.data(),
      };
      tweets.push(temp);
    }
  }
  setTimeLine(tweets);
};
