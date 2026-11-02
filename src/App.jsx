import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import SmoothScrollProvider from "./components/ui/SmoothScrollProvider";

// Everything below the fold is split into its own chunk so the hero
// (and its typewriter) can paint before the rest of the site downloads.
const Chatbot = lazy(() => import("./components/ui/Chatbot"));
const OfflineStatus = lazy(() => import("./components/ui/OfflineStatus"));
const SmokeyCursor = lazy(() => import("./components/ui/SmokeyCursor"));
const About = lazy(() => import("./components/sections/About"));
const Projects = lazy(() => import("./components/sections/Projects"));
const ExperienceTimeline = lazy(() => import("./components/sections/Experience"));
const Gallery = lazy(() => import("./components/sections/Gallery"));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/ui/Footer"));
const Resume = lazy(() => import("./components/pages/Resume"));
const GithubGateway = lazy(() => import("./components/pages/GithubGateway"));

// The fluid cursor is a full-screen WebGL simulation. Start it only once the
// page is idle, and skip it on touch devices where there is no cursor.
const useDeferredCursor = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1500);
    return () => clearTimeout(id);
  }, []);

  return ready;
};

const MainPortfolio = () => {
  const showCursor = useDeferredCursor();

  return (
    <SmoothScrollProvider>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Chatbot />
        <OfflineStatus />
        {showCursor && <SmokeyCursor />}
        <About />
        <Projects />
        <ExperienceTimeline />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </Suspense>
    </SmoothScrollProvider>
  );
};

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/github" element={<GithubGateway />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
