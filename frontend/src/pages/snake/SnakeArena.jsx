import React, { useEffect, useRef, useState } from "react";
import { CANVAS_SIZE } from "./constant";
import "./BodySnake.css"
import { Link } from "react-router-dom";

export default function SnakeArena({
  canvasRef,
  gameOver,
  correctnumber,
  combo,
  startGamePopup
}) {
  return (
    <>
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && (
      <>
        <div className="pop-up">
          <div className="pop-uptop">
            <div className="pop-uptopbox">
              <p>Yılan </p>
              <p>Kalan Hak : 2 </p>
              <p>Doğru Sayısı : {correctnumber} </p>
              <p>Kazanılan Puan : {correctnumber*5}</p>
              {/* <p>
                  <span>
              <img src={Ok} className="cardOk" />
            </span>
                  Puan Katsayısı : {PuanKatsayisi}
                </p> */}
            </div>
          </div>
          <div className="pop-upbottom">
            <div className="pop-upbottombox">
              <p>Tekrar Oynamak istiyor musunuz?</p>
              <div className="pop-upbtn">
                <p className="option-btn" onClick={startGamePopup}>Evet</p>
                <Link to="/meydan" className="popup-meydanlink">
                  <p className="option-btn">Hayır</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
      )}
      <div className="applecount">
        <div>Point: {correctnumber}</div>
        <div>Seri: {combo}</div>
      </div>
    </>
  );
}
