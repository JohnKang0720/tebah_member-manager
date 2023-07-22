import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function DeleteMember() {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        axios.delete(`http://localhost:5000/main/${name}`, {
        })
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <div className='inputs'>
            <h5> 맴버 삭제: </h5>
            <input placeholder='맴버 이름' onChange={e => setName(e.target.value)} />
            <br />
            <button onClick={handleSubmit}> 삭제 </button>
        </div>
    )
}

export default DeleteMember