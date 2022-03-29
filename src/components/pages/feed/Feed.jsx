import React, { useState, useEffect } from "react";

/** components */
import TweetCard from "./TweetCard";

/** Firebase */
import { auth } from "../../../firebaseService/firebase";

/** funcionalities */
import { addTweet } from "../../../functionalities/funcionalities";
import { fetchLatestTweet } from "../../../functionalities/funcionalities";

/** Style */
import "./feed.css";

/** Sources */
import logoDevUnited from "../../../sources/icons/logoDevUnited.svg";
import textLogo from "../../../sources/icons/textLogo.svg";

export default function Feed() {
  const [message, setMessage] = useState("");
  const [timeLine, setTimeLine] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const CHAR_LIMIT = 200;

  useEffect(() => {
    fetchLatestTweet(setTimeLine);
  }, []);

  auth.onAuthStateChanged((user) => {
    setAuthUser(user);
  });

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

  /** contador de letras */

  return (
    <>
      <div className="feed-page">
        <div className="container-feed">
          <header className="header-feed">
            <img id="photoURL" src={authUser.photoURL} alt="" />
            <img id="logoFeed" src={logoDevUnited}></img>
            <img id="text-logo-feed" src={textLogo} alt="" />
          </header>
          <section className="space-to-tweet">
            <img id="photoURLtweet" src={authUser.photoURL} alt="" />
            <div className="input-tweet">
              <textarea
                id="textArea-tweet"
                value={message}
                placeholder="What`s happening?"
                onChange={handleChange}
              ></textarea>
              <div className="count-characters">
                <p id="message-count">{message.length}</p>
                <p id="message-limit">{`${CHAR_LIMIT} max.`}</p>
                {/* <div
                  className="progress-bar"
                  style={{ width: `${calculatePercentage()}%` }}
                ></div> */}
              </div>
              <div className="btn-post">
                <button
                  type="button"
                  className="btn-post"
                  onClick={handleSubmit}
                >
                  post
                </button>
              </div>
            </div>
          </section>

          <section>
            {timeLine.map((tweet) => {
              return <TweetCard tweet={tweet} />;
            })}
          </section>
        </div>
      </div>
    </>
  );
}
