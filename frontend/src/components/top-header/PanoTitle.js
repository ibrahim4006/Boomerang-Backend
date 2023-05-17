import React from 'react'
import "./PanoTitle.css"

function PanoTitle({title}) {
  return (
    <div className='panotitle'>
      <hr/>
      <h1>{title}</h1>
    </div>
  )
}

export default PanoTitle
