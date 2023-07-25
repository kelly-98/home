import { Route, Routes } from "react-router-dom";
import video from "./assets/video/video-2.mp4";
import List from "./pages/List";
import Detail from "./pages/Detail";

import "./App.scss";
import { useState } from "react";

function App() {
  const [account, setIsAccount] = useState();

  const handleConnectWallet = () => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          onAccountChanges(accounts);
        });
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const onAccountChanges = (accounts) => {
    const account = accounts[0];

    //get 5 first and 5 last characters of account
    const shortAccount = `${account.substring(0, 5)}...${account.substring(
      account.length - 5
    )}`;

    setIsAccount(shortAccount);
  };

  return (
    <div className="App">
      <video className="video" playsInline autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="app-content">
        <header className="header">
          <button className="btn-primary" onClick={handleConnectWallet}>
            {account ? account : "CONNECT WALLET"}
          </button>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/stake/:id" element={<Detail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
