import React, { useEffect, useState } from "react";
import Header from "../../components/top-header/Header";
import "./Meydan.css";
import { Link } from "react-router-dom";
import EntranceCardMiniDeneme from "./EntranceCardMiniDeneme";
import EntranceCardGame from "./EntranceCardGame";
import EntranceCardCompetition from "./EntranceCardCompetition";
import Slider from "react-slick";
import kam from "./Kam.mp3";
import BumerangYatay from "./bumerangyatay.svg";
import LeftBumerang from "./leftbumerang.svg";

export default function Meydan() {
  // useEffect(() => {
  //   const audioElement = new Audio(kam);
  //   audioElement.play();
  // }, []);

  const dersler = [
    "Türkçe",
    "Tarih",
    "Coğrafya",
    "Felsefe",
    "Din Kültürü ve Ahlak Bilgisi",
    "Matematik",
    "Fizik",
    "Kimya",
    "Biyoloji",
  ];

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <img src={BumerangYatay} />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src={LeftBumerang} />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0)

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next)
  };

  return (
    <>
      <Header />
      <div className="subject-path">
        <hr />
        <p>Ana Sayfa</p>
      </div>
      <div className="cardsections">
        <Slider {...settings}>
          <Link
            to="/meydan/istila"
            className={imageIndex === 0 ? "slide activeSlide" : "slide"}
          >
            <EntranceCardCompetition
              type="Yarışma"
              description="Düello"
              hak={3}
              PuanKatsayisi={2}
              ders={dersler[0]}
            />
          </Link>
          <Link
            to="/meydan/geneldeneme"
            className={imageIndex === 1 ? "slide activeSlide" : "slide"}
          >
            <EntranceCardMiniDeneme
              type="Mini-Deneme"
              questionNumber={32}
              time={43}
              MaxPuan={215}
              dersler={dersler}
            />
          </Link>
          <Link
            to="/meydan/snake"
            className={imageIndex === 2 ? "slide activeSlide" : "slide"}
          >
            <EntranceCardGame
              type="Oyun"
              description="Yılan"
              hak={3}
              PuanKatsayisi={2}
              ders={dersler[0]}
            />
          </Link>
          <Link
            to="/meydan/snake"
            className={imageIndex === 3 ? "slide activeSlide" : "slide"}
          >
            <EntranceCardGame
              type="Oyun"
              description="Yılan"
              hak={3}
              PuanKatsayisi={2}
              ders={dersler[0]}
            />
          </Link>
          <Link
            to="/meydan/snake"
            className={imageIndex === 4 ? "slide activeSlide" : "slide"}
          >
            <EntranceCardGame
              type="Oyun"
              description="Yılan"
              hak={3}
              PuanKatsayisi={2}
              ders={dersler[0]}
            />
          </Link>
        </Slider>
      </div>
    </>
  );
}
