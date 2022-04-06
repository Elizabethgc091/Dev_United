/** Dependencies */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../user/UserProvider";
import { getUserData, trySaveUserData } from "../../../user/UserDataSession"

/** components */
import ColorPalete from "./ColorPalete";

/**Style */
import "./registerPage.css";

/** sources */
import logoDevUnited from "../../../sources/icons/logoDevUnited.svg";
import textLogo from "../../../sources/icons/textLogo.svg";

export default function RegisterPage() {
  const { user } = React.useContext(UserContext)
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [color, setColor] = useState("");
  const [userData, setUserData] = useState(null)
  const estiloBase = "user-name-color";
  let estiloDinamico = color ? color : "";


  /** si no hay un usuario logeado */
  useEffect(() => {
    if (user.uid === null) { navigate("/"); }
    else {
      getUserData(user.uid, setUserData);
      console.log(userData);
      /** Si el usuario logeado */
      if (userData !== null) {
        console.log("Diferente de null");
        console.log(userData);
        navigate("/feed")
      }
    }
  }, [user, userData])


  return (
    <>
      <div className="register-page">
        <div className="container-logo-register">
          <img id="logoRegister" src={logoDevUnited} alt="" />
          <img id="textRegister" src={textLogo} alt="" />
        </div>
        <div className="container-register">
          <div className="register">
            <div className="user-name">
              <p id="welcome">
                welcome <br />
                <span
                  className={estiloBase + " " + estiloDinamico}
                >{`${userName}!`}</span>
              </p>
            </div>
            <input
              className="input-userName"
              type="text"
              value={userName}
              placeholder=" Type your username"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <div>
              <ColorPalete onSelectColor={(color) => setColor(color)} />
            </div>
            <div>
              <button
                id="btn-continue"
                type="button"
                onClick={() => trySaveUserData(userName, color, () => { navigate("/feed") })}
                disabled={userName === "" || color === ""}
              >
                continue
              </button>
            </div>
          </div>
          <footer className="footer">
            <p>
              © 2022 Devs_United<span id="beta">-BETA</span>{" "}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
