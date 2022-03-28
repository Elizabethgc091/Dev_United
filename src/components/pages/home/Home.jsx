/** Dependencies */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Style */
import "./home.css";

/** Firebase Services */
import {
  auth,
  loginWithGoogle,
  logout,
} from "../../../firebaseService/firebase";

/** Router */
import { Navigate } from "react-router-dom";

/** Sources */
import logoDevUnited from "../../../sources/icons/logoDevUnited.svg";
import textLogo from "../../../sources/icons/textLogo.svg";
import iconoGoogle from "../../../sources/icons/iconoGoogle.svg";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <>
      {user === null ? (
        <div className="home-page">
          <div className="box-1">
            <div className="container-logo">
              <img id="logo-dev-united" src={logoDevUnited} alt="logoDev" />
              <img id="text-logo" src={textLogo} alt="DEV_UNITED" />
            </div>
          </div>
          <div className="box-2">
            <div className="container-login">
              <div className="container-welcome">
                <span>Welcome</span> <br />
                <span>to red social ✌🏽</span>
              </div>
              <div className="description-text">
                Is a social network dedicated to programmers, to communicate
              </div>
              <div className="btn-signIn">
                <img id="icon-google" src={iconoGoogle} alt="" />
                <button
                  type="button"
                  id="btn-login"
                  onClick={user ? logout : loginWithGoogle}
                >
                  Sign in with Google
                </button>
              </div>
              <footer className="footer">
                <p>
                  © 2022 Devs_United<span id="beta">-BETA</span>{" "}
                </p>
              </footer>
            </div>
          </div>
        </div>
      ) : (
        navigate("/register")
      )}
    </>
  );
}
