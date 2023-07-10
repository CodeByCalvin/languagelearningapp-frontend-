import React, { useState } from "react";
import "./App.css";
import Home from "./components/home";
import { Login } from "./components/login";
import { Register } from "./components/register";

export default function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm= (formName) => {
    setCurrentForm(formName)
  }
  
  return (
    <div className="App">
      {
        currentForm == "login" ? <Login onFormSwitch={toggleForm}/> : <Register/>
      }
    </div>
  );
}

