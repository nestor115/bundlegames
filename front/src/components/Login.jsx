import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth.jsx";
const Login = () => {
  const [errors, setErrors] = useState("");
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/boardgames",
  });

  const handleLogin = function (e) {
    e.preventDefault();
    login({
      setErrors,
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
      {errors && <p className="text-red-500 mb-4"> {errors}</p>}
      <form onSubmit={handleLogin}>
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;

