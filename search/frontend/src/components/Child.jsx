import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import DeleteMember from './Util/DeleteMember';
import View from './Util/View';

function Child() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, fields, error, loading] = useFetch("tebah-family", ["korean", "english_name", "mobile", "email", "suite", "street"]);

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.korean.includes(text));
      setFiltered(filteredArray)
    }
  }, [text])

  return (
    <div>
      <h1> 아동부 데이터 </h1>
      <br />
      <br />
      <div class="input-div">
        <div class="inputs">
          <h5> 맴버 검색: </h5>
          <br />
          <input class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br />
      <br />
      <View data={[loading, text, data, filtered, fields.filter(el => {
        return el.name !== "mobile" && el.name !== "email" && el.name !== "suite" && el.name !== "street";
      }), 8]} />
    </div>
  )
}

export default Child