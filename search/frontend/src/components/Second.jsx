import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import DeleteMember from './Util/DeleteMember';
import View from './View';
import EditMember from './Util/EditMember';

function Second() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, error, loading] = useFetch("main/secondary");

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.eng_name.toLowerCase().includes(text.toLowerCase()) || info.category.toLowerCase().includes(text.toLowerCase()));
      setFiltered(filteredArray)
    }
  }, [text])

  return (
    <div><h1> 중고등부 데이터 </h1>
    <br />
      <div class="input-div">
        <div class="inputs">
          <h5> 맴버 검색: </h5>
          <br />
          <input class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
          <br /> 
        </div>
      </div>
      <View data={[loading, text, data, filtered]} />
    </div>
  )
}

export default Second