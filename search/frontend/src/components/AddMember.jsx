import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function AddMember() {

    const [eng, setEng] = useState("");
    const [kor, setKor] = useState("");
    const [gender, setGen] = useState("");
    const [category, setCat] = useState("");
    const [married, setMar] = useState(false);
    const [age, setAge] = useState(0);
    const [baptism, setBap] = useState("");
    const [year, setYear] = useState(0);
    const [email, setEmail] = useState("");
    const [telephone, setTel] = useState("");
    const [address, setAd] = useState("");
    const [hobby, setHob] = useState("");
    const [vol, setVol] = useState("");
    const [offering, setOffering] = useState(0);
    const [fcode, setF] = useState(0);

    const handleSubmit = () => {
        axios.post("http://localhost:5000/add-main", {
            eng_name: eng,
            kor_name: kor,
            gender: gender,
            category: category,
            married: married,
            age: age,
            baptism: baptism,
            baptism_year: year,
            email: email,
            telephone: telephone,
            address: address,
            hobby: hobby,
            vol_exp: vol,
            offering: offering,
            f_code: fcode
        })
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <div className='inputs'>
            <strong> Add new member: </strong>
            <br />
            <input placeholder='영어 이름' onChange={e => setEng(e.target.value)} />
            <br />
            <input placeholder='한국 이름' onChange={e => setKor(e.target.value)} />
            <br />
            <select placeholder='성' onChange={e => setGen(e.target.value)}>
                <option value="">  </option>
                <option value="남"> 남 </option>
                <option value="여"> 여 </option>
            </select>
            <br />
            <select placeholder='직분' onChange={e => setCat(e.target.value)}>
                <option value="">  </option>
                <option value="admin"> 집사 </option>
                <option value="admin"> 장로 </option>
                <option value="admin"> 권사 </option>
                <option value="admin"> 전도사 </option>
                <option value="admin"> 목사 </option>
                <option value="youth"> 청년 </option>
                <option value="secondary"> 아동 </option>
                <option value="secondary"> 중/고등 </option>
            </select>
            <br />
            <select placeholder='결혼여부' onChange={e => setMar(e.target.value)}>
                <option value="">  </option>
                <option value={true}> 기혼 </option>
                <option value={false}> 미혼 </option>
            </select>
            <br />
            <input placeholder='나이' onChange={e => setAge(e.target.value)} />
            <br />
            <select placeholder='셰례여부' onChange={e => setBap(e.target.value)}>
                <option value="">  </option>
                <option value="유아세레"> 유아세레 </option>
                <option value="입교"> 입교 </option>
                <option value="세레"> 세레 </option>
                <option value="없음"> 없음 </option>
            </select>
            <br />
            <input placeholder='셰례년도' onChange={e => setYear(e.target.value)} />
            <br />
            <input placeholder='이메일' onChange={e => setEmail(e.target.value)} />
            <br />
            <input placeholder='전화번호' onChange={e => setTel(e.target.value)} />
            <br />
            <input placeholder='주소' onChange={e => setAd(e.target.value)} />
            <br />
            <input placeholder='취미/직업' onChange={e => setHob(e.target.value)} />
            <br />
            <input placeholder='봉사여부' onChange={e => setVol(e.target.value)} />
            <br />
            {window.location.href.split('/').pop() === "finance" ?
                <input placeholder='새맴버 헌금 #' onChange={e => setOffering(e.target.value)} />
                : null}
            {window.location.href.split('/').pop() === "finance" ? <br /> : null}
            <input placeholder='새맴버 가족코드' onChange={e => setF(e.target.value)} />
            <br />
            <button onClick={handleSubmit}> Add </button>
        </div>
    )
}

export default AddMember