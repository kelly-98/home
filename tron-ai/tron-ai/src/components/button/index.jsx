import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./styles.scss";

Button.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
};

function Button(props) {
  const { title, path, onClick } = props;
  return (
    <a
      className="tf-button btn-effect"
      href={path}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="boder-fade"></span>
      <span className="effect">{title}</span>
    </a>
  );
}

export default Button;
