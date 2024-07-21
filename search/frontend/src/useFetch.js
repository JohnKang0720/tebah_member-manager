import { useState, useEffect, useMemo} from "react";
import axios from "axios"

export const useFetch = (keyword) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [fields, setFields] = useState([])
    const [loading, setLoading] = useState(true)

    // const BASE_URL = "https://tebah-member-manager.vercel.app/";
    const BASE_URL = "http://localhost:5000/"
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    const fetchData = async ()  => {
        setLoading(true)
        await axios.get(`${BASE_URL}${keyword}`, options)
        .then(res => {
            setFields(res.data.fields)
            setData(res.data.rows)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData();
    }, [keyword])

    return [data, fields, error, loading] 
}