/** Dependencias */
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

/** Style*/
import "./tweetCard.css";
/** Source */
import heartLike from "../../../sources/icons/heartLike.svg";
import garbage from "../../../sources/icons/garbage.svg";
import { auth } from "../../../firebaseService/firebase"
import { getTweetUserData, deleteTweet, onLikeTweetUseCase } from "../../../functionalities/funcionalities"


export default function TweetCard({ tweet }) {
  const temporalUser = {
    photoURL: "https://cdn-icons.flaticon.com/png/512/3098/premium/3098832.png?token=exp=1649456735~hmac=1d544d3898c3002ad9c4b989129e0ed2",
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

  useEffect(async () => {
    await getTweetUserData(tweet, setUser)
  }, [getTweetUserData]);

  function confirmDeleteTweet() {
    Swal.fire({
      title: 'Delete tweet',
      text: "Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0096CE',
      cancelButtonColor: '#F50D5A',
      confirmButtonText: 'Yes, delete it!',
      background: "#2E132C",
      color: "#fff",

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: 'Deleted',
          text: 'Your tweet has been deleted.',
        })
        deleteTweet(tweet.id)
      }
    })
  }
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
                <span id="date"> {tweet.created_at.toDate().toLocaleDateString("es-MX", options)}</span>
              </div>
            </div>
            {auth.currentUser.uid == user.id ? <img id="garbage-svg" src={garbage} alt="basura" onClick={confirmDeleteTweet} /> : ""}
          </div>
          <div className="message-content">
            <p id="tweet-msg">{tweet.content}</p>
          </div>
          <div className="like-container">
            <img id="like-svg" src={heartLike} alt="like" onClick={() => onLikeTweetUseCase(tweet)} />
            <p id="contador-like">{tweet.likesCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}
