import React from "react";
import "./BodyPanel.css";
import YarismaResultCard from "./YarismaResultCard";
import CountDown from "./CountDown";

export default function Profil() {
  const month = [
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
  ];
  return (
    <>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">Profil</p>
      </div>
      <div className="profil-top">
        <div className="gerisayim-profil">Geri Sayım</div>
        <div className="minideneme-profil">Mini Deneme</div>
        <div className="level-profil">Level</div>
        <div className="puan-profil">Puan</div>
        <div className="madalya-profil">Madalya</div>
        <div className="kupa-profil">Kupa</div>
      </div>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">Yarışmalar</p>
      </div>
      <div className="siralama-percantage">Sıralama Yüzdesi</div>
      <div className="profil-month">
        {month.map((name) => (
          <p>{name}</p>
        ))}
      </div>
      <div className="yarışma-resultcards">
        <YarismaResultCard />
        <YarismaResultCard />
        <YarismaResultCard />
      </div>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">Denemeler</p>
      </div>
      <div className="siralama-percantage">Net Yüzdesi</div>
      <div className="profil-month">
        {month.map((name) => (
          <p>{name}</p>
        ))}
      </div>
      <div className="yarışma-resultcards">
        <YarismaResultCard />
        <YarismaResultCard />
        <YarismaResultCard />
      </div>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">Geri Sayım</p>
      </div>
      <div className="countdown">
        <CountDown />
      </div>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">Zincir</p>
      </div>
    </>
  );
}
