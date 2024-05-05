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

