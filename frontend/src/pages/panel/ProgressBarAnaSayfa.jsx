import React from "react";
import "./BodyPanel.css";

export default function ProgressBarAnaSayfa({ progress }) {
  const barStyle = {
    width: `${progress}%`,
    height: "7px",
    backgroundColor: "black",
  };
//   const barLine = {
//     width: `${progress}%`,
//     height: "40px",
//     borderRight: "2px solid black",
//     backgroundColor: "transparent",
//     marginTop: "-20px",
//   };
  return (
    <div className="bar">
      <p>Matematik</p>
      <div className="bar-frame">
        <div className="bar-border">
            <div style={barStyle}></div>
        </div>
      </div>
    </div>
  );
}
