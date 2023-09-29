import React, { useState, useEffect} from 'react';


interface Alternative {
  id: number;
  alternative_question: number; //question id fk
  answer: String;
  is_correct: Boolean;
}

const ALTERNATIVE_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/alternative/';

function GetAlternatives({ questionId }: { questionId: any }) {
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);

  useEffect(() => {
    fetch(ALTERNATIVE_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAlternatives(data);
      })
      .catch((error) => {
        console.error('Error fetching alternatives:', error);
      });
  }, );

  
  return (
    <div>
      <h2>Alternativas de la Pregunta</h2>
      <ul>
        {alternatives.map((alternative) => (
          <li key={alternative.id}>{alternative.answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetAlternatives;