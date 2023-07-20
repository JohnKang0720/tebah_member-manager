import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function DeleteMember() {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        axios.post("http://localhost:5000/delete-main", {
            name: name
        })
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <div className='inputs'>
            <strong> 맴버 삭제: </strong>
            <br />
            <input placeholder='맴버 이름' onChange={e => setName(e.target.value)} />
            <br />
            <button onClick={handleSubmit}> Delete </button>
        </div>
    )
}

export default DeleteMember