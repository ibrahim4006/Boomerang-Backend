import React, { useEffect, useState, useRef } from "react";
import "./ClassLesson.css";
import LessonProgressCard from "./LessonProgressCard";
import BoomerangOk from "./boomerangok.svg";

function ClassLesson({
  lesson,
  setActiveLesson,
  studentAnswer,
  activeLesson,
  data,
  setStudentAnswer,
}) {
  const [showLessonDetail, setShowLessonDetail] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [lessonTimeTaken, setLessonTimeTaken] = useState({});
  const isMounted = useRef(false); // Flag to track component mount state

  const startTimer = () => {
    setStartTime(performance.now());
  };

  const stopTimer = () => {
    if (startTime) {
      const currentTime = performance.now();
      const newTimeTaken = currentTime - startTime;
      setTimeTaken(newTimeTaken);
      setLessonTimeTaken((prevLessonTimeTaken) => {
        const newLessonTimeTaken = { ...prevLessonTimeTaken };
        if (!newLessonTimeTaken[currentLesson]) {
          newLessonTimeTaken[currentLesson] = [newTimeTaken];
        } else {
          newLessonTimeTaken[currentLesson][0] += newTimeTaken;
        }
        return newLessonTimeTaken;
      });
      setStartTime(null); // Reset the start time after stopping the timer
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      stopTimer(); // Stop the timer when activeLesson changes
      startTimer(); // Start the timer for the new activeLesson
      setCurrentLesson(activeLesson)
    } else {
      isMounted.current = true; // Set the flag to true after initial run
    }
  }, [activeLesson]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleClickLesson = (lesson) => {
    stopTimer(); // Stop the timer when a new lesson is clicked
    setStartTime(performance.now()); // Start the timer for the new lesson
    setShowLessonDetail(!showLessonDetail);
    setActiveLesson(lesson);
  };

  return (
    <div className="classlesson" onClick={() => handleClickLesson(lesson)}>
      <h1>{lesson}</h1>
      {showLessonDetail && activeLesson === lesson && (
        <div className="lessonprogresscard">
          <LessonProgressCard
            title="Soru Sayısı"
            relatednumber={data[lesson] && data[lesson].length}
          />
          <LessonProgressCard
            title="Kalan Soru"
            relatednumber={
              (studentAnswer[lesson] &&
              data[lesson]) ?
              data[lesson].length - studentAnswer[lesson].length : data[lesson].length
            }
          />
          <LessonProgressCard
            title="Geçen Süre"
            relatednumber={
              lessonTimeTaken[activeLesson] &&
              formatTime(lessonTimeTaken[activeLesson][0] / 1000) // Convert milliseconds to seconds
            }
          />
          {showLessonDetail && (
            <a href="#testpart" className="denemepart">
              <img
                src={BoomerangOk}    
                className="boomerang-icn"
                alt="Boomerang Ok"
              />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default ClassLesson;

