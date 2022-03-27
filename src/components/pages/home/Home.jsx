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
import { Navigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  const handleClick = () => {};

  return (
    <>
      {user === null ? (
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
      ) : (
        navigate("/register")
      )}
    </>
  );
}
