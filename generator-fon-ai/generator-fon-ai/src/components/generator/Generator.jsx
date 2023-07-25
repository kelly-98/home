import React, { useState } from "react";
import generate from "../../api/generate.js";
import { tipsData } from "../../data/index.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

function Generator({
  setGeneratedData,
  defaultData,
  setCount,
  setIsStarted,
  setTip,
  isDisable,
}) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setGeneratedData(defaultData);
    if (description) {
      setCount(0.3);
      setTip(tipsData[Math.floor(Math.random() * 10)]);
      setIsStarted(true);
      setIsLoading(true);
      generate(description)
        .then((res) => {
          if (res?.length) {
            setGeneratedData(res);
            setTimeout(() => {
              setTip(tipsData[Math.floor(Math.random() * 10)]);
            }, 8000);
          }
        })
        .catch((err) => {
          toast.error(`Please try again in a few minutes!`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please enter your description!");
    }
  }

  return (
    <section className="page-title">
      <ToastContainer position="top-center" />
      <div className="shape"></div>
      <div className="shape right s3"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="page-title__body">
              <div className="page-title__main">
                <textarea
                  className="page-title-description-input"
                  type="text"
                  name="description"
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isDisable) {
                      onSubmit(e);
                    }
                  }}
                />
              </div>
            </div>

            <button
              className={`action-btn ${isDisable ? "btn-disabled" : ""}`}
              onClick={onSubmit}
              disabled={isLoading || isDisable}
            >
              <span className={`${isLoading ? "hidden" : ""}`}>
                Generate Now
              </span>
              {isLoading && (
                <div className="loader-wrapper">
                  <div className="loader"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Generator;
