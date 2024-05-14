import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const navigate = useNavigate();
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () => {
    return axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        navigate("/verify-email");
      });
  });

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        const responseData = error.response.data;
        let errorMessage = "An error occurred";

        if (
          responseData &&
          responseData.errors &&
          responseData.errors.password &&
          responseData.errors.password.includes("least 8 characters")
        ) {
          errorMessage = "The password must be at least 8 characters long.";
        } else if (
          responseData &&
          responseData.errors &&
          responseData.errors.email
        ) {
          errorMessage = "This email is already registered";
        }

        setErrors(errorMessage);
        alert(errorMessage);
      });
  };
  const login = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/login", props)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        const responseData = error.response.data;
        let errorMessage = "An error occurred";
        if (
          responseData &&
          responseData.message === "User or password not found"
        ) {
          errorMessage = "User or password not found";
        } else if (
          responseData &&
          responseData.errors &&
          responseData.errors.email
        ) {
          errorMessage = responseData.errors.email[0];
        }
        setErrors(errorMessage);
        alert(errorMessage);
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/";
  };
  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      navigate(redirectIfAuthenticated);

    if (middleware === "auth" && redirectIfAuthenticated)
      navigate(redirectIfAuthenticated);

    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    logout,
  };
};
