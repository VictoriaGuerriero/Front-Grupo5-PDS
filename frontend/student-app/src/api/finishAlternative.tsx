import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/task/'

function finishAlternative() {
  
   // useEffect(() => {
    //    fetch(TASK_ENDPOINT + `${taskId}/finish_task/`, {
    //        method: 'POST',
    //        headers: {
    //            'Content-type': 'application/json; charset=UTF-8',
    //        },
    //    })
     //   .then(response => {
      //      if (response.ok) {
      //          return response.json(); 
      //      } else {
      //          throw new Error('Network response was not ok');
      //      }
      //  })
      //  .then(data => {
      //      console.log(data.message)
      //      setMessage(data.message)
       // })
       // .catch(error => {
      //      console.error('Fetch error:', error);
     //   });
    //}, [taskId])



  return (
    <div>finishAlternative</div>
  )
}

export default finishAlternative