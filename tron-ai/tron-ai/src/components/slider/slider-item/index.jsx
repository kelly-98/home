import React from "react";
import PropTypes from "prop-types";
import "react-modal-video/scss/modal-video.scss";
import "./styles.scss";

SliderItem.propTypes = {
  item: PropTypes.object,
};

function SliderItem(props) {
  const { item } = props;

  return (
    <div className={`box-slider ${item.classAction}`}>
      <img className="bg-slider" src={item.bgImg} alt="cybox" />
      <div className="box-slider__main">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="content-box">
                <h1 className="title">
                  {item.isSpecial ? (
                    <>
                      TRONAI <br /> NFT GENERATOR <br /> FROM TEXT
                    </>
                  ) : (
                    item.title
                  )}
                </h1>
                <p className="sub-title">{item.desc}</p>
                <p className="sub-title">
                  Smart Contract:{" "}
                  <b>0xD2Eb76fefF5FBd549Ca078908Fb5eFcE7533A09D</b>
                </p>
                <div className="wrap-btn">
                  <a
                    href="https://t.me/TronAI_ARB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tf-button-st2 btn-effect"
                    data-toggle="modal"
                    data-target="#popup_bid"
                  >
                    <span className="effect">JOIN TELEGRAM</span>
                  </a>
                  <a
                    href="https://discord.gg/Y7weXDTZF3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tf-button btn-effect popup-youtube"
                  >
                    <span className="boder-fade"></span>
                    <span className="effect">JOIN DISCORD</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="image">
                <img src={item.img} alt="TronAI" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderItem;
