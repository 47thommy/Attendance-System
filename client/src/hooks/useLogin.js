import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://127.0.0.1:5000/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json.message);

    if (!response.ok) {
      setIsLoading(false);

      setError(json.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setError(null);
    }
  };

  return { login, error, isLoading };
};
