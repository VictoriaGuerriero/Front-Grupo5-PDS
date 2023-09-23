import { easePoly } from 'd3';
import React, { useEffect, useState, useCallback, useRef } from 'react'

const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks';
const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students';

function CreateTask2(props: any) {    
    const [student, setStudent] = React.useState<any>(null);
    const [tasks, setTasks] = React.useState<any>(null);
    const [task, setTask] = React.useState<any>(null);
    const [taskDiff, setTaskDiff] = React.useState<any>(null);
    const [taskType, setTaskType] = React.useState<any>(null);
    const [allTasks, setAllTasks] = React.useState<any>(null);

    const [studentHasTask, setStudentHasTask] = React.useState<any>(false);

    useEffect(() => {
        fetch(`${TASK_ENDPOINT}/`)
            .then((response) => response.json())
            .then((data) => {
                setAllTasks(data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message)
            });
    }, []);


    useEffect(() => {
        fetch(STUDENT_ENDPOINT + '/' + props.student_id + '/')

            .then((response) => response.json())
            .then((data) => {
                console.log(data.level)
                setStudent(data);
                if (data?.level === 1 || data?.level === 2){
                    setTaskDiff('Easy')
                }
                else if (data?.level === 3 || data?.level === 4 || data?.level === 5 || data?.level === 5 || data?.level === 6 || data?.level === 7){
                    setTaskDiff('Medium')
                }
                else{
                    setTaskDiff('Hard')
                }
        
                if (data?.task_count === 0 || (data && data.task_count !== undefined && data?.task_count % 2 === 0)){
                    setTaskType('AQ')
                }
                else {
                    setTaskType('N')
                }
            })
            .catch((err) => {
                console.log(err.message)
            });
        
        // Set task difficult
        
        }, [props.student_id, student?.level, student?.task_count])

    
    useEffect(() => {
        if (allTasks) {
            allTasks.forEach((el: any) => {
                if (Number(el.student) === Number(props.student_id)) {
                    setStudentHasTask(true);
                    console.log('si tiene tarea')
                }
            });
    }})
    // check if student has task

    useEffect(() => {
        if (!studentHasTask) {
            console.log('no tiene tarea')
            console.log(taskType, taskDiff)
            fetch(`${TASK_ENDPOINT}/`, {
                method: 'POST',
                body: JSON.stringify({
                    name: 'Tarea para nivel ' + student?.level + ' de ' + student?.username,
                    type_task: taskType,
                    difficulty: taskDiff,
                    student: props.student_id
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then(data => {
                setTask(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }, [studentHasTask, taskType, taskDiff, student?.level, student?.username, props.student_id])
    
    
    return (
        <div>
            <h1>Task created</h1>
        </div>
    )
}

export default CreateTask2;