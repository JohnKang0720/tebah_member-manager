import React, { useState } from 'react';
import axios from 'axios';
import styles from './SearchCard.module.css'; // Import the CSS module

export default function SearchCard() {
  const [query, setQuery] = useState("");
  const [arr, setArr] = useState([]);
  const [family, setFamily] = useState([]);

  const family_columns = [{ "성명 (한글)": "korean" }, { "성명 (영문)": "english_name" }, { "생년월일": "birthdate" }, { "관계": "-" }, { "세례년도": "baptism_date" }, { "직분": "level" }, { "교인번호": "registered" }];
  const info_column_1 = [{ "성명": "korean" }, { "생년월일": "birthdate" }, { "주소": "street" }, { "우편번호": "postal_code" }, { "전화번호": "mobile" }, { "이메일": "email" }, { "교인번호": "registered" }];
  const info_column_2 = [{ "성별": "gender" }, { "신급": "title" }, { "세례년도": "baptism_date" }, { "직분": "level" }, { "취미/특기": "hobby" }, { "봉사경력": "volunteering" }, { "헌금번호": "offering_num" }];

  const filter = () => {
    if (query.length !== 0) {
      const url = `http://localhost:5000/search-card/${query}`;
      axios.get(url).then(res => {
        if (res.data.rows.length === 0) {
          alert("No such person!");
        }
        setArr(res.data.rows);
        console.log(res.data.rows);
        getFamily(query, res.data.rows[0].f_code);
      }).catch(err => console.log(err));
    }
  };

  const getFamily = (q, fcode) => {
    const url = `http://localhost:5000/search-card/${q}/${fcode}`;
    axios.get(url).then(res => {
      setFamily(res.data.rows);
      console.log(res.data.rows);
    }).catch(err => console.log(err));
    setQuery("");
  };

  return (
    <div className={styles['main-container']}>
      <h1>교인카드 검색</h1>
      <section className={styles['search-bar']}>
        <input className={styles['search-bar-input']} type="text" onChange={e => setQuery(e.target.value)} />
        <button onClick={filter}>Search</button>
      </section>
      <section className={styles['card-container']}>
        <div className={styles['search-card']}>
          <h3>기본정보</h3>
          <hr />
          <div className='info-container'>
            <div className='info-left'>
              {info_column_1.map(i => {
                const k = Object.keys(i)[0];
                const v = i[k];
                return (
                  <div className="desc_col" key={k}>
                    <div>
                      <strong>{k}</strong> :
                      {arr.map(e => <span key={e.id}> {e[v] ? e[v] : "-"} </span>)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='info-right'>
              {info_column_2.map(i => {
                const k = Object.keys(i)[0];
                const v = i[k];
                return (
                  <div className="desc_col" key={k}>
                    <div>
                      <strong>{k}</strong> :
                      {arr.map(e => <span key={e.id}> {e[v] ? e[v] : "-"} </span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='family-container'>
            <h3>가족관계</h3>
            <hr />
            <div className='family-grid'>
              {family_columns.map(obj => {
                const key = Object.keys(obj)[0];
                const value = obj[key];
                return (
                  <div key={key}>
                    <strong>{key}</strong>
                    {family.map(r => (
                      key === "관계" ? (
                        <p key={r.id}>
                          {r["p_code_1"] || r["p_code_2"] ? "자녀" : "부모 / 부부"}
                        </p>
                      ) : (
                        <p key={r.id}>{r[value] ? r[value] : "-"}</p>
                      )
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
