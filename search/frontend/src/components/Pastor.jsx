import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import DeleteMember from './Util/DeleteMember';
import View from './Util/View';


function Pastor() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [data, fields, error, loading] = useFetch("main/pastors", ["id", "korean", "english_name", "offering_num", "registered"]);

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.korean.includes(text) || info.english_name.toLowerCase().includes(text.toLowerCase()));
      setFiltered(filteredArray)
    }
  }, [text])

  useEffect(() => {
    console.log(fields)
  }, [loading])

  return (
    <div style={{ paddingTop: '30px', paddingBottom: '30px', textAlign: 'center' }}>
      <h1> 교역자 데이터 </h1>
      <br/>
      <br/>
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}} class="input-div">
        <div style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} class="inputs">
          <h5 style={{width:'100%', paddingRight:'20px'}}> 맴버 검색: </h5>
          <br />
          <input  style={{padding:'20px', width:'200px'}} class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br/>
      <br/>
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </div>
  )
}

export default Pastor