import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/tasks/';

function FinishAlternative() {
  const { taskId } = useParams();
  const { studentId } = useParams();

  const navigate = useNavigate();

  const [pointsEarned, setPointsEarned] = useState<number | null>(null);

  const getTaskDetails = async (taskId: any) => {
    try {
      const response = await fetch(TASK_ENDPOINT + taskId + '/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const xpInTask = data.xp_in_task;
        setPointsEarned(xpInTask);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const finishTask = async () => {
    try {
      const response = await fetch(`${TASK_ENDPOINT}${taskId}/finish_task/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        navigate(`/home/${studentId}`);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  useEffect(() => {
    // Llama a la función para obtener los puntos ganados
    getTaskDetails(taskId);
  }, [taskId]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-semibold mb-4">Tarea Completada</h1>
      {pointsEarned !== null ? (
        <div className="text-center">
          <p className="mb-4">Has ganado {pointsEarned} puntos en esta tarea.</p>
          <Link
            to="#"
            onClick={finishTask} // Llama a la función finishTask al hacer clic
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ir a la Página de Inicio
          </Link>
        </div>
      ) : (
        <p>Cargando puntos...</p>
      )}
    </div>
  );
}

export default FinishAlternative;
