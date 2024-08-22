import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../useFetch';
import View from "./Util/View"

export default function Database() {
  const param = useParams()
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const chooseURL = (t) => {
    if (t === "family") {
      return 'tebah-family'
    }
    return `database/${t}`
  }
  const [data, fields, error, loading] = useFetch(chooseURL(param.type), ["korean", "english_name", "mobile", "email", "suite", "street"]);

  return (
    <><div> <h1>Database-{param.type.toUpperCase()}</h1></div>
    <br />
      <View data={[loading, text, data, filtered, fields, fields.length]} />
    </>

  )
}
