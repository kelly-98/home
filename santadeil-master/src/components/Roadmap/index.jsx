import React, { memo } from "react";
import Snow from "../Snow";
import RoadmapDown from "../../assets/images/roadmap/rm-down.png";
import RoadmapUp from "../../assets/images/roadmap/rm-up.png";
import "./style.scss";

const Roadmap = () => {
  return (
    <div className="roadmap">
      <Snow />
      <h4 className="roadmap-title">Roadmap</h4>
      <div className="roadmap-list">
        <div className="roadmap-row">
          <div className="roadmap-item">
            <img src={RoadmapDown} alt="roadmap-img" />
            <div className="roadmap-item-text">
              <h5>Phase 1:</h5>
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i> Visit Santa's home
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> He gives us ideas
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Start Designing
                </li>
              </ul>
            </div>
          </div>
          <div className="roadmap-item">
            <img src={RoadmapDown} alt="roadmap-img" />
            <div className="roadmap-item-text">
              <h5>Phase 2:</h5>
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i> Contract development
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Spin game deployment
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Open socials and
                  community group
                </li>
              </ul>
            </div>
          </div>
          <div className="roadmap-item">
            <img src={RoadmapDown} alt="roadmap-img" />
            <div className="roadmap-item-text">
              <h5>Phase 3:</h5>
              <ul>
                <li>
                  <i className="fa-solid fa-spinner"></i> KYC and audit verify
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> Private-sale round
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> Pre-launch marketing
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> Testnet ver.1
                  launching
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="roadmap-row roadmap-row-2">
          <div className="roadmap-item">
            <img src={RoadmapUp} alt="roadmap-img" className="roadmap-bg-2" />
            <div className="roadmap-item-text roadmap-item-text-2">
              <h5>Phase 4:</h5>
              <ul>
                <li>
                  <i className="fa-solid fa-spinner"></i> Presale round
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> Spin game completed
                  and start launching
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> PancakeSwap listing
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> Event for lucky
                  players
                </li>
              </ul>
            </div>
          </div>
          <div className="roadmap-item">
            <img src={RoadmapUp} alt="roadmap-img" className="roadmap-bg-2" />
            <div className="roadmap-item-text roadmap-item-text-2">
              <h5>Phase 5:</h5>
              <ul>
                <li>
                  <i className="fa-solid fa-spinner"></i> Coingecko and
                  Coinmarketcap listing
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> The mystery game
                  starting deployment
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> Ver.2 of Spin Game
                  release
                </li>
                <li>
                  <i className="fa-solid fa-spinner"></i> More TBA...
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Roadmap);
