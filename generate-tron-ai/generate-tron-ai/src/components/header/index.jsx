import React, { useState, useEffect } from "react";

import menus from "../../pages/menu";

import "./styles.scss";
import logo from "../../assets/images/logo/logo.png";
import Button from "../button";

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

  const [activeIndex, setActiveIndex] = useState(null);
  const handleDropdown = (index) => {
    setActiveIndex(index);
  };

  return (
    <header id="header_main" className={`header ${scroll ? "is-fixed" : ""}`}>
      <div className="container">
        <div id="site-header-inner">
          <div className="header__logo">
            <a href="/">
              <img src={logo} alt="Crybox" />
            </a>
          </div>
          <nav
            id="main-nav"
            className={`main-nav ${menuActive ? "active" : ""}`}
          >
            <ul id="menu-primary-menu" className="menu">
              {menus.map((data, idx) => (
                <li
                  key={idx}
                  onClick={() => handleDropdown(idx)}
                  className={`menu-item ${
                    data.namesub ? "menu-item-has-children" : ""
                  } ${activeIndex === idx ? "active" : ""}`}
                >
                  <a
                    href={data.links}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button title="connect wallet" path="#" />

          <div
            className={`mobile-button ${menuActive ? "active" : ""}`}
            onClick={handleMenuActive}
          >
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
