import React, { useEffect, useState } from "react";

import Generator from "../components/generator/Generator";
import Footer from "../components/footer/Footer";

import Modal from "react-bootstrap/Modal";
import Tips from "../components/tips";

import { tipsData } from "../data";

const defaultData = [
  {
    id: 1,
    url: "",
  },
  {
    id: 2,
    url: "",
  },
  {
    id: 3,
    url: "",
  },
  {
    id: 4,
    url: "",
  },
  {
    id: 5,
    url: "",
  },
  {
    id: 6,
    url: "",
  },
];

function Home({ isDisable }) {
  const [generatedData, setGeneratedData] = useState(defaultData);
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [tip, setTip] = useState(tipsData[Math.floor(Math.random() * 10)]);

  const [show, setShow] = useState(false);
  const [showMint, setShowMint] = useState(false);

  const [modalData, setModalData] = useState(null);
  const [mintModalData, setMintModalData] = useState(null);

  const handleClose = () => setShow(false);

  const handleCloseMint = () => setShowMint(false);

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (6 > count > 5) {
      setTimeout(() => {
        setCount(6);
      }, 4000);
    }
  }, [count]);

  return (
    <div className="wrapper">
      <h2 className="page-title">
        FonAI <span className="text-purple">NFTs</span> <br />
        Art Generator
      </h2>
      <Generator
        setGeneratedData={setGeneratedData}
        defaultData={defaultData}
        setCount={setCount}
        setIsStarted={setIsStarted}
        setTip={setTip}
        isDisable={isDisable}
      />

      {isStarted && <Tips tip={tip} />}

      <section className="participants">
        <div className="container">
          <div className="participants-progress">
            <h4>Process</h4>
            <div
              className="participants-progress-bar"
              style={{
                width: `${(count * 100) / 6}%`,
              }}
            ></div>
          </div>
          <div className="row">
            {generatedData.map((idx, index) => (
              <div key={index} className="col-md-4">
                <div
                  className="blog-box"
                  onClick={() => {
                    if (width > 768 && idx?.url) {
                      setShow(true);
                      setModalData(idx?.url);
                    }
                  }}
                >
                  <div className="image">
                    <a>
                      {idx?.url && (
                        <img
                          key={index}
                          src={idx?.url}
                          style={{ opacity: 0 }}
                          alt="FonAI"
                          onLoad={(img) => {
                            img.target.style.opacity = 1;
                            if (count > 5) {
                              setCount(6);
                            } else {
                              setCount(count + 1);
                            }
                          }}
                        />
                      )}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-12">
              <div className="par-bot center">
                <p className="mb-17 pd-custom">
                  Pick a favorite artwork and ask the FonAI to process it
                  on-chain to mint it into NFT Please make sure your wallet has
                  enough ARB to pay the GAS fees
                </p>
                <a
                  className="action-btn"
                  onClick={() => {
                    // if (count === 6) {
                    setShowMint(true);
                    // }
                  }}
                >
                  <span>Mint NFT</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} className="modal-img">
        <Modal.Body>
          <img src={modalData} alt="modal-img" />
        </Modal.Body>
      </Modal>

      <Modal show={showMint} onHide={handleCloseMint} className="modal-mint">
        <Modal.Body>
          <h5 className="modal-mint-title">
            Please choose one of the photos below
          </h5>
          <div className="modal-mint-list">
            {generatedData.map((item, index) => (
              <div
                className={`modal-mint-item ${
                  mintModalData?.index === index ? "active" : ""
                }`}
                key={index}
                onClick={() => {
                  if (mintModalData?.index === index) {
                    setMintModalData(null);
                  } else {
                    setMintModalData({ ...item, index });
                  }
                }}
              >
                <img
                  className="modal-mint-img"
                  src={item?.url}
                  alt="mint-nft-img"
                />
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a
            className="action-btn"
            onClick={() => {
              setShowMint(false);
              setMintModalData(null);
            }}
          >
            <span>Coming soon</span>
          </a>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}

export default Home;
