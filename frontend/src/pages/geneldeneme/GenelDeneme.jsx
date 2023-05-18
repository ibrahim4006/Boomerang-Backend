import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/top-header/Header";
import Hero from "../../components/hero/Hero";
import LessonPart from "./LessonPart";
import TestPartGenelDeneme from "./TestPartGenelDeneme";
import { getDocs, collection, doc } from "firebase/firestore";
import firestore from "../../FireBaseConfig";


export default function GenelDeneme() {
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [activeLesson, setActiveLesson] = useState("Türkçe")
  // timer
  const [minutes, setMinutes] = useState("10");
  const [second, setSecond] = useState("00");

  const [countDown, setCountdown] = useState(600);
  const timerId = useRef();

  useEffect(() => {
    console.log(activeLesson)
    if (isTimerOn) {
      return;
    }
    timerId.current = setInterval(() => {
    setCountdown((prev) => prev - 1);
    }, 1000);
    },[])  

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
  // fetching questions from backend
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const colRef = collection(
      firestore,
      "TYTGenelDeneme",
      "fTfjcpNHUvq5yXxt3vMy",
      "TYT Genel Deneme 1",
      "34dp2ZqOo6Sd5evTQeB2",
      `${activeLesson}`
    );

    getDocs(colRef)
      .then((snapshot) => {
        let fetchedQuestions = [];
        snapshot.docs.forEach((doc) => {
          fetchedQuestions.push({ ...doc.data(), id: doc.id });
        });
        setQuestions(fetchedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions: ", error);
      });
  }, [activeLesson]);

  return (
    <>
      <Header />
      <Hero pageSubject="TYT/Deneme-2" barTitle={[]} />
      <LessonPart setActiveLesson={setActiveLesson}/>
      <TestPartGenelDeneme questions={questions} minutes={minutes} second={second}/>
    </>
  );
}
