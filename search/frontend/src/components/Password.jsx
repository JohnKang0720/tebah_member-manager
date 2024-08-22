import React, {useEffect, useState} from 'react'
import { authenticate } from '../firebaseFns';
import { useNavigate, useParams } from 'react-router-dom';


export default function Password() {
    const [pw, setPw] = useState("")
    const navigate = useNavigate()
    const user = useParams();
    const [username, setUser] = useState("")
    
    return (
        <>
            <h1> Password</h1>
            <h5>Username: {user.username}</h5>
            <input onChange={e => {
                setUser(e.target.value)
                }} placeholder='New Username (optional)'/>
            <br />
            <input onChange={e => setPw(e.target.value)} placeholder="Password" />
            <br />
            <br />
            <button class="btn btn-success" onClick={() => {
                if (username !== "") authenticate(username, pw, navigate)
                else authenticate(user.username, pw, navigate)
                } }> Log in </button>
        </>
    )
}
