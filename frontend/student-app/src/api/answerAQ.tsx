import React, { useState, useEffect } from 'react';

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

interface AnswerAQProps {
  questions: Question[];
  taskId: number;
  studentId: number;
}

const ALTERNATIVE_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternative/'
const QUESTIONS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/'

function AnswerAQ({ questions, taskId, studentId }: AnswerAQProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAlternatives, setCurrentAlternatives] = useState<Alternative[]>([]);
  const [allAlternatives, setAllAlternatives] = useState<Alternative[]>([]);
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [questionOfTask, setQuestionOfTask] = useState<Question[]>([]);


  useEffect(() => {
    fetch(ALTERNATIVE_ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
            console.log("alternatives", data);
            setAllAlternatives(data);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, []);

    useEffect(() => {
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
          const question = questions[currentQuestionIndex];
          setCurrentQuestion(question);

          const filteredAlternatives = allAlternatives.filter(
            (alternative) => alternative.alternative_question === question.id
          );
          setCurrentAlternatives(filteredAlternatives);
        }
    }, [currentQuestionIndex, questions, allAlternatives]);


  const showPopup = (message: string) => {
      setPopupMessage(message);
      setIsPopupVisible(true);
  };
    


  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerQuestion = async (alternativeId: number, currentQuestion: number) => {
    try {
      const response = await fetch(QUESTIONS_ENDPOINT+currentQuestion+'/validate_a_answer/'+alternativeId+'/'+taskId+'/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alternativeId: alternativeId,
          questionId: currentQuestion,
          taskId: taskId,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const message = data.message; // Mensaje de respuesta del servidor
  
        // Verificar si la respuesta es correcta o no y mostrar el mensaje en el popup
        if (data.isCorrect) {
          showPopup('Respuesta correcta');
        } else {
          showPopup('Respuesta incorrecta');
        }
      } else {
        console.error('Error in response:', response.statusText);
      }

    } catch (error) {
      console.error('Error:', error);
    }

    // verificar si la respuesta es correcta o no
   
    //siguiente pregunta
    handleNextQuestion();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">{currentQuestion?.question}</h1>
      <ul>
        {currentAlternatives.map((alternative) => (
          <li key={alternative.id} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio"
                name="alternative"
                value={alternative.id}
                onChange={() => setSelectedAlternative(alternative.id)}
              />
              <span>{alternative.answer}</span>
            </label>
          </li>
        ))}
      </ul>
      {currentQuestionIndex < questions.length - 1 && (
        <>
          <button
            onClick={() => {
              if (selectedAlternative !== null && selectedAlternative !== undefined && currentQuestion !== null) {
                handleAnswerQuestion(selectedAlternative, currentQuestion?.id);
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Question
          </button>
  
          {/* Popup */}
          {isPopupVisible && (
            <div className="popup">
              <p>{popupMessage}</p>
              <button onClick={() => setIsPopupVisible(false)}>Cerrar</button>
            </div>
          )}
        </>
      )}
    </div>
  );
  
}

export default AnswerAQ;
