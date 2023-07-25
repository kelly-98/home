import React, { memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Snow from "../Snow";

import "./style.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      data: [3.1, 27, 14.4, 25, 10, 5.5, 2.5, 7.5, 5],
      backgroundColor: [
        "#ff914e",
        "#e45e57",
        "#bb305e",
        "#870a5f",
        "#4c0157",
        "#4f3e8f",
        "#406fc1",
        "#1c9ee6",
        "#01ceff",
      ],
    },
  ],
};

const Tokenomics = () => {
  return (
    <div className="tokenomics">
      <Snow />
      <h4 className="tokenomics-title">Tokenomics</h4>
      <div className="tokenomics-wrapper">
        <div className="tokenomics-left">
          <div className="tokenomics-left-chart-wrapper">
            <Doughnut
              data={data}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (item) => `${item.parsed}%`,
                    },
                  },
                },
              }}
            />
            <div className="tokenomics-chart-title">
              <h5>BUY TAX 0%</h5>
              <h5>SELL TAX 10%</h5>
            </div>
          </div>
        </div>
        <div className="tokenomics-right">
          <ul className="tokenomics-right-left">
            <li>
              <div className="test-wrapper">
                <div
                  className="test"
                  style={{ backgroundColor: "#ff914e" }}
                ></div>
              </div>
              <span>Private Sale 3.1%</span>
            </li>
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-2"
                  style={{ backgroundColor: "#e45e57" }}
                ></div>
              </div>
              <span>Presale 27%</span>
            </li>
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-3"
                  style={{ backgroundColor: "#bb305e" }}
                ></div>
              </div>
              <span>Liquidity 14.4%</span>
            </li>
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-4"
                  style={{ backgroundColor: "#870a5f" }}
                ></div>
              </div>
              <span>Rewards 25%</span>
            </li>
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-5"
                  style={{ backgroundColor: "#4c0157" }}
                ></div>
              </div>
              <span>Marketing 10%</span>
            </li>
          </ul>
          <ul className="tokenomics-right-right">
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-6"
                  style={{ backgroundColor: "#4f3e8f" }}
                ></div>
              </div>
              <span>Developer 5.5%</span>
            </li>
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-7"
                  style={{ backgroundColor: "#406fc1" }}
                ></div>
              </div>
              <span>Community 2.5%</span>
            </li>
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-8"
                  style={{ backgroundColor: "#1c9ee6" }}
                ></div>
              </div>
              <span>NFT Staking 7.5%</span>
            </li>
            <li>
              <div className="test-wrapper">
                <div
                  className="test box-shadow-9"
                  style={{ backgroundColor: "#01ceff" }}
                ></div>
              </div>
              <span>CEX partner 5%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Tokenomics);
