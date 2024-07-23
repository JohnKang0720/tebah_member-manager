import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import DeleteMember from './Util/DeleteMember';
import View from './View';

function Pastor() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, fields, error, loading] = useFetch("main/pastors");

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.english_name.toLowerCase().includes(text.toLowerCase()));
      setFiltered(filteredArray)
    }
  }, [text])

  return (
    <div>
      <h1> 교역자 데이터 </h1>
      <br/>
      <br/>
      <div class="input-div">
        <div class="inputs">
          <h5> 맴버 검색: </h5>
          <br />
          <input  class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br/>
      <br/>
      <View data={[loading, text, data, filtered]} />
    </div>
  )
}

export default Pastor