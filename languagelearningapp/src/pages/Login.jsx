import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/AuthContext";
import { logoutUser } from "../utils/auth";
import ApiServerClient from "../ApiServerClient";
import "../css/Landing.css";
import { Container } from "react-bootstrap";

export default function Login() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(user);
    if (user && user.name !== "Guest") {
      logoutUser(user, setUser, navigate, toast);
    } else if (user && user.name === "Guest") {
      setUser(null);
      toast.success("Guest logged out.");
    }
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data; // destructuring data object
    try {
      // payload to be sent to the server for registration
      const res = await ApiServerClient.auth("login", {
        email,
        password,
      });
      // When successful registration, clear the form
      setData({});
      toast.success("Login successful.");
      // set user in context
      console.log(res);
      setUser(res);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <Container fluid className="landing-container">
      <div>
        <h1>Log in</h1>
        <div className="have-account">
          <h2>Or why don't you</h2>
          <button 
          onClick={() => navigate("/register")}
          className="login-register-btn">Register</button>
        </div>
      </div>
      <form
        onSubmit={loginUser}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="form-input-box">
          <input
            type="email"
            placeholder="enter email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="form-input-inner"
          />
        </div>
        <div className="form-input-box">
          <input
            type="password"
            placeholder="enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="form-input-inner"
          />
        </div>
        <button className="login-register-btn-bottom" type="submit">
          Login
        </button>
      </form>
      <button
        className="guest-btn"
        onClick={() => {
          setUser({ name: "Guest" });
          navigate("/");
          toast.success("Logged in as Guest.");
        }}
      >
        Guest
      </button>
    </Container>
  );
}
