import React, { useState, useEffect } from 'react';
import { useFetch } from '../useFetch';
import axios from 'axios';
import View from './Util/View';
import { useParams } from 'react-router-dom';

function Contacts() {
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState([]);
    const param = useParams();

    const [data, fields, error, loading] = useFetch(`main/youth/아동부`, ["korean", "english_name", "mobile", "email", "suite", "street", "f_code"]);

    useEffect(() => {
        if (data) {
          let filteredArray = data.filter(info => info["한글이름"].includes(text) || info["영문이름"].toLowerCase().includes(text.toLowerCase()));
          setFiltered(filteredArray)
        }
      }, [text])
    return (
        <div style={{ paddingTop: '30px', paddingBottom: '20px', textAlign: 'center' }}>
            <h1> 아동부 연락망</h1>
            <div className="input-div" style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                맴버검색: <input style={{padding:'10px', width:'200px'}} className="form-control" placeholder='이름' type="text" onChange={e => setText(e.target.value)} />
            </div>
            <View data={[loading, text, data, filtered, fields, fields.length]} />
        </div>
    );
}

export default Contacts;
