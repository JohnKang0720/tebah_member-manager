import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../useFetch';
import View from "./Util/View"

//TODO
export default function Database() {
  const param = useParams()
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");
  const chooseURL = (t) => {
    if (t === "family") {
      return 'tebah-family'
    }
    return `database/${t}`
  }
  const [data, fields, error, loading] = useFetch(chooseURL(param.type), ["korean", "english_name", "mobile", "email", "suite", "street"]);

  useEffect(() => {
    console.log(data)
  }, [loading])
  return (
    <><div>Database {param.type}</div>
      <View data={[loading, text, data, arr, fields, 6]} />
    </>

  )
}
