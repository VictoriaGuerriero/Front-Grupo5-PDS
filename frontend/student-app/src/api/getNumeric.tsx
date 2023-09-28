import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button } from "@material-tailwind/react";
import Swal from 'sweetalert2';

import Serie2Resist from '../diagrams/serie2Resist';
import Serie3Resist from '../diagrams/serie3Resist';
import Serie4Resist from '../diagrams/serie4Resist';
import Paralelo2Res from '../diagrams/paralelo2Res';
import Paralelo3Res from '../diagrams/paralelo3Res';
import Paralelo4Res from '../diagrams/parelelo4Res';
import Mixto3Res from '../diagrams/mixto3Res';
import Mixto4ResTipo1 from '../diagrams/mixto4ResTipo1';
import Mixto4ResTipo2 from '../diagrams/mixto4ResTipo2';
import Level4 from '../diagrams/level4';
import Level5 from '../diagrams/level5';
// import ElectricCircuit from './adiagram';

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
const QUESTIONS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/'

//

function GetNumeric(props: any) {
    const navigate = useNavigate();
    const studentId = props.studentId
    const taskId = props.taskId
    const questions = props.questions
    const questionId = questions[0].id
    const [question, setQuestion] = useState<Question>();
    const [numericQuestions, setNumericQuestions] = useState<NumericQuestion[]>([]);
    const [circuitType, setCircuitType] = useState<string | undefined>('');
    const [numRes, setNumRes] = useState<string | undefined>('');
    const [combination, setCombination] = useState <string[]>([]);
    const [currentNumeric, setCurrentNumeric] = useState<NumericQuestion>()
    const [volt, setVolt] = useState<string | undefined>('')

    const [listAnswer, setListAnswer] = useState<string []>([])

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

    useEffect (() => {
        fetchNumeric();
    }, [fetchNumeric])

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion])


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
    const [var1IncorrectCount, setVar1IncorrectCount] = useState<number>(0);
    const [var2IncorrectCount, setVar2IncorrectCount] = useState<number>(0);

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

    const studentAnswerNumber = parseFloat(studentAnswer);
    const answerString = currentNumeric?.answer;
    // const variable1Number = parseFloat(variable1);
    // const variable2Number = parseFloat(variable2);

    const renderButtons = () => {
        if (incorrectCount !== 2) { // Replace 'shouldHideButtons' with your actual condition
          return (
            <div className="flex items-center justify-between">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" key ='enviar' onClick={handleButtonClick}>
                Enviar
              </Button>
              <Button className="bg-gray-500 text-white px-4 py-2 rounded mt-2" key='saltar' onClick={handleSaltarClick}>
                Saltar
              </Button>
            </div>
          );
        }
        else{
            return (<div className="flex items-center justify-between">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" key ='enviar' onClick={handleTerminarClick}>
                Terminar
              </Button>
            </div>)
        }
      };
    

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
                        navigate(`/student/${studentId}/finishnumeric/${taskId}`)
                       
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
                        navigate(`/student/${studentId}/finishnumeric/${taskId}`)
                       
                    } else {
                        // Perform actions for an incorrect answer
                        console.log(data);
                        setIncorrectCount(incorrectCount + 1)
                        showPopup(`Respuesta Incorrecta.`)
                    }
                })
                .catch(error => {
                    // Handle errors that occurred during the fetch or response processing
                    console.error('Fetch error:', error);
                    // Do something for error cases
                });
            }
            else if (listAnswer.length === 2 && incorrectCount === 0) {
                fetch(QUESTIONS_ENDPOINT + `${questionId}/validate_2n_answer/${taskId}/?answer1=${variable1}&answer2=${variable2}`, {
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
                        navigate(`/student/${studentId}/finishnumeric/${taskId}`)
                       
                    } else {
                        // Perform actions for an incorrect answer
                        console.log('Incorrect Answer:', data['HINT:']);
                        setIncorrectCount(incorrectCount + 1)
                        if (data.message === "Answer 1 correct"){
                            showPopup(`Respuesta 2 Incorrecta. Tienes un intento más. Hint: ${ data['HINT:']}`)
                            setVar2IncorrectCount(var2IncorrectCount + 1)
                        }
                        else {
                            showPopup(`Respuesta 1 Incorrecta. Tienes un intento más. Hint: ${ data['HINT:']}`)
                            setVar1IncorrectCount(var1IncorrectCount + 1)
                        }
                        
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
            }
            else if (listAnswer.length === 2 && incorrectCount === 1){
                if (var1IncorrectCount === 1 && var2IncorrectCount === 0){
                    fetch(QUESTIONS_ENDPOINT + `${questionId}/validate_2n_2answer/${taskId}/?answer1=${variable1}`, {
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
                        if (data.message === 'Answer 1 correct') {
                            // Perform actions for a correct answer
                            console.log('Correct Answer:', data.message);
                            navigate(`/student/${studentId}/finishnumeric/${taskId}`)
                           
                        } else {
                            // Perform actions for an incorrect answer
                            console.log('Incorrect Answer:', data['HINT:']);
                            setIncorrectCount(incorrectCount + 1)
                            showPopup(`Respuesta 1 Incorrecta.`)
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
                }
                else if (var2IncorrectCount === 1 && var1IncorrectCount === 0){
                    fetch(QUESTIONS_ENDPOINT + `${questionId}/validate_2n_2answer/${taskId}/?answer2=${variable2}`, {
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
                        if (data.message === 'Answer 2 correct') {
                            // Perform actions for a correct answer
                            console.log('Correct Answer:', data.message);
                            navigate(`/student/${studentId}/finishnumeric/${taskId}`)
                           
                        } else {
                            // Perform actions for an incorrect answer
                            console.log('Incorrect Answer:', data['HINT:']);
                            setIncorrectCount(incorrectCount + 1)
                            showPopup(`Respuesta 2 Incorrecta.`)
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
                }
                else if (var1IncorrectCount === 1 && var2IncorrectCount === 1){
                    fetch(QUESTIONS_ENDPOINT + `${questionId}/validate_2n_2answer/${taskId}/?answer1=${variable1}&answer2=${variable2}`, {
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
                            navigate(`/student/${studentId}/finishnumeric/${taskId}`)
                           
                        } else if (data.message === 'Answer 1 correct'){ 
                            // Perform actions for an incorrect answer
                            console.log('Incorrect Answer 1:', data['HINT:']);
                            setIncorrectCount(incorrectCount + 1)
                            showPopup(`Respuesta 2 Incorrecta.`)
                        }
                        else {
                            // Perform actions for an incorrect answer
                            console.log('Incorrect Answer 2:', data['HINT:']);
                            setIncorrectCount(incorrectCount + 1)
                            showPopup(`Respuesta 1 Incorrecta.`)
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
                }

            }
            
        }
    };

    const handleSaltarClick = () => {
        Swal.fire({
            title: '¿Estás Seguro?',
            icon: 'question',
            html:
              '¿Quieres saltarte la tarea?',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              'Si, saltar',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              'No',
            cancelButtonAriaLabel: 'Thumbs down'
          }).then((result) => {
            if (result.value) {
                fetch(TASK_ENDPOINT + `${taskId}/pass_task/?student_id=${studentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                navigate('/home/'+studentId)
                
            }
          })
    };

    const handleTerminarClick = () => {
        navigate(`/student/${studentId}/finishnumeric/${taskId}`)
    }

    return (
        <div className="bg-lightPink-50 p-4 text-black rounded-md">
            <div className="text-l">{question?.question}</div>
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
            {circuitType === '5' && (
                <Level4 volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )}
            {circuitType === '6' && (
                <Level5 volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]} r5={combination[7]} r6={combination[8]} r7={combination[9]} r8={combination[10]}/>
            )}
            

            {/* Input fields */}
            {listAnswer.length > 0 ? (
                <div className="relative flex w-full max-w-[24rem] space-x-2">
                <div className="flex-grow relative">
                    <label className="absolute top-2 left-2 text-xs text-gray-400">Variable 1</label>
                    <Input
                    key='var1'
                    color="indigo"
                    crossOrigin={undefined}
                    value={variable1}
                    onChange={handleVariable1Change}
                    className="rounded-md px-2 py-1 w-1/3"
                    />
                </div>
                <div className="flex-grow relative">
                    <label className="absolute top-2 left-2 text-xs text-gray-400">Variable 2</label>
                    <Input
                    key='var2'
                    color="indigo"
                    crossOrigin={undefined}
                    value={variable2}
                    onChange={handleVariable2Change}
                    className="rounded-md px-2 py-1 w-1/3"
                    />
                </div>
                </div>
            ) : (
                <div className="relative flex w-full max-w-[24rem]">
                <div className="flex-grow relative">
                    <label className="absolute top-2 left-2 text-xs text-gray-400" htmlFor="resp">Respuesta</label>
                    <Input
                    key='resp'
                    color="indigo"
                    crossOrigin={undefined}
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    className="rounded-md px-2 py-1 w-1/3"
                    />
                </div>
                </div>
            )}
            
            {/* Button */}
            {renderButtons()}

            {/* Popup */}
            {isPopupVisible && (
                <div className="popup bg-orange-500 text-white p-4 rounded mt-2 relative">
                    <p className="text-white">{popupMessage}</p>
                    <button
                    className="absolute top-0 right-0 mt-2 mr-2"
                    onClick={() => setIsPopupVisible(false)}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
                )}
    
        </div>
        
    )
    
}

export default GetNumeric;