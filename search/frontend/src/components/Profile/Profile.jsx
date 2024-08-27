import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { logout } from "../../firebaseFns";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { useFetch } from "../../useFetch";

export default function Profile() {
  const [user, auth] = useContext(UserContext);
  const navigate = useNavigate();

  const [data, fields, error, loading] = useFetch(`profile/kangjohn00000@gmail.com`, ["id", "korean", "english_name", "offering_num", "registered_date"]);

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <h1>Profile</h1>
        {user ? (
          <div className={styles.innerbox}>
            <div> 이메일: <span> {user.email} </span> </div>
            {
              fields.map(f => {
                return <div> <span> {f.name}: </span> {data.map(info => (
                  <span key={info.id}>
                    {info[f.name] ? info[f.name] : "NA"}
                  </span>
                ))} </div>
              })
            }
            <div style={{textAlign: "center"}}> <button class="btn btn-danger" onClick={() => logout(navigate)}>
              {" "}
              로그아웃{" "}
            </button> </div>
          </div>
        ) : (
          "Not signed in"
        )}
      </div>
    </div>
  );
}
