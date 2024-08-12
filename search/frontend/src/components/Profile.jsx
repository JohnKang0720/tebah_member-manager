import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { logout } from '../firebaseFns';
import { useNavigate } from 'react-router-dom';

// Put other basic information
export default function Profile() {
    const [user, auth] = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            <h1> 프로필 </h1>
            {user ? <>
                이메일: <p> {user.email} </p>
                생성날짜: <p> {user.metadata.creationTime} </p>
                UID: <p> {user.uid} </p>  
                <button class="btn btn-danger" onClick={() => logout(navigate)}> 로그아웃 </button>
                </> : "Not signed in"}
            
        </div>
    )
}
