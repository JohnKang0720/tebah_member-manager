import React, { useState, useEffect } from 'react'
import { useFetch } from '../useFetch';
import axios from 'axios';
import Mapping from './Util/Mapping';

function Family() {
  let [data, fields, error, loading] = useFetch(`tebah-family`);
  const [arr, setArr] = useState([]);
  const [memberId, setMemberId] = useState(0);

  const columns = fields
  const url = `https://tebah-member-manager.vercel.app/tebah-family`

  const filter = () => {
    axios.post(url, {
      search_id: memberId
    }).then(res => {
      setArr(res.data.rows)
      if (res.data.length === 0) {
        alert(`No such member with name ${memberId}.`)
      }
    }
    )
      .catch(err => console.log(err))
  }



  return (
    <div>
      <h1> 테바 가족정보 </h1>
      <br />
      <div>
        <div class="input-div" style={{ flexDirection: "column" }}>
          <h5> 가족정보 검색창 </h5>
          <div class="inputs">
            <br />
            <input class="form-control" placeholder='이름' onChange={e => setMemberId(e.target.value)} />
            <br />
            <button class="btn btn-primary" onClick={filter}> 검색 </button>
            <br />
          </div>
        </div>
        <br />
      </div>
      <br />
      {!loading && arr.length === 0 ?
        <div className="table2">
          {columns.map(column => {
            return <Mapping param={[data,column["name"]]} />
          })}
        </div> : <div className="table2">
          {columns.map(column => {
            return <Mapping param={[arr,column["name"]]} />
          })}
        </div>}
    </div>
  )
}

export default Family