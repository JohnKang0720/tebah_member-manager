import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import DeleteMember from './Util/DeleteMember';
import View from './Util/View';
import EditMember from './Util/EditMember';

function Youth() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, fields, error, loading] = useFetch("main/youth", ["korean", "mobile", "email", "suite", "street"]);


  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.child_name.includes(text));
      setFiltered(filteredArray)
    }
  }, [text])

  return (
    <div><h1> 유스 데이터 </h1>
      <br />
      <div class="input-div">
        <div class="inputs">
          <h5> 맴버 검색: </h5>
          <br />
          <input class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br />
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </div>
  )
}

export default Youth