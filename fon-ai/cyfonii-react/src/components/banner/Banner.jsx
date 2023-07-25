import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/layouts/banner.png";
import imgTwitter from "../../assets/images/icon/twitter.png";
import imgTelegram from "../../assets/images/icon/telegram.png";

function Banner(props) {
  return (
    <section className="banner">
      <div className="shape right"></div>
      <div className="container big">
        <div className="row">
          <div className="col-xl-6 col-md-12">
            <div className="banner__left">
              <div className="block-text">
                <h2 className="heading">
                  Connect FonAI <br />
                  To Generate{" "}
                  <span className="s1 arlo_tm_animation_text_word">
                    NFTs
                  </span>{" "}
                  <br />
                  Onchain
                </h2>
                <p className="desc">
                  The artificial intelligence robot on blockchain generates
                  digital NFTs from the user's description starting on Arbitrum
                </p>
                <p className="desc">
                  Smart Contract:{" "}
                  <b>0xCa848be669070A6a429a400EdF2Af8B95008951c</b>
                </p>

                <a
                  href="https://generator.fonai.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                >
                  <span>Get Connected</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="banner__right">
              <div className="image">
                <img src={img1} alt="cyfonii" />
              </div>

              <a
                className="price"
                href="https://twitter.com/FonAI_ARB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="icon">
                  <img src={imgTwitter} alt="cyfonii" />
                </div>
                <div className="content">
                  <p>@FonAI_ARB</p>
                  <h5>Twitter</h5>
                </div>
              </a>

              <a
                className="owner"
                href="https://t.me/FonAI_ARB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="image">
                  <img src={imgTelegram} alt="cyfonii" />
                </div>
                <div className="content">
                  <h5>Telegram</h5>
                  <p>@FonAI_ARB</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
