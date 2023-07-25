import React, { memo } from "react";

import FooterImg from "../../assets/images/logo/footerlogo.png";
import Docs from "../../assets/wpp.pdf";
import "./style.scss";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-wrapper">
        <div className="footer-left">
          <div className="footer-left-img">
            <img src={FooterImg} alt="footer-img" />
          </div>
          <ul className="footer-right-socials-mb">
            <li>
              <a
                href="https://twitter.com/SantaDevil_STD"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-discord"></i>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/SantaDevilChannel"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-telegram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@SantaDevil"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-medium"></i>
              </a>
            </li>
          </ul>
          <p>The big gift from Santa for the crypto world on Christmas</p>
          <span>Copyright ©2022 Santa Devil. All rights reserved</span>
        </div>
        <div className="footer-right">
          <ul className="footer-right-socials">
            <li>
              <a
                href="https://twitter.com/SantaDevil_STD"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-discord"></i>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/SantaDevilChannel"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-telegram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@SantaDevil"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-medium"></i>
              </a>
            </li>
          </ul>
          <ul className="footer-right-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Referral</a>
            </li>
            <li>
              <a href="#utilities">Utility</a>
            </li>
            <li>
              <a href={Docs} rel="noopener noreferrer" target="_blank">
                Docs
              </a>
            </li>
            <li>
              <a
                href="https://linktr.ee/santa_devil"
                rel="noopener noreferrer"
                target="_blank"
              >
                Community
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
