import React from 'react'
import { useState } from 'react';
import { createAccount } from '../firebaseFns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [password2, setPass2] = useState("");
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");

    const navigate = useNavigate();

    const checkValidThenCreate = () => {
        if (password == password2) {
            createAccount(username, password, tel, navigate)
        } else {
            alert("Error!")
        }
    }

    return (
        <>
            <h1> 테바 계정등록 </h1>
            <div class="input-div" style={{ flexDirection: "column" }}>
                <div class="inputs">
                    <p> 이메일: </p>
                    <input class="form-control" onChange={e => setUser(e.target.value)} />
                    <p> 비밀번호: </p>
                    <input class="form-control" onChange={e => setPass(e.target.value)} />
                    <p> 비밀번호 (체크): </p>
                    <input class="form-control" onChange={e => setPass2(e.target.value)} />
                    <p> FULL NAME: </p>
                    <input class="form-control" onChange={e => setName(e.target.value.trim())} />
                    <p> Telephone: </p>
                    <input class="form-control" onChange={e => setTel(e.target.value)} />
                    <br />
                    <button class="btn btn-danger" onClick={() => checkValidThenCreate()}> Register </button>
                </div>
            </div>
        </>
    )
}

export default Register