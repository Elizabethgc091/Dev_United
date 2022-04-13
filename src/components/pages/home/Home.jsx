/** Dependencies */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
/** Context */
import { UserContext } from "../../../user/UserProvider";
/** Style */
import "./home.css";
/** Sources */
import logoDevUnited from "../../../sources/icons/logoDevUnited.svg";
import textLogo from "../../../sources/icons/textLogo.svg";
import iconoGoogle from "./iconoGoogle.svg";
import { loginWithGoogle } from "../../../firebaseService/firebase"

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext)

  /**
   * @description Función que hace el Login de un usuario
   */
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
              <span>connected people 🤝</span>
            </div>
            <div className="description-text">
              a social network dedicated to programmers
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
