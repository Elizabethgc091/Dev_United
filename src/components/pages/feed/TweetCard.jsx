import React, { useState, useEffect } from "react";

/** Style*/
import "./tweetCard.css";

export default function TweetCard({ tweet }) {
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
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    tweet.user.get().then((tweetUser) => {
      setUser(tweetUser.data());
    });
  });

  return (
    <>
      <div className="container-tweet-card">
        <div className="foto-perfil">
          <img id="photo-tweet" src={user.photoURL} alt="" />
        </div>
        <div className="contenido-del-tweet">
          <div>
            <div className={estiloBase + "-" + estiloDinamico}>
              {user.userName}
            </div>
            -{tweet.created_at.toDate().toLocaleDateString("es-MX", options)}
          </div>
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
              <p>{tweet.likesCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
