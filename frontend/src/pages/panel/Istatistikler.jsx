import React from 'react'
import "./BodyPanel.css"
import ProgressCardistatistik from './ProgressCardistatistik'
import SkillCircleChart from './SkillCircleChart'

export default function Istatistikler() {
  return (
    <>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">İstatistikler</p>
      </div>
      <div className='istatitik-top'>
        <div className='skillchart'>
            <div className="progress-table-stat">
              <ProgressCardistatistik />
              <ProgressCardistatistik />
              <ProgressCardistatistik />
              <ProgressCardistatistik />
            </div>
            <div className='skillcircle'>
                <SkillCircleChart />
            </div>
        </div>
        <div className='sıralamachart'></div>
      </div>
    </>
  )
}
