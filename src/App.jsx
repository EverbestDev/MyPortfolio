import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as OGL from "ogl";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/ui/Navbar";
import Chatbot from "./components/ui/Chatbot";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/ui/Footer";
import Gallery from "./components/sections/Gallery";
import ExperienceTimeline from "./components/sections/Experience";
import Testimonials from "./components/sections/Testimonials";
import OfflineStatus from "./components/ui/OfflineStatus";
import MouseCursor from "./components/ui/MouseCursor";
import Resume from "./components/pages/Resume";
import GithubGateway from "./components/pages/GithubGateway";

const MainPortfolio = () => (
  <>
    <Navbar />
    <Chatbot />
    <OfflineStatus />
    <MouseCursor />
    <Hero />
    <About />
    <Projects />
    <ExperienceTimeline />
    <Gallery />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.ogl = OGL;
  }, []);


  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/github" element={<GithubGateway />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
