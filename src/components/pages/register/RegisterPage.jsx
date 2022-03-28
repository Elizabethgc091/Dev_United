/** Dependencies */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Firebase */
import { auth, db } from "../../../firebaseService/firebase";

/** components */
import ColorPalete from "./ColorPalete";

/**Style */
import "./registerPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/");
    }
  });
  /**
   * @description función que manda userName y color a la base de datos
   */
  function sendRegister() {
    const uid = auth.currentUser.uid;
    const selectedColor = color;
    db.collection("users")
      .doc(uid)
      .set({
        color: selectedColor,
        userName: userName,
      })
      .then(
        //Si fue exito manda a la siguiente pagina
        navigate("/feed")
      )
      .catch((error) => console.log("Error writing document: ", error));
  }
  return (
    <>
      <div className="register-page">
        <div className="container-logo-register">
          <div>logo</div>
          <div>text</div>
        </div>
        <div className="container-register">
          <div className="register">
            <div className="welcome-username">
              <span>Welcome</span>
              <span>{userName}</span>
            </div>
            <input
              type="text"
              value={userName}
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <div>
              <ColorPalete onSelectColor={(color) => setColor(color)} />
            </div>
            <div>
              <button
                type="button"
                onClick={sendRegister}
                disabled={userName === "" || color === ""}
              >
                continue
              </button>
            </div>
          </div>
          <footer>Lorem, ipsum dolor.</footer>
        </div>
      </div>
    </>
  );
}
