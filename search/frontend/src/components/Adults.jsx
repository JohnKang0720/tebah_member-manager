import React, { useState, useEffect } from 'react';
import { useFetch } from '../useFetch';
import axios from 'axios';
import View from './Util/View';

export default function Adults() {
    const [code, setCode] = useState(1);
    const [arr, setArr] = useState([]);
    const [f, setFields] = useState([])
    const [data, fields, error, loading] = useFetch(`main/adults/-1`, []);

    useEffect(() => {
        setFields(fields)
    }, [data])

    const filter = (e) => {
        e.preventDefault()
        axios.get(`https://tebah-member-manager.vercel.app/main/adults/${code}`)
            .then(res => {
                if (res.data.rows.length === 0) {
                    alert("No such family code.");
                }
                setFields(res.data.fields)
                setArr(res.data.rows);
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <h1>장년부 기록 </h1>
            <form onSubmit={filter}>
                <div className="input-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <input style={{ padding: '10px', width: '200px' }} className="form-control" placeholder='가족코드' type="text" onChange={e => setCode(e.target.value)} />
                    <button style={{ backgroundColor: '#1D6AB4', width: '100px', padding: '10px' }} className="btn btn-primary" type="submit">검색</button>
                </div>
            </form>
            <br />
            {!loading ? <View data={[loading, "", data, arr, f, f.length]} /> : null}
        </div>
    )
}
