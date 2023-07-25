import React, { useState } from "react";
import PropTypes from "prop-types";

import img from "../../assets/images/background/line.png";

Roadmap.propTypes = {
  data: PropTypes.array,
};

function Roadmap(props) {
  const { data } = props;

  const [dataBlock] = useState({
    subheading: "Road Map",
    heading: "The Journey Of FonAI",
  });

  return (
    <section className="roadmap">
      <img src={img} alt="" className="img-line" />
      <div className="shape"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="block-text center">
              <h6 className="sub-heading">
                <span>{dataBlock.subheading}</span>
              </h6>
              <h3 className="heading pd">{dataBlock.heading}</h3>
            </div>

            <div
              className="roadmap__main"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              {data.map((idx) => (
                <div key={idx.id} className={`roadmap-box ${idx.class}`}>
                  <div className="time">{idx.time}</div>
                  <div className="content">
                    <h5 className="title">{idx.title}</h5>
                    {/* <p className="text">{idx.desc}</p> */}
                    {idx.desc.map((_) => (
                      <p className="text">{_}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="icon"></div>
              <div className="icon bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Roadmap;
