import React, { useEffect, useRef, useState } from "react";
import "./BodyIstila.css";
import ResultBarIstila from "./ResultBarIstila";
import SoruCardIstila from "./SoruCardIstila";
import ProfilCard from "./ProfilCard";
import Sohbet from "./Sohbet";
import { Link } from "react-router-dom";

function BodyIstila() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [checked, setChecked] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [selectedControl, setSelectedControl] = useState(false);
  const [nextQuestionControl, setNextQuestionControl] = useState(false);
  const [isBlack, setIsBlack] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [moveButtonText, setMoveButtonText] = useState("New Game");
  const [boxArray, setBoxArray] = useState(Array(11).fill(false));
  const [isTimerOn, setIsTimerOn] = useState(false)

  // // connection of chat server

  // const [isConnected, setIsConnected] = useState(socket.connected)
  // const [fooEvents, setFooEvents] = useState([])

  // useEffect(() => {
  //   function onConnect(){
  //     setIsConnected(true)
  //   }
  
  //   function onDisconnect(){
  //     setIsConnected(false)
  //   }

  //   function onFooEvent(value){
  //     setFooEvents(previous => [...previous, value])
  //   }

  //   socket.on("connect", onConnect)
  //   socket.on("disconnect", onDisconnect)
  //   socket.on("foo", onFooEvent)

  //   return () => {
  //   socket.off("connect", onConnect)
  //   socket.off("disconnect", onDisconnect)
  //   socket.off("foo", onFooEvent)
  //   }
  // }, [])

  
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
  }, []);
  
  // timer
  const [minutes, setMinutes] = useState("10");
  const [second, setSecond] = useState("00");

  const [countDown, setCountdown] = useState(600);
  const timerId = useRef();

  const startTimer = () => {
    if (isTimerOn) {
      return;
    }
    setIsTimerOn(true) 
    timerId.current = setInterval(() => {
    setCountdown((prev) => prev - 1);
    }, 1000);
    }  

  useEffect(() => {
    setSecond(countDown < 10 ? "0" + countDown : countDown % 60);
    setMinutes(
      countDown < 60
        ? "00"
        : countDown < 600
        ? "0" + Math.floor(countDown / 60)
        : Math.floor(countDown / 60)
    );
    if (countDown <= 0) {
      clearInterval(timerId.current);
      setIsTimerOn(false)
      alert("end");
    }
  }, [countDown]);

  const NewGame = () => {
    if (!isTimerOn) {
      startTimer();
    }
    setNewGame(true);
    setMoveButtonText("Mücedeleden Çekil");
  };

  const endGame = () => {
    setNewGame(false);
    setMoveButtonText("New Game");
    setBoxArray(Array(11).fill(false));
    setChecked(false);
    setQuestionNumber(1);
    setIsBlack(false);
    setUpdateCount(0);
    setIsTimerOn(false)
    clearInterval(timerId.current)
    setCountdown(600)
    
  };

  const checkQuestionHandler = () => {
    setChecked(true);
  };

  const nextQuestionHandler = () => {
    setNextQuestion(true);
  };
  const handleLeaveChat = () => {
    console.log("Leaved the chat")
  }
  return (
    <>
      <div className="bodyistila">
        <div className="istilasoru">
          <div className="istilasorutop">
            <ResultBarIstila
              updateCount={updateCount}
              isBlack={isBlack}
              boxArray={boxArray}
              setBoxArray={setBoxArray}
              newGame={newGame}
              minutes = {minutes}
              second = {second}
            />
            {newGame && (
              <SoruCardIstila
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
                setIsBlack={setIsBlack}
                setUpdateCount={setUpdateCount}
                questions={questions}
              />
            )}
          </div>
          <div className="istilasorubottom">
            <button
              className="zorluk-btn"
              onClick={nextQuestionControl ? nextQuestionHandler : undefined}
            >
              Sonraki Soru
            </button>
            <button
              className="zorluk-btn"
              onClick={!newGame ? NewGame : endGame}
            >
              {moveButtonText}
            </button>
            <button
              className="zorluk-btn"
              onClick={selectedControl ? checkQuestionHandler : undefined}
            >
              Kontrol et
            </button>
            <Link to={!newGame && "/istila#sohbetsection" }>
            <button className="zorluk-btn">Sohbete Başla</button>
            </Link>
            <button className="zorluk-btn" onClick={handleLeaveChat}>Sohbete Bitir</button>
          </div>
        </div>
        <div className="istilasohbet" id="sohbetsection">
          <ProfilCard />
          <Sohbet />
          <ProfilCard />
        </div>
      </div>
    </>
  );
}

export default BodyIstila;
