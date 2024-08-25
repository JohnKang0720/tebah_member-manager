import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import View from './Util/View';

// 아빠 엄마 구분 by gender
// 등록한부모 정보만
// change column name from parent1 to 부모
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
    <div style={{ paddingTop: '30px', paddingBottom: '30px', textAlign: 'center' }}>
    <h1> 유스 데이터 </h1>
      <br />
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}} class="input-div">
        <div style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <h5 style={{width:'100%', paddingRight:'20px'}}> 맴버 검색: </h5>
          <input style={{padding:'20px', width:'200px'}} class="form-control" placeholder='검색' onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br />
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </div>
  )
}

export default Youth