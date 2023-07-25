import Logo from "./assets/img/logo.png";
import Yin from "./assets/img/yin.png";
import "./App.scss";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    var TxtRotate = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

      var that = this;
      var delta = 300 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };

    window.onload = function () {
      var elements = document.getElementsByClassName("txt-rotate");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-rotate");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
      document.body.appendChild(css);
    };
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo">
          <img src={Logo} alt="header-logo" />
        </div>
        <ul className="header-menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Trading
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@yinswap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="mailto:support@yinswap.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </li>
        </ul>
        <a
          href="https://yinswap.gitbook.io/yinswap/"
          target="_blank"
          rel="noopener noreferrer"
          className="header-btn"
        >
          Documentations
        </a>
      </header>
      <main className="main">
        <div className="main-img">
          <img src={Yin} alt="yin" />
        </div>
        <div className="main-content">
          <h3>
            THE SMART DECENTRALIZED <br /> EXCHANGE ON EOS EVM
          </h3>
          <section class="nerdy-pen">
            <h1 class="nerdy-pen__text">
              Simple to{" "}
              <span
                class="txt-rotate"
                data-period="2000"
                data-rotate='["swap any tokens!", "execute your liquidity!", "launch your projects!"]'
              ></span>
            </h1>
          </section>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            OPEN APP
          </a>

          <div className="main-footer">
            <ul className="main-social">
              <li>
                <a
                  href="https://discord.gg/mUtTkatyz2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/YinSwap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@yinswap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Medium
                </a>
              </li>
            </ul>
            <p>Copyright © 2023 Yinswap. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
