import React, { useEffect, useState } from "react";
import "./HangmanArena.css";
import FigureMan from "./FigureMan";
import wrong from "./wrong.svg";

export default function HangmanArena({ isHangTrue, updateCount, errorCount,boxArray,setBoxArray }) {

  useEffect(() => {
    setBoxArray((prevArray) => {
      return prevArray.map((value, index) => {
        if (index === updateCount) {
          // Use OR operator to set default value if falsy
          return (value = isHangTrue);
        } else {
          // Keep the original value for other elements
          return value;
        }
      });
    });
  }, [updateCount]);

  return (
    <>
      <h1 className="hangmanname">Alperen Başkan</h1>
      <h1 className="arena">Arena</h1>
      <FigureMan errorCount={errorCount} />
      <div className="wrongbox">
        {boxArray.map((box, index) => ( index != 0 && 
          <img
            key={index}
            src={wrong}
            alt="wrong"
            className={box ? `dark${index} light` : `dark${index}`}
          />
        ))}
      </div>
    </>
  );
}
