import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  questions: [];
}

interface Question {
  id: number;
  question: string;
}

const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/';
const QUESTIONS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/';

function NuevoIntento() {
  const navigate = useNavigate();
  const { taskId, studentId } = useParams<{ taskId: any; studentId: any }>();
  const [actualTask, setActualTask] = useState<Task[]>([]);
  const [wrongAnswerList, setWrongAnswerList] = useState<number[]>([]);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);

  const getTaskDetails = async (taskId: any) => {
    try {
      const response = await fetch(TASK_ENDPOINT + taskId + '/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error en la respuesta del servidor:', response.statusText);
      }

      const data = await response.json();
      const wrongAnswers = data.wrong_answer;
      setWrongAnswerList(wrongAnswers);

      // Obtenemos los detalles de las preguntas incorrectas
      const questionsDetails = await Promise.all(
        wrongAnswers.map(async (questionId: any) => {
          const questionResponse = await fetch(QUESTIONS_ENDPOINT + questionId + '/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!questionResponse.ok) {
            console.error('Error en la respuesta del servidor:', questionResponse.statusText);
          }

          const questionData = await questionResponse.json();
          return questionData;
        })
      );

      setWrongQuestions(questionsDetails);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };

  useEffect(() => {
    getTaskDetails(taskId);
  }, [taskId]);


  const handleIntentarDeNuevoClick = () => {
    console.log('Botón "Intentar de Nuevo" fue presionado');
    navigate('/student/' + studentId + '/answerAQ2/' + taskId);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify mt-10">
      <h1 className="text-3xl font-semibold mb-4">Nuevo Intento</h1>
      {wrongQuestions.length > 0 ? (
        <div className="text-center">
          <p className="mb-4">Tienes {wrongQuestions.length} preguntas mal respondidas.</p>
          <ul>
            {wrongQuestions.map((question) => (
              <li key={question.id} className="mb-2">Pregunta: {question.question}</li>
            ))}
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleIntentarDeNuevoClick}>
            Intentar de Nuevo
          </button>
        </div>
      ) : (
        <p>No tienes preguntas mal respondidas.</p>
      )}
    </div>
  );
  
}

export default NuevoIntento;
