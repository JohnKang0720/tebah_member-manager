import axios from "axios";
import React, { useState, useEffect } from "react";

const AddMember = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        offering_num: "",
        korean: "",
        english_name: "",
        gender: "",
        title: "",
        birthdate: "",
        age: "",
        baptism: "",
        baptism_date: "",
        email: "",
        mobile: "",
        suite: "",
        street: "",
        city: "",
        province: "",
        postal_code: "",
        country: "",
        marital_status: "",
        hobby: "",
        volunteer: "",
        consent: "",
        registered: "",
        last_updated: "",
        f_code: "",
        p_code_1: "",
        p_code_2: "",
        level: "",
        status: "",
    });

    useEffect(() => {
        localStorage.clear()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(count, JSON.stringify(formData))
        let res = []
        for (let i = 0; i <= localStorage.length; i++) {
            res.push(JSON.parse(localStorage.getItem(i)))
        }

        axios.post("http://localhost:5000/main", {
            data: res.filter(e => e !== undefined && e !== null)
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    };

    const handleFamily = (e) => {
        localStorage.setItem(count, JSON.stringify(formData))
        setCurrentPage(1)
        setCount(count + 1)
    }

    return (
        <>
            <h1>Add Member Form </h1>
            <form onSubmit={handleSubmit} className="member-form">
                {currentPage === 1 && (
                    <div>
                        <h4>Page 1</h4>
                        <label>
                            Offering Number:
                            <input type="text" name="offering_num" value={formData.offering_num} onChange={handleChange} />
                        </label>
                        <label>
                            Korean Name:
                            <input type="text" name="korean" value={formData.korean} onChange={handleChange} />
                        </label>
                        <label>
                            English Name:
                            <input type="text" name="english_name" value={formData.english_name} onChange={handleChange} />
                        </label>
                        <label>
                            Gender:
                            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
                        </label>
                        <label>
                            Title:
                            <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        </label>
                        <label>
                            Birthdate:
                            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                        </label>
                        <label>
                            Age:
                            <input type="number" name="age" value={formData.age} onChange={handleChange} />
                        </label>
                    </div>
                )}

                {currentPage === 2 && (
                    <div>
                        <h4>Page 2</h4>
                        <label>
                            Baptism:
                            <input type="text" name="baptism" value={formData.baptism} onChange={handleChange} />
                        </label>
                        <label>
                            Baptism Date:
                            <input type="date" name="baptism_date" value={formData.baptism_date} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </label>
                        <label>
                            Mobile:
                            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                        </label>
                        <label>
                            Suite:
                            <input type="text" name="suite" value={formData.suite} onChange={handleChange} />
                        </label>
                        <label>
                            Street:
                            <input type="text" name="street" value={formData.street} onChange={handleChange} />
                        </label>
                        <label>
                            City:
                            <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        </label>
                    </div>
                )}

                {currentPage === 3 && (
                    <div>
                        <h4>Page 3</h4>
                        <label>
                            Province:
                            <input type="text" name="province" value={formData.province} onChange={handleChange} />
                        </label>
                        <label>
                            Postal Code:
                            <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
                        </label>
                        <label>
                            Country:
                            <input type="text" name="country" value={formData.country} onChange={handleChange} />
                        </label>
                        <label>
                            Marital Status:
                            <input type="text" name="marital_status" value={formData.marital_status} onChange={handleChange} />
                        </label>
                        <label>
                            Hobby:
                            <input type="text" name="hobby" value={formData.hobby} onChange={handleChange} />
                        </label>
                        <label>
                            Volunteer:
                            <input type="text" name="volunteer" value={formData.volunteer} onChange={handleChange} />
                        </label>
                        <label>
                            Consent:
                            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
                        </label>
                        <label>
                            Registered:
                            <input type="text" name="registered" value={formData.registered} onChange={handleChange} />
                        </label>
                        <label>
                            Last Updated:
                            <input type="date" name="last_updated" value={formData.last_updated} onChange={handleChange} />
                        </label>
                        <label>
                            F Code:
                            <input type="text" name="f_code" value={formData.f_code} onChange={handleChange} />
                        </label>
                        <label>
                            P Code 1:
                            <input type="text" name="p_code_1" value={formData.p_code_1} onChange={handleChange} />
                        </label>
                        <label>
                            P Code 2:
                            <input type="text" name="p_code_2" value={formData.p_code_2} onChange={handleChange} />
                        </label>
                        <label>
                            Level:
                            <input type="text" name="level" value={formData.level} onChange={handleChange} />
                        </label>
                        <label>
                            Status:
                            <input type="text" name="status" value={formData.status} onChange={handleChange} />
                        </label>
                    </div>
                )}



                <div>
                    <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {currentPage < 3 ? (
                        <button type="button" onClick={handleNext}>
                            Next
                        </button>
                    ) : (
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    )}
                    {currentPage === 3 ? <button onClick={handleFamily}> Add Family Member </button> : null}
                </div>
            </form>
        </>
    );
};

export default AddMember