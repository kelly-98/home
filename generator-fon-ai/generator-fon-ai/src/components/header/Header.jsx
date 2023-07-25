import React, { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

import useAuth from "../../hooks/useAuth";
import useSignMessage from "../../wallet/sign";

import menus from "../../pages/menu";

import logo from "../../assets/images/logo/logo.png";

import "./styles.scss";
import { setupNetwork, switchNetwork } from "../../wallet/ethereum";

const Header = ({ setIsDisable }) => {
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

  const { login, logout } = useAuth();
  const { account, active, chainId } = useWeb3React();
  const { signMessage } = useSignMessage();

  useEffect(() => {
    if (active) {
      signMessage()
        .then((data) => {
          //Success sign. enable generate button
          setIsDisable(false);
        })
        .catch((err) => {
          //Sign throw error
        });
    }
  }, [active]);

  const connectButtonClicked = async () => {
    console.log("active", active);
    if (!active) {
      await setupNetwork();
      await switchNetwork("0xA4B1");
      await login();
    } else {
      logout();
    }
  };
  const accountEllipsis = account
    ? `${account.substring(0, 5)}...${account.substring(account.length - 4)}`
    : null;

  return (
    <header id="header_main" className={`header ${scroll ? "is-fixed" : ""}`}>
      <div className="container big">
        <div className="row">
          <div className="col-12">
            <div className="header__body">
              <div className="header__logo">
                <a
                  href="https://fonai.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img id="site-logo" src={logo} alt="fonai" />
                </a>
              </div>

              <div className="header__right">
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
                <div
                  className={`mobile-button ${menuActive ? "active" : ""}`}
                  onClick={handleMenuActive}
                >
                  <span></span>
                </div>
              </div>

              <div className="header__action">
                <button onClick={connectButtonClicked} className="action-btn">
                  <span>
                    {(function () {
                      if (active) {
                        return chainId !== 42161
                          ? "Switch network"
                          : accountEllipsis;
                      } else {
                        return "Connect Wallet";
                      }
                    })()}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
