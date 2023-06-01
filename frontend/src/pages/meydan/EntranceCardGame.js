import React, { useState } from "react";
import "./EntranceCard.css";
import Ok from "./cardOk.svg";

export default function EntranceCardGame({
  type,
  description,
  hak,
  PuanKatsayisi,
  ders,
}) {
  const [showlessoninfo, setLessonInfo] = useState(Array(8).fill(false));

  const handleHoverInfo = () => {
    setLessonInfo(true);
  };
  const handleLeaveInfo = () => {
    setLessonInfo(false);
  };

  return (
    <div className="entrancecard">
      <div className="background"></div>
      <div className="frame">
        <div className="frame-top"></div>
        <div className="frame-bottom"></div>
      </div>
      <div className="top-part">
        <div className="top-box">
          <p>Tür : {type}</p>
          <p>Tanım : {description}</p>
          <p>Hak : {hak} dk</p>
          <p>
            {/* <span>
              <img src={Ok} className="cardOk" />
            </span> */}
            Puan Katsayısı : {PuanKatsayisi}
          </p>
        </div>
      </div>
      <div className="bottom-part">
          <div className="bottom-box" key={ders}>
            <div onMouseEnter={() => handleHoverInfo()} onMouseLeave={() => handleLeaveInfo()}>
              <span>
                <img src={Ok} className="cardOk" alt="Ok" />
              </span>
              [ {ders} ]
              {showlessoninfo && (
              <div className="infocard">
                <p>Soru Sayısı : {10} </p>
                <p>Zorluk : Easy </p>
                <p>Konu : Üslü Sayılar </p>
              </div>
            )}
            </div>
          </div>
          <div className="rules">(Kurallar)</div>
      </div>
    </div>
  );
}