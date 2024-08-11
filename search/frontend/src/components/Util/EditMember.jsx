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
        axios.put("http://localhost:5000/main", {
            id: info.id,
            column: info.column.toLowerCase(),
            content: info.content
        }).then(res => {
            console.log(res)
            alert("Edited!")
        })
            .catch(err => console.log(err))
    }

    return (
        <div className='inputs'>
            <h5> 맴버 수정 </h5>
            <div>
                <br />
                <input class="form-control" placeholder='ID' onChange={e => setInfo({
                    id: e.target.value,
                    column: info.column,
                    content: info.content
                })} />
                <br />
                <br />
                <input class="form-control"  value={info.column} placeholder='Column' onChange={e => setInfo({
                    id: info.id,
                    column: e.target.value,
                    content: info.content
                })} />
                <br />
                <br />
                <input class="form-control" value={info.content} placeholder='New content' onChange={e => setInfo({
                    id: info.id,
                    column: info.column,
                    content: e.target.value
                })} />
                <br/>
                <br />
                <button class="btn btn-success" onClick={handleEdit}> 수정 </button>
            </div>
        </div>
    )
}

export default EditMember