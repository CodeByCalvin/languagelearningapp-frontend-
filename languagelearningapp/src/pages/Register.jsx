import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/AuthContext";
import { logoutUser } from "../utils/auth";
import ApiServerClient from "../ApiServerClient";
import "../css/Landing.css";
import { Container } from "react-bootstrap";

export default function Register() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && user.name !== "Guest") {
      logoutUser(user, setUser, navigate, toast);
    } else if (user && user.name === "Guest") {
      setUser(null);
      toast.success("Guest logged out.");
    }
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data; // destructuring data object
    try {
      // payload to be sent to the server for registration
      const res = await ApiServerClient.auth("register", {
        name,
        email,
        password,
      });
      // When successful registration, clear the form
      setData({});
      toast.success("Registration successful.");
      // set user in context (why would i want to do this?)
      // setUser(res);
      navigate("/login");
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
        <h1>Register</h1>
        <div className="have-account">
          <h2>Or why don't you</h2>
          <button onClick={() => navigate("/login")} className="login-register-btn">
            Login
          </button>
        </div>
      </div>
      <form
        onSubmit={registerUser}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="form-input-box">
          <input
            type="text"
            placeholder="enter name..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="form-input-inner"
          />
        </div>
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
          Register
        </button>
      </form>
    </Container>
  );
}
