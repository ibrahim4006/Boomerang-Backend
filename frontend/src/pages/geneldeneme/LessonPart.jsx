import React from 'react'
import ClassLesson from './ClassLesson';

export default function LessonPart() {
    const konular = [
        "Türkçe",
        "Tarih",
        "Coğrafya",
        "Felsefe",
        "Din Kültürü ve Ahlak Bilgisi",
        "Matematik",
        "Fizik",
        "Kimya",
        "Biyoloji",
      ];
  return (
    <>
      {konular.map((konu,ind) => 
          <ClassLesson 
          key={ind}
          lesson={konu}/>
        )}
    </>
  )
}
