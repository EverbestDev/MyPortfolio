import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronUp } from "lucide-react"; // Added ChevronUp

const NEON_CYAN = "#00ffff";
const DARK_BG = "#080812";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  // Function to check scroll position
  const toggleVisibility = () => {
    // Show button after scrolling past 300px
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer
      className="w-full py-8 border-t border-neon-cyan/20 relative overflow-hidden"
      style={{ backgroundColor: DARK_BG, color: "white" }}
    >
      {/* Subtle Scanline Effect on Border */}
      <div
        className="absolute top-0 left-0 w-full h-[1px] opacity-70"
        style={{
          boxShadow: `0 0 8px ${NEON_CYAN}`,
          background: `linear-gradient(90deg, transparent, ${NEON_CYAN}, transparent)`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social/Contact Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <motion.a
            href="https://github.com/EverbestDev"
            target="_blank"
            className="text-gray-400 hover:text-neon-cyan transition-colors"
            whileHover={{ scale: 1.2, color: NEON_CYAN }}
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/everbest-studios-198464291?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            className="text-gray-400 hover:text-neon-cyan transition-colors"
            whileHover={{ scale: 1.2, color: NEON_CYAN }}
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href="mailto:olawooreusamahabidemi@gmail.com"
            className="text-gray-400 hover:text-neon-cyan transition-colors"
            whileHover={{ scale: 1.2, color: NEON_CYAN }}
          >
            <Mail size={24} />
          </motion.a>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center space-x-6 text-sm font-medium mb-4">
          <a
            href="#hero"
            className="text-neon-cyan/80 hover:text-white transition-colors uppercase tracking-wider"
          >
            Home
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="#projects"
            className="text-neon-cyan/80 hover:text-white transition-colors uppercase tracking-wider"
          >
            Projects
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="#contact"
            className="text-neon-cyan/80 hover:text-white transition-colors uppercase tracking-wider"
          >
            Contact
          </a>
        </div>

        {/* Copyright/Info */}
        <p className="text-xs text-gray-500 font-mono tracking-widest">
          &copy; {new Date().getFullYear()} EVERBESTDEV / TERMINAL INTERFACE
          V.1.0
        </p>
        <p className="text-xs text-gray-700 mt-1">
          [ DATA TRANSMISSION COMPLETE ]
        </p>
      </div>

      {/* Scroll to Top Button (Fixed Position) */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        // Animate visibility based on the scroll position
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 p-3 rounded-full z-50 focus:outline-none focus:ring-4 transition-all duration-300"
        aria-label="Scroll to top"
        style={{
          backgroundColor: NEON_CYAN,
          color: DARK_BG,
          boxShadow: `0 0 15px ${NEON_CYAN}`,
          "--tw-ring-color": NEON_CYAN + "80",
        }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronUp size={24} />
      </motion.button>
    </footer>
  );
}
