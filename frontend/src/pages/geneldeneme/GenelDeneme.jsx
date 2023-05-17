import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/top-header/Header";
import Hero from "../../components/hero/Hero";
import LessonPart from "./LessonPart";
import TestPartGenelDeneme from "./TestPartGenelDeneme";


export default function GenelDeneme() {
  const [isTimerOn, setIsTimerOn] = useState(false)
  // timer
  const [minutes, setMinutes] = useState("10");
  const [second, setSecond] = useState("00");

  const [countDown, setCountdown] = useState(600);
  const timerId = useRef();

  useEffect(() => {
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
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions");
      const json = await response.json();

      if (response.ok) {
        setQuestions(json);
      }
    };
    fetchQuestions();
  }, []);
  return (
    <>
      <Header />
      <Hero pageSubject="TYT/Deneme-2" barTitle={[]} />
      <LessonPart />
      <TestPartGenelDeneme questions={questions} minutes={minutes} second={second}/>
    </>
  );
}
