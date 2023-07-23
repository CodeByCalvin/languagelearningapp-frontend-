import React, { useState, useContext } from "react";
import { LoginSignUp } from "../components/forms/LoginSignUp";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "../css/Landing.css";
import ApiServerClient from "../ApiServerClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

export const Landing = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e, payload) => {
    e.preventDefault();
    console.log(payload);
    if (isSigningUp) {
      const register = await ApiServerClient.auth("signup", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        confirmPass: payload.confirmPass
      });
    } else {
      try {
        const login = await ApiServerClient.auth("login", {
          email: payload.email,
          password: payload.password,
        });

        console.log(login);

        // Redirect to homr page if login is successful
      if (login) {
        console.log("login successful");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        console.log("login failed");
      }
      } catch (error) {
        console.log(error);
      }
    

    
    }
  };

  const [isSigningUp, setIsSigningUp] = useState(false);

  return (
    <motion.div
      className="wotd"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid className="landing-container flex">
        <div>
          {!isSigningUp ? (
            <div>
              <h1>Log in</h1>
              <div className="have-account">
                <h2>Or why don't you</h2>
                <button
                  className="login-register-btn"
                  onClick={() => {
                    setIsSigningUp(!isSigningUp);
                  }}
                >
                  {isSigningUp ? "Log in" : "Register"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1>Register</h1>
              <div className="have-account">
                <h2>Already have an account?</h2>
                <button
                  className="login-register-btn"
                  onClick={() => {
                    setIsSigningUp(!isSigningUp);
                  }}
                >
                  {isSigningUp ? "Log in" : "Register"}
                </button>
              </div>
            </div>
          )}
        </div>
        <LoginSignUp isSigningUp={isSigningUp} handleSubmit={handleSubmit} />
      </Container>
    </motion.div>
  );
};
