import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import axios from 'axios'
import View from './View';
import { getAuth } from 'firebase/auth';

function Contacts({ route }) {
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [code, setCode] = useState(1);
    const [arr, setArr] = useState([]);

    const [data, error, loading] = useFetch(`contacts/${route}`);

    const filter = () => {
        axios.get(`http://localhost:5000/contacts-search/${route}/${code}`, {
        }).then(res => {
            console.log(res)
            setArr(res.data)
        }).catch(err => console.log(err))
    }

    return (
        <div><h1> 기본주소록 </h1>
            {/* <strong> Search member: </strong>
            <br /> */}
            {/* <input placeholder='검색' onChange={e => setText(e.target.value)} />
            <br />
            <br /> */}
            <br />
            <strong> Search family: </strong>
            <br />
            <input placeholder='Enter family code' onChange={e => setCode(e.target.value)} />
            <br />
            <button onClick={filter}> Search </button>
            <br />
            <br />
            <br />
            <View data={[loading, text, data, filtered]} />
        </div>
    )
}

export default Contacts