import React from 'react'
import "./Hero.css"
import HeroBar from './HeroBar'
import HeroSubject from './HeroSubject'

function Hero({barTitle, pageSubject}) {
  return (
    <div className='hero'>
      <div className='subject-path'>
        <hr/>
        <p>{`YKS / ${pageSubject}`}</p>
      </div>
      <div className='hero-nav'>
        {barTitle.map(title => 
            <HeroBar text={title} />
          )}
      </div>
      <div className='subject-title'>
        <HeroSubject subject={(pageSubject.split("/")).length > 2 ? (pageSubject.split("/").at(-1)) : pageSubject}/>
      </div>
    </div>
  )
}

export default Hero
