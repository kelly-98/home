import React, { memo } from "react";
import Snow from "../Snow";
import Gift1 from "../../assets/images/rw/rw_0000.png";
import Gift2 from "../../assets/images/rw/rw_0001.png";
import Gift3 from "../../assets/images/rw/rw_0002.png";
import Gift4 from "../../assets/images/rw/rw_0003.png";
import Gift5 from "../../assets/images/rw/rw_0004.png";
import Gift6 from "../../assets/images/rw/rw_0005.png";
import Gift7 from "../../assets/images/rw/rw_0006.png";
import Gift8 from "../../assets/images/rw/rw_0007.png";
import "./style.scss";

const Gifts = () => {
  return (
    <div className="gifts">
      <Snow />
      <ul className="gifts-wrapper">
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift1} alt="gift-1" />
          </div>
          <span>-1</span>
        </li>
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift2} alt="gift-2" />
          </div>
          <span>3.8$</span>
        </li>
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift3} alt="gift-3" />
          </div>
          <span>60$</span>
        </li>
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift4} alt="gift-4" />
          </div>
          <span>7.5$</span>
        </li>
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift5} alt="gift-5" />
          </div>
          <span>15$</span>
        </li>
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift6} alt="gift-6" />
          </div>
          <span>30$</span>
        </li>
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift7} alt="gift-7" />
          </div>
          <span>2.5$</span>
        </li>
        <li className="gifts-item">
          <div className="gifts-item-img-wrapper">
            <img src={Gift8} alt="gift-8" />
          </div>
          <span>5$</span>
        </li>
      </ul>
      <ul className="gifts-wrapper-mb">
        <div className="gifts-wrapper-mb-wrapper">
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift1} alt="gift-1" />
            </div>
            <span>-1</span>
          </li>
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift2} alt="gift-2" />
            </div>
            <span>3.8$</span>
          </li>
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift3} alt="gift-3" />
            </div>
            <span>60$</span>
          </li>
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift4} alt="gift-4" />
            </div>
            <span>7.5$</span>
          </li>
        </div>
        <div className="gifts-wrapper-mb-wrapper">
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift5} alt="gift-5" />
            </div>
            <span>15$</span>
          </li>
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift6} alt="gift-6" />
            </div>
            <span>30$</span>
          </li>
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift7} alt="gift-7" />
            </div>
            <span>2.5$</span>
          </li>
          <li className="gifts-item">
            <div className="gifts-item-img-wrapper">
              <img src={Gift8} alt="gift-8" />
            </div>
            <span>5$</span>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default memo(Gifts);
