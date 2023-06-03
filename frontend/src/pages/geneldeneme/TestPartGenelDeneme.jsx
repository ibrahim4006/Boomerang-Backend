import React, { useEffect, useState } from "react";
import "./TestPartGenelDeneme.css";
import Canvas from "../minideneme/Canvas";
import { useLogout } from "../../hooks/useLogout";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import ImageHover from "../../newdesign/ImageHover";
import GenelDenemeResultBar from "./GenelDenemeResultBar";
import ResultCardsDeneme from "./ResultCardsDeneme";

export default function TestPartGenelDeneme({
  activeLesson,
  minutes,
  second,
  studentAnswer,
  setStudentAnswer,
  data,
  setData,
}) {
  const oddArray = Array.from({ length: 5 }, (_, i) => i * 2 + 1);
  const evenArray = [...Array(5).keys()].map((i) => i * 2 + 2);
  const [realAnswer, setRealAnswer] = useState({});
  const [resultObject, setResultObject] = useState({});
  const [ishoveredButtonLeft, setisHoveredButtonLeft] = useState(false);
  const [ishoveredButtonRight, setisHoveredButtonRight] = useState(false);
  const [isbuttonShowRight, setisButtonShowRight] = useState(false);
  const [isbuttonShowLeft, setisButtonShowLeft] = useState(false);
  const [isshowResult, setisShowResult] = useState(true);
  const dersler = [
    "Türkçe",
    "Tarih",
    "Coğrafya",
    "Felsefe",
    "Matematik",
    "Fizik",
    "Kimya",
    "Biyoloji",
  ];

  const storage = getStorage();

  useEffect(() => {
    Promise.all(
      dersler.map((ders, index) => {
        const folderRef = ref(storage, `Tytimages/${ders}/`);
        return listAll(folderRef)
          .then((result) => {
            const dersData = [];
            return Promise.all(
              result.items.map((itemRef) =>
                getDownloadURL(itemRef)
                  .then((url) => {
                    dersData.push({ name: itemRef.name, url });
                  })
                  .catch((err) => {
                    console.log("Error retrieving download URL:", err);
                  })
              )
            ).then(() => {
              // Sort the dersData array by name
              dersData.sort((a, b) => a.name.localeCompare(b.name));
              return { [ders]: dersData };
            });
          })
          .catch((err) => {
            alert(err.message);
          });
      })
    )
      .then((dataArr) => {
        const newData = dataArr.reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
        setData((prevData) => ({
          ...prevData,
          ...newData,
        }));
      })
      .catch((err) => {
        console.log("Error loading image data:", err);
      });
  }, []);

  const [oddElements, setOddElements] = useState({});
  const [evenElements, setEvenElements] = useState({});

  useEffect(() => {
    if (activeLesson) {
      const lessonData = data[activeLesson] || [];

      const newDataOdd = lessonData
        .map((item, index) => {
          if (index % 2 === 0) {
            return { name: item.name, url: item.url };
          }
          return undefined; // Return undefined for elements that don't meet the condition
        })
        .filter((item) => item !== undefined); // Filter out the undefined values

      // setOddElements(newDataOdd);

      setOddElements((prevOddelements) => {
        const newoddelements = { ...prevOddelements };
        if (!newoddelements[activeLesson]) {
          newoddelements[activeLesson] = Array(10).fill(null);
        }
        newoddelements[activeLesson] = newDataOdd;
        return newoddelements;
      });

      const newDataEven = lessonData
        .map((item, index) => {
          if (index % 2 !== 0) {
            return { name: item.name, url: item.url };
          }
          return undefined; // Return undefined for elements that don't meet the condition
        })
        .filter((item) => item !== undefined); // Filter out the undefined values

      setEvenElements((prevEvenelements) => {
        const newevenelements = { ...prevEvenelements };
        if (!newevenelements[activeLesson]) {
          newevenelements[activeLesson] = Array(10).fill(null);
        }
        newevenelements[activeLesson] = newDataEven;
        return newevenelements;
      });
    }
  }, [activeLesson]);

  // const { logout } = useLogout();
  // const [showWarning, setShowWarning] = useState(false);

  // useEffect(() => {
  //   let logoutTimer;

  //   const handleWindowBlur = () => {
  //     logoutTimer = setTimeout(() => {
  //       logout();
  //     }, 5000);
  //   };

  //   const handleWindowFocus = () => {
  //     clearTimeout(logoutTimer);
  //     setShowWarning(false);
  //   };

  //   const handleNewPageOpen = () => {
  //     clearTimeout(logoutTimer);
  //     setShowWarning(true);
  //   };

  //   window.onblur = handleWindowBlur;
  //   window.onfocus = handleWindowFocus;
  //   window.addEventListener('beforeunload', handleNewPageOpen);

  //   return () => {
  //     clearTimeout(logoutTimer);
  //     window.onblur = null;
  //     window.onfocus = null;
  //     window.removeEventListener('beforeunload', handleNewPageOpen);
  //   };
  // }, []);

  // useEffect(() => {
  //   const correctAnswers = [];

  //   for (let i = 0; i < answerArray.length; i++) {
  //     if (answerArray[i] === realAnswers[i]) {
  //       correctAnswers.push(true);
  //     } else {
  //       correctAnswers.push(false);
  //     }
  //   }
  //   setCorrectAnswer(correctAnswers);
  // }, [answerArray]);

  //   const compareResults = () =>{
  //     if(realAnswer && studentAnswer && data){
  //     dersler.map((ders,index)=>{
  //       setResultObject((prevResultObject)=>{
  //         const newResultObject = {...prevResultObject}
  //         if(!newResultObject[ders]){
  //           newResultObject[ders] = Array(data[ders].length).fill(null);
  //         }
  //         studentAnswer[ders].map((choice,ind)=>{
  //           newResultObject[ders][ind] = realAnswer[ders][ind] === choice
  //         })
  //         return newResultObject;
  //       })
  //       console.log(resultObject)
  //     })
  //   }
  // }

  // const [canvasOpenleft, setCanvasOpenleft] = useState(false);
  // const [selectedCanvasleft, setSelectedCanvasleft] = useState(null);

  // const canvasHandleleft = (index) => {
  //   setCanvasOpenleft(!canvasOpenleft);
  //   setSelectedCanvasleft(index);
  // };

  const onHoverCircleButtonLeft = () => {
    setisHoveredButtonLeft(true);
  };
  const offHoverCircleButtonLeft = () => {
    setisHoveredButtonLeft(false);
  };
  const onHoverCircleButtonRight = () => {
    setisHoveredButtonRight(true);
  };
  const offHoverCircleButtonRight = () => {
    setisHoveredButtonRight(false);
  };
  const showButtonsRight = () => {
    setisButtonShowRight(!isbuttonShowRight);
  };
  const showButtonsLeft = () => {
    setisButtonShowLeft(!isbuttonShowLeft);
  };

  // const [canvasOpenright, setCanvasOpenright] = useState(false);
  // const [selectedCanvasright, setSelectedCanvasright] = useState(null);
  // const canvasHandleright = (index) => {
  //   setCanvasOpenright(!canvasOpenright);
  //   setSelectedCanvasright(index);
  // };
  return (
    <>
      {/* {oddElements.map((item, index) => (
        <div key={index}>
          <img src={item} />
        </div>
      ))} */}
      <div className="testpart" id="testpart">
        <div className="leftcontainer">
          {oddElements[activeLesson] &&
            oddElements[activeLesson]?.map((item, ind) => (
              <div className="sorucardleft">
                <h1 id={`question-${oddArray[ind]}`}>{oddArray[ind]}</h1>
                <ImageHover
                  key={ind}
                  photo={item.url}
                  questionNumber={oddArray[ind] - 1}
                  photoName={item.name}
                  activeLesson={activeLesson}
                  setStudentAnswer={setStudentAnswer}
                  lengthofArray={data[activeLesson].length}
                  studentAnswer={studentAnswer}
                  setRealAnswer={setRealAnswer}
                  realAnswer={realAnswer}
                  dersler={dersler}
                  clicked={
                    studentAnswer[activeLesson] &&
                    studentAnswer[activeLesson][oddArray[ind] - 1]
                  }
                />
                <div
                  className="circle-outer-left"
                  onMouseEnter={onHoverCircleButtonLeft}
                  onMouseLeave={offHoverCircleButtonLeft}
                  onClick={showButtonsLeft}
                >
                  <div className="circle-inner-left"></div>
                  {ishoveredButtonLeft && (
                    <div className="middlebutton-left">
                      <p className="minutes-left">{minutes}</p>
                      <div className="timelineleft-left"></div>
                      <p className="second-left">{second}</p>
                    </div>
                  )}
                </div>
                {isbuttonShowLeft && <div className="sorucardleft-btns">
                  <div className="referencepointleft">
                    <div className="sorufav-btn-left-outer">
                      <div className="sorufav-btn-left-inner"></div>
                    </div>
                    <div className="canvas-btn-left-outer">
                    <div className="canvas-btn-left-inner"></div>
                    </div>
                    <div className="godownpanel-left-outer">
                    <div className="godownpanel-left-inner"></div>
                    </div>
                  </div>
                </div>}
              </div>
            ))}
        </div>
        <div className="rightcontainer">
          {evenElements[activeLesson] &&
            evenElements[activeLesson]?.map((item, ind) => (
              <div className="sorucardright">
                <h1 id={`question-${evenArray[ind]}`}>{evenArray[ind]}</h1>
                <ImageHover
                  key={ind}
                  photo={item.url}
                  photoName={item.name}
                  activeLesson={activeLesson}
                  setStudentAnswer={setStudentAnswer}
                  studentAnswer={studentAnswer}
                  questionNumber={evenArray[ind] - 1}
                  lengthofArray={data[activeLesson].length}
                  setRealAnswer={setRealAnswer}
                  realAnswer={realAnswer}
                  clicked={
                    studentAnswer[activeLesson] &&
                    studentAnswer[activeLesson][evenArray[ind] - 1]
                  }
                />
                <div
                  className="circle-outer-right"
                  onMouseEnter={onHoverCircleButtonRight}
                  onMouseLeave={offHoverCircleButtonRight}
                  onClick={showButtonsRight}
                >
                  <div className="circle-inner-right"></div>
                  {ishoveredButtonRight && (
                    <div className="middlebutton-right">
                      <p className="minutes-right">{minutes}</p>
                      <div className="timelineleft-right"></div>
                      <p className="second-right">{second}</p>
                    </div>
                  )}
                </div>
                {isbuttonShowRight && <div className="sorucardright-btns">
                  <div className="referencepointright">
                    <div className="sorufav-btn-right-outer">
                      <div className="sorufav-btn-right-inner"></div>
                    </div>
                    <div className="canvas-btn-right-outer">
                    <div className="canvas-btn-right-inner"></div>
                    </div>
                    <div className="godownpanel-right-outer">
                    <div className="godownpanel-right-inner"></div>
                    </div>
                  </div>
                </div>}
              </div>
            ))}
        </div>
      </div>
      {activeLesson && data[activeLesson].length && (
        <GenelDenemeResultBar
          studentAnswer={studentAnswer}
          activeLesson={activeLesson}
          lengthofArray={data[activeLesson].length}
        />
      )}
      <button className="deneme-bitir-btn">
        {" "}
        <b>Denemeyi Bitir</b>
      </button>
      {isshowResult && <ResultCardsDeneme />}
    </>
  );
}
