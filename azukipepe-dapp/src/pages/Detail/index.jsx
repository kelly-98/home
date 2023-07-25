import React, { useState } from "react";
import { useParams } from "react-router-dom";

import demo from "../../assets/img/staking.gif";
import box from "../../assets/img/box-main.png";
import logo from "../../assets/img/logo.svg";
import hammer from "../../assets/img/hammer.png";
import right from "../../assets/img/right.png";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function Detail(props) {
  let { id } = useParams();

  const [stakeModalInput, setStakeModalInput] = useState();
  const [unStakeModalInput, setUnStakeInput] = useState();

  const [openStakeModal, setOpenStakeModal] = useState(false);

  const onOpenStakeModal = () => setOpenStakeModal(true);
  const onCloseStakeModal = () => setOpenStakeModal(false);

  const [openUnStakeModal, setOpenUnStakeModal] = useState(false);

  const onOpenUnStakeModal = () => setOpenUnStakeModal(true);
  const onCloseUnStakeModal = () => setOpenUnStakeModal(false);

  return (
    <div className="page">
      <div className="page-box-img">
        <img src={box} alt="" />
      </div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="page-content page-content-detail">
        <div className="page-content-header">
          <h2 className="btn-primary-reverse">Staking Details</h2>
          <div className="page-content-header-btn-group">
            <button className="stake" onClick={onOpenStakeModal}>
              Stake
            </button>
            <button className="stake active" onClick={onOpenUnStakeModal}>
              Unstake
            </button>
          </div>
        </div>

        <Modal open={openStakeModal} onClose={onCloseStakeModal} center>
          <div className="modal-custom">
            <h3 className="modal-custom-title">Stake $AZP</h3>
            <form className="modal-custom-form">
              <input
                type="number"
                value={stakeModalInput}
                onChange={(e) => setStakeModalInput(e?.target?.value)}
              />
              <button>Max</button>
            </form>
            <button
              className={`stake modal-submit-btn ${
                stakeModalInput > 0 ? "active" : ""
              }`}
              disabled={!stakeModalInput > 0}>
              Stake
            </button>
          </div>
        </Modal>

        <Modal open={openUnStakeModal} onClose={onCloseUnStakeModal} center>
          <div className="modal-custom">
            <h3 className="modal-custom-title">Unstake $AZP</h3>
            <h3 className="modal-custom-subtitle">
              <span>Staking:</span> <span>XXX $AZP</span>
            </h3>
            <form className="modal-custom-form">
              <input
                type="number"
                value={unStakeModalInput}
                onChange={(e) => setUnStakeInput(e?.target?.value)}
              />
              <button>Max</button>
            </form>
            <button
              className={`stake modal-submit-btn ${
                unStakeModalInput > 0 ? "active" : ""
              }`}
              disabled={!unStakeModalInput > 0}>
              Unstake
            </button>
          </div>
        </Modal>

        <div className="page-content-main page-content-main-detail">
          <div className="page-detail-left">
            <img src={demo} alt="" />
            <span className="mining">
              <img src={hammer} alt="hammer" />
              Mining
            </span>
          </div>
          <div className="page-detail-right">
            <div className="page-detail-right-info">
              <div className="page-detail-right-info-item">
                <span className="page-detail-right-info-label">
                  Total Stake
                </span>
                <span>XXX</span>
              </div>
              <div className="page-detail-right-info-item">
                <span className="page-detail-right-info-label">TVL</span>
                <span>XXX</span>
              </div>
              <div className="page-detail-right-info-item">
                <span className="page-detail-right-info-label">APY</span>
                <span>XXX</span>
              </div>
              <div className="page-detail-right-info-item">
                <span className="page-detail-right-info-label">
                  Participant
                </span>
                <span>XXX</span>
              </div>
              <div className="page-detail-right-info-item">
                <span className="page-detail-right-info-label">Your Stake</span>
                <span>XXX</span>
              </div>
              <div className="page-detail-right-info-item">
                <span className="page-detail-right-info-label">Reward</span>
                <span>XXX</span>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content-img-right">
          <img src={right} alt="right" />
        </div>
      </div>
    </div>
  );
}

export default Detail;
