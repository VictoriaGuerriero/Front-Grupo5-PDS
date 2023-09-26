import React from 'react';

interface NavBarProps {
    xp: number; // Define the type for xp (e.g., number)
    level: number; // Define the type for level (e.g., number)
}

function NavBar({ xp, level }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-lightPink-50 p-6">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="25" viewBox="0 0 24 24">
        <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
      </svg>
      <div>
        <p className="text-black">XP: {xp}</p>
        <p className="text-black">Level: {level}</p>
      </div>
    </nav>
  );
}

export default NavBar;
