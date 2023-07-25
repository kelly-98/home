import React, { useState } from "react";
import { Link } from "react-router-dom";

import box from "../../assets/img/box-main.png";
import logo from "../../assets/img/logo.svg";
import left from "../../assets/img/left.png";

function List(props) {
  const records_per_page = 3;

  const [inputSearch, setInputSearch] = useState("");

  const data = [
    { level: "#1", reward: 10, apr: 10, status: "Unstaking" },
    { level: "#2", reward: 20, apr: 20, status: "Unstaking" },
    { level: "#3", reward: 20, apr: 20, status: "Unstaking" },
  ];

  const [filteredList, setFilteredList] = useState(data);

  const [currentPage, setCurrentPage] = useState(1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < numPages(filteredList)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filterBySearch = (id) => {
    let updatedList = [...data];
    updatedList = updatedList.filter((item) => {
      return item.level === id;
    });
    setFilteredList(updatedList);
  };

  const numPages = (data) => Math.ceil(filteredList?.length / records_per_page);

  return (
    <div className="page">
      <div className="page-box-img">
        <img src={box} alt="" />
      </div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="page-content page-content-list">
        <div className="page-content-header">
          <h2 className="btn-primary-reverse">Total Staking List</h2>
          <div className="page-content-header-search">
            <input
              placeholder="Search token ID"
              value={inputSearch}
              onChange={(e) => {
                setInputSearch(e.target.value);
                if (!e.target.value) {
                  setFilteredList(data);
                } else {
                  filterBySearch(e.target.value);
                }
              }}
            />
            <span
              className="page-content-header-search-icon"
              onClick={() => {
                filterBySearch(inputSearch);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512">
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                  fill="#fff"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="page-content-main">
          <div className="list-data list-data-label">
            <span className="list-data-1">Level</span>
            <span className="list-data-2">Mineable Reward</span>
            <span className="list-data-3">APR</span>
            <span className="list-data-4">Staking Status</span>
          </div>
          {filteredList.length > 0 ? (
            filteredList
              .slice(
                (currentPage - 1) * records_per_page,
                currentPage * records_per_page
              )
              .map((item) => (
                <div className="list-data list-data-body" key={item.level}>
                  <span className="list-data-1">{item.level}</span>
                  <span className="list-data-2">{item.reward} AZK</span>
                  <span className="list-data-3">{item.apr}</span>
                  <span className="list-data-4">{item.status}</span>
                  <Link
                    to={`/stake/${item.level.split("").slice(1)}`}
                    className="btn-detail">
                    Detail
                  </Link>
                </div>
              ))
          ) : (
            <div className="notfound">No data found</div>
          )}
          <div className="list-data-btn">
            <button onClick={prevPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 256 512">
                <path
                  d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                  fill="#b6b6b6"
                />
              </svg>
            </button>
            <span className="current-page">{currentPage}</span>
            <button onClick={nextPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512">
                <path
                  d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                  fill="#b6b6b6"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="page-content-img-left">
          <img src={left} alt="left" />
        </div>
      </div>
    </div>
  );
}

export default List;
