import React, { useState, useEffect } from "react";

/** components */
import TweetCard from "./TweetCard";

/** Firebase */
import { auth, db } from "../../../firebaseService/firebase";

/** funcionalities */
import { addTweet, deleteTweet } from "../../../functionalities/funcionalities";

/** Style */
import "./feed.css";

/** Sources */
import logoDevUnited from "../../../sources/icons/logoDevUnited.svg";
import textLogo from "../../../sources/icons/textLogo.svg";

export default function Feed() {
  const [message, setMessage] = useState("");
  const [timeLine, setTimeLine] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const [userData, setUserData] = useState({})
  const CHAR_LIMIT = 200;

  useEffect(() => {
    const desuscribir = db.collection("tweets")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
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

    auth.onAuthStateChanged((user) => {
      setAuthUser(user);

      db.collection("users").doc(user.uid).get().then((response) => {
        setUserData(response.data())
      })
    });
    return () => {
      desuscribir();
    }
  }, []);
  console.log("usuario autentivado");

  /**
   * @description función que guarda un tweet
   */
  function handleChange(event) {
    const { value } = event.target;
    console.log(value.length);
    if (value.length <= CHAR_LIMIT) {
      setMessage(value);
    }
  }
  /**
   * @description función que agrega tweets a firestore
   * */
  function handleSubmit(event) {
    event.preventDefault();
    addTweet({
      content: message,
    });
    setMessage("");
  }

  /** 
   * @description funcion que calcula el porcentaje del tamaño del tweet
  */
  const calculatePercentage = () => (message.length / CHAR_LIMIT) * 100;

  function userPerfil() {
    console.log("Redirige al perfil del usuario")

  }

  function likeTweet(id, likesCount) {
    console.log(userData.favorites);
    // si ya le dio like, se hace una operacion de dislike (tweet -  1,  usuario elimina de lista de favs)
    if (userData.favorites.includes(id)) {

      console.log("diste dislike")
      db.collection("tweets").doc(id).update({ likesCount: likesCount - 1 })
      db.collection("users").doc(auth.currentUser.uid).update({ favorites: [] })
    } else {
      console.log("Diste un like");
      db.collection("tweets").doc(id).update({ likesCount: likesCount + 1 })
      db.collection("users").doc(auth.currentUser.uid).update({ favorites: [id] })
    }

  }

  return (
    <>
      <div className="header-container">
        <div className="nav-container">
          <img id="photoURL" src={authUser.photoURL} alt="foto-perfil" onClick={userPerfil} />
          <img id="logo-feed" src={logoDevUnited}></img>
          <img id="text-logo-feed" src={textLogo} alt="" />
        </div>
      </div>
      <div className="form-container">
        <div className="tweet-container">
          <img id="photoURLtweet" src={authUser.photoURL} alt="foto-perfil" />
          <div>
            <textarea
              id="text-area-tweet"
              value={message}
              placeholder="What`s happening?"
              onChange={handleChange}
            ></textarea>
            <div className="progress-wrapper">
              <div
                className="progress-bar"
                style={{ width: `${calculatePercentage()}%` }}
              ></div>
            </div>
            <div className="count-characters">
              <p id="message-count">{message.length}</p>
              <p id="message-limit">{`${CHAR_LIMIT} max.`}</p>
            </div>
            <div className="container-btn-post">
              <button
                id="btn-post"
                type="submit"
                className="btn-post"
                onClick={handleSubmit}
                disabled={message.length > 0 ? false : true}
              >
                POST
              </button>
            </div>
          </div>
        </div>

      </div>
      <section className="tweets-content">
        <div className="tweets-box">
          {timeLine.map((tweet) => {
            return <TweetCard tweet={tweet} key={tweet.id} onDeleteTweet={() => deleteTweet(tweet.id)} onLikeTweet={() => likeTweet(tweet.id, tweet.likesCount)} />;
          })}
        </div>

      </section>
    </>
  );
}
