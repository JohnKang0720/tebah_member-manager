import React, { useEffect, useState } from 'react';
import { authenticate } from '../firebaseFns';
import { useNavigate, useParams } from 'react-router-dom';

export default function Password() {
    const [pw, setPw] = useState("");
    const navigate = useNavigate();
    const user = useParams();
    const [username, setUser] = useState("");

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{
                fontWeight: '700',
                marginBottom: '15px',
            }}>Password</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (username === '') {
                    authenticate(user.username, pw, navigate)
                } else {
                    authenticate(username, pw, navigate)
                }
            }}>
                <input
                    style={{
                        border: 'none',
                        padding: '15px',
                        margin: '5px 0',
                        borderRadius: '4px',
                        width: '300px',
                    }}
                    defaultValue={user.username}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder='New Username (optional)'
                />
                <br />
                <input
                    style={{
                        border: 'none',
                        padding: '15px',
                        margin: '5px 0',
                        borderRadius: '4px',
                        width: '300px',
                    }}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                <br />
                <br />
                <button
                    type="submit"
                    className="btn btn-success"
                    style={{
                        padding: '15px 80px',
                        width: '300px',
                        fontSize: '16px',
                        marginTop: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#1D6AB4',
                        border: 'none',
                    }}
                    // onClick={() => { 
                    //     if(username === '') {
                    //         authenticate(user.username, pw, navigate)
                    //     } else {
                    //         authenticate(username, pw, navigate)
                    //     }
                    //  }}
                >
                    Log in
                </button>
            </form>
        </div>
    );
}
