import React, { memo } from "react";
import Snow from "../Snow";
import Utilities1 from "../../assets/images/utility/utility_0000.png";
import Utilities2 from "../../assets/images/utility/utility_0001.png";
import Utilities3 from "../../assets/images/utility/utility_0002.png";
import UtilitiesBG from "../../assets/images/utility/bg.png";
import "./style.scss";

const Utilities = () => {
  return (
    <div id="utilities" className="utilities">
      <Snow />
      <h4 className="utilities-title">SANTA DEVIL UTILITIES</h4>
      <ul className="utilities-list">
        <li className="utilities-item">
          <div className="utilities-item-img-wrapper">
            <img src={UtilitiesBG} alt="Utilities1" />
          </div>
          <div className="utilities-gift">
            <img src={Utilities1} alt="Utilities1" />
          </div>
          <div className="utilities-text">
            <h5>Transparent Team</h5>
            <p>Development team has passed the KYC process of PINKSALE</p>
          </div>
        </li>
        <li className="utilities-item">
          <div className="utilities-item-img-wrapper">
            <img src={UtilitiesBG} alt="Utilities1" />
          </div>
          <div className="utilities-gift">
            <img src={Utilities2} alt="Utilities2" />
          </div>
          <div className="utilities-text">
            <h5>Mainnet At Launch</h5>
            <p>
              The Lucky Spin game will be released on Mainnet after token launch
            </p>
          </div>
        </li>
        <li className="utilities-item">
          <div className="utilities-item-img-wrapper">
            <img src={UtilitiesBG} alt="Utilities1" />
          </div>
          <div className="utilities-gift">
            <img src={Utilities3} alt="Utilities3" />
          </div>
          <div className="utilities-text">
            <h5>Activate Community</h5>
            <p>A huge community and Angel Investors always support together</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default memo(Utilities);
