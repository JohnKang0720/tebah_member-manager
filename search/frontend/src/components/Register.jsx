import React from 'react'
import { useState } from 'react';
import { createAccount } from '../firebaseFns';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <h1>Tebah Member Registration Page</h1>
            <div>
                <p> Username: </p>
                <input onChange={e => setUser(e.target.value)}/>
                <p> Password: </p>
                <input onChange={e => setPass(e.target.value)}/>
                <br />
                <button onClick={() => createAccount(username, password, navigate)}> Register </button>
            </div>
        </>
    )
}

export default Register