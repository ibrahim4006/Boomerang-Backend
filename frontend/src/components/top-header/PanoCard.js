import React from "react";
import "./PanoCard.css";
import PanoProgressBar from "./PanoProgressBar";
import PanoTask from "./PanoTask";
import PanoTitle from "./PanoTitle";

function PanoCard({title}) {

  return (
    <div className="panocard">
      <div className="panocard-top">
        <PanoTitle title={title} />
        <PanoProgressBar progress={80}/>
      </div>
      <div className="panocard-bottom">
        <PanoTask />
        <PanoTask />
        <PanoTask />
        <PanoTask />
        <PanoTask />
      </div>
    </div>
  );
}

export default PanoCard;
