import { useState, useEffect } from "react";
import * as OGL from "ogl";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/ui/Footer";
import Gallery from "./components/sections/Gallery";
import ExperienceTimeline from "./components/sections/Experience";

function App() {
  // Make OGL constructors available on window for FaultyTerminal (it expects them)
  useEffect(() => {
    window.ogl = OGL;
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ExperienceTimeline />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
