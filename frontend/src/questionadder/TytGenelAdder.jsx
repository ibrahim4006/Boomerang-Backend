import React, { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import firestore from "../FireBaseConfig";

export default function TytGenelAdder() {
  const [lesson, setLesson] = useState("");
  const [denemeNumber, setDenemeNumber] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [choiceE, setChoiceE] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const parentCollectionRef = collection(firestore, "TYTGenelDeneme");
    const parentDocRef = doc(parentCollectionRef, "fTfjcpNHUvq5yXxt3vMy");
    const nestedCollectionRef = collection(
      parentDocRef,
      `TYT Genel Deneme ${denemeNumber}`,
    );
    const nestedDocRef = doc(nestedCollectionRef,"34dp2ZqOo6Sd5evTQeB2");
    const colRef = collection(nestedDocRef, `${lesson}`)

    addDoc(colRef , {
      question: questionText,
      answers: [choiceA, choiceB, choiceC, choiceD, choiceE],
      answer: correctAnswer,
    })
      .then(() => {
        setLesson("");
        setDenemeNumber("");
        setQuestionText("");
        setChoiceA("");
        setChoiceB("");
        setChoiceC("");
        setChoiceD("");
        setChoiceE("");
        setCorrectAnswer("");
      })
      .catch((error) => {
        console.error("Error adding question: ", error);
      });
  };
  return (
    <>
      <form className="addquestion" onSubmit={handleSubmit}>
      <input
          id="denemenumber"
          name="denemenumber"
          onChange={(e) => setDenemeNumber(e.target.value)}
          value={denemeNumber}
          type="number"
          placeholder="Deneme Sayısını gir"
        />
        <input
          id="lesson"
          name="lesson"
          onChange={(e) => setLesson(e.target.value)}
          value={lesson}
          type="text"
          placeholder="Write lesson name"
        />
        <input
          id="question"
          name="questionText"
          onChange={(e) => setQuestionText(e.target.value)}
          value={questionText}
          type="text"
          placeholder="Write question text"
        />
        <input
          id="choiceA"
          name="choiceA"
          onChange={(e) => setChoiceA(e.target.value)}
          value={choiceA}
          type="text"
          placeholder="Choice A"
        />
        <input
          id="choiceB"
          name="choiceB"
          onChange={(e) => setChoiceB(e.target.value)}
          value={choiceB}
          type="text"
          placeholder="Choice B"
        />
        <input
          id="choiceC"
          name="choiceC"
          onChange={(e) => setChoiceC(e.target.value)}
          value={choiceC}
          type="text"
          placeholder="Choice C"
        />
        <input
          id="choiceD"
          name="choiceD"
          onChange={(e) => setChoiceD(e.target.value)}
          value={choiceD}
          type="text"
          placeholder="Choice D"
        />
        <input
          id="choiceE"
          name="choiceE"
          onChange={(e) => setChoiceE(e.target.value)}
          value={choiceE}
          type="text"
          placeholder="Choice E"
        />
        <input
          id="correctAnswer"
          name="correctindex"
          onChange={(e) => setCorrectAnswer(e.target.value)}
          value={correctAnswer}
          type="number"
          placeholder="Enter correct index"
        />
        <button type="submit">Add question</button>
      </form>
    </>
  );
}
