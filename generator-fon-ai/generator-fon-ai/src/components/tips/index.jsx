import React from "react";

import { FaLightbulb } from "react-icons/fa";

import "./style.scss";

export default function Tips({ tip }) {
  return (
    tip && (
      <div className="tips">
        <div className="container">
          <div className="tips-box">
            <div className="tips-box-img">
              <img src={tip?.img} alt="tip-img" />
            </div>
            <div className="tips-box-content">
              <div className="tips-box-content-title">
                <h5>
                  Tip <FaLightbulb />
                </h5>
                <i>{tip?.title}</i>
              </div>
              <p className="tips-box-content-desc">
                <>{`Example: "${tip?.description}"`}</>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
