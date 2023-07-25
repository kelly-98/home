import React, { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./wallet";

import Footer from "./components/Footer";
import Gifts from "./components/Gifts";
import Header from "./components/Header";
import Roadmap from "./components/Roadmap";
import Tokenomics from "./components/Tokenomics";
import Utilities from "./components/Utilities";
import MenuMb from "./components/MenuMb";
import Spin from "./components/Spin";
import History from "./components/History";
import Snow from "./components/Snow";
import ModalSpin from "./components/ModalSpin";
import Toast from "./components/Toast";

function App() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [gift, setGift] = useState(null);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isShow, setIsShow] = useState(false);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="app">
        <Snow />
        <ModalSpin
          gift={{ giftName: gift?.name, giftImg: gift?.img }}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          setGift={setGift}
        />
        <MenuMb isMenuActive={isMenuActive} />
        <Toast isSucceed={isSucceed} isShow={isShow} />
        <div className="container">
          <Header
            isMenuActive={isMenuActive}
            setIsMenuActive={setIsMenuActive}
          />
          <Spin setIsOpenModal={setIsOpenModal} setGift={setGift} gift={gift} />
          <Gifts />
          <History
            isOpenModal={isOpenModal}
            isSucceed={isSucceed}
            setIsSucceed={setIsSucceed}
            setIsShow={setIsShow}
          />
          <Utilities />
          <Tokenomics />
          <Roadmap />
        </div>
        <div className="utilities-bg">
          <Snow />
        </div>
        <Footer />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
