import React from 'react'
import BodyIskambil from './BodyIskambil'
import Header from '../../components/top-header/Header'
import Hero from "../../components/hero/Hero";

function Iskambil() {
  return (
    <>
      <Header />
      <Hero pageSubject="İskambil" barTitle={[]}/>
      <BodyIskambil />
    </>
  )
}

export default Iskambil
