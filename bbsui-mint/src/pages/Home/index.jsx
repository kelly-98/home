import React from "react";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useApp from "../../hooks/useApp";
import { useWeb3React } from "@web3-react/core";
import Countdown from "react-countdown";
import useAuth from "../../hooks/useAuth";
import { setupNetwork, switchNetwork } from "../../wallet";

import Logo from "../../assets/img/logo-2.png";
import Gif from "../../assets/img/gif.gif";

import "react-tabs/style/react-tabs.css";
import "./style.scss";

export default function Home() {
  const { account, active, chainId } = useWeb3React();
  const { login, logout } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);

  const {
    getTotalTokens,
    checkEligible,
    getAirdropAmounts,
    getStartDate,
    getEndDate,
    getRemainingTokens,
    claimAirdrop,
  } = useApp();

  const [reload, setReload] = useState(new Date().getTime());
  const [totalTokens, setTotalTokens] = useState(0);
  const [eligible, setEligible] = useState(false);
  const [airdropAmounts, setAirdropAmounts] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [progressValue, setProgressValue] = useState(10);
  const [canClaim, setCanClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setIsLoading(true);
    const totalTokensValue = await getTotalTokens();
    const remainingTokensValue = await getRemainingTokens();
    const startDateValue = await getStartDate();
    const endDateValue = await getEndDate();
    var progressValuePercentage = parseInt(
      ((totalTokensValue - remainingTokensValue) / totalTokensValue) * 100
    );
    setProgressValue(progressValuePercentage);
    setTotalTokens(totalTokensValue);
    setStartDate(startDateValue);
    setEndDate(endDateValue);
    if (account && active) {
      const eligibleValue = await checkEligible(account);
      const airdropAmountsValue = await getAirdropAmounts(account);
      setAirdropAmounts(airdropAmountsValue);
      setEligible(eligibleValue);
      setCanClaim(
        active &&
          eligibleValue &&
          new Date().getTime() / 1000 > startDateValue &&
          new Date().getTime() / 1000 < endDateValue &&
          airdropAmountsValue > 0
      );
    }
    setIsLoading(false);
  };

  const handleClaimClicked = async () => {
    if (!account) return;
    await claimAirdrop();
    setReload(new Date().getTime());
  };

  useEffect(() => {
    getData();
  }, [account, chainId, reload]);

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

  return (
    <div className="home">
      <div className="home-form">
        <h3 className="home-form-title">
          {tabIndex === 0 ? "BabySui NFT MINTING" : "BabySui Token Airdrop"}
        </h3>
        <div className="home-form-header">
          <div className="home-form-header-left">
            <div className="home-form-header-left-logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="home-form-header-left-creator">
              <span>Creator</span>
              <h5>
                BabySui{" "}
                <span>
                  <svg class="w-5 h-5" viewBox="0 0 17 17" fill="none">
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </h5>
            </div>
          </div>
          <ul className="home-form-header-right">
            <li>
              <a
                href="https://t.me/BabySUI_TG"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/BabySUI_Offical"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://babysui.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-earth-americas"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="home-form-main">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>NFT</Tab>
              <Tab>Airdrop</Tab>
            </TabList>
            <TabPanel>
              <div className="home-form-mint-price-wrapper">
                <div className="home-form-mint-price">
                  <div>
                    <span>14 SUI</span>
                    <span>(0/2)</span>
                  </div>
                  <span>Total: 7000 NFTs</span>
                </div>
                <span className="home-form-mint-price-label">
                  Mint Price Of <span>$BABYSUI</span>
                </span>
              </div>
              {/* If time out show ... */}
              {/* <span className="home-form-mint-time">SUI minting ended</span> */}
              <div className="home-form-minted-total">
                <span>Total minted</span>
                <div className="home-form-minted-total-progress-wrapper">
                  {/* Set width */}
                  <span
                    className="home-form-minted-total-progress"
                    style={{ width: "20%" }}
                  ></span>
                  <span className="home-form-minted-total-progress-text">
                    100% (7000 / 7000)
                  </span>
                </div>
              </div>
              <button className="btn btn-secondary">Mint</button>
              {/* <button className="btn btn-sold-out">Sold out</button> */}
            </TabPanel>
            <TabPanel className="home-claim">
              <h2 className="home-claim-title">You get $BABYSUI now!</h2>
              <p className="home-claim-desc">
                <span>
                  Get ready for a day full of excitement with the $BABYSUI
                  token. Let's explore the vibrant world of art and technology
                  together!
                </span>
                <span>
                  Don't miss out on your chance to claim $BABYSUI tokens now.
                </span>
                <span>
                  There are a total of 10,000,000 $BABYSUI tokens up for grabs
                  for those who hold NFTs. Remember, any unclaimed $BABYSUI
                  tokens after 30 days will be burned.
                </span>
              </p>
              <div className="home-claim-time-burned-wrapper">
                <div className="home-claim-time-burned">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.58872 21.8312C5.48713 20.5794 4.38559 19.2775 3.68456 17.7253C2.98357 16.073 2.78327 14.1702 3.13378 12.3677C3.4843 10.5651 4.28541 8.86265 5.43709 7.4106C5.33696 8.6624 5.78761 9.96424 6.6388 10.9156C6.13807 8.51219 6.93923 5.90845 8.54151 4.00575C10.1438 2.10305 12.347 0.8512 14.6502 0C13.4986 1.20172 13.3484 3.10442 13.799 4.70674C14.2497 6.30901 15.201 7.71103 16.0522 9.16308C16.9034 10.6151 17.7046 12.1173 17.7547 13.7696C18.2053 12.9184 18.706 12.0672 19.0065 11.1159C19.3069 10.1645 19.4571 9.16308 19.2068 8.21171C20.1081 9.3133 20.6088 10.4148 20.8591 11.8169C21.1095 13.2189 21.0594 14.6709 20.9092 16.0729C20.7089 17.6252 20.3084 19.2275 19.4572 20.5293C18.4558 22.0815 16.8534 23.1831 15.1009 23.7839C11.9964 24.3347 8.94206 23.8841 6.58872 21.8312Z"
                      fill="#f87171"
                    ></path>
                    <path
                      d="M10.3948 23.6837C14.5007 25.286 18.5565 20.429 16.3032 16.6737C16.3032 16.6236 16.2532 16.6236 16.2532 16.5735C16.4535 18.6265 15.9527 20.1286 15.0014 20.9798C15.5021 19.7781 15.1516 18.3761 14.5507 17.1744C13.9499 16.0228 13.0987 14.9713 12.4477 13.8697C11.7968 12.7181 11.2961 11.4162 11.5965 10.1143C10.3948 11.0156 9.5436 12.3675 9.19308 13.8196C8.84257 15.2717 9.04287 16.874 9.69381 18.2259C8.94274 17.6751 8.39197 16.7738 8.34188 15.8225C7.54072 16.7738 7.04004 18.0256 7.09008 19.2774C7.09013 21.2302 8.64231 22.9827 10.3948 23.6837Z"
                      fill="#f87171"
                    ></path>
                  </svg>
                  <span>30 days will be burned</span>
                </div>
              </div>
              <div className="home-claim-progress">
                <div className="home-claim-progress-label">
                  <span>Claimed</span>
                  <span>10,000,000</span>
                </div>
                <div className="home-claim-progress-bar">
                  <div
                    className="home-claim-progress-value"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <button className="btn btn-secondary">Claim</button>

              <Countdown date={Date.now() + 5000}>
                <span>Done</span>
              </Countdown>
              {/* Can add disabled attribute, already available css */}
              {/* <button className="btn btn-secondary" disabled>
                Claim
              </button> */}
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <div className="home-gif">
        <img src={Gif} alt="gif" />
      </div>
    </div>
  );
}
