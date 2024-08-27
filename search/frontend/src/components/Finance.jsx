import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../useFetch'
import axios from 'axios'
import DeleteMember from './Util/DeleteMember';
import View from './Util/View';
import EditMember from './Util/EditMember';


// TODO: CATCH duplicated offering numbers
function Finance() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [id, setId] = useState(0);
  const [num, setNum] = useState("");

  const [data, fields, error, loading] = useFetch("main/finance", ["id", "korean", "english_name", "offering_num", "registered_date"]);

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.korean.includes(text) || info.english_name.toLowerCase().includes(text.toLowerCase()));
      setFiltered(filteredArray)
    }
  }, [text])

  const isDuplicate = (num) => {
    let dup = false
    data.map(d => {
      if (d.offering_num === num) {
        dup = true
      }
    })
    return dup
  }

  const assignNum = () => {
    if (isDuplicate(num)) {
      alert("Invalid offering number!")
    } else {
      axios.put(`http://localhost:5000/main/finance/${id}/${num}`, {
      })
        .then(res => {
          window.location.reload()
        }).catch(err => console.log(err))
    }
  }

  return (
    <div><h1> 재정부 데이터 </h1>
      <br />
      <div class="input-div">
        <div className='inputs'>
          <h5> 맴버 검색: </h5>
          <br />
          <input class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
        <div className='inputs'>
          <h5> Assign offering #: </h5>
          <br />
          <input class="form-control" placeholder="Enter id" onChange={e => setId(e.target.value)} />
          <br />
          <input class="form-control" placeholder="Offering #" onChange={e => setNum(e.target.value)} />
          <br />
          <button class="btn btn-success" onClick={assignNum}> Submit </button>
        </div>
      </div>
      <br />
      <br />
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </div>
  )
}

export default Finance