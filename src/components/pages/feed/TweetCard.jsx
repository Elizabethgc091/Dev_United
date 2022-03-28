import React, { useState } from "react";

/** Style*/
import "./tweetCard.css";
import { auth } from "../../../firebaseService/firebase";

export default function TweetCard({ tweet }) {
  const temporalUser = {
    photoURL:
      "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg",
    userName: "Cargando...",
  };

  const [user, setUser] = useState(temporalUser);
  tweet.user.get().then((tweetUser) => {
    setUser(tweetUser.data());
  });
  return (
    <>
      <div className="container-tweet-card">
        <div className="foto-perfil">
          <img src={user.photoURL} alt="" />
        </div>
        <div className="contenido-del-tweet">
          <div>@{user.userName} -fecha</div>
          <div>icono borrar</div>
          <div className="contenido-mensaje">
            <section>{tweet.content}</section>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              consectetur repellat vitae eveniet sunt expedita. Delectus optio
              ipsam nam nihil vel impedit, deserunt amet ducimus cupiditate modi
              id. Consequuntur, eius?
            </p> */}
            <div className="like">
              <p>❤️</p>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
