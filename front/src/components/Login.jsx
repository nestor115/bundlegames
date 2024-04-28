import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth.jsx";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
    <div>
      <h1>Login</h1>
      {errors ? "Error" + errors : null}
      <form action="" onSubmit={(e) => handleLogin(e)}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

//   const handleLogin2 = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*", // Si es necesario para CORS
//         },
//         credentials: "include", // Para incluir las cookies en la solicitud
//         body: JSON.stringify({ email, password }),
//       });
//       const responseData = await response.json();

//       if (response.ok) {
//         console.log(responseData);
//         navigate("/boardgames");
//         // Aquí puedes manejar la redirección o el estado de autenticación en la aplicación React
//       } else {
//         // Si la respuesta no es exitosa, maneja el error
//         throw new Error(responseData.message || "Login failed");
//       }
//       // Aquí puedes manejar la redirección o el estado de autenticación en la aplicación React
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };
