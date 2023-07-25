import { React, useEffect, useState } from "react";
import AOS from "aos";

import Header from "./components/header/Header";
import Home from "./pages/Home";

function App() {
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <Header setIsDisable={setIsDisable} />
      <Home isDisable={isDisable} />
    </>
  );
}

export default App;
