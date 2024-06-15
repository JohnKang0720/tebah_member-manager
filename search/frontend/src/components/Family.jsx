import React, { useState, useEffect } from 'react'
import { useFetch } from '../useFetch';
import axios from 'axios';

function Family() {
  let [data, error, loading] = useFetch(`tebah-family`);
  const [arr, setArr] = useState([]);
  const [memberId, setMemberId] = useState(0);

  const filter = () => {
    axios.post(`/tebah-family`, {
      search_id: memberId
    }).then(res => {
      setArr(res.data)
      console.log(res.data)
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
          <section class="table__header"> 아동 ID </section>
          {data.map(info => {
            return <div key={info.child_id} className="table__data">
              <p> {info.child_id} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Children </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.child_name} </p>
            </div>
          })} </div>
          
        <div>
          <section class="table__header"> Parent 1 </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.parent_1_name} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Parent 2 </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.parent_2_name} </p>
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
              <p> {info.child_id} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Children </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.child_name} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Parent 1 </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.parent_1_name} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Parent 2 </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.parent_2_name} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> Family Code </section>
          {arr.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.family_code} </p>
            </div>
          })} </div>
          
      </div>
      }
    </div>
  )
}

export default Family