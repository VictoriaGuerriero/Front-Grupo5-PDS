import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../static/home.css';
import NavBar from './NavBar';
import Swal from 'sweetalert2';
import { get } from 'http';


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

  const getTask = useCallback(() => {
    fetch(`${TASK_ENDPOINT}`)
      .then((response) => response.json())
      .then((data) => {
        setAllTasks(data);
        console.log("all tasks", data)  
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [])

  useEffect(() => {
    getTask();
  }, [getTask])

    useEffect(() => {
      if (allTasks !== null && student !== null) {
        const task = allTasks.find((task: any) => task.student === student.id && task.state === 'A') ;
        console.log("task", task)
        setStudentTask(task);
      }
  }, [allTasks]);

  console.log("student task",studentTask)
  console.log("task count", student?.task_count)
  
  console.log("student level", student?.level)

    useEffect(() => {
        if (student?.level === 1 || student?.level === 2 || student?.level === 0){
            setTaskDiff('Easy')
        }
        else if (student?.level === 3 || student?.level === 4 || student?.level === 5 || student?.level === 6 || student?.level === 7){
            setTaskDiff('Medium')
            console.log("entro a medio")
        }
        else{
            setTaskDiff('Hard')
            console.log("se paso pa tonto")
        }

        if (student?.task_count === 0 || (student && student.task_count !== undefined && student?.task_count % 2 === 0)){
            setTaskType('AQ')
        }
        else {
            setTaskType('N')
        }
    }, [student])

    const createTask = () => {
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
          getTask();
          Swal.fire(
            'Tarea Creada!',
            'La tarea ha sido creada con éxito!',
            'success'
          )
          // getTask();
          // console.log("hello, world!")
        })
        .catch((err) => {
          console.error(err.message);
        });
    }

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
    }, [student, studentTask])

    const startTask = () => {
      fetch(TASK_ENDPOINT + `${studentTask.id}/start_task/`, {
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



  const handleGoAnswerTask = (taskId: any) => {
    console.log("task id", taskId)
    startTask();
    navigate(`/${studentId}/answertask/${Number(taskId)}`)
  };

 

  // const handleCreateTask = (student: any) => {
  //   <CreateTask2 student={student}/>
  // };

  const renderTask = () => {
    if (studentTask === null || studentTask === undefined) {
      return (
        <div className="mb-2 rounded-md">
        <div className="bg-white border border-gray-300 p-4 flex flex-col rounded-md">
          <div className="mb-2 items-center">No tienes tareas disponibles</div>
          <div className="mb-4">
            <button onClick={() => {createTask();}} className="bg-blue-500 text-white px-4 py-2 rounded">Quiero una tarea</button>
          </div>
        </div>
      </div>
      )
    }
    else{
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
  }


  return (
    <div>

      <div className="min-h-screen flex flex-col items-center justify-start py-10">
        <h1 className="text-4xl font-semibold mb-4">Welcome {student?.username}!!!!</h1>
        {renderTask()}
      </div>

      

    </div>
  )
}

export default Home;
