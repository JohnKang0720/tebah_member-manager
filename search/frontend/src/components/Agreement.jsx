import React, { useState, useEffect } from 'react'
import { useFetch } from '../useFetch';
import axios from 'axios';
import Mapping from './Util/Mapping';

function Agreement() {
  let [data, fields, error, loading] = useFetch(`tebah-family/consent`);
  const [arr, setArr] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([])

  const columns = fields
  const url = `https://tebah-member-manager.vercel.app/tebah-family`

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.korean.includes(query) || info.consent.toLowerCase().includes(query.toLowerCase()));
      setFiltered(filteredArray)
    }
  }, [query])

  return (
    <div>
      <h1> 사진/영상 동의여부 </h1>
      <br />
      <div>
        <div class="input-div" style={{ flexDirection: "column" }}>
          <h5> 맴버 검색창 </h5>
          <div class="inputs">
            <br />
            <input class="form-control" placeholder='Name or Consent' onChange={e => setQuery(e.target.value)} />
          </div>
        </div>
        <br />
      </div>
      <br />
      {!loading && arr.length === 0 ?
        <div className="table3">
          {columns.map(column => {
            return <Mapping param={[data,column["name"], query, filtered]} />
          })}
        </div> : <div className="table3">
          {columns.map(column => {
            return <Mapping param={[arr,column["name"], query, filtered]} />
          })}
        </div>}
    </div>
  )
}

export default Agreement