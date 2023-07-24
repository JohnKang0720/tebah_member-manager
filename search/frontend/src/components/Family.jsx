import React, { useState, useEffect } from 'react'
import { useFetch } from '../useFetch';
import axios from 'axios';

function Family() {
  let [data, error, loading] = useFetch(`tebah-family`);
  const [text, setText] = useState("");
  const [arr, setArr] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [memberId, setMemberId] = useState(0);

  const filter = () => {
    axios.post(`http://localhost:5000/tebah-family`, {
      search_id: memberId
    }).then(res => {
      setArr(res.data)
      if (res.data.length === 0) {
        alert(`No such member with ID ${memberId}.`)
      }
    }
    )
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h1> 테바 가족정보 </h1>
      <br />
      <div>
        <div class="input-div" style={{ flexDirection: "column" }}>
          <h5> 가족정보 검색창 </h5>
          <div class="inputs">
            <br />
            <input class="form-control" placeholder='아동 ID' onChange={e => setMemberId(e.target.value)} />
            <br />
            <button class="btn btn-primary" onClick={filter}> 검색 </button>
            <br />
          </div>
        </div>
        <br />
      </div>
      <br />
      {!loading && arr.length === 0 ? <div className="table2">
        <div>
          <section class="table__header"> Children </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.Children} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Parent 1 </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.Parent1} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Parent 2 </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.Parent2} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Family Code </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.family_code} </p>
            </div>
          })} </div>
      </div> : <div className="table2">
        <div>
          <section class="table__header"> Children </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.Children} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Parent 1 </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.Parent1} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Parent 2 </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.Parent2} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Family Code </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.family_code} </p>
            </div>
          })} </div>
      </div>}
    </div>
  )
}

export default Family