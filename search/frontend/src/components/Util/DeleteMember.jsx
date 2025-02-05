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
        axios.post("https://tebah-member-manager.vercel.app/archive", {
            name: name
        }).then(res => {
            console.log("Archived")
            alert("Archived!")
        }).catch(err => console.log(err))
    }

    return (
        <form onSubmit={e => {
            e.preventDefault()
            handleArchive()
        }}>
            <div style={{ paddingTop: '30px' }} class="inputs">
                <h2> Archive Member </h2>
                <br />
                <input style={{ width: "350px", marginBottom: '15px' }} class="form-control input-sm" placeholder='맴버 이름' onChange={e => setName(e.target.value)} />
                <div>
                    {/* <button style={{width:"170px"}} class="btn btn-danger" onClick={handleSubmit}> Delete </button> */}
                    <button style={{ width: "170px", backgroundColor: 'green', border: 'green' }} class="btn btn-danger" type="submit"> Archive </button>
                </div>
            </div>
        </form>
    )
}

export default DeleteMember
