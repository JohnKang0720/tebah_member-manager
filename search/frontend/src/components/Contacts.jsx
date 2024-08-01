import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import axios from 'axios'
import View from './View';
import { useParams } from 'react-router-dom';

function Contacts() {
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [code, setCode] = useState(1);
    const [arr, setArr] = useState([]);
    const param = useParams()

    const [data, fields, error, loading] = useFetch(`contacts/${param.route}`);

    const filter = () => {
        const url = `https://tebah-member-manager.vercel.app/contacts/${param.route}`
        axios.post(url, {
            code: code
        }).then(res => {
            if (res.data.rows.length === 0) {
                alert("No such family code.")
            }
            setArr(res.data.rows)
        }).catch(err => console.log(err))
    }

    return (
        <div><h1> 장년/아동 연락망 </h1>
            {/* <strong> Search member: </strong>
            <br /> */}
            {/* <input placeholder='검색' onChange={e => setText(e.target.value)} />
            <br />
            <br /> */}
            <br />

            <div class="input-div" style={{ flexDirection: "column" }}>
                <div> <input class="form-control" placeholder='가족코드 입력' onChange={e => setCode(e.target.value)} /> </div>
                <button class="btn btn-primary" onClick={filter}> 검색 </button>
            </div>
            <br />
            <br />
            <View data={[loading, text, data, arr]} />
        </div>
    )
}

export default Contacts