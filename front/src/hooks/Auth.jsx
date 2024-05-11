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

        // Verificar si el error es debido a la longitud de la contraseña
        if (
          responseData &&
          responseData.errors &&
          responseData.errors.password &&
          responseData.errors.password.includes("least 8 characters")
        ) {
          errorMessage = "The password must be at least 8 characters long."; // Mensaje de error en inglés para contraseña corta
        } else if (
          responseData &&
          responseData.errors &&
          responseData.errors.email
        ) {
          errorMessage = "This email is already registered"; // Mensaje de error en inglés para email ya registrado
        }

        setErrors(errorMessage);
        alert(errorMessage); // Mostrar alert con el mensaje de error
      });
  };
  //manda setErrors y email, password
  const login = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/login", props)
      .then(() => {
        mutate(); //revalida informacion (hace cambios en la cache)
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

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  // const resetPassword = async ({ setErrors, setStatus, ...props }) => {
  //     await csrf()

  //     setErrors([])
  //     setStatus(null)

  //     axios
  //         .post('/reset-password', { token: params.token, ...props })//quitar los params, no va a funcionar
  //         .then(response =>
  //             navigate('/login?reset=' + btoa(response.data.status)),
  //         )
  //         .catch(error => {
  //             if (error.response.status !== 422) throw error

  //             setErrors(error.response.data.errors)
  //         })
  // }

  const resendEmailVerification = ({ setStatus }) => {
    if (!user.email_verified_at) {
      axios.post("/email/verification-notification").then((response) => {
        if (setStatus != null) {
          setStatus(response.data.status);
        }
      });
    }
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/";
  };
  //si usuario =guest y redirect (url) no es null
  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      navigate(redirectIfAuthenticated);

    if (middleware === "auth" && redirectIfAuthenticated)
        navigate(redirectIfAuthenticated)

    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    // resetPassword,
    resendEmailVerification,
    logout,
  };
};
