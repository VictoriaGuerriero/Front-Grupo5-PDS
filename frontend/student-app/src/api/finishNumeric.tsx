import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const TASK_ENDPOINT =  'https://tsqrmn8j-8000.brs.devtunnels.ms/tasks/'

function FinishNumeric(){

    const {taskId} = useParams();
    const {studentId} = useParams()
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        fetch(TASK_ENDPOINT + `${taskId}/finish_task/`, {
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
            console.log(data.message)
            setMessage(data.message)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }, [taskId])

    const handleGoBack = () => {
        window.location.replace(`http://localhost:3000/home/${studentId}`)
    };



    return (
        <div>
            <p>{message}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGoBack}>Home</button>
        </div>
    )
}

export default FinishNumeric;