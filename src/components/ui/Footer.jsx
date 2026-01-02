import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronUp } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

export default function Footer() {
  const colors = useThemeColors();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer
      className="w-full py-8 border-t relative overflow-hidden"
      style={{
        backgroundColor: colors.DARK_BG,
        color: colors.TEXT_PRIMARY,
        borderTopColor: `${colors.NEON_CYAN}20`
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-[1px] opacity-70"
        style={{
          boxShadow: `0 0 8px ${colors.NEON_CYAN}`,
          background: `linear-gradient(90deg, transparent, ${colors.NEON_CYAN}, transparent)`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <motion.a
            href="https://github.com/EverbestDev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: colors.TEXT_TERTIARY }}
            whileHover={{ scale: 1.2, color: colors.NEON_CYAN }}
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/everbest-studios-198464291"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: colors.TEXT_TERTIARY }}
            whileHover={{ scale: 1.2, color: colors.NEON_CYAN }}
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href="mailto:EverbestDev@gmail.com"
            className="transition-colors"
            style={{ color: colors.TEXT_TERTIARY }}
            whileHover={{ scale: 1.2, color: colors.NEON_CYAN }}
          >
            <Mail size={24} />
          </motion.a>
        </div>

        <div className="flex justify-center space-x-6 text-sm font-medium mb-4">
          <a
            href="#home"
            className="hover:text-white transition-colors uppercase tracking-wider"
            style={{ color: `${colors.NEON_CYAN}cc` }}
          >
            Home
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="#projects"
            className="hover:text-white transition-colors uppercase tracking-wider"
            style={{ color: `${colors.NEON_CYAN}cc` }}
          >
            Projects
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="#contact"
            className="hover:text-white transition-colors uppercase tracking-wider"
            style={{ color: `${colors.NEON_CYAN}cc` }}
          >
            Contact
          </a>
        </div>

        <p className="text-xs font-mono tracking-widest" style={{ color: colors.TEXT_TERTIARY }}>
          &copy; {new Date().getFullYear()} EVERBESTDEV / TERMINAL INTERFACE V.1.0
        </p>
      </div>

      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 p-3 rounded-full z-[150] transition-all duration-300"
        aria-label="Scroll to top"
        style={{
          backgroundColor: colors.NEON_CYAN,
          color: colors.DARK_BG,
          boxShadow: `0 0 15px ${colors.NEON_CYAN}`,
        }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronUp size={24} />
      </motion.button>
    </footer>
  );
}
