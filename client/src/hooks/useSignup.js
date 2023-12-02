import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const signup = async ({
    email,
    password,
    lastName,
    firstName,
    identification,
  }) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://127.0.0.1:5000/user/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        lastName,
        firstName,
        identification,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

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

  return { signup, error, isLoading };
};
