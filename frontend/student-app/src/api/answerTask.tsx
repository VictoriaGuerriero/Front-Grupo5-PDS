import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StartTaskFB from '../components/callStart';

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

interface Student {
    id: number;
    username: String;
    email: String;
    xp: number;
    level: number;
    correctly_answered_questions: [];
    incorrectly_answered_questions: [];
    questions_pased: [];
    used_combinations: [];
    task_count: number;
}

interface Question {
    id: number;
    question: string;
    type_question: string;
    type_subject: string;
    difficulty: string;
    hint: string;
}

interface Alternative {
    id: number;
    alternative_question: number; //question id fk
    answer: String;
    is_correct: Boolean;
}

interface AlternativeQuestion {
    id: number;
    question: number; //question id fk
    alternatives: [];
}

const TASK_ENDPOINT =  'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/'
const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/'
const ALTERNATIVEQUESTION_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternativequestion/'


function AnswerTask(){
    const [task, setTask] = useState<Task>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [student, setStudent] = useState<Student>();
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [alternativeQuestion, setAlternativeQuestion] = useState<AlternativeQuestion[]>([]);
    const {studentId} = useParams();
    const {taskId} = useParams();

    useEffect(() => {
        fetch(TASK_ENDPOINT + `${taskId}/questions_to_task/?student_id=${studentId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data.message)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }, [taskId, studentId])

    useEffect(() => {
        // Obtener todas las AlternativeQuestion sin importar la tarea
        fetch(ALTERNATIVEQUESTION_ENDPOINT)
          .then((response) => response.json())
          .then((data) => {
            console.log("alternative questions", data);
            setAlternativeQuestion(data);
          })
          .catch((err) => {
            console.error(err.message);
          });
        
          fetch(TASK_ENDPOINT+taskId+'/')
            .then((response) => response.json())
            .then(data => {
                setTask(data)
                setQuestions(data.questions)
                console.log("questions",questions)
                console.log("task",task)
            })
            .catch((err) => {
                console.log(err.message)
            })

        fetch(STUDENT_ENDPOINT+studentId+'/')
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                setStudent(data)
                })
            .catch((err) => {
                console.log(err.message)
            })
    }, [taskId, studentId])

    console.log(questions)

    
    const taskIdToInt = parseInt(taskId!)
    const studentIdToInt = parseInt(studentId!)
    return (
        <div>
            {/* <AnswerTask taskId={taskIdToInt}/> */}
          <h1>{task?.description}</h1>
            <h2>{task?.name}</h2>
            <h3>{task?.type_task}</h3>
            <h4>{task?.difficulty}</h4>
          <ul> 
            {(task && task.type_task == 'AQ'  &&(
                <AnswerAQ questions={questions} taskId={taskIdToInt} studentId={studentIdToInt} />
            ))}

            {(task && task.type_task == 'N' && (
                <GetNumeric questions={questions} taskId={taskIdToInt} studentId={studentIdToInt} />
            ))}
          </ul>
        </div>
      );
}

export default AnswerTask;