import React, { useState } from "react";


export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
      <>
      <form onSubmit={handleSubmit}>
        <label htmlfor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
        <label htmlfor="password">password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="********" id="password" name="password"/>
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch('register')} >Already Have An Account? Register Here</button>
      </>
  )
}
