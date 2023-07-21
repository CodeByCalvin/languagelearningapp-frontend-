import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const LoginSignUp = ({ isSigningUp, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      {isSigningUp ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e, { name: name, email: email, password: password, confirmPass: confirmPass });
          }}
        >
          <Form.Group controlId="formName">
            <div className="form-input-box">
              <Form.Control
                type="text"
                className="form-input-inner"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <div className="form-input-box">
              <Form.Control
                type="email"
                className="form-input-inner"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <div className="form-input-box">
              <Form.Control
                type="password"
                className="form-input-inner"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <div className="form-input-box">
              <Form.Control
                className="form-input-inner"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <button className="login-register-btn-bottom" type="submit">
            Register
          </button>
        </Form>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e, { email: email, password: password });
          }}
        >
          <Form.Group controlId="formEmail">
            <div className="form-input-box">
              <Form.Control
                type="email"
                className="form-input-inner"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <div className="form-input-box">
              <Form.Control
                type="password"
                placeholder="Password"
                className="form-input-inner"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <button className="login-register-btn-bottom" type="submit">
            Log in
          </button>
        </Form>
      )}
    </>
  );
};
