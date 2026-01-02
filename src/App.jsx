import { useEffect } from "react";
import * as OGL from "ogl";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/ui/Navbar";
import ThemeToggle from "./components/ui/ThemeToggle";
import Chatbot from "./components/ui/Chatbot";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/ui/Footer";
import Gallery from "./components/sections/Gallery";
import ExperienceTimeline from "./components/sections/Experience";

function App() {
  useEffect(() => {
    window.ogl = OGL;
  }, []);

  return (
    <ThemeProvider>
      <Navbar />
      <ThemeToggle />
      <Chatbot />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ExperienceTimeline />
      <Gallery />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
