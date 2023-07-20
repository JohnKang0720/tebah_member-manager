import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, auth] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth).then(() => {
            console.log("Logged out!")
            navigate("/")
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1> Profile </h1>
            {user ? <>
                Email: <p> {user.email} </p>
                Created At: <p> {user.metadata.creationTime} </p>
                UID: <p> {user.uid} </p>  
                <button onClick={logout}> Sign Out </button>
                </> : "Not signed in"}
            
        </div>
    )
}
