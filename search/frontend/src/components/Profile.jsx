import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App'

export default function Profile() {
    const user = useContext(UserContext);
    return (
        <div>
            <h1> Profile </h1>
            {user ? <>
                Email: <p> {user.email} </p>
                Created At: <p> {user.metadata.creationTime} </p>
                UID: <p> {user.uid} </p>  
                <button> Sign Out </button>
                </> : "Not signed in"}
            
        </div>
    )
}
