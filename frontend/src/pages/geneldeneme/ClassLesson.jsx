import { useState } from "react";
import "./ClassLesson.css";
import LessonProgressCard from "./LessonProgressCard";
import BoomerangOk from "./boomerangok.svg"

function ClassLesson({ lesson }) {
  const [showLessonDetail, setshowLessonDetail] = useState(false);

  const handleClickLesson = () => {
    setshowLessonDetail(!showLessonDetail);
  }
  return (
    <div className="classlesson"  onClick={handleClickLesson}>
      <h1>{lesson}</h1>
      {showLessonDetail && (
        <div className="lessonprogresscard">
          <LessonProgressCard />
          <LessonProgressCard />
          <LessonProgressCard />
          {showLessonDetail && (<a href="#testpart" className="denemepart"><img src={BoomerangOk} className="boomerang-icn"/></a>)}
        </div>
      )}
    </div>
  );
}

export default ClassLesson;
