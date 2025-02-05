import axios from "axios";
import React, { useState, useEffect } from "react";

const AddMember = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    offering_num: "NA",
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
    registration_date: "",
    last_updated: new Date().toLocaleDateString(),
    f_code: "",
    p_code_1: "",
    p_code_2: "",
    level: "",
    status: "",
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

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
    localStorage.setItem(count, JSON.stringify(formData));
    let res = [];
    for (let i = 0; i <= localStorage.length; i++) {
      res.push(JSON.parse(localStorage.getItem(i)));
    }

    axios
      .post("https://tebah-member-manager.vercel.app/main", {
        data: res.filter((e) => e !== undefined && e !== null),
      })
      .then(res =>
            alert("Member added!")
           )
      .catch((err) => console.log(err));
  };

  const handleFamily = (e) => {
    localStorage.setItem(count, JSON.stringify(formData));
    setCurrentPage(1);
    setCount(count + 1);
  };

  return (
    <form onSubmit={e => {
      e.preventDefault()
      handleFamily()
  }}>
      <div
        style={{
          marginTop: "8px",
          marginBottom: "50px",
          paddingBottom: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Add Member Form </h1>
        <form onSubmit={handleSubmit} className="member-form">
          {currentPage === 1 && (
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "20px" }}>Page 1</h4>
              <label>
                이메일:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                등록날짜:
                <input
                  type="date"
                  name="registration_date"
                  value={formData.registration_date}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                한국이름:
                <input
                  type="text"
                  name="korean"
                  value={formData.korean}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                영문:
                <input
                  type="text"
                  name="english_name"
                  value={formData.english_name}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                성별:
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                생년월일:
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
            </div>
          )}

          {currentPage === 2 && (
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "20px" }}>Page 2</h4>
              <label>
                유닛 #:
                <input
                  type="text"
                  name="suite"
                  value={formData.suite}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                주소:
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                도시:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                주:
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                우편번호:
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                나라:
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                휴대번호:
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
            </div>
          )}

          {currentPage === 3 && (
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "20px" }}>Page 3</h4>
              <label>
                신급:
                <input
                  type="text"
                  name="baptism"
                  value={formData.baptism}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                세례년도:
                <input
                  type="date"
                  name="baptism_date"
                  value={formData.baptism_date}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                직분:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                그룹:
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                취미/특기:
                <input
                  type="text"
                  name="hobby"
                  value={formData.hobby}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                봉사경력:
                <input
                  type="text"
                  name="volunteer"
                  value={formData.volunteer}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                결혼여부:
                <input
                  type="text"
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                사진/영상 동의서:
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                가족코드:
                <input
                  type="text"
                  name="f_code"
                  value={formData.f_code}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                부모코드 1:
                <input
                  type="text"
                  name="p_code_1"
                  value={formData.p_code_1}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                부모코드 2:
                <input
                  type="text"
                  name="p_code_2"
                  value={formData.p_code_2}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "5px",
                    marginLeft: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#3c82c3",
                padding: "10px",
                color: "white",
              }}
            >
              Previous
            </button>
            {currentPage < 3 ? (
              <button
                style={{
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#1D6AB4",
                  padding: "10px",
                  color: "white",
                }}
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                style={{
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#1D6AB4",
                  padding: "10px",
                  color: "white",
                }}
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
            {currentPage === 3 ? (
              <button
                style={{
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "green",
                  padding: "10px",
                  color: "white",
                }}
                type="submit"
              >
                {" "}
                Add Family Member{" "}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </form>
  );
};

export default AddMember;
