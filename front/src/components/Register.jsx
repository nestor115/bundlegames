import React, { useState, useEffect } from 'react';
import { useAuth } from "../hooks/Auth.jsx";

const Register = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
  const [errors, setErrors] = useState("");

  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated:"/boardgames"
  });
       
       

    const handleRegister =(e) => {
        e.preventDefault();
        console.log(e.target.password.value)
        if (e.target.password.value < 8) {
          setErrors("The password must be at least 8 characters long."); // Mensaje de error en inglés
          return;
      }
        register({
            setErrors,
            name: e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value,
            password_confirmation:e.target.password_confirmation.value,

        });

    };

    

    return(
        <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
          {errors && <p className="text-red-500 mb-4"> {errors}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };
export default Register;