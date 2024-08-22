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

    const handleArchive = () => {
        axios.post("http://localhost:5000/archive", {
            name: name
        }).then(res => {
            console.log("Archived")
        }).catch(err => console.log(err))
    }

    return (
        <div class="inputs">
            <h2> Delete/Archive Member </h2>
            <br />
            <input style={{ width: "300px" }} class="form-control input-sm" placeholder='맴버 이름' onChange={e => setName(e.target.value)} />
            <div>
                <button class="btn btn-danger" onClick={handleSubmit}> Delete </button>
                <button class="btn btn-danger" onClick={handleArchive}> Archive </button>
            </div>
        </div>
    )
}

export default DeleteMember