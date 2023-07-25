import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useApp from "../../hooks/useApp";
import useErc20 from "../../hooks/useErc20";

import WinWheel from "../../components/WinWheel";
import SpinButton from "../Button";
import "./style.scss";

export const giftData = [
  {
    id: 0,
    name: "Strawberry",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/a65a6a8f-0d73-4041-dbf7-5d5e8821d800/public",
  },
  {
    id: 1,
    name: "Candy Cane",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/ea0da1ea-a75d-4237-b831-c332f5b5af00/public",
  },
  {
    id: 2,
    name: "Santa Gift",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/5e857a78-a780-465a-975a-1d51601d7f00/public",
  },
  {
    id: 3,
    name: "Gingerbread",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/3a3de3e0-c426-47b4-c17d-c82950707700/public",
  },
  {
    id: 4,
    name: "Strawberry IceCream",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/d6cd678e-adb8-422e-341f-c83f6ac89a00/public",
  },
  {
    id: 5,
    name: "Christmas Beanie",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/97cd5259-6993-4b27-fd7f-723ecf9d7d00/public",
  },
  {
    id: 6,
    name: "Sweet Candy",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/01e056a0-9e35-4398-8dbb-4fc878f8f400/public",
  },
  {
    id: 7,
    name: "Snowball",
    img: "https://imagedelivery.net/R6EoT8PlEFwni6pQ-dSOqg/b176776f-242e-4801-8358-136ec7cc8100/public",
  },
];

export default function Spin({ setIsOpenModal, setGift, gift }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { account } = useWeb3React();
  const { spin, getLatestResult } = useApp();

  const [isStartSpin, setIsStartSpin] = useState(false);

  const handleSpinButtonCLick = async () => {
    if (account) {
      try {
        setIsDisabled(true);
        const isSpinSucceed = await spin(setIsStartSpin);
        const idGift = await getLatestResult();
        setGift(giftData[idGift]);
        if (isSpinSucceed) {
          setIsStartSpin(false);
          setTimeout(() => {
            setIsOpenModal(true);
            setIsDisabled(false);
          }, 3500);
        } else {
          setIsDisabled(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="spin">
      <div className="spin-intro">
        <h4 className="spin-title-small animate__animated animate__bounce animate__repeat-2">
          PLAY MORE TO EARN MORE
        </h4>
        <h2 className="spin-title animate__animated animate__fadeInUp">
          SPIN TO EARN
        </h2>
      </div>
      <div className="spin-wheel">
        <div className="spin-wheel-wrapper">
          <WinWheel gift={gift} isStartSpin={isStartSpin} />
          <SpinButton
            isDisabled={isDisabled}
            spinClicked={handleSpinButtonCLick}
          />
          <p className="spin-note">
            <i class="fa-solid fa-circle-exclamation"></i>
            Spin fee: $5 of STD calculated at the time of spin
          </p>
        </div>
      </div>
    </div>
  );
}
