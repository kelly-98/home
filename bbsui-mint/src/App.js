import { Route, Routes, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";

import "./App.scss";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useAuth from "./hooks/useAuth";
import { setupNetwork, switchNetwork } from "./wallet";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import Logo from "./assets/img/logo.png";
import Expand from "./assets/img/expand_more.svg";

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { login, logout } = useAuth();
  const { account, active, chainId } = useWeb3React();

  // Toast
  const notify = () => toast.success("Wow so easy !");
  // const notify = () => toast.error("Wow so easy !");

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
      <header className="header-wrapper">
        <div className="container header">
          <div className="header-logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="header-btn">
            {/* Loading */}
            {/* <ReactLoading
              type={"spin"}
              color={"#fed34a"}
              height={40}
              width={40}
            /> */}

            {/* Toast */}
            {/* <button onClick={notify}>Notify !</button> */}

            {/* If not connected wallet */}
            {!active && (
              <button className="btn-secondary" onClick={connectButtonClicked}>
                Connect Wallet
              </button>
            )}
            {active && chainId !== Number(process.env.REACT_APP_CHAIN_ID) && (
              <button className="btn-secondary" onClick={connectButtonClicked}>
                Switch Network
              </button>
            )}
            {/* Connected wallet */}
            {active && chainId === Number(process.env.REACT_APP_CHAIN_ID) && (
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
            )}
            <div
              className={`header-dropdown-wrapper ${
                isOpen ? "dropdown-active" : ""
              }`}
            >
              <div className="header-dropdown">
                <button className="btn-secondary">BUY $BabySui</button>
                <button
                  onClick={() => {
                    connectButtonClicked();
                    setIsOpen(false);
                  }}
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
