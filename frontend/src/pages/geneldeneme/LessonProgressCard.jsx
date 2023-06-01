import React from "react";
import "./ClassLesson.css";

function LessonProgressCard({title, relatednumber}) {
  return (
    <div className="cardprogress">
      <span className="icon-plus">+</span>
      <p>{title}</p>
      <h1>{relatednumber ? relatednumber : "0"}</h1>
    </div>
  );
}

export default LessonProgressCard;
