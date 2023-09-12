import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../static/home.css';

import CreateTask2 from '../api/CreateTask2';

const STUDENT_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/students/';
const TASK_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/tasks/';

function Home() {
  const { studentId } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [allTasks, setAllTasks] = useState<any>(null);
  const [studentTask, setStudentTask] = useState<any>(null);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const handleCreateTask = () => {
    console.log("asdas");
    setButtonClicked(true);
  };

  useEffect(() => {
    if (allTasks !== null && student !== null) {
      const task = allTasks.find((task: any) => task.student === student.id);
      setStudentTask(task);
    }
  }, [allTasks, student]);

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
    fetch(TASK_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setAllTasks(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleGoNumeric = () => {
    window.location.replace(`http://localhost:3000/${studentId}/answertask/${studentTask.id}`)
};



  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start py-10">
      <h1 className="text-4xl font-semibold mb-4">Welcome {student?.username}!!!!</h1>
      <div className="mb-4">
        {/* <button onClick={handleCreateTask} className="bg-blue-500 text-white px-4 py-2 rounded"> */}
          {buttonClicked ? <CreateTask2 student_id={studentId}/> : <button onClick={handleCreateTask} className="bg-blue-500 text-white px-4 py-2 rounded">Quiero una tarea</button>}
        {/* </button> */}
      </div>
      <div className="text-lg">Task Disponibles:</div>
      <ul className="list-disc pl-8 mt-2 task-list-home">
      {/* <ul className="list-disc pl-8 mt-2 task-list-home">
        {studentTask.map((task: any) => (
          <div key={task.id} className="mb-2">
            <div className="bg-white border border-gray-300 p-4 flex flex-col">
              <div className="mb-2">{task.name}</div>
              <div className="mb-2">Type: {task.type_task}</div>
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul> */}
        <div key={studentTask?.id} className="mb-2">
          <div className="bg-white border border-gray-300 p-4 flex flex-col">
            <div className="mb-2">{studentTask?.name}</div>
            <div className="mb-2">Type: {studentTask?.type_task}</div>
            <div className="flex justify-end">
              <button onClick={handleGoNumeric} className="bg-blue-500 text-white px-4 py-2 rounded">
                Start
              </button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Home;
