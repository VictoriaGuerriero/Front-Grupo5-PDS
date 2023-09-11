import React, { useEffect, useState } from 'react'


function NavBar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24">
                <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
            </svg>
        </nav>
    )
}

export default NavBar;