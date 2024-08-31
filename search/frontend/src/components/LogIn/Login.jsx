import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";

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

  const process = (email) => {
    axios
      .get("http://localhost:5000/registered")
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
    <form onSubmit={(e) => {
      e.preventDefault(); // Prevent the form from reloading the page
      process(username);  // Your form processing function
  }}>
      <div className={styles.main}>
        <div className={styles.box}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <h1 className={styles.title}> Tebah Member Login</h1>
          <input
            onChange={(e) => setUser(e.target.value)}
            placeholder="User Email"
            className={styles.inputField}
            value={username}
          />
        
       
          <button type="submit" class="btn btn-success" className={styles.btn}>
            {" "}
            Submit{" "}
          </button>
        </div>
      </div>
    </form  >
  );
}

export default Login;
