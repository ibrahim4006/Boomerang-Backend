import React from "react";
import "./SingleCard.css";
import kartBack from "./kartback.svg";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClickCard = () => {
    if(!disabled){
      handleChoice(card);
    } 
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src={kartBack}
          onClick={handleClickCard}
          alt="card back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
