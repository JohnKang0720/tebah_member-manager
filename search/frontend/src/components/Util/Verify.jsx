import React from "react";

export default function Verify() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        width: "100vw", 
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "500px", 
          width: "80%", 
          backgroundColor: "rgba(255, 255, 255, 0.7)", 
          borderRadius: "20px", 
          padding: "20px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
          boxSizing: "border-box", 
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: "600",
            fontSize: "1.8rem", 
            textAlign: "center", 
          }}
        >
          Email Verification Sent!
        </h1>
        <p
          style={{
            margin: "10px 0 0 0", 
            fontSize: "16px", 
            textAlign: "center", 
          }}
        >
          Verify 하시면 자동으로 프로필 페이지로 넘어갑니다! Link expires in 20
          seconds.
        </p>
      </div>
    </div>
  );
}
