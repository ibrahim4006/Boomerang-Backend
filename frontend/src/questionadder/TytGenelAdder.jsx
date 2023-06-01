import React, { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import firestore from "../FireBaseConfig";
import {getStorage, ref, uploadBytes} from "firebase/storage"
import { v4 as uuid } from 'uuid';


export default function TytGenelAdder() {
  const [lesson, setLesson] = useState("");
  const [denemeNumber, setDenemeNumber] = useState("");
  const [questionTextTop, setQuestionTextTop] = useState("");
  const [questionTextBottom, setQuestionTextBottom] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [choiceE, setChoiceE] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const storageRef = getStorage();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
  };

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

    const imagePath = `${imageUpload.name + uuid()}`;

    const imageRef = ref(storageRef, `Tytimages/${imagePath}`);
  uploadBytes(imageRef, imageUpload)
    .then(() => {
      // Image uploaded successfully
      
      addDoc(colRef, {
        questionTop: questionTextTop,
        questionBottom: questionTextBottom,
        image: imagePath,
        answers: [choiceA, choiceB, choiceC, choiceD, choiceE],
        answer: correctAnswer,
      })
        .then(() => {
          // Question added successfully
          setLesson("");
          setDenemeNumber("");
          setImageUpload(null);
          setQuestionTextTop("");
          setQuestionTextBottom("");
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
    })
    .catch((error) => {
      console.error("Error uploading image: ", error);
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
          id="questionTop"
          name="questionTextTop"
          onChange={(e) => setQuestionTextTop(e.target.value)}
          value={questionTextTop}
          type="text"
          placeholder="Write question text top"
        />
        <input
          id="photo"
          name="questionPhoto"
          onChange={handleImageUpload}
          type="file"
          placeholder="Upload image if exist"
        />
        <input
          id="questionBottom"
          name="questionTextBottom"
          onChange={(e) => setQuestionTextBottom(e.target.value)}
          value={questionTextBottom}
          type="text"
          placeholder="Write question text bottom"
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
