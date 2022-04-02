import React, { useState, useEffect } from "react";

import { auth, db } from "../../../firebaseService/firebase"


/** Style*/
import "./tweetCard.css";
/** Source */
import heartLike from "../../../sources/icons/heartLike.svg";
import garbage from "../../../sources/icons/garbage.svg";

export default function TweetCard({ tweet, onDeleteTweet, onLikeTweet }) {
  const temporalUser = {
    photoURL:
      "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg",
    userName: "Cargando...",
    color: "#FFFFFF",
  };
  const [user, setUser] = useState(temporalUser);
  const estiloBase = "user-color";
  let estiloDinamico = user.color ? user.color : "red";

  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  useEffect(() => {
    tweet.user.get().then((tweetUser) => {
      setUser({
        id: tweetUser.id,
        ...tweetUser.data()
      });
    });
  });
  /**
   *@description Funcion que actualiza likes en base de datos
   */


  return (
    <>
      <div className="section-tweet-container">
        <div className="photo-perfil-tweets">
          <img id="photo-tweet" src={user.photoURL} alt="profile-photo" />
        </div>
        <div className="tweets-box">
          <div className="info-tweets">
            <div className="userName-fecha">
              <div id="userName" className={estiloBase + "-" + estiloDinamico}>
                {user.userName}
              </div>
              <div>
                <span id="date"> -{tweet.created_at.toDate().toLocaleDateString("es-MX", options)}</span>
              </div>

            </div>
            {auth.currentUser.uid == user.id ? <img id="garbage-svg" src={garbage} alt="basura" onClick={onDeleteTweet} /> : ""}

          </div>
          <div className="message-content">
            <p id="tweet-msg">{tweet.content}</p>
          </div>
          <div className="like-container">
            <img id="like-svg" src={heartLike} alt="like" onClick={onLikeTweet} />
            <p id="contador-like">{tweet.likesCount}</p>
          </div>
        </div>

      </div>
    </>
  );
}
