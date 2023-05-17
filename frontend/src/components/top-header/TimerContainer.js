import React, { useEffect, useState } from "react";
import "./TimerContainer.css";

function TimerContainer() {

    const month = Array.from({ length: 12 }, (_, index) => index + 1);
    const days = Array.from({ length: 29 }, (_, index) => index + 1);
    const hours = Array.from({ length: 23 }, (_, index) => index + 1);
    const minutes = Array.from({ length: 60 }, (_, index) => index + 1);
    const seconds = Array.from({ length: 60 }, (_, index) => index + 1);

    const handleClick = (event) => {
      console.log(`You clicked ${event.target.innerText}`);
    };

  return (
    <div className="timer-columns">
      <div className="work-month">
        <div id="scroll-hours">
          {month.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="section-name">
        <p className="name">Ay</p>
      </div>
      <div className="work-day">
        <div id="scroll-hours">
          {days.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="section-name">
        <p className="name">Gün</p>
      </div>
      <div className="work-hour">
        <div id="scroll-hours">
          {hours.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="section-name">
        <p className="name">Saat</p>
      </div>
      <div className="work-minute">
        <div id="scroll-minutes">
          {minutes.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="section-name">
        <p className="name">Dakika</p>
      </div>
      <div className="work-second">
        <div id="scroll-seconds">
          {seconds.map((number) => (
            <h1 key={number} onClick={handleClick}>
              {number}
            </h1>
          ))}
        </div>
      </div>
      <div className="section-name">
        <p className="name">Saniye</p>
      </div>
    </div>
  );
}
export default TimerContainer;
