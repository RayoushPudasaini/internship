import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && input.password !== input.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    if (!validateEmail(input.email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);

    if (!validatePassword(input.password)) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);

    if (isSignup) {
      // Simulate successful registration
      setRegistrationSuccess(true);

      // Reset the form and navigate to login page after a delay
      setTimeout(() => {
        setIsSignup(false);
        setInput({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPasswordMismatch(false);
        setEmailError(false);
        setPasswordError(false);
        setRegistrationSuccess(false);
        navigate("/login"); // Navigate to login page
      }, 2000); // Delay for 2 seconds
    } else {
      // Simulate successful login
      setLoggedIn(true);

      // Reset the form and navigate to authenticated page after a delay
      setTimeout(() => {
        setIsSignup(false);
        setInput({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPasswordMismatch(false);
        setEmailError(false);
        setPasswordError(false);
        setLoggedIn(false);
        navigate("/authenticated"); // Navigate to authenticated page
      }, 2000); // Delay for 2 seconds
    }
  };

  const resetState = () => {
    setIsSignup(!isSignup);
    setInput({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordMismatch(false);
    setEmailError(false);
    setPasswordError(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 10px #ccc",
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>

          {registrationSuccess && (
            <Typography variant="body1" color="green">
              Registration successful! You can now log in.
            </Typography>
          )}

          {loggedIn && (
            <Typography variant="body1" color="green">
              Welcome! You are now logged in.
            </Typography>
          )}

          {isSignup && (
            <TextField
              onChange={handleChange}
              name="name"
              value={input.name}
              margin="normal"
              type="text"
              variant="outlined"
              placeholder="Name"
            />
          )}

          <TextField
            onChange={handleChange}
            name="email"
            value={input.email}
            margin="normal"
            type="email"
            variant="outlined"
            placeholder="Email"
            error={emailError}
            helperText={emailError && "Please enter a valid email"}
          />

          <TextField
            onChange={handleChange}
            name="password"
            value={input.password}
            margin="normal"
            type="password"
            variant="outlined"
            placeholder="Password"
            error={passwordError}
            helperText={
              passwordError &&
              "Password must be at least 8 characters long and include a number and an alphabet"
            }
          />

          {isSignup && (
            <TextField
              onChange={handleChange}
              name="confirmPassword"
              value={input.confirmPassword}
              margin="normal"
              type="password"
              variant="outlined"
              placeholder="Confirm password"
              error={passwordMismatch}
              helperText={passwordMismatch && "Passwords do not match"}
            />
          )}

          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="primary"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button onClick={resetState} sx={{ marginTop: 3, borderRadius: 3 }}>
            Not {isSignup ? "Login" : "Signup"} ? Click here
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
