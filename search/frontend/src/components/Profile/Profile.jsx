import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { logout } from "../../firebaseFns";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

// Put other basic information
export default function Profile() {
  const [user, auth] = useContext(UserContext);
  const navigate = useNavigate();

  //FETCH FROM DB TO GET MORE INFO

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <h1>Profile</h1>
        {user ? (
          <>
            이메일: <p> {user.email} </p>
            생성날짜: <p> {user.metadata.creationTime} </p>
            UID: <p> {user.name} </p>
            <button class="btn btn-danger" onClick={() => logout(navigate)}>
              {" "}
              로그아웃{" "}
            </button>
          </>
        ) : (
          "Not signed in"
        )}
      </div>
    </div>
  );
}
