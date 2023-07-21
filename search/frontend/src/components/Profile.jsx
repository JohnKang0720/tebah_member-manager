import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { logout } from '../firebaseFns';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, auth] = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            <h1> Profile </h1>
            {user ? <>
                Email: <p> {user.email} </p>
                Created At: <p> {user.metadata.creationTime} </p>
                UID: <p> {user.uid} </p>  
                <button onClick={() => logout(navigate)}> Sign Out </button>
                </> : "Not signed in"}
            
        </div>
    )
}
