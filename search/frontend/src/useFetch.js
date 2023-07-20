import { useState, useEffect } from "react";
import axios from "axios"

export const useFetch = (keyword) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const BASE_URL = "http://localhost:5000/";

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    const fetchData = () => {
        setLoading(true)
        axios.get(`${BASE_URL}${keyword}`, options)
        .then(res => {
            setData(res.data)
            console.log(res.data)
        })
        .catch(err => setError(err))
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData();
    }, [keyword])

    return [data, error, loading] 
}