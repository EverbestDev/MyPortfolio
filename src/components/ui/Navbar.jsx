import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const navItems = [
  { name: "Home", to: "#home" },
  { name: "About", to: "#about" },
  { name: "Projects", to: "#projects" },
  { name: "Skills", to: "#skills" },
  { name: "Contact", to: "#contact" },
];

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.to.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
};

const useScrollDirection = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrolled;
};

const NavLink = ({ to, children, onClick, isActive, colors }) => {
  return (
    <motion.a
      href={to}
      onClick={onClick}
      className={`px-4 py-2 w-full text-base font-medium relative cursor-pointer transition-all duration-300`}
      style={{
        "--neon-cyan": colors.NEON_CYAN,
        color: isActive ? colors.NEON_CYAN : `${colors.TEXT_PRIMARY}cc`
      }}
      whileHover={{
        scale: 1.05,
        color: colors.NEON_CYAN,
        textShadow: `0 0 8px ${colors.NEON_CYAN}`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}

      {isActive && (
        <motion.span
          className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: colors.NEON_CYAN,
            boxShadow: `0 0 8px ${colors.NEON_CYAN}, 0 0 12px ${colors.NEON_CYAN}`,
          }}
          initial={{ x: "-50%", scale: 0 }}
          animate={{ x: "-50%", scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        />
      )}

      <motion.span
        className="absolute -bottom-1 left-0 h-0.5"
        style={{
          backgroundColor: colors.NEON_CYAN,
          boxShadow: `0 0 8px ${colors.NEON_CYAN}`,
        }}
        initial={{ width: "0%", left: "50%" }}
        whileHover={{ width: "100%", left: "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

const Button = ({ children, className = "", colors }) => {
  return (
    <motion.a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-2xl transition-all duration-300 border-2 ${className}`}
      style={{
        borderColor: colors.NEON_CYAN,
        background: `linear-gradient(135deg, ${colors.NEON_CYAN}20, ${colors.NEON_CYAN}10)`,
        color: colors.TEXT_PRIMARY,
      }}
      whileHover={{
        scale: 1.05,
        background: `linear-gradient(135deg, ${colors.NEON_CYAN}30, ${colors.NEON_CYAN}20)`,
        boxShadow: `0 0 20px ${colors.NEON_CYAN}60, 0 0 40px ${colors.NEON_CYAN}30, inset 0 0 20px ${colors.NEON_CYAN}20`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <ArrowRight size={16} />
    </motion.a>
  );
};

const Navbar = () => {
  const colors = useThemeColors();
  const isScrolled = useScrollDirection();
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseClasses = `fixed top-0 w-full z-50 transition-all duration-300`;
  const scrollClasses = isScrolled
    ? "backdrop-blur-md shadow-2xl"
    : "backdrop-blur-sm shadow-xl";

  const neonShadowStyle = isScrolled
    ? {
      backgroundColor: `${colors.DARK_BG}cc`,
      boxShadow: `0 4px 30px ${colors.NEON_CYAN}15, 0 0 1px ${colors.NEON_CYAN}30`,
      borderBottom: `1px solid ${colors.NEON_CYAN}20`,
    }
    : {
      backgroundColor: `${colors.DARK_BG}cc`,
    };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`${baseClasses} ${scrollClasses}`}
        style={neonShadowStyle}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center md:justify-between md:h-20 justify-end h:16">
            <motion.a
              href="#home"
              className="flex-shrink-0 cursor-pointer text-lg md:text-xl font-extrabold tracking-widest hidden md:block"
              whileHover={{
                scale: 1.08,
                textShadow: `0 0 20px ${colors.NEON_CYAN}, 0 0 40px ${colors.NEON_CYAN}60`,
              }}
              whileTap={{ scale: 0.95 }}
              style={{ color: colors.NEON_CYAN }}
            >
              {"EVERBESTDEV"}
            </motion.a>

            <nav className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2 lg:space-x-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    isActive={activeSection === item.to.substring(1)}
                    colors={colors}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <Button className="w-max-content animate-pulse" colors={colors}>Resume</Button>
              </div>
            </nav>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg"
                style={{ color: colors.TEXT_SECONDARY }}
                whileHover={{
                  color: colors.NEON_CYAN,
                  backgroundColor: `${colors.NEON_CYAN}10`,
                  boxShadow: `0 0 15px ${colors.NEON_CYAN}30`,
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle navigation menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={28} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={28} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 z-50 md:hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.DARK_BG}f2, ${colors.DARK_BG}e6)`,
                backdropFilter: "blur(20px)",
                boxShadow: `-10px 0 50px ${colors.NEON_CYAN}20, inset 1px 0 1px ${colors.NEON_CYAN}30`,
                borderLeft: `1px solid ${colors.NEON_CYAN}30`,
              }}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg"
                    style={{ color: colors.TEXT_SECONDARY }}
                    whileHover={{
                      color: colors.NEON_CYAN,
                      backgroundColor: `${colors.NEON_CYAN}10`,
                      rotate: 90,
                      boxShadow: `0 0 15px ${colors.NEON_CYAN}30`,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={28} />
                  </motion.button>
                </div>

                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.to.substring(1);
                    return (
                      <motion.a
                        key={item.name}
                        href={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="block text-lg font-medium rounded-xl px-6 py-4 cursor-pointer transition-all duration-300"
                        style={{
                          "--neon-cyan": colors.NEON_CYAN,
                          color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY,
                          background: isActive
                            ? `linear-gradient(135deg, ${colors.NEON_CYAN}20, ${colors.NEON_CYAN}10)`
                            : "transparent",
                          boxShadow: isActive
                            ? `0 0 20px ${colors.NEON_CYAN}20, inset 0 0 20px ${colors.NEON_CYAN}10`
                            : "none",
                          borderLeft: isActive
                            ? `3px solid ${colors.NEON_CYAN}`
                            : "3px solid transparent",
                        }}
                        whileHover={{
                          x: 8,
                          color: colors.NEON_CYAN,
                          background: `linear-gradient(135deg, ${colors.NEON_CYAN}15, ${colors.NEON_CYAN}05)`,
                          boxShadow: `0 0 20px ${colors.NEON_CYAN}30`,
                          borderLeftColor: colors.NEON_CYAN,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.a>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t"
                  style={{ borderColor: `${colors.NEON_CYAN}30` }}
                >
                  <Button className="w-full justify-center" colors={colors}>View Resume</Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
