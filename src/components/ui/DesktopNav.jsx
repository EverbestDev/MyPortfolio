import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeColors } from "../../hooks/useThemeColors";
import ThemeToggle from "./ThemeToggle";

const DesktopNav = ({ sections, activeSection, scrollToSection }) => {
  const colors = useThemeColors();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="hidden md:block fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? `${colors.DARK_BG}f8` : `${colors.DARK_BG}e6`,
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        boxShadow: scrolled
          ? `0 4px 24px ${colors.NEON_CYAN}08, 0 1px 0 ${colors.NEON_CYAN}12`
          : "none",
        borderBottom: scrolled ? `1px solid ${colors.NEON_CYAN}10` : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="relative w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.NEON_CYAN}25, ${colors.NEON_CYAN}15)`,
                boxShadow: `0 2px 12px ${colors.NEON_CYAN}20`,
                border: `1px solid ${colors.NEON_CYAN}30`
              }}
            >
              <Code2
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                size={18}
                style={{ color: colors.NEON_CYAN }}
              />
            </div>
            <span
              className="text-lg font-bold tracking-wide"
              style={{ color: colors.TEXT_PRIMARY }}
            >
              EverbestDev
            </span>
          </motion.button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {sections.map((section) => {
              const isActive = activeSection === section;
              return (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 capitalize"
                  style={{
                    color: isActive ? colors.NEON_CYAN : `${colors.TEXT_SECONDARY}dd`
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: colors.NEON_CYAN
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{section}</span>

                  {/* Active indicator background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${colors.NEON_CYAN}12, ${colors.NEON_CYAN}06)`,
                        boxShadow: `0 0 16px ${colors.NEON_CYAN}12`
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Bottom indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-0.5 left-1/2 h-0.5 rounded-full"
                      style={{
                        width: "50%",
                        backgroundColor: colors.NEON_CYAN,
                        boxShadow: `0 0 6px ${colors.NEON_CYAN}`,
                        x: "-50%"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/resume"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
              style={{
                border: `1px solid ${colors.NEON_CYAN}30`,
                background: `linear-gradient(135deg, ${colors.NEON_CYAN}15, ${colors.NEON_CYAN}08)`,
                color: colors.TEXT_PRIMARY,
                boxShadow: `0 2px 12px ${colors.NEON_CYAN}12`
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 4px 20px ${colors.NEON_CYAN}25, inset 0 0 16px ${colors.NEON_CYAN}10`
              }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
              <ArrowRight size={14} />
            </Link>

            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                color: `${colors.TEXT_SECONDARY}cc`,
                backgroundColor: `${colors.NEON_CYAN}06`
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: `${colors.NEON_CYAN}12`,
                color: colors.NEON_CYAN,
                boxShadow: `0 0 16px ${colors.NEON_CYAN}20`
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub"
            >
              <Github size={18} />
            </motion.a>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DesktopNav;