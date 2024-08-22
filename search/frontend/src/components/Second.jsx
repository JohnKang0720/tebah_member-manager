import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import DeleteMember from './Util/DeleteMember';
import View from './Util/View';
import EditMember from './Util/EditMember';

function Second() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, fields, error, loading] = useFetch("main/secondary", ["id", "korean", "english_name", "mobile", "suite", "street"]);

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.korean.includes(text) || info.english_name.toLowerCase().includes(text.toLowerCase()));
      setFiltered(filteredArray)
    }
  }, [text])

  return (
    <div><h1> 청년부 데이터 </h1>
    <br />
      <div class="input-div">
        <div class="inputs">
          <h5> 맴버 검색: </h5>
          <br />
          <input class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
          <br /> 
        </div>
      </div>
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </div>
  )
}

export default Second