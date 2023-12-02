import { useContext } from "react";
import { authContext } from "../context/authContext";

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw Error("use the context only inside the context provider");
  }
  return context;
};
