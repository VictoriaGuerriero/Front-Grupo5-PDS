import React, { useState } from "react";
import { useUser } from '../contexts/userContext'; 
import { useNavigate } from 'react-router-dom'; 

const LOGIN_USER_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/login/'
const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/students/'


function Login() {
    const { setUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // Estado para mostrar/ocultar el mensaje de error
    const navigate = useNavigate();
    
    const handleEmailChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await fetch(LOGIN_USER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
              const data = await response.json();
              console.log(data)
              const userId = data.id;
              setUser(data.user)
              //console.log(userId);
                
              navigate(`/home/${userId}/`);
            } else {
                // Mostrar mensaje de error si el inicio de sesión falla
                const data = await response.json();
                setError(data.message);
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {showPopup && error && (
                    <div className="bg-red-200 border border-red-600 text-red-900 px-4 py-3 rounded relative mb-4" role="alert">
                        <button onClick={closePopup} className="absolute top-0 right-0 mt-2 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-900" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.293 5.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 1 1 1.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <strong className="font-bold">Error:</strong> {error}
                    </div>
                )}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="username" name="username" type="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleEmailChange} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handlePasswordChange} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create an account </a>
                </p>
            </div>
        </div>
    )
}

export default Login;
