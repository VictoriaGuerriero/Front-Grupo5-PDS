import React, { useState, useEffect } from "react";

const LOGIN_USER_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/login/'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const handleEmailChange = (event: any) => {
      setEmail(event.target.value);
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
            email: email,
            password: password,
          }),
        });
  
        if (response.ok) {
          // El inicio de sesión fue exitoso, redirige al usuario a la página de inicio o realiza alguna acción necesaria.
          // Por ejemplo, puedes redirigir al usuario a la página de inicio.
          window.location.href = '/home';
        } else {
          
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
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
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" > Create an account </a> {/*onClick={hanldeIsLogin}*/}
                </p>
            </div>
        </div>
    )
}

export default Login;