/** Dependencies */
import React, { useState } from "react";
/** Style */
import "./home.css";
/** Firebase Services */
import { auth, loginWithGoogle, logout } from "../../firebaseService/firebase";

export default function Home() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  const handleClick = () => {};

  return (
    <>
      <div className="home-page">
        <div className="box-1">
          <div className="container-logo">
            <div>logo</div>
            <div>texto</div>
          </div>
        </div>
        <div className="box-2">
          <div className="container-login">
            <div>Lorem, ipsum dolor.</div>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing.</div>
            <div>
              <button type="button" onClick={user ? logout : loginWithGoogle}>
                sign in{" "}
              </button>
            </div>
            <footer>Lorem, ipsum dolor.</footer>
          </div>
        </div>
      </div>
    </>
  );
}
