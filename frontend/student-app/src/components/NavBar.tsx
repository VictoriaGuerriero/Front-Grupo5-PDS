import React from 'react';
import { useUser } from '../contexts/userContext';


function NavBar() {
  const {user} = useUser();
  const {xp, level} = user || {xp: 0, level: 0};
 
  console.log(user)

  return (
    <nav className="flex items-center justify-between flex-wrap bg-lightPink-50 p-6">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="25" viewBox="0 0 24 24">
        <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
      </svg>
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">IntelliCourse</span>
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
