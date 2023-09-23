import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/'

function nuevoIntento() {

  const {taskId} = useParams();
  const {studentId} = useParams()

  








  return (
    <div>nuevoIntento</div>
  )
}

export default nuevoIntento