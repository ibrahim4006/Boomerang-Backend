import React from "react";
import BodyMesajlar from "./BodyMesajlar";
import Hero from "../components/hero/Hero";
import Header from "../components/top-header/Header";

export default function Mesajlar() {
  return (
    <>
      <Header />
      <Hero pageSubject="Mesajlar" barTitle={[]} />
      <BodyMesajlar />
    </>
  );
}
