import React, { useEffect, useState } from "react";
import "./TestPartGenelDeneme.css";
import Canvas from "../minideneme/Canvas";
import { useLogout } from "../../hooks/useLogout";


export default function TestPartGenelDeneme({ questions, minutes, second}) {
  const oddArray = Array.from({ length: 5 }, (_, i) => i * 2 + 1);
  const evenArray = [...Array(5).keys()].map((i) => i * 2 + 2);
  const [selectedAnswer, setSelectedAnswer] = useState(Array(11).fill(null));
  const [className, setClassName] = useState(Array(11).fill("answer"));
  const [answerArray, setAnswerArray] = useState(Array(11).fill(null));
  const [realAnswers, setRealAnswers] = useState([
    null,
    2,
    1,
    3,
    0,
    3,
    3,
    3,
    0,
    4,
    4,
  ]);
  const [correctAnswers, setCorrectAnswer] = useState([]);

  const { logout } = useLogout();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let logoutTimer;

    const handleWindowBlur = () => {
      logoutTimer = setTimeout(() => {
        logout();
      }, 5000);
    };

    const handleWindowFocus = () => {
      clearTimeout(logoutTimer);
      setShowWarning(false);
    };

    const handleNewPageOpen = () => {
      clearTimeout(logoutTimer);
      setShowWarning(true);
    };

    window.onblur = handleWindowBlur;
    window.onfocus = handleWindowFocus;
    window.addEventListener('beforeunload', handleNewPageOpen);

    return () => {
      clearTimeout(logoutTimer);
      window.onblur = null;
      window.onfocus = null;
      window.removeEventListener('beforeunload', handleNewPageOpen);
    };
  }, []);

  const oddElements = questions
    ? questions.filter((item, index) => index % 2 === 0)
    : null;
  const evenElements = questions
    ? questions.filter((item, index) => index % 2 !== 0)
    : null;

  const handleClickAnswerOdd = (choice, index, answer) => {
    const newAnswer = [...selectedAnswer];
    newAnswer[index * 2 + 1] = choice;
    setSelectedAnswer(newAnswer);
    const newArray = [...answerArray];
    newArray[index * 2 + 1] = answer;
    setAnswerArray(newArray);
    const newClass = [...className];
    newClass[index * 2 + 1] = "answer active";
    setClassName(newClass);
  };
  const handleClickAnswerEven = (choice, index, answer) => {
    const newAnswer = [...selectedAnswer];
    newAnswer[(index + 1) * 2] = choice;
    setSelectedAnswer(newAnswer);
    const newArray = [...answerArray];
    newArray[(index + 1) * 2] = answer;
    setAnswerArray(newArray);
    const newClass = [...className];
    newClass[(index + 1) * 2] = "answer active";
    setClassName(newClass);
  };
  useEffect(() => {
    const correctAnswers = [];

    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i] === realAnswers[i]) {
        correctAnswers.push(true);
      } else {
        correctAnswers.push(false);
      }
    }
    setCorrectAnswer(correctAnswers);
  }, [answerArray]);


  const [canvasOpenleft, setCanvasOpenleft] = useState(false);
  const [selectedCanvasleft, setSelectedCanvasleft] = useState(null);
  const canvasHandleleft = (index) => {
    setCanvasOpenleft(!canvasOpenleft);
    setSelectedCanvasleft(index);
  };

  const [canvasOpenright, setCanvasOpenright] = useState(false);
  const [selectedCanvasright, setSelectedCanvasright] = useState(null);
  const canvasHandleright = (index) => {
    setCanvasOpenright(!canvasOpenright);
    setSelectedCanvasright(index);
  };

  return (
    <>
      <div className="testpart" id="testpart">
        {!canvasOpenright && <div className={canvasOpenleft ? "open" : "leftcontainer"}>
          {oddElements?.map((item, ind) => (
            <div className="leftsorucanvas">
              <div className="sorupartleft">
                <div className="sorucardleft">
                  <h1>{oddArray[ind]}</h1>
                  <p className="sorutext">{item?.question}</p>
                  {item?.answers.map((choice, index) => (
                    <div
                      key={index}
                      className={
                        selectedAnswer[ind * 2 + 1] === choice
                          ? className[ind * 2 + 1]
                          : "answer"
                      }
                      onClick={() => handleClickAnswerOdd(choice, ind, index)}
                    >
                      {choice}
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => canvasHandleleft(ind)}
                  className="canvasopen-btnleft"
                >
		            <div class="circle-outer">
		              <div class="circle-inner"></div>
                  <div className="middlebutton">
                    <p className="minutes">{minutes}</p>
                    <div className="timelineleft"></div>
                    <p className="second">{second}</p>
                  </div>
		            </div>
              </div>
              </div>
              {canvasOpenleft && selectedCanvasleft === ind && (
                <Canvas
                  className="canvasarea"
                  canvasHandle={canvasHandleleft}
                />
              )}
            </div>
          ))}
        </div>}
        {!canvasOpenleft && <div className={canvasOpenright ? "open" : "rightcontainer"}>
          {evenElements?.map((item, ind) => (
            <div className="rightsorucanvas">
              {canvasOpenright && selectedCanvasright === ind && (
                <Canvas
                  className="canvasarea"
                  canvasHandle={canvasHandleright}
                />
              )}
              <div className="sorupartright">
                <div className="sorucardright">
                  <h1>{evenArray[ind]}</h1>
                  <p className="sorutext">{item?.question}</p>
                  {item?.answers.map((choice, index) => (
                    <div
                      key={index}
                      className={
                        selectedAnswer[(ind + 1) * 2] === choice
                          ? className[(ind + 1) * 2]
                          : "answer"
                      }
                      onClick={() => handleClickAnswerEven(choice, ind, index)}
                    >
                      {choice}
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => canvasHandleright(ind)}
                  className="canvasopen-btnright"
                >
                  <div class="circle-outer">
		              <div class="circle-inner"></div>
		            </div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
}
