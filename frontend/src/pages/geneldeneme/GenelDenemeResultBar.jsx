import React from "react";
import "./TestPartGenelDeneme.css";

function GenelDenemeResultBar({ studentAnswer, activeLesson, lengthofArray }) {
  return (
    <div className="line-result">
      {/* {studentAnswer[activeLesson] &&
        studentAnswer[activeLesson].map((choice, ind) => {
          <div className="circle-outer-result">
            <div className="circle-inner-result"></div>
          </div>;
        })} */}
      {lengthofArray &&
        Array.from({ length: lengthofArray }, (_, index) => (
          <a href={`#question-${index + 1}`} key={index}>
            <div
              className={
                studentAnswer[activeLesson] &&
                (studentAnswer[activeLesson][index] ||
                  studentAnswer[activeLesson][index] === 0)
                  ? "circle-outer-result black-circle"
                  : "circle-outer-result"
              }
              key={index}
            >
              <div className="circle-inner-result"></div>
              <h1 className="circle-question-number">
                <b>{index + 1}</b>
              </h1>
            </div>
          </a>
        ))}
    </div>
  );
}

export default GenelDenemeResultBar;
