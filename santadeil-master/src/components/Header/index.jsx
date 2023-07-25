import React, { memo, useEffect } from "react";
import HeaderLogo from "../../assets/images/logo/headerlogo.png";
import Docs from "../../assets/wpp.pdf";
import "./style.scss";

import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
import { setupNetwork, switchNetwork } from "../../wallet";
import useErc20 from "../../hooks/useErc20";

const accountBalance = "12221212121299000";

const Header = ({ isMenuActive, setIsMenuActive }) => {
  const { account, active, chainId } = useWeb3React();
  const { login, logout } = useAuth();
  const { mint } = useErc20();

  const mintButtonClicked = async () => {
    await mint();
  };
  const performConnectButtonClick = async () => {
    if (active) {
      if (chainId !== Number(process.env.REACT_APP_MAIN_CHAIN_ID)) {
        await setupNetwork();
        await switchNetwork(process.env.REACT_APP_MAIN_CHAIN_ID_HEX);
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
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <img className="header-logo-img" src={HeaderLogo} alt="header-logo" />
        </div>
        <div
          className="header-menu-toggle"
          onClick={() => setIsMenuActive(!isMenuActive)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <ul className="header-menu">
        <div className="header-menu-wrapper">
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
        </div>
      </ul>
      <div className="header-right">
        {account && (
          <button onClick={mintButtonClicked} className="btn-primary">
            <div className="light-blur">
              <div className="btn-primary-wrapper">Mint Testnet</div>
            </div>
          </button>
        )}
        {account && (
          <div className="header-account-balance-wrapper">
            <span className="header-account-balance">
              {accountBalance.length > 12
                ? `${accountBalance?.substring(0, 12)}... `
                : accountBalance}
              STD
            </span>
          </div>
        )}
        <button onClick={performConnectButtonClick} className="btn-primary">
          <div className="light-blur">
            <div className="btn-primary-wrapper">
              {(function () {
                if (active) {
                  return chainId !== Number(process.env.REACT_APP_MAIN_CHAIN_ID)
                    ? "Switch network"
                    : accountEllipsis;
                } else {
                  return "Connect Wallet";
                }
              })()}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
