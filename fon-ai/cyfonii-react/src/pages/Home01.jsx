import React from "react";

import { Element } from "react-scroll";

import dataBox from "../assets/fake-data/data-box";
import dataPortfolio from "../assets/fake-data/data-portfolio";
import dataRoadMap from "../assets/fake-data/data-roadmap";
import dataProject from "../assets/fake-data/dataProject";
import About from "../components/about/About";
import Banner from "../components/banner/Banner";
import Create from "../components/create/Create";
import Footer from "../components/footer/Footer";
import Portfolio from "../components/portfolio/Portfolio";
import Project from "../components/project/Project";
import Roadmap from "../components/roadmap/Roadmap";
import Speciality from "../components/speciality/Speciality";

function Home01(props) {
  return (
    <div className="home-1 wrapper">
      <Banner />

      <About />

      <Speciality data={dataBox} />

      <Element name="portfolio">
        <Portfolio data={dataPortfolio} />
      </Element>

      <Project data={dataProject} />

      <Element name="roadmap">
        <Roadmap data={dataRoadMap} />
      </Element>

      <Element name="contact">
        <Create />
      </Element>

      <Footer />
    </div>
  );
}

export default Home01;
