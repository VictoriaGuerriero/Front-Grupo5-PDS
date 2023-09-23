import React, { useState, useEffect } from "react";
const CREATE_USER_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

        
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = {
            email: event.target.email.value,
            username: event.target.username.value,
            password: event.target.password.value
        }
        console.log("ewoeiuoerwuioerw",formData)
        setEmail(formData.email);
        setPassword(formData.password);
        setUsername(formData.username);
        console.log(email, password, username)

    }
    
    useEffect(() => {
        if (email&&password&&username) {
        fetch(CREATE_USER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((data) => console.log("User created successfully",data))
            .catch((err) => {
                console.log(err.message)
            });
        }
    }, [email, password, username]);

    const handleClick = () => {
        window.location.replace('http://localhost:3000/home')
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900"> Username </label>
                        <div className="mt-2">
                            <input id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button onClick={handleClick} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Register