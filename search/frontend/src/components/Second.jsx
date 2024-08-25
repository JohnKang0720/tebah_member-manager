<<<<<<< HEAD
import React from 'react'
import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch'
import View from './Util/View';
=======
import React from "react";
import { useState, useEffect } from "react";
import { useFetch } from "../useFetch";
import DeleteMember from "./Util/DeleteMember";
import View from "./Util/View";
import EditMember from "./Util/EditMember";
>>>>>>> 72fa377715b6f2fc8fdeb44b2e3a8ea08ab87888

function Second() {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

<<<<<<< HEAD
  const [data, fields, error, loading] = useFetch("main/secondary", ["korean", "english_name", "mobile", "suite", "street"]);
=======
  const [data, fields, error, loading] = useFetch("main/secondary", [
    "id",
    "korean",
    "english_name",
    "mobile",
    "suite",
    "street",
  ]);
>>>>>>> 72fa377715b6f2fc8fdeb44b2e3a8ea08ab87888

  useEffect(() => {
    if (data) {
      let filteredArray = data.filter(
        (info) =>
          info.korean.includes(text) ||
          info.english_name.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(filteredArray);
    }
  }, [text]);

  return (
    <div
      style={{ paddingTop: "30px", paddingBottom: "30px", textAlign: "center" }}
    >
      <h1> 청년부 데이터 </h1>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        class="input-div"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          class="inputs"
        >
          <h5 style={{ width: "100%", paddingRight: "20px" }}> 맴버 검색: </h5>
          <br />
          <input
            style={{ padding: "20px", width: "200px" }}
            class="form-control"
            placeholder="검색"
            onChange={(e) => setText(e.target.value)}
          />
          <br />
        </div>
      </div>
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </div>
  );
}

export default Second;
