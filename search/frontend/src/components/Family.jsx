import React, { useState, useEffect } from 'react'
import { useFetch } from '../useFetch';
import axios from 'axios';
import Mapping from './Util/Mapping';

function Family() {
  let [data, fields, error, loading] = useFetch(`tebah-family`, ["id", "korean"]);
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([])

  const columns = fields
  const url = `https://tebah-member-manager.vercel.app/tebah-family`

  // const filter = () => {
  //   axios.post(url, {
  //     search_id: memberId
  //   }).then(res => {
  //     setArr(res.data.rows)
  //     if (res.data.length === 0) {
  //       alert(`No such member with name ${memberId}.`)
  //     }
  //   }
  //   )
  //     .catch(err => console.log(err))
  // }

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info => info.korean.includes(text) );
      setFiltered(filteredArray)
    }
  }, [text])




  return (
    <div>
      <h1> Database - Family </h1>
      <br />
      <div>
        <div class="input-div" style={{ flexDirection: "column" }}>
          <h5> 맴버 검색창 </h5>
          <div class="inputs">
            <br />
            <input class="form-control" placeholder='이름' onChange={e => setText(e.target.value)} />
          </div>
        </div>
        <br />
      </div>
      <br />
      {!loading && arr.length === 0 ?
        <div className="table2">
          {columns.map(column => {
            return <Mapping param={[data,column["name"], text, filtered]} />
          })}
        </div> : <div className="table2">
          {columns.map(column => {
            return <Mapping param={[arr,column["name"], text, filtered]} />
          })}
        </div>}
    </div>
  )
}

export default Family