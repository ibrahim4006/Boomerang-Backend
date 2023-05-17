import React from 'react'
import "./HeroBar.css"

function HeroBar({text}) {
  return (
    <div className='herobar'>
      <a href={`#${text}`}>{text}</a>
    </div>
  )
}

export default HeroBar
