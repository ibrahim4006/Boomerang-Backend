import React from 'react'
import BodySnake from './BodySnake'
import Hero from '../../components/hero/Hero'
import Header from '../../components/top-header/Header'


export default function Snake() {
  
  return (
    <>
      <Header />
      <Hero pageSubject="Yılan" barTitle={[]} />
      <BodySnake />
    </>
  )
}
