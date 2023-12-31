import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const TASK_ENDPOINT =  'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/tasks/'

function FinishNumeric(){

    const navigate = useNavigate();
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
        navigate(`/home/${studentId}`)
    };



    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='rounded-md'>
                <div className="bg-lightPink-50 p-4 text-black rounded-md">
                    <p>{message}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={handleGoBack}>Home</button>
                </div>
            </div>
        </div>
    )
}

export default FinishNumeric;