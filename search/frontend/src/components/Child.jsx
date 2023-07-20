import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import axios from 'axios'
import AddMember from './AddMember';
import DeleteMember from './DeleteMember';
import View from './View';

function Child() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, error, loading] = useFetch("children");

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.name.includes(text) || info.category === text);
      setFiltered(filteredArray)
    }
  }, [text])

  return (
    <div>
      <h1> 아동부 데이터 </h1>
      <div class="input-div">
        <div class="inputs">
          <strong> 맴버 검색: </strong>
          <br />
          <input placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
        <DeleteMember />
        <br />
      </div>
      <br/>
      <View data={[loading, text, data, filtered]} />
    </div>
  )
}

export default Child