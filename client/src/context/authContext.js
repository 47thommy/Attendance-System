import { createContext, useReducer, useEffect } from "react";

export const authContext = createContext();

export const authContextReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return {
        user: state,
      };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authContextReducer, {
    user: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  console.log(state);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
