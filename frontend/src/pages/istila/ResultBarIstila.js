import React, { useEffect, useMemo, useState } from "react";
import "./ResultBarIstila.css";

function ResultBarIstila({ updateCount,isBlack, boxArray, setBoxArray, minutes, second}) {
  
  
  useEffect(() => {
    setBoxArray((prevArray) => {
      return prevArray.map((value, index) => {
        if (index === updateCount) {
          // Use OR operator to set default value if falsy
          return (value = isBlack);
        } else {
          // Keep the original value for other elements
          return value;
        }
      });
    });
  }, [updateCount]);

  return (
    <div className="squares-progress">
      {boxArray.map((box, index) => (
        <div
          key={index}
          className={box ? `square${index} black` : `square${index}`}
        ></div>
      ))}
      <div className="timeline-top">
        <p>
          <b>{minutes}</b> dk
        </p>
      </div>
      <div className="timeline-bottom">
        <p>
          <b>{second}</b> sn
        </p>
      </div>
    </div>
  );
}

export default ResultBarIstila;
