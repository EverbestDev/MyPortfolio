import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeColors } from "../../hooks/useThemeColors";
import ThemeToggle from "./ThemeToggle";

const MobileNav = ({ sections, activeSection, scrollToSection }) => {
  const colors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed top-0 w-full z-50 px-4 py-3 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? `${colors.DARK_BG}cc` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${colors.NEON_CYAN}15` : "none"
        }}
      >
        <div className="flex items-center justify-between">

          <motion.button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 group"
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.NEON_CYAN}25, ${colors.NEON_CYAN}15)`,
                boxShadow: `0 2px 10px ${colors.NEON_CYAN}20`,
                border: `1px solid ${colors.NEON_CYAN}20`
              }}
            >
              <img
                src="/pfp.jpg"
                alt="EverbestDev logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="font-bold text-base tracking-wide"
              style={{ color: colors.TEXT_PRIMARY }}
            >
              EverbestDev
            </span>
          </motion.button>


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


      <AnimatePresence>
        {isOpen && (
          <>

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
                      <img
                        src="/pfp.jpg"
                        alt="EverbestDev logo"
                        className="w-full h-full object-cover"
                      />
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
                          color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY,
                          background: "transparent",
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


                  <div className="flex items-center justify-center gap-3 pt-2">
                    <Link
                      to="/github"
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-white/5 border border-white/10"
                      style={{
                        color: colors.NEON_CYAN,
                        boxShadow: `0 2px 10px ${colors.NEON_CYAN}10`
                      }}
                    >
                      <Github size={18} />
                    </Link>
                    <SocialLink
                      href="https://www.linkedin.com/in/everbest-studios-198464291"
                      icon={<Linkedin size={18} />}
                      label="LinkedIn"
                      colors={colors}
                    />
                    <SocialLink
                      href="mailto:EverbestDev@gmail.com"
                      icon={<Mail size={18} />}
                      label="Email"
                      colors={colors}
                    />
                    <motion.a
                      href="https://wa.me/2349117450722"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all grayscale hover:grayscale-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.NEON_CYAN}15, ${colors.NEON_CYAN}08)`,
                        color: colors.NEON_CYAN,
                        boxShadow: `0 2px 10px ${colors.NEON_CYAN}10`,
                        border: `1px solid ${colors.NEON_CYAN}20`
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754c-1.836 0-3.633-.485-5.204-1.402l-.374-.223-3.875 1.015 1.034-3.778-.245-.39a9.66 9.66 0 01-1.477-5.147C2.5 4.545 6.64 1 11.66 1c2.43 0 4.717.946 6.438 2.668 1.72 1.722 2.66 4.008 2.66 6.439 0 5.056-4.14 8.604-9.16 8.604m10.153-12.724C19.083 2.697 15.503 1 11.66 1 5.23 1 .01 6.225.01 12.655c0 2.05.534 4.054 1.55 5.85L0 23l4.63-.122-4.63-1.212c1.71 1.03 3.67 1.577 5.7 1.577h.001c6.43 0 11.65-5.225 11.65-11.655 0-3.116-1.21-6.046-3.41-8.245z" />
                      </svg>
                    </motion.a>
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