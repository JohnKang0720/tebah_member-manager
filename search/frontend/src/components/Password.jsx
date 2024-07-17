import React, {useEffect, useState} from 'react'
import { authenticate } from '../firebaseFns';
import { useNavigate, useParams } from 'react-router-dom';


export default function Password() {
    const [pw, setPw] = useState("")
    const navigate = useNavigate()
    const user = useParams();

    return (
        <>
            <p> Password: </p>
            <input onChange={e => setPw(e.target.value)} />
            <br />
            <br />
            <button class="btn btn-success" onClick={() => authenticate(user, pw, navigate) }> Log in </button>
        </>
    )
}
