import React from "react";
import { useState } from "react";
import { createAccount } from "../firebaseFns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";

function Register() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [password2, setPass2] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");

  const navigate = useNavigate();

  const checkValidThenCreate = () => {
    if (password == password2) {
      createAccount(username, password, tel, navigate);
    } else {
      alert("Error!");
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.box}>
          <h2 className={styles.title}>
            Tebah

            Registration
          </h2>

          <input
            placeholder="Email"
            class="form-control"
            className={styles.inputField}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            placeholder="비밀번호 (PW)"
            class="form-control"
            className={styles.inputField}
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            placeholder="비밀번호 체크 (PW Check)"
            class="form-control"
            className={styles.inputField}
            onChange={(e) => setPass2(e.target.value)}
          />
          <input
            placeholder="이름 (Full Name)"
            class="form-control"
            className={styles.inputField}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <input
            placeholder="전화번호 (Phone #)"
            class="form-control"
            className={styles.inputField}
            onChange={(e) => setTel(e.target.value)}
          />
          <button
            class="btn btn-danger"
            className={styles.btn}
            onClick={() => checkValidThenCreate()}
          >
            {" "}
            Register{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
