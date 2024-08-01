import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate()

  //TODO: check that the email is in the firebase auth
  const process = (email) => {
    axios.get("http://localhost:5000/registered")
      .then(res => {
        res.data.rows.forEach(data => {
          if (data.email.trim() === email.trim()) {
            navigate(`/password/${username}`)
          } else {
            navigate("/")
          }
        })
      }).catch(err => console.log(err))
  }

  return (
    <>
      <h1> Tebah Member Login</h1>
      <div>
        <p> 이메일: </p>
        <input onChange={e => setUser(e.target.value)} />
        <br />
        <br />
        <button class="btn btn-success" onClick={() => process(username)}> Log in </button>
      </div>
    </>
  )
}

export default Login