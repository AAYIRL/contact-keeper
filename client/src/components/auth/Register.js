import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Email already exists") {
      setAlert(error, "danger");
      clearError();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setAlert("Please fill in the required fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords don't match..Check Again", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={onChange}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm Password'
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
