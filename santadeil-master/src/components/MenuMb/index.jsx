import React from "react";
import Docs from "../../assets/wpp.pdf";

export default function MenuMb({ isMenuActive }) {
  return (
    <ul className={`header-menu-mb ${isMenuActive ? "active" : ""}`}>
      <li className="header-menu-item">
        <a href="#">Home</a>
      </li>
      <li className="header-menu-item">
        <a href="#">Referral</a>
      </li>
      <li className="header-menu-item">
        <a href="#utilities">Utility</a>
      </li>
      <li className="header-menu-item">
        <a href={Docs} rel="noopener noreferrer" target="_blank">
          Docs
        </a>
      </li>
      <li className="header-menu-item">
        <a
          href="https://linktr.ee/santa_devil"
          rel="noopener noreferrer"
          target="_blank"
        >
          Community
        </a>
      </li>
    </ul>
  );
}
