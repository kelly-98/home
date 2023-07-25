import React from "react";
import { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

import "./style.scss";
import useApp from "../../hooks/useApp";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
import { setupNetwork, switchNetwork } from "../../wallet";

export default function Home() {
  const { account, active, chainId } = useWeb3React();
  const { login, logout } = useAuth();

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
      <h3 className="home-title">
        Hey, everyone's on the lookout for ways to make some extra cash, right?{" "}
      </h3>
      <h3 className="home-title home-title-special">
        Well, the #BOBOBO is where it's at!
      </h3>
      <h6 className="text-center home-sub-title">
        We're gonna send it straight to the moon, and I'll even hook you up with
        some #BOBOBO.
      </h6>
      <div className="home-box-wrapper">
        <div id="airdrop" className="home-box">
          {/* {isLoading ? (
            <div className="loading">Loading SmartContract ...</div>
          ) : ( */}
          <>
            <h4 className="text-center home-box-title">
              Claim your <span>BOBOBO now</span>
            </h4>
            <p className="home-box-desc">
              If you claimed the ARB airdrop or have over 100 million $PEPE in
              your wallet before block 17114996, you're eligible for a whopping
              499,500,000,000,000,000 #BOBOBO. All tokens that have not been
              claimed within
            </p>

            <div className="home-box-time">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.58872 21.8312C5.48713 20.5794 4.38559 19.2775 3.68456 17.7253C2.98357 16.073 2.78327 14.1702 3.13378 12.3677C3.4843 10.5651 4.28541 8.86265 5.43709 7.4106C5.33696 8.6624 5.78761 9.96424 6.6388 10.9156C6.13807 8.51219 6.93923 5.90845 8.54151 4.00575C10.1438 2.10305 12.347 0.8512 14.6502 0C13.4986 1.20172 13.3484 3.10442 13.799 4.70674C14.2497 6.30901 15.201 7.71103 16.0522 9.16308C16.9034 10.6151 17.7046 12.1173 17.7547 13.7696C18.2053 12.9184 18.706 12.0672 19.0065 11.1159C19.3069 10.1645 19.4571 9.16308 19.2068 8.21171C20.1081 9.3133 20.6088 10.4148 20.8591 11.8169C21.1095 13.2189 21.0594 14.6709 20.9092 16.0729C20.7089 17.6252 20.3084 19.2275 19.4572 20.5293C18.4558 22.0815 16.8534 23.1831 15.1009 23.7839C11.9964 24.3347 8.94206 23.8841 6.58872 21.8312Z"
                  fill="#ACF10E"
                ></path>
                <path
                  d="M10.3948 23.6837C14.5007 25.286 18.5565 20.429 16.3032 16.6737C16.3032 16.6236 16.2532 16.6236 16.2532 16.5735C16.4535 18.6265 15.9527 20.1286 15.0014 20.9798C15.5021 19.7781 15.1516 18.3761 14.5507 17.1744C13.9499 16.0228 13.0987 14.9713 12.4477 13.8697C11.7968 12.7181 11.2961 11.4162 11.5965 10.1143C10.3948 11.0156 9.5436 12.3675 9.19308 13.8196C8.84257 15.2717 9.04287 16.874 9.69381 18.2259C8.94274 17.6751 8.39197 16.7738 8.34188 15.8225C7.54072 16.7738 7.04004 18.0256 7.09008 19.2774C7.09013 21.2302 8.64231 22.9827 10.3948 23.6837Z"
                  fill="#739C14"
                ></path>
              </svg>
              <span>30 days will be burned</span>
            </div>

            <div className="home-box-progress">
              <div className="home-box-progress-text">
                <span>Claimed</span>
                <span>499,500,000,000,000,000 $BOBOBO</span>
              </div>
              <div className="home-box-progress-bar-wrapper">
                {/* Change value in width */}
                <div
                  className="home-box-progress-bar"
                  style={{ width: `${0}%` }}
                ></div>
              </div>
            </div>
            {/* turn of/off disabled  */}
            {active ? (
              <div className="home-box-btn-group">
                {eligible && (
                  <button className="home-box-value" disabled>
                    {airdropAmounts}
                  </button>
                )}
                {!eligible && (
                  <button className="home-box-value" disabled>
                    You are not eligible
                  </button>
                )}
                {canClaim && (
                  <button onClick={handleClaimClicked} className="btn">
                    Claim
                  </button>
                )}

                {!canClaim && (
                  <button disabled className="btn">
                    Claim
                  </button>
                )}
              </div>
            ) : (
              <div className="home-box-btn-group-connect">
                {!active && (
                  <button
                    className="btn-secondary"
                    // onClick={connectButtonClicked}
                  >
                    Connect Wallet
                  </button>
                )}
                {/* {active &&
                  chainId !== Number(process.env.REACT_APP_CHAIN_ID) && (
                    <button
                      className="btn-secondary"
                      onClick={connectButtonClicked}
                    >
                      Switch Network
                    </button>
                  )} */}
              </div>
            )}
          </>
          {/* )} */}
          <div className="home-box-img">
            <svg
              width="165"
              height="163"
              viewBox="0 0 165 163"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.6693 28.7133C47.6693 28.7133 49.8441 52.5568 44.3848 65.8834C38.8051 79.5035 19.5122 95.7454 19.5122 95.7454C19.5122 95.7454 43.7319 91.4158 57.0763 96.7243C71.5584 102.486 87.2845 123.791 87.2845 123.791C87.2845 123.791 83.0475 97.7101 89.4831 83.3883C95.6002 69.7757 115.687 56.1677 115.687 56.1677C115.687 56.1677 90.9245 58.3232 76.7915 52.5474C63.3445 47.0521 47.6693 28.7133 47.6693 28.7133Z"
                fill="url(#paint0_linear_18_1894)"
              ></path>
              <path
                d="M120.972 77.4875C120.972 77.4875 122.017 89.3066 119.269 95.9238C116.459 102.687 106.799 110.773 106.799 110.773C106.799 110.773 118.899 108.585 125.553 111.195C132.774 114.027 140.589 124.564 140.589 124.564C140.589 124.564 138.518 111.639 141.756 104.527C144.834 97.7663 154.886 90.9846 154.886 90.9846C154.886 90.9846 142.519 92.0957 135.472 89.2559C128.767 86.554 120.972 77.4875 120.972 77.4875Z"
                fill="url(#paint1_linear_18_1894)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_18_1894"
                  x1="15.1423"
                  y1="77.2431"
                  x2="112.908"
                  y2="104.596"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.341176" stop-color="#ECFF76"></stop>
                  <stop offset="1" stop-color="#5AA840"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_18_1894"
                  x1="104.648"
                  y1="101.607"
                  x2="181.22"
                  y2="124.699"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.341176" stop-color="#ECFF76"></stop>
                  <stop offset="1" stop-color="#5AA840"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
