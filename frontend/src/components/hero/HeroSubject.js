import React from 'react'
import "./HeroSubject.css"

function HeroSubject({subject}) {
  return (
    <div className='hero-subject'>
      {subject.split("/").length === 2 ? 
      <p><span className='normalword'>{subject.split("/")[0]}</span>{subject.split("/")[1]}</p> :
      <p>{subject}</p>
    }
    </div>
  )
}

export default HeroSubject
