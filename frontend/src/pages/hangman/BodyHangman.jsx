import React, { useEffect, useState } from "react";
import "./BodyHangman.css";
import HangmanArena from "./HangmanArena";
import SoruCardHangman from "./SoruCardHangman";

export default function BodyHangman() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [checked, setChecked] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [selectedControl, setSelectedControl] = useState(false);
  const [nextQuestionControl, setNextQuestionControl] = useState(false);
  const [isHangTrue, setisHangTrue] = useState(false);
  const [errorCount, seterrorCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [boxArray, setBoxArray] = useState(Array(11).fill(false));
  const [newGame, setNewGame] = useState(false);
  const [moveButtonText, setMoveButtonText] = useState("New Game");

  // fetching questions from backend
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions");
      const json = await response.json();
      if (response.ok) {
        setQuestions(json);
      }
    };

    fetchQuestions();
  }, [questions]);

  const NewGame = () => {
    setNewGame(true);
    setMoveButtonText("Bitir");
  };
  const EndGame = () => {
    setNewGame(false);
    setMoveButtonText("Başlat");
    setUpdateCount(0);
    setQuestionNumber(1);
    setisHangTrue(false)
    setBoxArray(Array(11).fill(false));
    setNextQuestionControl(false)
    setChecked(false)
    setNextQuestion(false)
    seterrorCount(0)
  };

  const checkQuestionHandler = () => {
    setChecked(true);
  };

  const nextQuestionHandler = () => {
    setNextQuestion(true);
  };
  return (
    <>
      <div className="bodyhangman">
        <div className="hangmanarena">
          <HangmanArena
            isHangTrue={isHangTrue}
            updateCount={updateCount}
            errorCount={errorCount}
            boxArray={boxArray}
            setBoxArray={setBoxArray}
          />
        </div>
        <div className="hangmansoru">
          <div className="hangmansorutop">
            {newGame && (
              <SoruCardHangman
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                checked={checked}
                setChecked={setChecked}
                nextQuestion={nextQuestion}
                setNextQuestion={setNextQuestion}
                selectedControl={selectedControl}
                setSelectedControl={setSelectedControl}
                nextQuestionControl={nextQuestionControl}
                setNextQuestionControl={setNextQuestionControl}
                setisHangTrue={setisHangTrue}
                seterrorCount={seterrorCount}
                setUpdateCount={setUpdateCount}
                questions={questions}
              />
            )}
          </div>
          <div className="hangmansorubottom">
            <button
              className="zorluk-btn"
              onClick={nextQuestionControl ? nextQuestionHandler : undefined}
            >
              Sonraki Soru
            </button>
            <button className="zorluk-btn" onClick={!newGame ? NewGame : EndGame}>
              {moveButtonText}
            </button>
            <button
              className="zorluk-btn"
              onClick={selectedControl ? checkQuestionHandler : undefined}
            >
              Kontrol et
            </button>
            <button className="zorluk-btn">Konu Değiştir</button>
          </div>
        </div>
      </div>
    </>
  );
}
