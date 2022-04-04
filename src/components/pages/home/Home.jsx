/** Dependencies */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../user/UserProvider";

/** Style */
import "./home.css";


import { loginWithGoogle } from "../../../firebaseService/firebase"


/** Sources */
import logoDevUnited from "../../../sources/icons/logoDevUnited.svg";
import textLogo from "../../../sources/icons/textLogo.svg";
import iconoGoogle from "./iconoGoogle.svg";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext)

  function loginUserWithGoogle() {
    loginWithGoogle().then((result) => {
      setUser(result.user)
    })
  }

  useEffect(() => {
    if (user.uid !== null) {
      navigate("/register")
    }
  }, [user])

  return (
    <div>
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
                onClick={loginUserWithGoogle}
              >
                Sign in with Google
              </button>
            </div>
            <footer className="footer">
              <p>
                © 2022 Devs_United<span id="beta">-BETA</span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
