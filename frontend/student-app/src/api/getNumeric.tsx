import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button } from "@material-tailwind/react";

import Serie2Resist from '../diagrams/serie2Resist';
import Serie3Resist from '../diagrams/serie3Resist';
import Serie4Resist from '../diagrams/serie4Resist';
import Paralelo2Res from '../diagrams/paralelo2Res';
import Paralelo3Res from '../diagrams/paralelo3Res';
import Paralelo4Res from '../diagrams/parelelo4Res';
import Mixto3Res from '../diagrams/mixto3Res';
import Mixto4ResTipo1 from '../diagrams/mixto4ResTipo1';
import Mixto4ResTipo2 from '../diagrams/mixto4ResTipo2';
// import ElectricCircuit from './adiagram';

interface Task {
    id: number;
    questions: [];
    name: string;
    student: number; //student id fk
    description: string;
    type_task: string;
    state: string;
    xp_in_task: number;
    difficulty: string;
    wrong_answer: [];

}

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

interface Question {
    id: number;
    question: string;
    type_question: string;
    type_subject: string;
    difficulty: string;
    hint: string;
}

interface NumericQuestion {
    id: number;
    answer: string;
    combination: string;
    question: number;
}

const TASK_ENDPOINT =  'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/'
const NUMERICQ_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/numericquestion/'
const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/'
const QUESTIONS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/'

//

function GetNumeric(props: any) {
    const studentId = props.studentId
    const taskId = props.taskId
    const questions = props.questions
    const questionId = questions[0].id
    const [student, setStudent] = useState<Student>();
    const [task, setTask] = useState<Task>();
    const [question, setQuestion] = useState<Question>();
    const [numericQuestions, setNumericQuestions] = useState<NumericQuestion[]>([]);
    const [lengthComb, setLengthComb] = useState<number | undefined>(0);
    const [circuitType, setCircuitType] = useState<string | undefined>('');
    const [numRes, setNumRes] = useState<string | undefined>('');
    const [combination, setCombination] = useState <string[]>([]);
    const [currentNumeric, setCurrentNumeric] = useState<NumericQuestion>()
    const [volt, setVolt] = useState<string | undefined>('')

    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [listAnswer, setListAnswer] = useState<string []>([])
    // useEffect (() => {
    //     fetch(STUDENT_ENDPOINT+studentId+'/')
    //     .then((response) => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setStudent(data)
    //       })
    //     .catch((err) => {
    //         console.log(err.message)
    //     })
    // }, [studentId])

    console.log("student",studentId)
    console.log("task",taskId)
    console.log("questions", questions)

    

    const fetchNumeric = useCallback(() => {
        fetch(NUMERICQ_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log("afsdfgsdgfd",data);
            setNumericQuestions(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    const fetchQuestion = useCallback(() => {
        fetch(QUESTIONS_ENDPOINT+ questionId + '/')
        .then((response) => response.json())
        .then(data => {
            console.log("question",data);
            setQuestion(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [questionId])


    useEffect(() => {
        for (let i = 0; i < numericQuestions.length; i++) {
          if (numericQuestions[i].question === Number(questionId)) {
            setCurrentNumeric(numericQuestions[i]);
          }
        }
      }, [numericQuestions, questionId]);

      console.log("answer", currentNumeric?.answer)
      
      useEffect(() => {
        if (currentNumeric) {
          const currentCombination = currentNumeric.combination;
          if (currentCombination) {
            const combinationArray = currentCombination.split(',');
            setCombination(combinationArray);
            if (combinationArray.length > 1) {
              setVolt(combinationArray[1]);
              setNumRes(combinationArray[2]);
              setCircuitType(combinationArray[0])
            }
          }
        }
      }, [currentNumeric]);
      
    



    useEffect (() => {
        fetchNumeric();
    }, [fetchNumeric])

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion])

    const commaRegex: RegExp = /,/;

    if (currentNumeric?.answer !== undefined && commaRegex.test(currentNumeric.answer)) {
        setListAnswer(currentNumeric.answer.split(','))
    } 

    const [studentAnswer, setStudentAnswer] = useState<string>('')
    const [variable1, setVariable1] = useState<string>('');
    const [variable2, setVariable2] = useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [incorrectCount, setIncorrectCount] = useState<number>(0);

    const handleVariable1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVariable1(e.target.value);
      };
    
      // Event handler for input field 2
    const handleVariable2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVariable2(e.target.value);
      };
    
    const showPopup = (message: string) => {
        setPopupMessage(message);
        setIsPopupVisible(true);
    };

    const tolerance = 0.05;

    const studentAnswerNumber = parseFloat(studentAnswer);
    const answerString = currentNumeric?.answer;
    const variable1Number = parseFloat(variable1);
    const variable2Number = parseFloat(variable2);
    

    const handleButtonClick = () => {
        if (answerString !== undefined){
            if (listAnswer.length === 0 && incorrectCount === 0){
                fetch(QUESTIONS_ENDPOINT + questionId + '/validate_n_answer/' + studentAnswerNumber + '/' + taskId + '/', {
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
                    if (data.message === 'Correct answer') {
                        // Perform actions for a correct answer
                        console.log('Correct Answer:', data.message);
                        // window.location.replace(`http://localhost:3000/student/${studentId}/finishnumeric/${taskId}`)
                       
                    } else {
                        // Perform actions for an incorrect answer
                        console.log('Incorrect Answer:', data['HINT:']);
                        setIncorrectCount(incorrectCount + 1)
                        showPopup(`Respuesta Incorrecta. Tienes un intento más. Hint: ${ data['HINT:']}`)
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
                
            }
            else if (listAnswer.length === 0 && incorrectCount === 1) {
                fetch(QUESTIONS_ENDPOINT + questionId + '/validate_n_2answer/' + studentAnswerNumber + '/' + taskId + '/', {
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
                    if (data.message === 'Correct answer') {
                        // Perform actions for a correct answer
                        console.log(data);
                        window.location.replace('http://localhost:3000/finishnumeric/'+taskId)
                       
                    } else {
                        // Perform actions for an incorrect answer
                        console.log(data);
                        setIncorrectCount(incorrectCount + 1)
                        window.location.replace('http://localhost:3000/finishnumeric/'+taskId)
                    }
                })
                .catch(error => {
                    // Handle errors that occurred during the fetch or response processing
                    console.error('Fetch error:', error);
                    // Do something for error cases
                });
            }
            else {
                const correctVar1 = parseFloat(listAnswer[0])
                const correctVar2 = parseFloat(listAnswer[1])
                if ((Math.abs(variable1Number - correctVar1) <= tolerance) && (Math.abs(variable2Number - correctVar2) <= tolerance)) {
                    console.log("Correct!");
                } else {
                    console.log("Incorrect. Try again.");
                    setIncorrectCount(incorrectCount + 1);
                }
            }
            
        }
    };

    // useEffect(() => {
    //     if (incorrectCount === 1) {
    //       showPopup(`Respuesta incorrecta. Tienes un intento más. Hint: `); // Show the popup
    //     }
    //   }, [incorrectCount]);


    //   console.log("asjklfklfjklsdfjlk",combination,"asjklfklfjklsdfjlk")
    return (
        <div>
            <div>{question?.question}</div>
            {circuitType === '0' && numRes === '2' && (
                <Serie2Resist volt={volt} r1={combination[3]} r2={combination[4]} />
            )}
            {circuitType === '0' && numRes === '3' && (
                <Serie3Resist volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )}
            {circuitType === '0' && numRes === '4' && (
                <Serie4Resist volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )}

            {circuitType === '1' && numRes === '2' && (
                <Paralelo2Res volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )}
            {circuitType === '1' && numRes === '3' && (
                <Paralelo3Res volt={volt}r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )}
            {circuitType === '1' && numRes === '4' && (
                <Paralelo4Res volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )}
            {circuitType === '2' && numRes === '3' && (
                <Mixto3Res volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )}
            {circuitType === '3' && numRes === '4' && (
                <Mixto4ResTipo1 volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )}
            {circuitType === '4' && numRes === '4' && (
                <Mixto4ResTipo2 volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )}
            

            {listAnswer.length > 0 ? (
                <div className="relative flex w-full max-w-[24rem]">
                <Input
                  key='var1'
                  color="indigo"
                  label="Variable 1"
                  crossOrigin={undefined}
                  value={variable1}
                  onChange={handleVariable1Change}
                />
                <Input
                  key='var2'
                  color="indigo"
                  label="Variable 2"
                  crossOrigin={undefined}
                  value={variable2}
                  onChange={handleVariable2Change}
                />
              </div>
            ) : (
              <div className="relative flex w-full max-w-[24rem]">
                <Input
                  key='resp'
                  color="indigo"
                  label="Respuesta"
                  crossOrigin={undefined}
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                />
              </div>
            )}
            <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleButtonClick}>Enviar</Button>

            {/* Popup */}
            {isPopupVisible && (
                <div className="popup bg-orange-500">
                <p className="text-white">{popupMessage}</p>
                <button onClick={() => setIsPopupVisible(false)}>Cerrar</button>
                </div>
            )}
    
        </div>
        
    )
    
}

export default GetNumeric;