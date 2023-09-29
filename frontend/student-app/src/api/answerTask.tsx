import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import AnswerAQ from './answerAQ';
import GetNumeric from './getNumeric';

interface Task {
    id: number;
    questions: [];
    name: String;
    student: number; //student id fk
    description: String;
    type_task: String;
    state: String;
    xp_in_task: number;
    difficulty: String;
    wrong_answer: [];
}

// interface Student {
//     id: number;
//     username: String;
//     email: String;
//     xp: number;
//     level: number;
//     correctly_answered_questions: [];
//     incorrectly_answered_questions: [];
//     questions_pased: [];
//     used_combinations: [];
//     task_count: number;
// }

interface Question {
    id: number;
    question: string;
    type_question: string;
    type_subject: string;
    difficulty: string;
    hint: string;
}

// interface Alternative {
//     id: number;
//     alternative_question: number; //question id fk
//     answer: String;
//     is_correct: Boolean;
// }

// interface AlternativeQuestion {
//     id: number;
//     question: number; //question id fk
//     alternatives: [];
// }

const TASK_ENDPOINT =  'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/'
const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/'
const ALTERNATIVEQUESTION_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternativequestion/'


function AnswerTask(){
  const [task, setTask] = useState<Task | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  // const [student, setStudent] = useState<Student | null>(null);
  // const [alternativeQuestion, setAlternativeQuestion] = useState<AlternativeQuestion[]>([]);
  const { studentId } = useParams();
  const { taskId } = useParams();

  // Fetch task and student data
  // const getStudent = useCallback(() => {
  //   fetch(STUDENT_ENDPOINT + studentId + '/', {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       setStudent(data);
  //     })
  //     .catch((error) => {
  //       console.error('Fetch error:', error);
  //     });
  // }, [studentId]);

  const getTask = useCallback(() => {
    fetch(`${TASK_ENDPOINT}${taskId}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTask(data);
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [taskId]);

  // Fetch alternative questions data
  // const getAlternativeQ = useCallback(() => {
  //   fetch(ALTERNATIVEQUESTION_ENDPOINT, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('alternative questions', data);
  //       setAlternativeQuestion(data);
  //     })
  //     .catch((error) => {
  //       console.error(error.message);
  //     });

  // }, [])

  // useEffect(() => {
  //   getAlternativeQ();
  // }, [getAlternativeQ]);

  useEffect(() => {
    getTask();
  }, [getTask]);

  // useEffect(() => {
  //   getStudent();
  // }, [getStudent]);
    



  const taskIdToInt = parseInt(taskId!);
  const studentIdToInt = parseInt(studentId!);

    return (
      <div >
      <nav className="bg-darkBlue-500 p-4 mb-4 sticky top-0 z-10">
        {/* Navbar-like styling */}
        <h1 className="text-2xl text-white"> {task?.description}</h1>
        <h2 className="text-2xl text-white text-center mb-4">{task?.name}</h2>
        <div className="mr-2 ml-2 mb-4 border-b border-gray-300"></div>
        {task && task.type_task === 'AQ' ? ( 
         <h5 className="text-lg text-white mb-2">{'Tipo: Alternativas'}</h5>
         ): (
          <h5 className="text-lg text-white">{'Tipo: Numerico'}</h5>
         )}
        {task ? (
            <h6 className="text-lg text-white">
              {task.difficulty === 'Easy' ? 'Fácil' : task.difficulty === 'Medium' ? 'Intermedio' : 'Difícil'}
            </h6>
          ) : null}
      </nav>
      <div style={{
        borderRadius: '10px',
        padding: '20px',
        margin: '20px', // Add margin to create space
      }}>
        <ul>
          {(task && task.type_task === 'AQ' && questions.length > 0 && (
            <AnswerAQ questions={questions} taskId={taskIdToInt} studentId={studentIdToInt} />
          ))}

          {(task && task.type_task === 'N' && questions.length > 0 && (
            <GetNumeric questions={questions} taskId={taskIdToInt} studentId={studentIdToInt} />
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default AnswerTask;