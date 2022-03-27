import React from "react";
/**Style */
import "./registerPage.css";
export default function RegisterPage() {
  return (
    <>
      <div className="register-page">
        <div className="container-logo-register">
          <div>logo</div>
          <div>text</div>
        </div>
        <div className="container-register">
          <div className="register">
            <div>Lorem, ipsum.</div>
            <input placeholder="username"></input>
            <div>component colors</div>
            <div>
              <button>continue</button>
            </div>
          </div>
          <footer>Lorem, ipsum dolor.</footer>
        </div>
      </div>
    </>
  );
}
