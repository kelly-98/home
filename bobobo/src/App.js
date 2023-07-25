import { Route, Routes, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";

import Bg1 from "./assets/img/bg_1.png";
import Bg2 from "./assets/img/bg_2.png";
import Expand from "./assets/img/expand_more.svg";

import "./App.scss";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useAuth from "./hooks/useAuth";
import { setupNetwork, switchNetwork } from "./wallet";

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { login, logout } = useAuth();
  const { account, active, chainId } = useWeb3React();

  const connectButtonClicked = async () => {
    if (active) {
      if (chainId !== Number(process.env.REACT_APP_CHAIN_ID)) {
        await setupNetwork();
        await switchNetwork(process.env.REACT_APP_CHAIN_ID_HEX);
      } else {
        logout();
      }
    } else {
      login();
    }
  };

  const accountEllipsis = account
    ? `${account.substring(0, 5)}...${account.substring(account.length - 4)}`
    : null;

  return (
    <div className="App">
      <div className="bg"></div>
      <div className="bg-1">
        <img src={Bg1} alt="bg-1" />
      </div>
      <div className="bg-2">
        <img src={Bg2} alt="bg-2" />
      </div>

      <header className="header-wrapper">
        <div className="container header">
          <h3 className="header-logo">BOBOBO</h3>

          <ul className="header-btn-social">
            <li className="header-btn-social-item">
              <a
                href="https://twitter.com/BOBOBOArb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1818 4.92554C17.5732 5.19247 16.9248 5.3694 16.2488 5.45531C16.9443 5.04009 17.475 4.38759 17.7246 3.60111C17.0762 3.9877 16.3603 4.26077 15.5973 4.41315C14.9816 3.75759 14.1041 3.35156 13.1469 3.35156C11.2896 3.35156 9.79436 4.85906 9.79436 6.70713C9.79436 6.97304 9.81686 7.22872 9.87209 7.47213C7.08312 7.33611 4.61527 5.9994 2.95743 3.96315C2.668 4.46531 2.49823 5.04009 2.49823 5.65884C2.49823 6.82065 3.09652 7.85054 3.98834 8.44679C3.44937 8.43656 2.92062 8.28009 2.47266 8.03361C2.47266 8.04384 2.47266 8.05713 2.47266 8.07043C2.47266 9.70065 3.6355 11.0547 5.16039 11.3667C4.88732 11.4413 4.58971 11.4771 4.28084 11.4771C4.06607 11.4771 3.84925 11.4649 3.64573 11.4199C4.08039 12.7484 5.3138 13.7251 6.78039 13.7568C5.63902 14.6496 4.18982 15.1876 2.62096 15.1876C2.34584 15.1876 2.08198 15.1753 1.81812 15.1416C3.30414 16.0999 5.06527 16.647 6.96448 16.647C13.1377 16.647 16.5127 11.5334 16.5127 7.10088C16.5127 6.95258 16.5075 6.8094 16.5004 6.66724C17.1662 6.19474 17.7256 5.60463 18.1818 4.92554Z"
                    fill="url(#paint0_linear_18_1858)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_18_1858"
                      x1="1.81812"
                      y1="8.45779"
                      x2="18.6573"
                      y2="9.1846"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#AEF77E"></stop>
                      <stop offset="1" stop-color="#81F8A6"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            </li>
            <li className="header-btn-social-item">
              <a
                href="https://t.me/BOBOBOARB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.06668 14.3334C6.54668 14.3334 6.64002 14.1334 6.45335 13.6401L4.93335 8.62673L14.3734 2.7334L15.48 3.02673L14.56 5.5334L7.06668 14.3334Z"
                    fill="url(#paint0_linear_18_1853)"
                  ></path>
                  <path
                    d="M7.06665 14.3329C7.46665 14.3329 7.63998 14.1463 7.86665 13.9329C8.21332 13.5996 12.6666 9.26628 12.6666 9.26628L9.93332 8.59961L7.39998 10.1996L7.06665 14.1996V14.3329Z"
                    fill="url(#paint1_linear_18_1853)"
                  ></path>
                  <path
                    d="M7.33331 10.2531L13.7866 15.0131C14.52 15.4131 15.0533 15.2131 15.24 14.3331L17.8666 1.95973C18.1333 0.879733 17.4533 0.399734 16.7466 0.719734L1.33331 6.6664C0.279979 7.09307 0.293312 7.67973 1.14665 7.93307L5.10665 9.17307L14.2666 3.39973C14.6933 3.13307 15.0933 3.27973 14.7733 3.57307L7.33331 10.2531Z"
                    fill="url(#paint2_linear_18_1853)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_18_1853"
                      x1="4.93335"
                      y1="7.18847"
                      x2="15.7957"
                      y2="7.53482"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#AEF77E"></stop>
                      <stop offset="1" stop-color="#81F8A6"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_18_1853"
                      x1="7.06665"
                      y1="10.8015"
                      x2="12.8334"
                      y2="10.9991"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#AEF77E"></stop>
                      <stop offset="1" stop-color="#81F8A6"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_18_1853"
                      x1="0.523499"
                      y1="6.22476"
                      x2="18.4336"
                      y2="6.97402"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#AEF77E"></stop>
                      <stop offset="1" stop-color="#81F8A6"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            </li>
          </ul>

          <div className="header-btn">
            <a
              href="#"
              className="btn-secondary"
              // onClick={connectButtonClicked}
            >
              Buy Now
            </a>
            {/* If not connected wallet */}
            {!active && (
              <button
                className="btn-secondary"
                // onClick={connectButtonClicked}
              >
                Connect Wallet
              </button>
            )}
            {/* {active && chainId !== Number(process.env.REACT_APP_CHAIN_ID) && (
              <button className="btn-secondary" onClick={connectButtonClicked}>
                Switch Network
              </button>
            )} */}
            {/* Connected wallet */}
            {/* {active && chainId === Number(process.env.REACT_APP_CHAIN_ID) && (
              <button
                className="btn-secondary"
                onClick={() => setIsOpen(!isOpen)}
              >
                {accountEllipsis}
                <img
                  className={`header-dropdown-icon ${
                    isOpen ? "dropdown-active" : ""
                  }`}
                  src={Expand}
                  alt="expand"
                />
              </button>
            )} */}
            <div
              className={`header-dropdown-wrapper ${
                isOpen ? "dropdown-active" : ""
              }`}
            >
              <div className="header-dropdown">
                <button className="btn">BUY $BOBOBO</button>
                <button
                  // onClick={() => {
                  //   connectButtonClicked();
                  //   setIsOpen(false);
                  // }}
                  className="btn-disconnect"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
