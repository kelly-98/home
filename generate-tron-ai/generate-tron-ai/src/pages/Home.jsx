import React, { useEffect, useState } from "react";

import { toast } from "react-toast";

import img from "../assets/images/common/img15.png";

import generate, { getNumsGeneratedImg } from "../api/generate";

const tags = [
  {
    id: 1,
    text: "Cyberpunk",
  },
  {
    id: 2,
    text: "Digital",
  },
  {
    id: 3,
    text: "Fantastical",
  },
  {
    id: 4,
    text: "Colorful",
  },
  {
    id: 5,
    text: "Universe",
  },
  {
    id: 6,
    text: "Pixel",
  },
];

function Home(props) {
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [opacity, setOpacity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [numsGeneratedImg, setNumsGeneratedImg] = useState(null);

  const [result, setResult] = useState();

  const handleGenerate = async (description) => {
    if (description) {
      setIsLoading(true);
      setOpacity(0);
      generate({
        text: "hello",
        prompt: "text",
      })
        .then((res) => {
          setResult(res.url);
          getNums();
        })
        .catch((err) => {
          toast.error("Oops! Some error occurred.");
          setIsLoading(false);
        });
    }
  };

  const getNums = () => {
    console.log("get nums");
    getNumsGeneratedImg()
      .then((res) => {
        setNumsGeneratedImg(res.numberOfImages);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getNums();
  }, []);

  return (
    <>
      <div className="page-item-details generate-page">
        <section className="tf-section tf-item-details pb-mobie">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div
                  className="image-details"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  {!opacity && (
                    <div className="no-img-generator">
                      <img src={img} alt="generator" />
                      {isLoading && (
                        <div className="spinner-wrapper">
                          <span className="spinner"></span>
                        </div>
                      )}
                    </div>
                  )}
                  <img
                    style={{ opacity: opacity }}
                    src={result}
                    alt="generator"
                    onLoad={(e) => {
                      setOpacity(1);
                      setIsLoading(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div
                  className="item-details"
                  data-aos="fade-left"
                  data-aos-duration="800"
                >
                  <h5>TRONAI GENERATOR</h5>
                  <p className="sub">Generate images and mint NFT by AI</p>
                  <textarea
                    className="desc"
                    placeholder="Enter your imagine"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGenerate(description);
                      }
                    }}
                  ></textarea>
                  {numsGeneratedImg && (
                    <p className="generator-imgs-num">
                      Generated: <span>500</span>
                    </p>
                  )}
                  <div className="list-product generate-tag-list">
                    {tags.map((tag) => (
                      <div
                        className={`box corner-box generate-tag ${
                          tag.id === selectedTag?.id ? "active" : ""
                        }`}
                        key={tag?.id}
                        onClick={() => {
                          setSelectedTag(tag);
                        }}
                      >
                        <p>{tag?.text}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`tf-button btn-effect w-100 ${
                      isLoading || !description ? "generator-btn-disabled" : ""
                    }`}
                    disabled={isLoading || !description}
                    onClick={() => {
                      handleGenerate(description);
                    }}
                  >
                    <span className="boder-fade"></span>
                    <span className="effect">Generate Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
