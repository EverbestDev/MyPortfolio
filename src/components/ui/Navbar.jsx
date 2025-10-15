import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

// --- 1. CONFIGURATION DATA ---
const navItems = [
  { name: "Home", to: "#home" },
  { name: "About", to: "#about" },
  { name: "Projects", to: "#projects" },
  { name: "Skills", to: "#skills" },
  { name: "Contact", to: "#contact" },
];

// Custom Colors
const NEON_CYAN = "#00ffff";
const DARK_BG = "#060010";

// --- 2. CUSTOM HOOKS ---

/**
 * Tracks active section based on scroll position
 */
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

/**
 * Tracks if the user has scrolled past a certain point
 */
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

// --- 3. REUSABLE COMPONENTS ---

/**
 * Custom Anchor Link component with active and impressive hover states
 */
const NavLink = ({ to, children, onClick, isActive }) => {
  return (
    <motion.a
      href={to}
      onClick={onClick}
      className={`px-4 py-2 w-full text-base font-medium relative cursor-pointer transition-all duration-300 ${
        isActive ? "text-[#00ffff]" : "text-white/80 hover:text-[#00ffff]"
      }`}
      style={{ "--neon-cyan": NEON_CYAN }}
      whileHover={{
        scale: 1.05,
        color: NEON_CYAN,
        textShadow: `0 0 8px ${NEON_CYAN}`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}

      {/* Active indicator - glowing dot */}
      {isActive && (
        <motion.span
          className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: NEON_CYAN,
            boxShadow: `0 0 8px ${NEON_CYAN}, 0 0 12px ${NEON_CYAN}`,
          }}
          initial={{ x: "-50%", scale: 0 }}
          animate={{ x: "-50%", scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        />
      )}

      {/* Hover underline effect */}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5"
        style={{
          backgroundColor: NEON_CYAN,
          boxShadow: `0 0 8px ${NEON_CYAN}`,
        }}
        initial={{ width: "0%", left: "50%" }}
        whileHover={{ width: "100%", left: "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

/**
 * CTA Button with dark theme styling
 */
const Button = ({ children, className = "" }) => {
  return (
    <motion.a
      href="./assets/Usamah_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-2xl transition-all duration-300
                  border-2 text-white ${className}`}
      style={{
        borderColor: NEON_CYAN,
        background: `linear-gradient(135deg, ${NEON_CYAN}20, ${NEON_CYAN}10)`,
      }}
      whileHover={{
        scale: 1.05,
        background: `linear-gradient(135deg, ${NEON_CYAN}30, ${NEON_CYAN}20)`,
        boxShadow: `0 0 20px ${NEON_CYAN}60, 0 0 40px ${NEON_CYAN}30, inset 0 0 20px ${NEON_CYAN}20`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <ArrowRight size={16} />
    </motion.a>
  );
};

// --- 4. MAIN NAVBAR COMPONENT ---

const Navbar = () => {
  const isScrolled = useScrollDirection();
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseClasses = `fixed top-0 w-full z-50 transition-all duration-300`;
  const scrollClasses = isScrolled
    ? "bg-[--dark-bg]/80 backdrop-blur-md shadow-2xl"
    : "bg-[--dark-bg]/80 backdrop-blur-sm shadow-xl";

  const neonShadowStyle = isScrolled
    ? {
        boxShadow: `0 4px 30px ${NEON_CYAN}15, 0 0 1px ${NEON_CYAN}30`,
        borderBottom: `1px solid ${NEON_CYAN}20`,
      }
    : {};

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
        style={{ ...neonShadowStyle, "--dark-bg": DARK_BG }}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center md:justify-between md:h-20 justify-end h:16">
            {/* LEFT: Logo/Name */}
            <motion.a
              href="#home"
              className="flex-shrink-0 cursor-pointer text-2xl md:text-3xl font-extrabold tracking-widest hidden sm:block"
              whileHover={{
                scale: 1.08,
                textShadow: `0 0 20px ${NEON_CYAN}, 0 0 40px ${NEON_CYAN}60`,
              }}
              whileTap={{ scale: 0.95 }}
              style={{ color: NEON_CYAN }}
            >
              {"Everbest.Dev"}
            </motion.a>

            {/* RIGHT: Desktop Nav Items */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2 lg:space-x-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    isActive={activeSection === item.to.substring(1)}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <Button className="w-max-content animate-pulse"> Resume</Button>
              </div>
            </nav>

            {/* RIGHT: Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 rounded-lg"
                whileHover={{
                  color: NEON_CYAN,
                  backgroundColor: `${NEON_CYAN}10`,
                  boxShadow: `0 0 15px ${NEON_CYAN}30`,
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

      {/* Mobile Glassmorphic Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 z-50 md:hidden"
              style={{
                background: `linear-gradient(135deg, ${DARK_BG}95, ${DARK_BG}90)`,
                backdropFilter: "blur(20px)",
                boxShadow: `-10px 0 50px ${NEON_CYAN}20, inset 1px 0 1px ${NEON_CYAN}30`,
                borderLeft: `1px solid ${NEON_CYAN}30`,
              }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-400 rounded-lg"
                    whileHover={{
                      color: NEON_CYAN,
                      backgroundColor: `${NEON_CYAN}10`,
                      rotate: 90,
                      boxShadow: `0 0 15px ${NEON_CYAN}30`,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={28} />
                  </motion.button>
                </div>

                {/* Nav Items */}
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
                        className={`block text-lg font-medium rounded-xl px-6 py-4 cursor-pointer transition-all duration-300 ${
                          isActive ? "text-[#00ffff]" : "text-gray-300"
                        }`}
                        style={{
                          "--neon-cyan": NEON_CYAN,
                          background: isActive
                            ? `linear-gradient(135deg, ${NEON_CYAN}20, ${NEON_CYAN}10)`
                            : "transparent",
                          boxShadow: isActive
                            ? `0 0 20px ${NEON_CYAN}20, inset 0 0 20px ${NEON_CYAN}10`
                            : "none",
                          borderLeft: isActive
                            ? `3px solid ${NEON_CYAN}`
                            : "3px solid transparent",
                        }}
                        whileHover={{
                          x: 8,
                          color: NEON_CYAN,
                          background: `linear-gradient(135deg, ${NEON_CYAN}15, ${NEON_CYAN}05)`,
                          boxShadow: `0 0 20px ${NEON_CYAN}30`,
                          borderLeftColor: NEON_CYAN,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.a>
                    );
                  })}
                </nav>

                {/* CTA in sidebar */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t"
                  style={{ borderColor: `${NEON_CYAN}30` }}
                >
                  <Button className="w-full justify-center">View Resume</Button>
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
