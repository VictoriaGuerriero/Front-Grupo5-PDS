import React from 'react';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';


function NavBar() {
  const {user} = useUser();
  const {xp, level} = user || {xp: 0, level: 0};

  const navigate = useNavigate();
 
  console.log(user)

  const handleLogOut = () => {
    navigate('/');
  };
  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-lightPink-50 p-6">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="25" viewBox="0 0 24 24">
        <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
      </svg>
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight text-lightPurple-50" style={{fontFamily: 'Handlee, cursive'}}>IntelliCourse</span>
      </div>
      <div className="flex items-center"> {/* Contenedor para el botón */}
          <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={handleLogOut}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
          </svg>
      </div>


      {(user !== null) && (
        <div>
          <p className="text-black">XP: {xp}</p>
          <p className="text-black">Nivel: {level}</p>
        
      </div>
      )}
    </nav>
  );
}

export default NavBar;
