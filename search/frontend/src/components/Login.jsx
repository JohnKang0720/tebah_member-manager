import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate()

  //TODO
  const registered = (u) => {
    return true
  }

  const process  = (u) => {
    if (registered(u)) navigate(`/password/${username}`)
    else navigate("/")
  }

  return (
    <>
      <h1> Tebah Member Login</h1>
      <div>
        <p> Username: </p>
        <input onChange={e => setUser(e.target.value)} />
        <br />
        <br />
        <button class="btn btn-success" onClick={() => process(username)}> Log in </button>
      </div>
    </>
  )
}

export default Login