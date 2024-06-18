import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function AddMember() {

    const [eng, setEng] = useState("");
    const [kor, setKor] = useState("");
    const [gender, setGen] = useState("");
    const [category, setCat] = useState("");
    const [married, setMar] = useState("");
    const [age, setAge] = useState("");
    const [baptism, setBap] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTel] = useState("");
    const [address, setAd] = useState("");
    const [hobby, setHob] = useState("");
    const [vol, setVol] = useState("");
    const [fcode, setF] = useState("");
    const [p1, setP1] = useState(0);
    const [p2, setP2] = useState(0);
    const [agreement, setAg] = useState("");
    const [offering_num, setOff] = useState("");

    const [birth, setDate] = useState("");
    const [baptism_date, setBapDate] = useState("");
    const [suite, setSuite] = useState("");
    const [city, setCity] = useState("");
    const [prov, setProv] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCount] = useState("");

    const date = new Date()

    const handleSubmit = () => {
        axios.post("https://tebah-member-manager.vercel.app/main", {
            offering_num: offering_num,
            korean: kor,
            english_name: eng,
            gender: gender,
            title: category,
            birthdate: birth,
            age: age,
            baptism: baptism,
            baptism_date: baptism_date,
            email: email,
            mobile: telephone,
            suite: suite,
            street: address,
            city: city,
            province: prov,
            postal_code: postal,
            country: country,
            marital_status: married,
            hobby: hobby,
            volunteer: vol,
            consent: agreement,
            registered: date.getDate(),
            last: date.getDate(),
            f_code: fcode,
            p_code_1: p1,
            p_code_2: p2
        })
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <div className='inputs'>
            <h5> 새교인 등록 </h5>
            <br />
            <div className='inputs__inner'>
                <div>
                    <input class="form-control" placeholder='영어 이름' onChange={e => setEng(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='한국 이름' onChange={e => setKor(e.target.value)} />
                    <br />
                    <select class="form-control" placeholder='성' onChange={e => setGen(e.target.value)}>
                        <option value="">  </option>
                        <option value="남"> 남 </option>
                        <option value="여"> 여 </option>
                    </select>
                    <br />
                    <input class="form-control" placeholder='Birthday (DOW, M D, Y)' onChange={e => setDate(e.target.value)} />
                    <br />
                    <select class="form-control" placeholder='셰례여부' onChange={e => setBap(e.target.value)}>
                        <option value="">  </option>
                        <option value="Y"> 유아세레 </option>
                        <option value="A"> 입교 </option>
                        <option value="B"> 세레 </option>
                        <option value="None"> 없음 </option>
                    </select>
                    <br />
                    <input class="form-control" placeholder='Baptism Date (MM/DD/YYYY) ' onChange={e => setBapDate(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='Suite' onChange={e => setSuite(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='주소' onChange={e => setAd(e.target.value)} />
                </div>
                <br />
                <div>
                    <input class="form-control" placeholder='전화번호 (no dash)' onChange={e => setTel(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='City' onChange={e => setCity(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='Province' onChange={e => setProv(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='Postal Code' onChange={e => setPostal(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='Country' onChange={e => setCount(e.target.value)} />
                    <br />
                    <select class="form-control" placeholder='직분' onChange={e => setCat(e.target.value)}>
                        <option value="">  </option>
                        <option value="admin"> Pastor </option>
                        <option value="admin"> Admin </option>
                        <option value="regular"> Saint </option>
                        <option value="regular"> Deacon </option>
                    </select>
                    <br />
                    <select class="form-control" placeholder='결혼여부' onChange={e => setMar(e.target.value)}>
                        <option value="">  </option>
                        <option value="기혼"> 기혼 </option>
                        <option value="미혼"> 미혼 </option>
                    </select>
                    <br />
                    <input class="form-control" placeholder='나이' onChange={e => setAge(e.target.value)} />
                </div>
                <br />
                <div>
                    <input class="form-control" placeholder='Offering #' onChange={e => setOff(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='이메일' onChange={e => setEmail(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='취미/직업' onChange={e => setHob(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='봉사여부' onChange={e => setVol(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='새맴버 가족코드' onChange={e => setF(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='부모코드 1' onChange={e => setP1(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='부모 코드 2' onChange={e => setP2(e.target.value)} />
                    <br />
                    <input class="form-control" placeholder='사진 & 영상 동의 (Y or N)' onChange={e => setAg(e.target.value)} />
                </div>
            </div>
            <br />
            <button class="btn btn-primary" onClick={handleSubmit}> 등록 </button>
        </div>
    )
}

export default AddMember