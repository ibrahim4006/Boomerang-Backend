import React from 'react'
import "./BodyHangman.css";

export default function FigureMan({errorCount}) {
  return (
    <>
      <svg height="450" width="500" className="figure-container">
      {/* <!-- Rod --> */}
      <line x1="200" y1="20" x2="350" y2="20" />
      <line x1="350" y1="20" x2="350" y2="80" />
      <line x1="200" y1="20" x2="200" y2="310" />
      <line x1="60" y1="310" x2="350" y2="310" />
      <line x1="250" y1="22" x2="200" y2="80" />

      {/* <!-- Head --> */}
      { errorCount > 0 &&
        <circle cx="350" cy="108" r="25" />
      }
      {/* <!-- Body --> */}
      { errorCount > 1 &&
        <line x1="350" y1="133" x2="350" y2="210" />
      }
      {/* <!-- Arms --> */}
      { errorCount > 2 &&
        <line x1="350" y1="140" x2="320" y2="160" />
      }
      { errorCount > 3 &&
        <line x1="350" y1="140" x2="380" y2="160" />
      }
      {/* <!-- Legs --> */}
      { errorCount > 4 &&
        <line x1="350" y1="210" x2="320" y2="250" />
      }
      { errorCount > 5 &&
        <line x1="350" y1="210" x2="380" y2="250" />
      }
    </svg>
    </>
  )
}
