import React, { useState, useEffect } from "react";

/** components */
import TweetCard from "./TweetCard";

/** Sources */
import { addTweet } from "../../../functionalities/funcionalities";
import { fetchLatestTweet } from "../../../functionalities/funcionalities";

/** Style */
import "./feed.css";
export default function Feed() {
  const [message, setMessage] = useState("");
  const [timeLine, setTimeLine] = useState([]);

  useEffect(() => {
    fetchLatestTweet(setTimeLine);
  }, []);

  /**
   * @description función que guarda un tweet
   */
  function handleChange(event) {
    const { value } = event.target;
    setMessage(value);
  }
  /**
   * @description función que agrega tweets a firestore
   * */
  function handleSubmit(event) {
    event.preventDefault();
    addTweet({
      content: message,
    });
  }

  return (
    <>
      <div className="feed-page">
        <div className="container-feed">
          <header className="header-feed">
            <div>fto perfil</div>
            <div>logo</div>
            <div>text de logo</div>
          </header>
          <section className="space-to-tweet">
            <div>foto perfil</div>
            <div className="input-tweet">
              <textarea
                value={message}
                placeholder="What`s happening?"
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
              <div className="info-letters">
                <span># cracter</span>
                <span> 200mx</span>
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
