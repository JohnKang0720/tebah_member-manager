import React, { useState, useEffect } from 'react';
import { useFetch } from '../useFetch';
import axios from 'axios';
import View from './Util/View';
import { useParams } from 'react-router-dom';

export default function Adults() {
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [code, setCode] = useState(1);
    const [arr, setArr] = useState([]);
    const param = useParams();
    const [data, fields, error, loading] = useFetch(`main/adults`, []);

    return (
        <div>
            <h1>장년부 기록 (자녀있음) </h1>
            {!loading ? <View data={[loading, text, data, arr, fields, fields.length]} /> : null}
        </div>
    )
}
