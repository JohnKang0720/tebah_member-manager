import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFetch } from '../useFetch';
import DeleteMember from './Util/DeleteMember';
import View from './Util/View';
import EditMember from './Util/EditMember';

function MainData() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);
  
  const [data, fields, error, loading] = useFetch("main", ["id", "korean", "email", "level"]);

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(info =>
        info.korean.includes(text) || (info.english_name && info.english_name.toLowerCase().includes(text.toLowerCase()))
      );
      setFiltered(filteredArray);
    }
  }, [text, data]);

  return (
    <div style={{ paddingTop: '30px', paddingBottom: '30px', textAlign: 'center' }}>
      <h1>새가족부 데이터</h1>
      <br />
      <div className="input-div" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="inputs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h5>맴버 검색:</h5>
          <br />
          <input className="form-control" placeholder="검색" onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br />
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </div>
  );
}

export default MainData;
