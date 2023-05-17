import React from "react";
import BodyHangman from "./BodyHangman";
import Header from "../../components/top-header/Header";
import Hero from "../../components/hero/Hero";

export default function Hangman() {
  return (
    <>
      <Header />
      <Hero pageSubject="Adam Asmaca" barTitle={[]} />
      <BodyHangman />
    </>
  );
}
