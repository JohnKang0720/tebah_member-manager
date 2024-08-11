import React, { useState } from 'react'
import axios from 'axios'

export default function SearchCard() {
  const [query, setQuery] = useState("")
  const [arr, setArr] = useState([])

  const family_columns = ["성명 (한글)", "성명 (영문)", "생년월일", "관계", "세례년도", "직분", "교인번호"]
  const info_column_1 = ["성명", "생년월일", "주소", "우편번호", "전화번호", "이메일", "교인번호"]
  const info_column_2 = ["성별", "신급", "세례년도", "직분", "취미/특기", "봉사경력", "헌금번호"]

  const filter = () => {
    if (query.length !== 0) {
      const url = `http://localhost:5000/search-card/${query}`
      axios.get(url).then(res => {
        if (res.data.rows.length === 0) {
          alert("No such person!")
        }
        setArr(res.data.rows)
      }).catch(err => console.log(err))
      setQuery("")
    }
  }

  return (
    <>
      <h1> 교인카드 검색</h1>
      <section>
        <input type="text" onChange={e => setQuery(e.target.value)} />
        <button onClick={() => filter()}> Search </button>
      </section>
      <section className='card-container'>
        <div className='search-card'>
          <h3> 기본정보 </h3>
          <hr />
          <div className='info-container'>
            <div className='info-left'>
              {info_column_1.map(i => {
                return <> <strong> {i}: </strong></>
              })}
            </div>
            <div className='info-right'>
              {info_column_2.map(i => {
                return <> <strong> {i}: </strong></>
              })}
            </div>
          </div>
          <div className='family-container'>
            <h3> 가족관계 </h3>
            <hr />
            <div className='family-grid'>
              {family_columns.map(c => {
                return <>
                  <strong> {c} </strong>
                </>
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
