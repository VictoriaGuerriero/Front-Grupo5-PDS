
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

interface Student {
    id: number;
    username: string;
    email: string;
    xp: number;
    level: number;
    correctly_answered_questions: [];
    incorrectly_answered_questions: [];
    questions_pased: [];
    used_combinations: [];
    task_count: number;
}

const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/students/'

function GetStudentInfo() {
  const [studentInfo, setStudentInfo] = useState<Student | undefined>();
  const { studentId } = useParams();

  useEffect (() => {
    fetch(STUDENT_ENDPOINT+studentId+'/')
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        setStudentInfo(data)
      })
    .catch((err) => {
        console.log(err.message)
    })
}, [studentId])

const xp = studentInfo?.xp ?? 0;
const level = studentInfo?.level ?? 1;

  return (
    <div>
      {/* <NavBar xp={xp} level={level} /> */}
    </div>
  );
}

export default GetStudentInfo;
