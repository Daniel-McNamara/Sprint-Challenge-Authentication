import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { login } from "../../actions/login";
import { connect } from "react-redux";

const schema = Yup.object().shape({
  Username: Yup.string().required("Username is required"),
  Password: Yup.string().required("Password is Required")
});

const Login = ({ login }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const loginUser = () => {
    login(formData, history);
  };

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <h1>Sign In</h1>

      <label>
        Username
        <input
          type="text"
          placeholder="Username"
          name="Username"
          id="username"
          onChange={handleChange}
          ref={register({ required: true, max: 20, min: 3, maxLength: 80 })}
        />
        {errors.Username && <p>{errors.Username.message}</p>}
      </label>

      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          name="Password"
          id="password"
          onChange={handleChange}
          ref={register({ required: true, min: 6 })}
        />
        {errors.Password && <p>{errors.Password.message}</p>}
      </label>

      <button type="submit" onClick={handleSubmit(loginUser)}>
        Sign In
      </button>

      <label>
        Don't have an account? &nbsp;
        <Link to="/Register" style={{ color: "white" }}>
          Sign Up
        </Link>
      </label>
    </form>
  );
};

export default connect(null, { login })(Login);