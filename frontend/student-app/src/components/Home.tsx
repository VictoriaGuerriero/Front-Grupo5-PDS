import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../static/home.css';
import NavBar from './NavBar';
import Swal from 'sweetalert2';


const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/';
const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/';

function Home(){
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [allTasks, setAllTasks] = useState<any>(null);
  const [studentTask, setStudentTask] = useState<any>(null);
  const [taskDiff, setTaskDiff] = React.useState<any>(null);
  const [taskType, setTaskType] = React.useState<any>(null);

  useEffect(() => {
        fetch(`${STUDENT_ENDPOINT}${studentId}/`)
          .then((response) => response.json())
          .then((data) => {
            setStudent(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }, [studentId]);

  useEffect(() => {
    fetch(`${TASK_ENDPOINT}`)
      .then((response) => response.json())
      .then((data) => {
        setAllTasks(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

    useEffect(() => {
      if (allTasks !== null && student !== null) {
        const task = allTasks.find((task: any) => task.student === student.id);
        setStudentTask(task);
        console.log("student task", studentTask)
      }
  }, [allTasks, student, studentTask]);

    useEffect(() => {
        if (student?.level === 1 || student?.level === 2){
            setTaskDiff('Easy')
        }
        else if (student?.level === 3 || student?.level === 4 || student?.level === 5 || student?.level === 5 || student?.level === 6 || student?.level === 7){
            setTaskDiff('Medium')
        }
        else{
            setTaskDiff('Hard')
        }

        if (student?.task_count === 0 || (student && student.task_count !== undefined && student?.task_count % 2 === 0)){
            setTaskType('AQ')
        }
        else {
            setTaskType('N')
        }
    }, [student])

    const createTask = useCallback(() => {
      fetch(TASK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: 'Tarea para nivel ' + student?.level + ' de ' + student?.username,  
          student: studentId,
          type_task: taskType,
          difficulty: taskDiff,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          Swal.fire(
            'Tarea Creada!',
            'La tarea ha sido creada con éxito!',
            'success'
          )
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, [student?.level, student?.username, studentId, taskDiff, taskType]);

    useEffect(() => {
      if (studentTask && student && studentTask.questions.length === 0){
        fetch(TASK_ENDPOINT + `${studentTask.id}/questions_to_task/?student_id=${student.id}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then((data) => {
              console.log("dataaaa", data)
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
      }
    }, [studentTask])



  const handleGoAnswerTask = async (taskId: any) => {
    console.log("task id", taskId)
    navigate(`/${studentId}/answertask/${Number(taskId)}`)

    try {
      await start_task(taskId);
  
      navigate(`/${studentId}/answertask/${Number(taskId)}`);
    } catch (error) {
      console.error('Error al iniciar la tarea:', error);
    }
  };

  const start_task = async (taskId: any) => {
    try {
      const response = await fetch(`${TASK_ENDPOINT}${taskId}/start_task/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Tarea iniciada');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  
  const renderTask = () => {
    if (studentTask !== null && studentTask !== undefined) {
      return (
        <div>
          <div className="text-lg mb-2 flex flex-col items-center">Task Disponibles:</div>
          <ul className="list-disc pl-8 mt-2 task-list-home"></ul>
          <div key={studentTask?.id} className="mb-2 rounded-md">
            <div className="bg-white border border-gray-300 p-4 flex flex-col rounded-md">
              <div className="mb-2">{studentTask?.name}</div>
              <div className="mb-2">Type: {studentTask?.type_task}</div>
              <div className="flex justify-end">
                <button onClick={() => handleGoAnswerTask(studentTask?.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Empezar</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else{
      return (
        <div className="mb-2 rounded-md">
          <div className="bg-white border border-gray-300 p-4 flex flex-col rounded-md">
            <div className="mb-2 items-center">No tienes tareas disponibles</div>
            <div className="mb-4">
              <button onClick={createTask} className="bg-blue-500 text-white px-4 py-2 rounded">Quiero una tarea</button>
            </div>
          </div>
        </div>
      )
    }
  }

  const obtenerTextoSegunNivel = (nivel: number) => {
    if (nivel === 1 || nivel === 2) {
      return (
        <>
          <h2 className='mb-5'>Unidad: Resistencias en Serie y Paralelo</h2>
          <p className='mb-5 justify text-center'>
            En este tema, aprenderás cómo calcular la resistencia total de un circuito que contiene resistencias conectadas en serie y en paralelo. La resistencia en serie se calcula sumando simplemente todas las resistencias, mientras que la resistencia en paralelo se calcula utilizando la fórmula inversa.
          </p>
          <p>Fórmula para resistencias en serie: R_total = R1 + R2 + R3 + ...</p>
          <p className='mb-5'>Fórmula para resistencias en paralelo: 1 / R_total = 1 / R1 + 1 / R2 + 1 / R3 + ...</p>
        </>
      );
    } else if (nivel === 3) {
      return (
        <>
          <h2 className='mb-5'>Unidad: Kirchhoff - Suma de Tensiones</h2>
          <p className='mb-5 justify text-center'>
            En esta sección, estudiarás la ley de Kirchhoff para la suma de tensiones en un circuito eléctrico. Esta ley establece que la suma algebraica de las caídas de tensión en un circuito cerrado es igual a la suma de las fuerzas electromotrices en ese circuito. Esta ley es fundamental para analizar circuitos eléctricos complejos.
          </p>
          <p className='mb-5'>Fórmula de Kirchhoff para la suma de tensiones: ΣV = ΣEMF</p>
        </>
      );
    } else if (nivel === 4 || nivel === 5) {
      return (
        <>
          <h2 className='mb-5'>Unidad: Kirchhoff - Suma de Corrientes</h2>
          <p className='mb-5 justify text-center'>
            En esta sección, explorarás la ley de Kirchhoff para la suma de corrientes en un nodo de un circuito eléctrico. Esta ley establece que la suma algebraica de las corrientes en un nodo es igual a cero. Esta ley es esencial para analizar la distribución de corriente en un circuito complejo.
          </p>
          <p className='mb-5'>Fórmula de Kirchhoff para la suma de corrientes en un nodo: ΣI = 0</p>
        </>
      );
    } else if (nivel === 6) {
      return (
        <>
          <h2 className='mb-5'>Unidad: Tipos de Condensadores</h2>
          <p className='mb-5 justify text-center'>
            Este tema se centra en los diferentes tipos de condensadores utilizados en electrónica, sus características y aplicaciones. Aprenderás sobre condensadores cerámicos, electrolíticos, de película y otros, y cómo elegir el adecuado para tus proyectos.
          </p>
          <p className='mb-5'>Los condensadores son componentes esenciales en la electrónica y tienen una amplia gama de usos, desde almacenar energía hasta filtrar señales.</p>
        </>
      );
    } else if (nivel === 7 || nivel === 8) {
      return (
        <>
          <h2 className='mb-5'>Unidad: Energía de un Condensador</h2>
          <p className='mb-5 justify text-center'>
            En esta sección, se aborda el cálculo de la energía almacenada en un condensador. La energía de un condensador se almacena en función de su capacidad y la tensión aplicada. Comprenderás cómo calcular la energía almacenada y cómo esta propiedad es útil en aplicaciones prácticas.
          </p>
          <p className='mb-5'>Fórmula de energía del condensador: E = 0.5 * C * V^2</p>
        </>
      );
    } else if (nivel === 9 || nivel === 10) {
      return (
        <>
          <h2 className='mb-5'>Unidad: Carga de un Condensador</h2>
          <p className='mb-5 justify text-center'>
            Este tema se centra en cómo calcular la carga almacenada en un condensador en función de su capacidad y la tensión aplicada. Entenderás cómo los condensadores almacenan carga eléctrica y cómo puedes utilizar esta propiedad en circuitos electrónicos.
          </p>
          <p className='mb-5'>Fórmula de carga del condensador: Q = C * V</p>
        </>
      );
    } else {
      return "Nivel no reconocido";
    }
  };
  

  


  return (
    <div>

      <div className="min-h-screen flex flex-col items-center justify-start py-10">
        <h1 className="text-4xl font-semibold mb-10">Welcome {student?.username}!!!!</h1>
        {renderTask()}
        <div className="w-[calc(100vw*2/3)] mx-auto mt-10 ml-10 mr-10">
          <div className="h-screen flex flex-col items-center justify">
            {obtenerTextoSegunNivel(student?.level)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
