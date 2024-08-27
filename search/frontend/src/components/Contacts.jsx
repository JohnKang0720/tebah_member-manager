import React, { useState, useEffect } from 'react';
import { useFetch } from '../useFetch';
import axios from 'axios';
import View from './Util/View';
import { useParams } from 'react-router-dom';

function Contacts() {
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [code, setCode] = useState(1);
    const [arr, setArr] = useState([]);
    const param = useParams();

    const [data, fields, error, loading] = useFetch(`main/youth/아동부`, ["korean", "english_name", "mobile", "email", "suite", "street", "f_code"]);

    const filter = () => {
        const url = `http://localhost:5000/contacts/${param.route}`;
        axios.post(url, {
            code: code
        }).then(res => {
            if (res.data.rows.length === 0) {
                alert("No such family code.");
            }
            setArr(res.data.rows);
        }).catch(err => console.log(err));
    }

    return (
        <div style={{ paddingTop: '30px', paddingBottom: '20px', textAlign: 'center' }}>
            <h1> 아동부 연락망</h1>
            <div className="input-div" style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{paddingTop:'22px', paddingBottom:'22px'}}>
                    <input
                        style={{padding:'10px'}}
                        className="form-control"
                        placeholder="가족코드 입력"
                        onChange={e => setCode(e.target.value)}
                    />
                </div>
                <button  style={{ backgroundColor: '#1D6AB4', width: '100px',padding:'10px'}}  className="btn btn-primary" onClick={filter}>검색</button>
            </div>
       
            <View data={[loading, text, data, arr, fields, fields.length]} />
        </div>
    );
}

export default Contacts;
