import React from "react";
import "./style.scss";

export default function Toast({ isSucceed, isShow }) {
  return (
    <div
      className={`toast toast-animation-close ${
        isSucceed ? "toast-succeed" : "toast-failed"
      } ${isShow ? "toast-open" : "toast-close"}`}
    >
      {isSucceed ? "Successfully Claimed" : "Claim Failed"}
    </div>
  );
}
