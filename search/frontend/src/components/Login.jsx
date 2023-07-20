import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { useState } from 'react';

function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate(); //create inheritance.

  async function authenticate() {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        console.log("logged in!");

        if (user.email.includes("admin")) {
          navigate("/main"); //
        } else if (user.email.includes("youth")) {
          navigate("/youth");
        } else if (user.email.includes("secondary")) {
          navigate("/secondary");
        } else if (user.email.includes("child")) {
          navigate("/child");
        } else if (user.email.includes("/finance")){
          navigate("/finance");
        } else {
          alert("Invalid email! Register again.")
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  return (
    <>
      <h1> Tebah Member Login</h1>
      <div>
        <p> Username: </p>
        <input onChange={e => setUser(e.target.value)} />
        <p> Password: </p>
        <input onChange={e => setPass(e.target.value)} />
        <br />
        <button onClick={authenticate}> Log in </button>
      </div>
    </>
  )
}

export default Login