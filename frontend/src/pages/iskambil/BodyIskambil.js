import React, { useEffect, useState } from "react";
import "./BodyIskambil.css";
import zincir from "./zincir.svg";
import anahtar from "./anahtar.svg";
import wasd from "./wasd.svg";
import puzzleCizgi from "./puzzlecizgi.svg";
import puzzleKesik from "./puzzlekesik.svg";
import puzzleDamla from "./puzzledamla.svg";
import SingleCard from "./SingleCard";
import SoruCardIskambil from "./SoruCardIskambil";

function BodyIskambil() {

  const cardImages = [
    { src: zincir, matched: false },
    { src: puzzleCizgi, matched: false },
    { src: puzzleDamla, matched: false },
    { src: puzzleKesik, matched: false },
    { src: wasd, matched: false },
    { src: anahtar, matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [checked, setChecked] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [selectedControl, setSelectedControl] = useState(false)
  const [nextQuestionControl, setNextQuestionControl] = useState(false)
  const [newGame, setNewGame] = useState(false);
  const [moveButtonText, setMoveButtonText] = useState("New Game");

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setchoiceOne(null);
    setchoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setQuestionNumber(1);
  };

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
 
  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };

  const NewGame = () => {
    setNewGame(true);
    setMoveButtonText("Bitir");
  };
  const EndGame = () => {
    setNewGame(false);
    setMoveButtonText("Başlat");
    setchoiceOne(null)
    setchoiceTwo(null)
    setQuestionNumber(1);
    setNextQuestionControl(false)
    setChecked(false)
    setNextQuestion(false)
  };

  const checkQuestionHandler = () => {
    setChecked(true)
  }

  const nextQuestionHandler = () => {
    setNextQuestion(true)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, mathced: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(true);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="bodyiskambil">
      <div className="iskambilleft">
        <div className="iskambilsoru">
          {newGame && <SoruCardIskambil
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            checked={checked}
            setChecked={setChecked}
            nextQuestion = {nextQuestion}
            setNextQuestion = {setNextQuestion}
            selectedControl = {selectedControl}
            setSelectedControl = {setSelectedControl}
            nextQuestionControl = {nextQuestionControl}
            setNextQuestionControl = {setNextQuestionControl}
            setDisabled = {setDisabled}
            questions={questions}
          />}
        </div>
        <div className="iskambilzorluk">
          <button className="zorluk-btn" onClick={nextQuestionControl ? nextQuestionHandler : undefined}>Sonraki Soru</button>
          <button className="zorluk-btn" onClick={!newGame ? NewGame : EndGame}>
              {moveButtonText}
          </button>
          <button className="zorluk-btn" onClick={selectedControl ? checkQuestionHandler : undefined}>
            Kontrol et
          </button>
          <button className="zorluk-btn">Konu Değiştir</button>
        </div>
      </div>
      <div className="iskambilright">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.mathced}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default BodyIskambil;
