import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "../effects/FaultyTerminal";
import { useThemeColors } from "../../hooks/useThemeColors";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

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

const Button = ({
  children,
  className = "",
  href = "#contact",
  secondary = false,
  colors,
}) => {
  const primaryStyles = `border-2 hover:bg-[var(--neon-cyan)]/20`;
  const secondaryStyles = `border-2 hover:bg-opacity-70`;
  const styleClass = secondary ? secondaryStyles : primaryStyles;

  return (
    <motion.a
      href={href}
      className={`px-7 py-3 text-base font-bold rounded-xl transition-all duration-300 transform ${styleClass} ${className}`}
      style={{
        "--neon-cyan": colors.NEON_CYAN,
        borderColor: secondary ? colors.BORDER : colors.NEON_CYAN,
        color: secondary ? colors.TEXT_SECONDARY : colors.NEON_CYAN,
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: secondary
          ? `0 0 10px ${colors.TEXT_SECONDARY}15`
          : `0 0 25px ${colors.NEON_CYAN}90, 0 0 50px ${colors.NEON_CYAN}50`,
      }}
      whileTap={{
        scale: 0.95,
        boxShadow: secondary ? "none" : `0 0 15px ${colors.NEON_CYAN}80`,
      }}
    >
      {children}
    </motion.a>
  );
};

const AnimatedGridBackground = ({ colors }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
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
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.NEON_CYAN}15 0%, transparent 70%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "moveGrid 60s linear infinite",
        }}
      />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: colors.NEON_CYAN,
            boxShadow: `0 0 ${particle.size * 3}px ${colors.NEON_CYAN}`,
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

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${colors.NEON_CYAN} 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${colors.NEON_CYAN} 0%, transparent 70%)`,
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

const TypingText = ({ text, className = "", onComplete, colors }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else if (onComplete && currentIndex === text.length) {
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
          style={{ color: colors.NEON_CYAN }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const Hero = () => {
  const colors = useThemeColors();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <section
      id="home"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
    >
      <AnimatedGridBackground colors={colors} />

      <motion.div
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          y: y,
          opacity: 0.2,
        }}
      >
        <FaultyTerminal
          raysOrigin="top-center"
          raysColor={colors.NEON_CYAN}
          raysSpeed={1}
          lightSpread={1.2}
          rayLength={3}
          fadeDistance={1}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          saturation={1}
          className="custom-rays"
        />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        style={{ y: y, opacity }}
      >
        <motion.p
          className="text-lg sm:text-xl font-medium mb-4"
          style={{ color: colors.TEXT_TERTIARY }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Hi, I am
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 tracking-tight"
          style={{
            color: colors.NEON_CYAN,
            textShadow: `0 0 20px ${colors.NEON_CYAN}, 0 0 40px ${colors.NEON_CYAN}80`,
          }}
          whileHover={{
            scale: 1.02,
            textShadow: `0 0 30px ${colors.NEON_CYAN}, 0 0 60px ${colors.NEON_CYAN}`,
          }}
        >
          <TypingText text="EverbestDev." onComplete={() => setTypingComplete(true)} colors={colors} />
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={typingComplete ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 tracking-tight mx-auto w-fit"
            variants={itemVariants}
            style={{
              backgroundImage: `linear-gradient(135deg, ${colors.TEXT_PRIMARY} 0%, ${colors.NEON_CYAN} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Full-Stack Software Developer
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: colors.TEXT_SECONDARY }}
            variants={itemVariants}
          >
            Building high-performance applications with{" "}
            <span style={{ color: colors.NEON_CYAN, fontWeight: "600" }}>
              Next.js, TypeScript, Python (FastAPI/Django)
            </span>{" "}
            and modern full-stack architectures.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8"
            variants={itemVariants}
          >
            <Button href="#contact" colors={colors}>Get in Touch</Button>
            <Button href="#projects" secondary={true} colors={colors}>
              View My Work
            </Button>
          </motion.div>
        </motion.div>

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
            style={{ borderColor: `${colors.NEON_CYAN}60` }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: colors.NEON_CYAN,
                boxShadow: `0 0 8px ${colors.NEON_CYAN}`,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
