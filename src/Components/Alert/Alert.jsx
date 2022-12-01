import React, { useState } from "react";

const Alert = ({ message }) => {
  const [styleAlert, setStyleAlert] = useState({});
  return (
    <div
      role="alert"
      className="alert alert-success alert-animate"
      style={styleAlert}
    >
      <span className="alertHeading">{message}</span>
      <button
        type="button"
        className="btn-close alertClose"
        onClick={() => {
          setStyleAlert({ display: "none" });
        }}
      ></button>
    </div>
  );
};

export default Alert;
