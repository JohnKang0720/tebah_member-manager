import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function EditMember() {
    const [info, setInfo] = useState({
        id: 0,
        column: "",
        content: ""
    });

    const handleEdit = () => {
        axios.put("http://localhost:5000/edit-main", {
            id: info.id,
            column: info.column.toLowerCase(),
            content: info.content
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className='inputs'>
            <h3> 맴버 수정 </h3>
            <div>
                <p> Enter ID: </p>
                <input value={info.id} onChange={e => setInfo({
                    id: e.target.value,
                    column: info.column,
                    content: info.content
                })} />
                <p> Column: </p>
                <input value={info.column} onChange={e => setInfo({
                    id: info.id,
                    column: e.target.value,
                    content: info.content
                })} />
                <p> New content: </p>
                <input value={info.content} onChange={e => setInfo({
                    id: info.id,
                    column: info.column,
                    content: e.target.value
                })} />
                <button onClick={handleEdit}> Edit </button>
            </div>
        </div>
    )
}

export default EditMember