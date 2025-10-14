import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "../effects/FaultyTerminal";

// --- CONFIGURATION DATA & STYLES ---
const NEON_CYAN = "#00ffff";
const DARK_BG = "#080010"; // Slightly darker for enhanced contrast

// Staggered animation variant for the whole container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2, // Small delay after typing completes for a beat
    },
  },
};

// Animation variant for individual lines/elements
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

// --- REUSABLE COMPONENTS ---

/**
 * Button component with enhanced neon styling and hover effects.
 */
const Button = ({
  children,
  className = "",
  href = "#contact",
  secondary = false,
}) => {
  // ENHANCED BUTTON STYLES
  const primaryStyles = `border-2 border-[--neon-cyan] text-[--neon-cyan] hover:bg-[--neon-cyan]/20`;
  // Updated secondary button to have a strong, darker ghost appearance
  const secondaryStyles = `border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/70`;
  const styleClass = secondary ? secondaryStyles : primaryStyles;

  return (
    <motion.a
      href={href}
      // Increased padding and font weight, changed to rounded-xl for a tech aesthetic
      className={`px-7 py-3 text-base font-bold rounded-xl transition-all duration-300 transform ${styleClass} ${className}`}
      style={{
        "--neon-cyan": NEON_CYAN,
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        // STRONGER NEON GLOW for primary button
        boxShadow: secondary
          ? "0 0 10px rgba(255,255,255,0.15)" // Subtle glow for secondary
          : `0 0 25px ${NEON_CYAN}90, 0 0 50px ${NEON_CYAN}50`, // Intense neon glow
      }}
      whileTap={{
        scale: 0.95,
        boxShadow: secondary ? "none" : `0 0 15px ${NEON_CYAN}80`,
      }}
    >
      {children}
    </motion.a>
  );
};

// --- ENHANCED BACKGROUND WITH PARTICLES ---
const AnimatedGridBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Radial gradient focus */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${NEON_CYAN}15 0%, transparent 70%)`,
        }}
      />

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "moveGrid 60s linear infinite",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: NEON_CYAN,
            boxShadow: `0 0 ${particle.size * 3}px ${NEON_CYAN}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${NEON_CYAN} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${NEON_CYAN} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.1, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <style>{`
        @keyframes moveGrid {
          from { background-position: 0 0; }
          to { background-position: 50px 50px; }
        }
      `}</style>
    </div>
  );
};

// --- TYPING EFFECT COMPONENT ---
/**
 * Now accepts an onComplete callback to signal when typing is finished.
 */
const TypingText = ({ text, className = "", onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (onComplete && currentIndex === text.length) {
      // Signal completion to the parent component
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ color: NEON_CYAN }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// --- MAIN HERO COMPONENT ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // State to track when the name typing is complete
  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center pt-16 overflow-hidden"
      style={{ backgroundColor: DARK_BG, color: "white" }}
    >
      <AnimatedGridBackground />

      {/* FaultyTerminal with parallax */}
      <motion.div
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          y: y,
          opacity: 0.2,
        }}
      >
        <FaultyTerminal
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-4xl text-center px-4"
        style={{ y: y, opacity }}
      >
        {/* 1. Intro Line: Runs on its own delay */}
        <motion.p
          className="text-lg sm:text-xl text-gray-400 font-medium mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Hi, I am
        </motion.p>

        {/* 2. Name with Typing Effect: Sets state when done */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-4 tracking-tighter"
          style={{
            color: NEON_CYAN,
            textShadow: `0 0 20px ${NEON_CYAN}, 0 0 40px ${NEON_CYAN}80, 0 0 60px ${NEON_CYAN}60`,
          }}
          whileHover={{
            scale: 1.02,
            textShadow: `0 0 30px ${NEON_CYAN}, 0 0 60px ${NEON_CYAN}, 0 0 80px ${NEON_CYAN}80`,
          }}
        >
          <TypingText text="EverbestDev." onComplete={() => setTypingComplete(true)} />
        </motion.h1>

        {/* 3. Subsequent Content: Staggered entry begins when typingComplete is true */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={typingComplete ? "visible" : "hidden"}
        >
          {/* Role with gradient text */}
          <motion.h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight"
            variants={itemVariants}
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${NEON_CYAN} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            I build exceptional digital experiences.
          </motion.h2>

          {/* Description with better spacing */}
          <motion.p
            className="text-base sm:text-lg text-gray-50 max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={itemVariants}
          >
            I am a highly motivated{" "}
            <span style={{ color: NEON_CYAN, fontWeight: "600" }}>
              full-stack developer
            </span>{" "}
            with a passion for blending clean design with robust, scalable code. I
            specialize in{" "}
            <span style={{ color: NEON_CYAN, fontWeight: "600" }}>
              MERN & MEVM
            </span>{" "}
            to create modern, performance-driven web applications.
          </motion.p>

          {/* CTA Buttons with enhanced layout */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-28 mb-8"
            variants={itemVariants}
          >
            <Button href="#contact">Get in Touch</Button>
            <Button href="#projects" secondary={true}>
              View My Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
            style={{ borderColor: `${NEON_CYAN}60` }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: NEON_CYAN,
                boxShadow: `0 0 8px ${NEON_CYAN}`,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
