import React, { useEffect, useMemo } from "react";
import SpinWheelBg from "../../assets/images/spin/behind.png";
import SpinWheelMain from "../../assets/images/spin/spin.png";
import SpinWheelArrow from "../../assets/images/spin/mid.png";
import SpinWheelBottomLeft from "../../assets/images/spin/bottom-left.png";
import SpinWheelBottomRight from "../../assets/images/spin/bottom-right.png";
import styled, { keyframes } from "styled-components";

export default function WinWheel({ gift, isStartSpin }) {
  const rotateDeg = gift?.name ? 360 - gift?.id * 45 : 0;
  const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(${360 * 4 + rotateDeg}deg);
  }
`;

  const Rotate = styled.img`
    animation: ${rotate} 3s linear ${isStartSpin ? "infinite" : "1"} forwards;
  `;

  return useMemo(
    () => (
      <>
        <div className="spin-wheel-bg">
          <img src={SpinWheelBg} alt="spin-wheel-bg" />
        </div>
        <div className="spin-wheel-main">
          <Rotate src={SpinWheelMain} />
        </div>
        <div className="spin-wheel-arrow">
          <img src={SpinWheelArrow} alt="SpinWheel" />
        </div>
        <div className="spin-wheel-bottom-left">
          <img src={SpinWheelBottomLeft} alt="SpinWheel" />
        </div>
        <div className="spin-wheel-bottom-right">
          <img src={SpinWheelBottomRight} alt="SpinWheel" />
        </div>
      </>
    ),
    [isStartSpin]
  );
}
