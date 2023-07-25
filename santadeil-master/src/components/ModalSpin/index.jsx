import React, { useEffect } from "react";
import "./style.scss";

export default function ModalSpin({
  isOpen = false,
  setIsOpen,
  gift = {
    giftName: "Gift Name",
    giftImg: null,
  },
  setGift,
}) {
  const { giftName, giftImg } = gift;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isOpen]);

  return (
    <div className={`modal-spin ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-spin-content">
        <h4>Congratulation!!</h4>
        <div className="modal-spin-body">
          <div>
            You got:{" "}
            <span className="modal-spin-body-gift-name">{giftName}</span>
          </div>
          <div className="modal-spin-body-img">
            <img src={giftImg || ""} alt="gift" />
          </div>
          <button className="btn-primary">
            <div className="light-blur">
              <div
                className="btn-primary-wrapper"
                onClick={() => {
                  setGift(null);
                  setIsOpen(false);
                }}
              >
                Confirm
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
