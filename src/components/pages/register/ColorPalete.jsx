import React from "react";
/** Style */
import "./colorPalete.css";

export default function ColorPalet({ onSelectColor }) {
  return (
    <div className="color-palete">
      <p id="color-favorite">Select your favorite color</p>
      <div className="colors">
        <div
          onClick={() => onSelectColor("red")}
          className="color-red color-margin"
        ></div>
        <div
          onClick={() => onSelectColor("orange")}
          className="color-orange color-margin"
        ></div>
        <div
          onClick={() => onSelectColor("yellow")}
          className="color-yellow color-margin"
        ></div>
        <div
          onClick={() => onSelectColor("green")}
          className="color-green color-margin"
        ></div>
        <div
          onClick={() => onSelectColor("blue")}
          className="color-blue color-margin"
        ></div>
        <div
          onClick={() => onSelectColor("purple")}
          className="color-purple color-margin"
        ></div>
      </div>
    </div>
  );
}
