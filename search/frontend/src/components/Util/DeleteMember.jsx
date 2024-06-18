import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function DeleteMember() {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        axios.delete(`https://tebah-member-manager.vercel.app/main/${name}`, {
        })
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <div class="inputs">
            <h5> 맴버 삭제: </h5>
            <input style={{width: "300px"}} class="form-control input-sm" placeholder='맴버 이름' onChange={e => setName(e.target.value)} />
            <br />
            <button class="btn btn-danger" onClick={handleSubmit}> 삭제 </button>
        </div>
    )
}

export default DeleteMember