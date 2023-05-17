import React, { useEffect, useState } from "react";

function SoruCardIskambil({
  questionNumber,
  setQuestionNumber,
  checked,
  setChecked,
  nextQuestion,
  setNextQuestion,
  setSelectedControl,
  setNextQuestionControl,
  setDisabled,
  questions
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const handleClickAnswer = (choice) => {
    setSelectedAnswer(choice);
    setClassName("answer active");
    setSelectedControl(true);
  };

  useEffect(() => {
    setQuestion(questions[questionNumber - 1]);
    setNextQuestion(false);
  }, [questionNumber]);

  useEffect(() => {
    if (checked && className === "answer active") {
      if (selectedAnswer === question.answers[question.answer]) {
        setClassName("answer correct");
        setSelectedControl(false);
        setNextQuestionControl(true);
        setDisabled(false)
      } else {
        setClassName("answer wrong");
        setSelectedControl(false);
        setNextQuestionControl(true);
        setDisabled(true)
      }
    }
  }, [checked]);
  useEffect(() => {
    if (nextQuestion && checked) {
      setQuestionNumber((prevquestionnumber) => prevquestionnumber + 1);
      setChecked(false);
      setNextQuestionControl(false);
    }
  }, [nextQuestion]);
  return (
    <div className="sorucard">
      <h1>{questionNumber}</h1>
      <p className="sorutext">{question?.question}</p>
      {question?.answers.map((choice,index) => (
        <div
          key={index}
          className={selectedAnswer === choice ? className : "answer"}
          onClick={() => !checked && handleClickAnswer(choice)}
        >
          {choice}
        </div>
      ))}
    </div>
  );
}

export default SoruCardIskambil;
