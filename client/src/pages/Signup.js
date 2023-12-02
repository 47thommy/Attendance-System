import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    identification: "",
  });
  const { signup, error, isLoading } = useSignup();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData passed to the signup:", formData);
    await signup(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Sign up</h3>
      <label>Email</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />
      <label>First Name</label>
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        value={formData.firstName}
      />{" "}
      <label>LastName</label>
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        value={formData.lastName}
      />{" "}
      <label>Identification</label>
      <input
        type="text"
        name="identification"
        onChange={handleChange}
        value={formData.identification}
      />
      <button disabled={isLoading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
