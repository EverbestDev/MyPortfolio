import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";
import ThemeToggle from "./ThemeToggle";

const MobileNav = ({ sections, activeSection, scrollToSection }) => {
  const colors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleNavigate = (section) => {
    scrollToSection(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed top-0 w-full z-50 px-4 py-3"
        style={{
          backgroundColor: `${colors.DARK_BG}f8`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${colors.NEON_CYAN}10`
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 group"
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.NEON_CYAN}25, ${colors.NEON_CYAN}15)`,
                boxShadow: `0 2px 10px ${colors.NEON_CYAN}20`,
                border: `1px solid ${colors.NEON_CYAN}30`
              }}
            >
              <Code2 
                size={16} 
                style={{ color: colors.NEON_CYAN }}
              />
            </div>
            <span 
              className="font-bold text-base tracking-wide"
              style={{ color: colors.TEXT_PRIMARY }}
            >
              EverbestDev
            </span>
          </motion.button>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: isOpen ? `${colors.NEON_CYAN}15` : `${colors.NEON_CYAN}08`,
                color: colors.TEXT_PRIMARY
              }}
              whileHover={{
                backgroundColor: `${colors.NEON_CYAN}15`,
                boxShadow: `0 0 16px ${colors.NEON_CYAN}20`
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[min(85vw,360px)] z-50 md:hidden overflow-y-auto"
              style={{
                background: `linear-gradient(135deg, ${colors.DARK_BG}fc, ${colors.DARK_BG}f5)`,
                backdropFilter: "blur(20px)",
                boxShadow: `-16px 0 48px ${colors.NEON_CYAN}10`,
                borderLeft: `1px solid ${colors.NEON_CYAN}20`
              }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div 
                  className="flex items-center justify-between p-5 border-b"
                  style={{ borderColor: `${colors.NEON_CYAN}15` }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${colors.NEON_CYAN}25, ${colors.NEON_CYAN}15)`,
                        border: `1px solid ${colors.NEON_CYAN}30`
                      }}
                    >
                      <Code2 size={16} style={{ color: colors.NEON_CYAN }} />
                    </div>
                    <span 
                      className="font-bold text-base"
                      style={{ color: colors.TEXT_PRIMARY }}
                    >
                      EverbestDev
                    </span>
                  </div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${colors.NEON_CYAN}08`,
                      color: colors.TEXT_SECONDARY
                    }}
                    whileHover={{
                      backgroundColor: `${colors.NEON_CYAN}15`,
                      color: colors.NEON_CYAN,
                      rotate: 90,
                      boxShadow: `0 0 16px ${colors.NEON_CYAN}20`
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-5 space-y-1">
                  {sections.map((section, idx) => {
                    const isActive = activeSection === section;
                    return (
                      <motion.button
                        key={section}
                        onClick={() => handleNavigate(section)}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        className="w-full text-left px-5 py-3.5 rounded-xl font-medium text-base capitalize transition-all duration-300"
                        style={{
                          color: isActive ? colors.NEON_CYAN : `${colors.TEXT_SECONDARY}dd`,
                          background: isActive 
                            ? `linear-gradient(135deg, ${colors.NEON_CYAN}15, ${colors.NEON_CYAN}08)`
                            : "transparent",
                          boxShadow: isActive 
                            ? `0 0 16px ${colors.NEON_CYAN}10, inset 0 0 16px ${colors.NEON_CYAN}06` 
                            : "none",
                          borderLeft: isActive 
                            ? `3px solid ${colors.NEON_CYAN}` 
                            : "3px solid transparent"
                        }}
                        whileHover={{
                          x: 6,
                          backgroundColor: `${colors.NEON_CYAN}08`,
                          borderLeftColor: colors.NEON_CYAN
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {section}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Footer Actions */}
                <div 
                  className="p-5 space-y-3 border-t"
                  style={{ borderColor: `${colors.NEON_CYAN}15` }}
                >
                  {/* Resume Button */}
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold"
                    style={{
                      border: `1px solid ${colors.NEON_CYAN}30`,
                      background: `linear-gradient(135deg, ${colors.NEON_CYAN}15, ${colors.NEON_CYAN}08)`,
                      color: colors.TEXT_PRIMARY,
                      boxShadow: `0 2px 12px ${colors.NEON_CYAN}12`
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 4px 20px ${colors.NEON_CYAN}20`
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    View Resume
                    <ArrowRight size={16} />
                  </motion.a>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <SocialLink 
                      href="https://github.com/yourusername"
                      icon={<Github size={18} />}
                      label="GitHub"
                      colors={colors}
                    />
                    <SocialLink 
                      href="https://linkedin.com/in/yourusername"
                      icon={<Linkedin size={18} />}
                      label="LinkedIn"
                      colors={colors}
                    />
                    <SocialLink 
                      href="mailto:your.email@example.com"
                      icon={<Mail size={18} />}
                      label="Email"
                      colors={colors}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SocialLink = ({ href, icon, label, colors }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-lg flex items-center justify-center"
    style={{
      background: `linear-gradient(135deg, ${colors.NEON_CYAN}15, ${colors.NEON_CYAN}08)`,
      color: colors.NEON_CYAN,
      boxShadow: `0 2px 10px ${colors.NEON_CYAN}10`
    }}
    whileHover={{ 
      scale: 1.1, 
      y: -2,
      boxShadow: `0 4px 16px ${colors.NEON_CYAN}20`
    }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    {icon}
  </motion.a>
);

export default MobileNav;