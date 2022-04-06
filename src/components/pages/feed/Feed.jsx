import React, { useState, useEffect } from "react";
import { UserContext } from "../../../user/UserProvider";
import { useNavigate } from "react-router-dom";

/** components */
import TweetCard from "./TweetCard";

/** funcionalities */
import { getTweets, addTweet } from "../../../functionalities/funcionalities"

/** Style */
import "./feed.css";

/** Sources */
import logoDevUnited from "../../../sources/icons/logoDevUnited.svg";
import textLogo from "../../../sources/icons/textLogo.svg";


export default function Feed() {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [timeLine, setTimeLine] = useState([]);


  const CHAR_LIMIT = 200;
  console.log(user);
  useEffect(() => {
    if (user.uid === null) { navigate("/"); }
    getTweets(setTimeLine)
  }, [user])

  function handleSubmit(event) {
    event.preventDefault();
    addTweet(message);
    setMessage("");
  }

  /**
   * @description función que valida el tamañano de un tweet
   */
  function handleChange(event) {
    const { value } = event.target;

    if (value.length <= CHAR_LIMIT) {
      setMessage(value);
    }
  }

  /** 
   * @description funcion que calcula el porcentaje del tamaño del tweet
  */
  const calculatePercentage = () => (message.length / CHAR_LIMIT) * 100;


  function goToUserProfile() {
    console.log("Redirige al perfil del usuario")
    navigate("/profile")
  }

  return (
    <>
      <div className="header-container">
        <div className="nav-container">
          <img id="photoURL" src={user.photoURL} alt="foto-perfil" onClick={goToUserProfile} />
          <img id="logo-feed" src={logoDevUnited}></img>
          <img id="text-logo-feed" src={textLogo} alt="" />
        </div>
      </div>
      <div className="form-container">
        <div className="tweet-container">
          <img id="photoURLtweet" src={user.photoURL} alt="foto-perfil" />
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
            return <TweetCard tweet={tweet} key={tweet.id} />;
          })}
        </div>

      </section>
    </>
  );
}
