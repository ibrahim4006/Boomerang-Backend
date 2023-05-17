import React from 'react'
import "./BodyPanel.css"

export default function CountDown() {
    const month = Array.from({ length: 12 }, (_, index) => index + 1);
    const days = Array.from({ length: 29 }, (_, index) => index + 1);
    const hours = Array.from({ length: 23 }, (_, index) => index + 1);
    const minutes = Array.from({ length: 60 }, (_, index) => index + 1);
    const seconds = Array.from({ length: 60 }, (_, index) => index + 1);

    const handleClick = (event) => {
      console.log(`You clicked ${event.target.innerText}`);
    };
  return (
    <div className="counttimer-columns">
      <div className="counttimer-month">
        <div id="scroll-hours">
          {month.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="counttimer-section-name">
        <p className="counttimer-name">Ay</p>
      </div>
      <div className="counttimer-day">
        <div id="scroll-hours">
          {days.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="counttimer-section-name">
        <p className="counttimer-name">Gün</p>
      </div>
      <div className="counttimer-hour">
        <div id="scroll-hours">
          {hours.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="counttimer-section-name">
        <p className="counttimer-name">Saat</p>
      </div>
      <div className="counttimer-minute">
        <div id="scroll-minutes">
          {minutes.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="counttimer-section-name">
        <p className="counttimer-name">Dakika</p>
      </div>
      <div className="counttimer-second">
        <div id="scroll-seconds">
          {seconds.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="counttimer-section-name">
        <p className="counttimer-name">Saniye</p>
      </div>
    </div>
  )
}
