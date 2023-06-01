import React, { useRef, useState, useEffect } from "react";
import soru1 from "./Tarih/Tarih-TYT-5.png";
import firestore from "../FireBaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc } from "firebase/firestore";

export default function RectangleDrawer() {
  const imageRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    if (points.length >= 2 && points.length % 2 === 0) {
      drawRectangle();
    }
  }, [points]);

  const handleSubmit = (e) => {
    const parentCollectionRef = collection(firestore, "TYTGenelDeneme");
    const parentDocRef = doc(parentCollectionRef, "TYT Genel Deneme 1");
    const nestedCollectionRef = collection(parentDocRef, "Tarih");

    const imagePath = "Tarih-TYT-5.png";

    addDoc(nestedCollectionRef, {
      pointsdata: { points },
      image: imagePath,
      answer: 3,
    })
      .then(() => {
        alert("Question added successfully!");
        setPoints("[]");
      })
      .catch((error) => {
        console.error("Error adding question: ", error);
      });
  };

  const handleClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const imageWidth = imageRef.current.width;
    const imageHeight = imageRef.current.height;
    const xPercentage = (offsetX / imageWidth) * 100;
    const yPercentage = (offsetY / imageHeight) * 100;
    const newPoint = { x: xPercentage, y: yPercentage };
    setPoints([...points, newPoint]);
  };

  const drawRectangle = () => {
    const lastIndex = points.length - 1;
    const point1 = points[lastIndex - 1];
    const point2 = points[lastIndex];
    const rectangle = {
      x: Math.min(point1.x, point2.x),
      y: Math.min(point1.y, point2.y),
      width: Math.abs(point2.x - point1.x),
      height: Math.abs(point2.y - point1.y),
    };

    setRectangles((prevRectangles) => [...prevRectangles, rectangle]);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ position: "relative", display: "inline-block", textAlign:"center", margin: "auto"  }}>
        <img
          src={soru1}
          alt="Your Image"  
          ref={imageRef}
          onClick={handleClick}
          style = { { margin: "auto"}}
        />
        {points.map((point, index) => {
          const isLastPoint = index === points.length - 1;
          const isOddPoint = index % 2 === 0;
          const isRedDotVisible = isLastPoint && isOddPoint;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                width: "10px",
                height: "10px",
                backgroundColor: isRedDotVisible ? "red" : "transparent",
              }}
            />
          );
        })}
        {rectangles.map((rectangle, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${rectangle.x}%`,
              top: `${rectangle.y}%`,
              width: `${rectangle.width}%`,
              height: `${rectangle.height}%`,
              border: "1px solid black",
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>
        <div>
          <h3>Recorded Points:</h3>
          <ul>
            {points && points.map((point, index) => (
              <li key={index}>
                Point {index + 1}: ({point.x.toFixed(2)}%, {point.y.toFixed(2)}
                %)
              </li>
            ))}
          </ul>
        </div>
      <button onClick={handleSubmit}> ADD Data</button>
    </div>
  );
}
