import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import "./PanoProgressBar.css"

function PanoProgressBar({progress}) {
  return (
    <div className='panoprogressbar'>
      <LinearProgress className='lineerbar' variant="determinate" value={progress} color="success"/>
    </div>
  )
}

export default PanoProgressBar
