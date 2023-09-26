import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const ALTERNATIVE_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternative/'
const QUESTIONS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/'
const ALTERNATIVEQUESTIONS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternativequestion/'
const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/'

function AnswerAQ({ questions, taskId, studentId }: AnswerAQProps) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAlternatives, setCurrentAlternatives] = useState<Alternative[]>([]);
  const [allAlternatives, setAllAlternatives] = useState<Alternative[]>([]);
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null);
  const [currentAlternativeQuestion, setCurrentAlternativeQuestion] = useState<AlternativeQuestion[]>([]);

  const [questionOfTask, setQuestionOfTask] = useState<Question[]>([]);

  const [all_alternative_question, setAll_alternative_question] = useState<AlternativeQuestion[]>([]);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  //console.log ("currentQuestionIndex", currentQuestionIndex)
  //console.log(currentAlternatives)

    useEffect(() => {
      fetch(ALTERNATIVE_ENDPOINT)
          .then((response) => response.json())
          .then((data) => {
              //console.log("alternatives", data);
              setAllAlternatives(data);
          })
          .catch((err) => {
              console.error(err.message);
          });
      }, []);

    useEffect(() => {
      fetch(ALTERNATIVEQUESTIONS_ENDPOINT)
          .then((response) => response.json())
          .then((data) => {
              //console.log("alternativequestion", data);
              setAll_alternative_question(data);
          })
          .catch((err) => {
              console.error(err.message);
          });
      }, []);


    useEffect(() => {
      if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        setCurrentQuestion(question);
    
        const currentAlternativeQuestions = all_alternative_question.filter(
          (alternative_question) => alternative_question.question === question.id
        );
    
        setCurrentAlternativeQuestion(currentAlternativeQuestions);
    
        const filteredAlternatives = allAlternatives.filter((alternative) =>
          currentAlternativeQuestions.some(
            (alternative_question) => alternative_question.id === alternative.alternative_question
          )
        );
    
        setCurrentAlternatives(filteredAlternatives);
      }
    }, [currentQuestionIndex, questions, allAlternatives, all_alternative_question]);
    

    const getTaskDetails = async (taskId: any) => {
      try {
        const response = await fetch(TASK_ENDPOINT + taskId+'/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          return data.wrong_answer; // Debes devolver los detalles de la tarea desde el backend
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    };
    
    const refirectionFinish = async (taskId: any) => {
      const wrong_answer_list = await getTaskDetails(taskId);
      console.log(wrong_answer_list)

      if (wrong_answer_list.length > 0) {
        navigate('/student/'+studentId+'/nuevointento/'+taskId);
      } else {
        navigate('/student/'+studentId+'/finishalternative/'+taskId);
    };
  };


    const handleFinishTest = async (alternativeId: number, currentQuestion: number) => {
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
          const message = data.message;
          console.log(message)

        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const handleNextQuestion = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };


    const handleAnswerQuestion = async (alternativeId: number, currentQuestion: number) => {
      console.log("currentQuestion", currentQuestion)
      console.log("alternativeId", alternativeId)
      console.log("taskId", taskId)
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
          const message = data.message;
          console.log(message)
          setServerResponse(message);

        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }

      handleNextQuestion();
    };


  return (
    <div className="max-w-3xl mx-auto bg-lightPink-50 p-4 text-black rounded-md max-h-screen overflow-y-auto">
      <div className="flex flex-col items-center justify h-screen  " >
        <h1 className="text-2xl font-semibold mt-10 mb-8">
          {currentQuestion?.question} {currentQuestion?.id}
        </h1>
        <ul style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          {currentAlternatives.map((alternative) => (
            <li key={alternative.id} className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  className="form-radio"
                  name="alternative"
                  value={alternative.id}
                  onChange={() => setSelectedAlternative(alternative.id)}
                />
                <span className="pl-4">{alternative.answer} {alternative.id}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-end w-full">
        {isLastQuestion ? (
          <button
            onClick={() => {
              if (selectedAlternative !== null && selectedAlternative !== undefined && currentQuestion !== null) {
                handleFinishTest(selectedAlternative, currentQuestion?.id);
                refirectionFinish(taskId);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Finalizar
          </button>
        ) : (
          <button
            onClick={() => {
              if (selectedAlternative !== null && selectedAlternative !== undefined && currentQuestion !== null) {
                handleAnswerQuestion(selectedAlternative, currentQuestion?.id);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Siguiente
          </button>
        )}
        </div>
      </div>
    </div>
  );
}


export default AnswerAQ;
