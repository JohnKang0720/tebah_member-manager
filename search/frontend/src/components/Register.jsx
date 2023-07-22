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
            <h1> 테바 계정등록 </h1>
            <div>
                <p> 이메일: </p>
                <input onChange={e => setUser(e.target.value)}/>
                <p> 비밀번호: </p>
                <input onChange={e => setPass(e.target.value)}/>
                <br />
                <button onClick={() => createAccount(username, password, navigate)}> Register </button>
            </div>
        </>
    )
}

export default Register