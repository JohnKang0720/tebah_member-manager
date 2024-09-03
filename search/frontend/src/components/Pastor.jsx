import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import View from './Util/View';
import axios from 'axios';


function Pastor() {
  const [code, setCode] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [arr, setArr] = useState([]);
  const [f, setFields] = useState([])
  const [data, fields, error, loading] = useFetch("main/pastors/-1", ["korean", "english_name", "offering_num", "registered_date"]);

  const filter = () => {
    console.log(code)
    axios.get(`https://tebah-member-manager.vercel.app/main/pastors/${code}`)
      .then(res => {
        if (res.data.rows.length === 0) {
          alert("No such family code.");
        }
        setFields(res.data.fields)
        setArr(res.data.rows);
      }).catch(err => console.log(err));
  }

  return (
    <div style={{ paddingTop: '30px', paddingBottom: '30px', textAlign: 'center' }}>
      <h1> 교역자 데이터 </h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} class="input-div">
        <form onSubmit={e => {
          e.preventDefault()
          filter()
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} class="inputs">
            <input style={{ padding: '10px', width: '200px' }} className="form-control" placeholder='가족코드' type="text" onChange={e => setCode(e.target.value)} />
            <button style={{ backgroundColor: '#1D6AB4', width: '100px', padding: '10px' }} className="btn btn-primary" type="submit">검색</button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <View data={[loading, "", data, arr, fields, fields.length]} />
    </div>
  )
}

export default Pastor