import React, { useState, useEffect } from "react";
import firestore from "../FireBaseConfig";
import "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, listAll } from "firebase/storage";

export default function ImageHover({
  photoName,
  photo,
  activeLesson,
  setStudentAnswer,
  studentAnswer,
  questionNumber,
  lengthofArray,
  setRealAnswer,
  dersler,
  realAnswer,
  clicked
}) {
  const [coordinates, setCoordinates] = useState([]);
  const [points, setPoints] = useState([]);

  // const [data, setData] = useState([]);
  //   const storage = getStorage();
  //   const folderRef = ref(storage, `Tytimages/Türkçe/`);

  //   useEffect(() => {
  //     if(data.length > 0){
  //       setData([])
  //     }
  //     listAll(folderRef)
  //       .then((result) => {
  //         result.items.forEach((itemRef) => {
  //           getDownloadURL(itemRef)
  //             .then((url) => {
  //               setData((arr) => [...arr, { name: itemRef.name, url }]);
  //             })
  //             .catch((err) => {
  //               console.log("Error retrieving download URL:", err);
  //             });
  //         });
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //       });

  //   }, [activeLesson]);

  useEffect(() => {
    const colRef = collection(
      firestore,
      "TYTGenelDeneme",
      "TYT Genel Deneme 1",
      `${activeLesson}`
    );

    getDocs(colRef)
      .then((snapshot) => {
        let fetchedQuestions = [];
        snapshot.docs.forEach((doc, ind) => {
          const questionData = doc.data();
          const answer = questionData.answer;
          const image = questionData.image;
          const points = questionData.pointsdata.points;
          fetchedQuestions.push({ answer, image, points, id: doc.id });
        });
        setCoordinates(fetchedQuestions);
        // fetchedQuestions.map((item)=>{
        //   {item.image === photoName && setPoints(item.points)};
        // })
        // {fetchedQuestions[ind].image == photoName && setPoints(fetchedQuestions[ind].points)};
      })
      .catch((error) => {
        console.error("Error fetching questions: ", error);
      });
      setClickedDiv(clicked*2)
  }, [activeLesson]);

  useEffect(() => {
      setRealAnswer((prevRealAnswer) => {
        const newRealAnswer = { ...prevRealAnswer };
        if (!newRealAnswer[activeLesson]) {
          newRealAnswer[activeLesson] = Array(lengthofArray).fill(null);
        }
        coordinates.forEach((item, ind) => {
          newRealAnswer[activeLesson][ind] = item.answer;
        });
        return newRealAnswer;
      }
      );
  }, [coordinates]);

  useEffect(() => {
    const matchingItem = coordinates.find((item) => item.image === photoName);
    if (matchingItem) {
      setPoints(matchingItem.points);
    }
  }, [coordinates]);

  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [clickedDiv, setClickedDiv] = useState(clicked*2);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [clickedIndexes, setClickedIndexes] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = photo;
    image.onload = () => {
      const maxWidth = 400;
      const aspectRatio = image.width / image.height;
      const calculatedWidth = image.width > maxWidth ? maxWidth : image.width;
      const calculatedHeight = calculatedWidth / aspectRatio;
      setImageDimensions({ width: calculatedWidth, height: calculatedHeight });
    };
  }, [photo]);

  useEffect(() => {
    // setClickedDiv(null);
    setHoveredDiv(null);
    setClickedIndexes([]);
  }, [activeLesson]);

  const handleMouseEnter = (index) => {
    setHoveredDiv(index);
  };

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };

  const handleClick = (index) => {
    if (clickedDiv === index) {
      // setClickedDiv(null);
      // removeClickedIndex();
    } else {
      setClickedDiv(index);
      setHoveredDiv(null);
      setClickedIndexes(index / 2);
      if (clickedIndexes) {
        setStudentAnswer((prevStudentAnswer) => {
          const lessonAnswers = { ...prevStudentAnswer };
          if (!lessonAnswers[activeLesson]) {
            lessonAnswers[activeLesson] = Array(lengthofArray).fill(null);
          }
          lessonAnswers[activeLesson][questionNumber] = index / 2;
          return lessonAnswers;
        });
      }
    }
  };

  // const addClickedIndex = (index) => {
  //   setClickedIndexes((prevIndexes) => [...prevIndexes, index]);
  // };

  // const removeClickedIndex = (index) => {
  //   setClickedIndexes(null);
  // };

  const renderDivs = () => {
    const divs = [];
    for (let i = 0; i < points.length - 1; i += 2) {
      const isHovered = hoveredDiv === i;
      const isClicked = clickedDiv === i;
      const divStyle = {
        position: "absolute",
        left: `${(points[i].x / 100) * imageDimensions.width}px`,
        top: `${(points[i].y / 100) * imageDimensions.height}px`,
        width: `${
          ((points[i + 1].x - points[i].x) / 100) * imageDimensions.width
        }px`,
        height: `${
          ((points[i + 1].y - points[i].y) / 100) * imageDimensions.height
        }px`,
        border: isClicked || isHovered ? "1px solid black" : "none",
        transition: "border 0.3s ease-in-out",
        paddingleft: "20px",
        pointerEvents: "all",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: "bold",
        color: isClicked ? "#fff" : "transparent",
        cursor: "pointer",
      };

      divs.push(
        <div
          key={i}
          style={divStyle}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        ></div>
      );
    }
    return divs;
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "relative",
          width: imageDimensions.width,
          maxWidth: "400px",
          height: "auto",
        }}
      >
        {imageDimensions.width !== 0 && (
          <img
            src={photo}
            alt={photoName}
            width={imageDimensions.width}
            height={imageDimensions.height}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        {imageDimensions.width !== 0 && renderDivs()}
      </div>
      {/* <div>
        <h2>Clicked Indexes:</h2>
        <ul>
          {clickedIndexes.map((index) => (
            <li key={index}>{index / 2}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
