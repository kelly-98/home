import React, { useCallback, useEffect, useState } from "react";
import Snow from "../Snow";
import "./style.scss";
import useApp from "../../hooks/useApp";
import { useWeb3React } from "@web3-react/core";
import { giftData } from "../Spin";

const PER_PAGE = 10;

export default function History({
  isOpenModal,
  setIsShow,
  setIsSucceed,
  isSucceed,
}) {
  const { account } = useWeb3React();
  const { getResults, claim } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const totalPage = Math.ceil(historyData.length / PER_PAGE) || 1;

  const getData = useCallback(async () => {
    try {
      if (account) {
        const data = (await getResults(account))?.reverse() || [];
        setHistoryData(data);
      }
    } catch {}
  }, [account, getResults]);

  const handleClaim = async (id) => {
    try {
      setIsShow(false);
      if (account) {
        const tx = await claim(id);
        if (tx?.status !== 1) {
          setIsSucceed(false);
          setIsShow(true);
          return;
        }
        setIsSucceed(true);
        setIsShow(true);
      }
    } catch {
      setIsSucceed(false);
      setIsShow(true);
    }
  };

  useEffect(() => {
    if (account || isOpenModal) {
      fetch("https://api.santadevil.com/leader")
        .then((response) => response.json())
        .then((data) => setLeaderboardData(data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [account, isOpenModal]);

  useEffect(() => {
    getData();
    fetch("https://api.santadevil.com/leader")
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data))
      .catch((err) => {
        console.log(err);
      });
  }, [account, getData, isSucceed]);

  useEffect(() => {
    if (isOpenModal) {
      getData();
    }
  }, [isOpenModal, getData]);

  const renderHistory = (historyData, currentPage) => {
    if (historyData.length === 0) {
      return <></>;
    }
    const data = historyData.slice(
      currentPage * PER_PAGE - PER_PAGE,
      currentPage * PER_PAGE
    );
    return data?.map(({ id, gift, time, isClaimed }) => {
      const giftItem = giftData.find((record) => record.name === gift);
      return (
        <li className="history-item" key={id}>
          <p className="history-item-content">
            <span className="history-item-time">{time}</span>
            <div className="history-item-action">
              <div className="history-item-action-img">
                <img src={giftItem?.img} alt={gift} />
              </div>
            </div>

            {!isClaimed ? (
              <button
                onClick={() => {
                  handleClaim(id);
                }}
                className="btn-claim"
              >
                <div className="light-blur">
                  <div className="btn-claim-wrapper">CLAIM</div>
                </div>
              </button>
            ) : (
              <button className="btn-claim">
                <div className="light-blur">
                  <div className="btn-claim-wrapper btn-disabled">CLAIM</div>
                </div>
              </button>
            )}
          </p>
        </li>
      );
    });
  };

  return (
    <div className="history">
      <Snow />
      <div className="history-left">
        <ul className="history-list">
          <div className="history-list-wrapper">
            <h4>HISTORY</h4>

            {/* Render History Data */}
            <div className="history-box-shadow">
              <div className="history-box-shadow-wrapper">
                {renderHistory(historyData, currentPage)}
              </div>
            </div>

            {/* Pagination */}
            <div className="history-pagination">
              <div className="history-pagination-wrapper">
                <button
                  className="currentpage"
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <span>
                  {currentPage} / {totalPage}
                </span>
                <button
                  className="currentpage"
                  onClick={() => {
                    if (totalPage - currentPage > 0) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div className="history-right">
        <div className="leaderboard">
          <h4>LEADERBOARD</h4>
          <ul className="leaderboard-list">
            <div className="leaderboard-list-wrapper">
              {leaderboardData.map(({ id, walletId, numberOfSpins }) => (
                <li className="leaderboard-item">
                  <p className="leaderboard-content">
                    <span className="leaderboard-content-id">{id}</span>
                    <span className="leaderboard-content-wallet-code">
                      {walletId}
                    </span>
                    <span className="leaderboard-content-total-spin">
                      {numberOfSpins}
                    </span>
                  </p>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
