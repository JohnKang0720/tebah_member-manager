import React, {  } from 'react'
import { useState } from 'react';
import axios from 'axios';
import View from './View';
import styles from "../Database/Database.module.css"; 
import { useFetch } from '../../useFetch';

function EditMember() {
    const [info, setInfo] = useState({
        id: 0,
        column: "",
        content: ""
    });
    const [arr, setArr] = useState([]);
    const [text, setText] = useState("");

    const [data, fields, error, loading] = useFetch("database/all", [
        "id",
        "korean",
        "english_name",
        "mobile",
        "email",
        "suite",
        "street",
    ]);


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
        <div style={{marginTop: '30px'}} className='inputs'>
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
                <input class="form-control" value={info.column} placeholder='Column' onChange={e => setInfo({
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
                <br />
                <br />
                <button style = {{width: '220px'}} class="btn btn-success" onClick={handleEdit}> 수정 </button>
            </div>
            <hr />
            <div className={styles["database-container"]}>
                <View data={[loading, text, data, arr, fields, fields.length]} />
            </div>
        </div>
    )
}

export default EditMember