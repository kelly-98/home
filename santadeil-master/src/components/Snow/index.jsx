import React, { memo } from "react";
import "./style.scss";

const Snow = ({ className = "" }) => {
  const snow = [1];
  let amount = 150;
  const { innerWidth: widthScreen } = window;

  if (widthScreen < 700) {
    amount = 50;
  }

  for (let i = 0; i < amount; i++) {
    snow.push(i);
  }

  return (
    <div className={`snow ${className}`}>
      {snow.map(() => (
        <div className="snowflake1">
          <span></span>
        </div>
      ))}
    </div>
  );
};
export default memo(Snow);
