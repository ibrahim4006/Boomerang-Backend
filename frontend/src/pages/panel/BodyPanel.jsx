import React, { useState } from "react";
import "./BodyPanel.css";
import AnaSayfa from "./AnaSayfa";
import Kürsü from "./Kürsü";
import Istatistikler from "./Istatistikler";
import Profil from "./Profil";
import Mesajlar from "./Mesajlar";
import Yarisma from "./Yarisma";
import Arsiv from "./Arsiv";

function BodyPanel() {
  const [sectionName, setSectionName] = useState("anasayfa");

  const handleSectionName = (name) => {
    setSectionName(name);
  };
  return (
    <div className="bodypanel">
      <div className="panel-nav">
        <p
          onClick={() => handleSectionName("anasayfa")}
          className={sectionName === "anasayfa" ? "active-panelnav" : null}
        >
          Ana Sayfa
        </p>
        <p
          onClick={() => handleSectionName("kürsü")}
          className={sectionName === "kürsü" ? "active-panelnav" : null}
        >
          Kürsü
        </p>
        <p
          onClick={() => handleSectionName("yarışmalar")}
          className={sectionName === "yarışmalar" ? "active-panelnav" : null}
        >
          Yarışma
        </p>
        <p
          onClick={() => handleSectionName("istatistikler")}
          className={sectionName === "istatistikler" ? "active-panelnav" : null}
        >
          İstatistikler
        </p>
        <p
          onClick={() => handleSectionName("profil")}
          className={sectionName === "profil" ? "active-panelnav" : null}
        >
          Profil
        </p>
        <p
          onClick={() => handleSectionName("mesajlar")}
          className={sectionName === "mesajlar" ? "active-panelnav" : null}
        >
          Mesajlar
        </p>
        <p
        onClick={() => handleSectionName("arşiv")}
        className={sectionName === "arşiv" ? "active-panelnav" : null}>Arşiv</p>
      </div>
      <div className="panel-info">
        {sectionName === "anasayfa" && <AnaSayfa />}
        {sectionName === "kürsü" && <Kürsü />}
        {sectionName === "yarışmalar" && <Yarisma />}
        {sectionName === "istatistikler" && <Istatistikler />}
        {sectionName === "profil" && <Profil />}
        {sectionName === "mesajlar" && <Mesajlar />}
        {sectionName === "arşiv" && <Arsiv />}
      </div>
    </div>
  );
}

export default BodyPanel;
