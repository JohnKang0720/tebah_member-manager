import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useFetch } from '../useFetch';
import DeleteMember from './Util/DeleteMember';
import View from './View';
import EditMember from './Util/EditMember';

function MainData() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, fields, error, loading] = useFetch("main");

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.english_name.toLowerCase().includes(text.toLowerCase()));
      setFiltered(filteredArray)
    }
  }, [text])

  return (
    <div>
      <h1> 새가족부 데이터 </h1>
      <br />
      <div class="input-div">
        <div class="inputs">
          <h5> 맴버 검색: </h5>
          <br />
          <input class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br/>
      <View data={[loading, text, data, filtered]} />
    </div>
  )
}

export default MainData