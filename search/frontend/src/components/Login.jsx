import React from 'react'
import { authenticate } from '../firebaseFns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate()

  return (
    <>
      <h1> Tebah Member Login</h1>
      <div>
        <p> Username: </p>
        <input onChange={e => setUser(e.target.value)} />
        <p> Password: </p>
        <input onChange={e => setPass(e.target.value)} />
        <br />
        <button onClick={() => authenticate(username, password, navigate)}> Log in </button>
      </div>
    </>
  )
}

export default Login