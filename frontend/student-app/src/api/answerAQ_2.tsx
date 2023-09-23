import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface Task {
    id: number;
    questions: [];
  }
  
  interface Question {
    id: number;
    question: string;
  }
  
  interface Alternative {
    id: number;
    alternative_question: number;
    answer: string;
    is_correct: boolean;
  }
  
  interface AlternativeQuestion {
    id: number;
    alternative: [];
    question: number;
  }
  
  interface AnswerAQProps {
    questions: Question[];
    taskId: number;
    studentId: number;
  }
  

const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/'

function answerAQ_2() {

    const {taskId} = useParams();
    const {studentId} = useParams()

    const [actualTask, setActualTask] = useState<Task[]>([]);

    useEffect(() => {
        fetch(TASK_ENDPOINT + `${taskId}`, { 
            method: 'GET',
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
            console.log(data)
            setActualTask(data)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }, [taskId])



  return (
    <div>answerAQ_2</div>
  )
}

export default answerAQ_2