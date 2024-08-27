import React, { useState, useEffect } from "react";
import { useFetch } from "../useFetch";
import Mapping from "./Util/Mapping";

function Agreement() {
  let [data, fields, error, loading] = useFetch(`tebah-family/consent`);
  const [arr, setArr] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const columns = fields;

  useEffect(() => {
    if (data) {
      // Ensure 'data' is an array and each object has the 'korean' and 'consent' properties
      const filteredArray = data.filter(
        (info) =>
          info.korean?.includes(query) ||
          info.consent?.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(filteredArray);
    }
  }, [query, data]);

  return (
    <div
      style={{
        paddingBottom: "50px",
        paddingTop: "30px",
      }}
    >
      <h1>사진/영상 동의여부</h1>
      <br />
      <div>
        <div
          className="input-div"
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h5>맴버 검색창</h5>
          <div>
            <input
              style={{ padding: "10px" }}
              className="form-control"
              placeholder="Name or Consent"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <br />
      </div>
      <br />
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
          width: "90%",
        }}
      >
        {!loading && arr.length === 0 ? (
          <div className="table3">
            {columns.map((column) => (
              <Mapping param={[data, column["name"], query, filtered]} />
            ))}
          </div>
        ) : (
          <div className="table3">
            {columns.map((column) => (
              <Mapping param={[arr, column["name"], query, filtered]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Agreement;
