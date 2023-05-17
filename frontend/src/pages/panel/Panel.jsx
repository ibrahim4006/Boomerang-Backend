import React from 'react'
import Header from '../../components/top-header/Header'
import Hero from '../../components/hero/Hero'
import BodyPanel from './BodyPanel'

function Panel() {
  return (
    <>
      <Header />
      <Hero pageSubject="Panel/Ana Sayfa" barTitle={[]} />
      <BodyPanel />
    </>
  )
}

export default Panel
