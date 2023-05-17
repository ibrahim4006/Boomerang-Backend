import React from "react";
import "./BodyPanel.css";

function Kürsü() {
  const kürsü = [
    "Puan",
    "Zincir",
    "Ortalama Net",
    "Kupa",
    "Madalya",
    "Mini Deneme",
    "Level",
  ];
  const leaderboard = [
    "Muhammet Alperen Efiloğlu",
    "İbrahim Ergen",
    "Tayfur Dağ",
    "Muhammet Alperen Efiloğlu",
    "İbrahim Ergen",
    "Tayfur Dağ",
    "Muhammet Alperen Efiloğlu",
    "İbrahim Ergen",
    "Tayfur Dağ",
  ];
  return (
    <>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">Kürsü</p>
      </div>
      <div className="kürsü-nav">
        {kürsü.map((name) => (
          <p>{name}</p>
        ))}
      </div>
      <div className="kürsü-sıralama">
        <div className="kürsü-top-part">
          <p><b>Sıra</b></p>
          <p><b>Puan</b></p>
        </div>
        <div className="kürsü-bottom-part">
          {leaderboard.map((name, sıra) => (
            <div className="name-block">
              <p><b>{sıra+1}</b></p>
              <p>{name}</p>
              <p><b>450</b></p>
            </div>
          ))}
        </div>
      </div>
      <div className="search-btn">
        <div className="search-left"></div>
        <div className="search-right">Ara</div>
      </div>
    </>
  );
}

export default Kürsü;
