import React from 'react'
import "./BodyPanel.css"
import ResultBlock from './ResultBlock'
import CompetitionName from './CompetitionName'

export default function YarismaResultCard() {
  return (
    <div className='yarismaresultcard'>
      <div className='yarismaresultcardtop'>
        <ResultBlock />
        <ResultBlock />
        <ResultBlock />
      </div>
      <div className='yarismaresultcardbottom'>
        <CompetitionName />
      </div>
    </div>
  )
}
