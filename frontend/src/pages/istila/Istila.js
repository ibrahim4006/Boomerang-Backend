import React from "react";
import BodyIstila from "./BodyIstila";
import Hero from "../../components/hero/Hero";
import Header from "../../components/top-header/Header";

function Istila() {
  return (
    <>
      <Header />
      <Hero pageSubject="İstila" barTitle={[]} />
      <BodyIstila />
    </>
  );
}

export default Istila;
