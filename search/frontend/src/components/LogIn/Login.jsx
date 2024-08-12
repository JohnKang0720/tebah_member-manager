import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";

// 이메일 넣고 비밀번호 칠때 이메일이 수정가능하게
// 이메일 넣고 register 로 갈때 이메일이 입력되있게

function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  const validEmails = [
    "tebah-admin@gmail.com",
    "tebah-child@gmail.com",
    "tebah-finance@gmail.com",
    "tebah-youth@gmail.com",
    "tebah-general@gmail.com",
  ];

  //TODO: check that the email is in the firebase auth
  const process = (email) => {
    axios
      .get("http://localhost:5001/registered")
      .then((res) => {
        res.data.rows.forEach((data) => {
          if (
            data.email.trim() === email.trim() ||
            validEmails.includes(email)
          ) {
            navigate(`/password/${username}`);
          } else {
            navigate("/");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.box}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <h1 className={styles.title}> Tebah Member Login</h1>
          <input
            onChange={(e) => setUser(e.target.value)}
            placeholder="User Email"
            className={styles.inputField}
          />
        
       
          <button class="btn btn-success" className={styles.btn} onClick={() => process(username)}>
            {" "}
            Submit{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
