import React, { useState, useEffect } from "react";

import { Link } from "react-scroll";

import menus from "../../pages/menu";

import logo from "../../assets/images/logo/logo.png";

import "./styles.scss";

const Header = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 300);
    });
    return () => {
      setScroll({});
    };
  }, []);

  const [menuActive, setMenuActive] = useState(null);

  const handleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header id="header_main" className={`header ${scroll ? "is-fixed" : ""}`}>
      <div className="container big">
        <div className="row">
          <div className="col-12">
            <div className="header__body">
              <div className="header__logo">
                <Link to="/">
                  <img id="site-logo" src={logo} alt="cyfonii" />
                </Link>
              </div>

              <div className="header__right">
                <nav
                  id="main-nav"
                  className={`main-nav ${menuActive ? "active" : ""}`}
                >
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map((data, idx) => (
                      <li key={idx}>
                        {data.blank ? (
                          <a
                            href={data.links}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {data.name}
                          </a>
                        ) : (
                          <Link to={data.links} activeClass="active">
                            {data.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <div
                  className={`mobile-button ${menuActive ? "active" : ""}`}
                  onClick={handleMenuActive}
                >
                  <span></span>
                </div>
              </div>

              <div className="header__action">
                <a
                  href="https://generator.fonai.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                >
                  <span>Open App</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
