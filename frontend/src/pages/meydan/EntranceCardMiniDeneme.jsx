import React, { useState } from "react";
import "./EntranceCard.css";
import Ok from "./cardOk.svg";

export default function EntranceCardMiniDeneme({
  type,
  questionNumber,
  time,
  MaxPuan,
  dersler,
}) {
  const [showlessoninfo, setLessonInfo] = useState(Array(8).fill(false));

  const handleHoverInfo = (index) => {
    const updatedLessonInfo = [...showlessoninfo]; 
    updatedLessonInfo[index] = true; 
    setLessonInfo(updatedLessonInfo);
  };
  const handleLeaveInfo = (index) => {
    const updatedLessonInfo = [...showlessoninfo]; 
    updatedLessonInfo[index] = false; 
    setLessonInfo(updatedLessonInfo);
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
          <p>Soru Sayısı : {questionNumber}</p>
          <p>Süre : {time} dk</p>
          <p>
            {/* <span>
              <img src={Ok} className="cardOk" />
            </span> */}
            Max Puan : {MaxPuan}
          </p>
        </div>
      </div>
      <div className="bottom-part">
        {dersler.map((ders,index) => (
          <div className="bottom-box" key={ders}>
            <p onMouseEnter={() => handleHoverInfo(index)} onMouseLeave={() => handleLeaveInfo(index)}>
              <span>
                <img src={Ok} className="cardOk" alt="Ok" />
              </span>
              [ {ders} ]
              {showlessoninfo[index] && (
              <div className="infocard">
                <p>Soru Sayısı : {10} </p>
                <p>Zorluk : Easy </p>
                <p>Konu : Üslü Sayılar </p>
              </div>
            )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
