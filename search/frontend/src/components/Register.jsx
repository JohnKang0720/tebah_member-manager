import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword   } from 'firebase/auth';

function Register() {
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    async function createAccount(){
        await createUserWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              navigate("/login")
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
          });
    }
    return (
        <>
            <h1>Tebah Member Registration Page</h1>
            <div>
                <p> Username: </p>
                <input onChange={e => setUser(e.target.value)}/>
                <p> Password: </p>
                <input onChange={e => setPass(e.target.value)}/>
                <br />
                <button onClick={createAccount}> Register </button>
            </div>
        </>
    )
}

export default Register