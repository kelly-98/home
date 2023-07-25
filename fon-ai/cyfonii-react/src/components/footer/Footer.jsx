import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

import { FaTelegramPlane, FaDiscord } from "react-icons/fa";

import logo from "../../assets/images/logo/logo.png";

import "./styles.scss";

function Footer(props) {
  const [dataBlock] = useState({
    heading: "Get Newsletter",
    desc: "Get udpated with news, tips & tricks",
  });

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="footer">
      <div className="shape"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footer__bottom">
              <Link to="/" className="logo">
                <img src={logo} alt="Cyfonii" />
              </Link>

              <div className="center mb--30">
                <ul className="list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="portfolio">How It Work?</Link>
                  </li>
                  <li>
                    <Link to="roadmap">Roadmap</Link>
                  </li>
                  <li>
                    <a
                      href="https://fonai-app.gitbook.io/whitepaper/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Docs
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Marketplace
                    </a>
                  </li>
                </ul>
                <p>Copyright © FonAI.app 2023 All rights reserved</p>
              </div>
              <ul className="list-social">
                <li>
                  <a
                    href="https://t.me/FonAI_ARB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTelegramPlane />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/FonAI_ARB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5 1.42062C13.9794 1.66154 13.4246 1.82123 12.8462 1.89877C13.4412 1.524 13.8954 0.935077 14.1089 0.225231C13.5541 0.574154 12.9416 0.820615 12.2889 0.958154C11.7621 0.366462 11.0114 0 10.1924 0C8.60337 0 7.32412 1.36062 7.32412 3.02862C7.32412 3.26862 7.34338 3.49938 7.39062 3.71908C5.0045 3.59631 2.89313 2.38985 1.47475 0.552C1.22712 1.00523 1.08188 1.524 1.08188 2.08246C1.08188 3.13108 1.59375 4.06062 2.35675 4.59877C1.89562 4.58954 1.44325 4.44831 1.06 4.22585C1.06 4.23508 1.06 4.24708 1.06 4.25908C1.06 5.73046 2.05487 6.95262 3.3595 7.23415C3.12587 7.30154 2.87125 7.33385 2.607 7.33385C2.42325 7.33385 2.23775 7.32277 2.06362 7.28215C2.4355 8.48123 3.49075 9.36277 4.7455 9.39138C3.769 10.1972 2.52912 10.6828 1.18688 10.6828C0.9515 10.6828 0.72575 10.6717 0.5 10.6412C1.77137 11.5062 3.27813 12 4.903 12C10.1845 12 13.072 7.38462 13.072 3.384C13.072 3.25015 13.0676 3.12092 13.0615 2.99262C13.6311 2.56615 14.1097 2.03354 14.5 1.42062Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/SmTVCyHRsX"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDiscord />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isVisible && (
        <Link to="#" onClick={scrollToTop} id="scroll-top">
          <span className="icon-arrow-top"></span>
        </Link>
      )}
    </footer>
  );
}

export default Footer;
