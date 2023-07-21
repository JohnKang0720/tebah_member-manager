import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import axios from 'axios'
import DeleteMember from './Util/DeleteMember';
import View from './View';
import EditMember from './Util/EditMember';
function Finance() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [id, setId] = useState(0);
  const [num, setNum] = useState(0);

  const [data, error, loading] = useFetch("finance");

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.name.includes(text) || info.category.includes(text));
      setFiltered(filteredArray)
    }
  }, [text])

  const assignNum = () => {
    axios.put("http://localhost:5000/edit-finance", {
      id: id,
      new_offering: num
    })
      .then(res => {
        console.log(res)
      }).catch(err => console.log(err))
  }

  return (
    <div><h1> 재정부 데이터 </h1>
      <div class="input-div">
        <div className='inputs'>
          <strong> 맴버 검색: </strong>
          <br />
          <input placeholder='검색' onChange={e => setText(e.target.value)} />
          <DeleteMember />
        </div>
        <EditMember />
        <div className='inputs'>
          <strong> Assign offering number: </strong>
          <br />
          <input placeholder="Enter id" onChange={e => setId(e.target.value)} />
          <br />
          <input placeholder="Offering #" onChange={e => setNum(e.target.value)} />
          <br />
          <button onClick={assignNum}> Submit </button>
        </div>
      </div>
      <br/>
      <br/>
      <View data={[loading, text, data, filtered]} />
    </div>
  )
}

export default Finance