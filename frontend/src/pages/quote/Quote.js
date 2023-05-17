import React, { useEffect, useRef, useState } from "react";
import "./Quote.css";
import plan from "./PlanaGuven.mp4";
import { Link } from "react-router-dom";

export default function Quote() {
  const linkRef = useRef(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      linkRef.current.click();
    }, 6000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="transition-page-container">
      <video className="transition-video" autoPlay muted>
        <source src={plan} type="video/mp4" />
      </video>
      <Link
        ref={linkRef}
        to="/meydan"
        style={{ textDecoration: "none" }}
      ></Link>
    </div>
  );
}
