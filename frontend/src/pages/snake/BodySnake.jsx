import React, { useEffect, useRef, useState } from "react";
import './BodySnake.css'
import SoruCardSnake from "./SoruCardSnake";
import SnakeArena from "./SnakeArena";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constant";

export default function BodySnake() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [checked, setChecked] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [selectedControl, setSelectedControl] = useState(false);
  const [nextQuestionControl, setNextQuestionControl] = useState(false);
  const [isSnakeTrue, setisSnakeTrue] = useState(false);
  const [correctnumber, setCorrectNumber] = useState(0);
  const [combo, setCombo] = useState(0)
  const [moveButtonText,setMoveButtonText] = useState("New Game");
  const [newGame, setNewGame] = useState(false)
  const [isGameStopped, setisGameStopped] = useState(true)
  const [isAppleTaken, setisAppleTaken] = useState(false)


  const [snake, setSnake] =useState(SNAKE_START);
  const [apple, setApple] =useState(APPLE_START);
  const [dir, setDir] =useState([0, -0.5]);
  const [speed, setSpeed] =useState(null);
  const [gameOver, setGameOver] =useState(false);
  const [currentDirection, setCurrentDirection] =useState("up");
  const canvasRef = useRef();

  // fetching questions from backend
  const [questions, setQuestions] = useState(null)
  useEffect(()=>{
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions")
      const json = await response.json()

      if(response.ok){
        setQuestions(json)
      }
    }

    fetchQuestions()
  }, [questions])

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -0.5]);
    setGameOver(false);
  };
  const startGamePopup = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -0.5]);
    setGameOver(false);
    setQuestionNumber(1)
    setCombo(0)
    setCorrectNumber(0)
    setMoveButtonText("Başlat")
  };
  const NewGame = () => {
    setNewGame(true)
    setMoveButtonText("Başlat")
  };

  const stopGame = () => {
    setSpeed(null);
    setMoveButtonText("Başlat")
    setisGameStopped(true)
  };
  const continueGame = () => {
    setSpeed(300);
    setMoveButtonText("Durdur")
    setisGameStopped(false)
  };
  
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    setMoveButtonText("New Game")
  };
  const moveSnake = (event) => {
    const { keyCode } = event;
    if(keyCode === 37 && currentDirection !== "right"){
        setCurrentDirection("left");
        event.preventDefault();
        setDir(DIRECTIONS[keyCode]);
    }else if(keyCode === 38 && currentDirection !== "down"){
        setCurrentDirection("up");
        event.preventDefault();
        setDir(DIRECTIONS[keyCode]);
    }else if(keyCode === 39 && currentDirection !== "left"){
        setCurrentDirection("right");
        event.preventDefault();
        setDir(DIRECTIONS[keyCode]);
    }else if(keyCode === 40 && currentDirection !== "up"){
        setCurrentDirection("down");
        event.preventDefault();
        setDir(DIRECTIONS[keyCode]);
    }
}
  const createApple = () => {
    return apple.map((_,i)=> Math.floor(Math.random()*(CANVAS_SIZE[i]/SCALE)));
  };
  const checkCollision = (piece, snk = snake) => {
    if (piece[0]*SCALE > CANVAS_SIZE[0] || piece[0] < 0 || piece[1]*SCALE > CANVAS_SIZE[1] || piece[1] < 0){
        return true;
    }
    for (const segment of snk){
        if(piece[0] === segment[0] && piece[1] === segment[1]){
            return true;
        }
    }
    return false;
  };
  const checkAppleCollision = (newSnake) => {
    if(newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]){
        let newApple = createApple();
        while(checkCollision(newApple,newSnake)){
            newApple = createApple();
        }
        setApple(newApple);
        stopGame();
        setNextQuestionControl(true);
        setisSnakeTrue(false)
        setisAppleTaken(true)
        setCorrectNumber((prevcount) => prevcount + 1)
          setCombo((prevcount) => prevcount + 1)
        return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy =JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if(checkCollision(newSnakeHead)) endGame();
    if(!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE,0, 0, SCALE,0,0);
    context.clearRect(0, 0 ,CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = "gray";
    snake.forEach(([x, y]) => context.fillRect(x,y,0.4,0.4));
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1],0.3, 0.3)
  }, [snake, apple, gameOver]);

  useInterval(() => gameLoop(),speed);
  
  const checkQuestionHandler = () => {
    setChecked(true);
  };

  const nextQuestionHandler = () => {
    setNextQuestion(true);
  };
  return (
    <>
      <div className="bodysnake">
        <div className="snakearena" role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
            <SnakeArena 
            canvasRef = {canvasRef}
            gameOver = {gameOver}
            correctnumber = {correctnumber}
            combo = {combo}
            startGamePopup = {startGamePopup}
            />
        </div>
        <div className="snakesoru">
          <div className="snakesorutop">
            {newGame && <SoruCardSnake
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
              setisSnakeTrue={setisSnakeTrue}
              setCorrectNumber={setCorrectNumber}
              setCombo = {setCombo}
              questions = {questions}
            />}
          </div>
          <div className="snakesorubottom">
            <button
              className="zorluk-btn"
              onClick={nextQuestionControl ? nextQuestionHandler : undefined}
            >
              Sonraki Soru
            </button>
            <button className="zorluk-btn"
            onClick={isSnakeTrue && isGameStopped ? continueGame : gameOver ? startGame : !isGameStopped && !isAppleTaken ? stopGame :  !newGame ? NewGame : stopGame}>
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
