import React from "react";
import { motion } from "framer-motion";
import { Layers3, Cpu, Terminal, Database, Cloud } from "lucide-react";

// --- CONFIGURATION DATA & STYLES ---
const NEON_CYAN = "#00ffff";
const NEON_PURPLE = "#a855f7"; // Added secondary neon color for gradient depth
const DARK_BG = "#080812";

// Custom Icons (Simple SVG for React, JS, etc.)
const ReactIcon = ({ size = 24, color = NEON_CYAN }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke={color}
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="50" cy="50" r="45" />
    <path d="M50 5 L85 95 M50 5 L15 95 M15 95 L85 95" />
  </svg>
);
const JsIcon = ({ size = 24, color = NEON_CYAN }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-code"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// Mock Skills Data categorized by area
const skillsData = [
  {
    category: "Frontend Development",
    icon: Layers3,
    skills: [
      { name: "React / Next.js", proficiency: 95, icon: ReactIcon },
      { name: "JavaScript / TypeScript", proficiency: 90, icon: JsIcon },
      { name: "Tailwind CSS / SCSS", proficiency: 98, icon: null },
      { name: "Framer Motion / GSAP", proficiency: 85, icon: null },
    ],
  },
  {
    category: "Backend & Runtime",
    icon: Cpu,
    skills: [
      { name: "Node.js / Express", proficiency: 85, icon: null },
      { name: "Python / Django", proficiency: 70, icon: null },
      { name: "REST / GraphQL APIs", proficiency: 90, icon: null },
      { name: "CI/CD Pipelines", proficiency: 65, icon: null },
    ],
  },
  {
    category: "Databases & Cloud",
    icon: Database,
    skills: [
      { name: "Firestore / MongoDB", proficiency: 80, icon: null },
      { name: "PostgreSQL / SQL", proficiency: 75, icon: null },
      { name: "AWS (Lambda, S3, API GW)", proficiency: 70, icon: Cloud },
      {
        name: "Git / GitHub / Version Control",
        proficiency: 95,
        icon: Terminal,
      },
    ],
  },
];

// --- FRAMER MOTION VARIANTS ---

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const barVariants = {
  hidden: { width: "0%" },
  visible: (proficiency) => ({
    width: `${proficiency}%`,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  }),
};

// --- REUSABLE COMPONENT (Skill Item with Animated Bar) ---

const SkillItem = ({ skill }) => {
  const IconComponent = skill.icon;

  return (
    <motion.div
      className="mb-6 p-4 rounded-lg bg-[#1a1a2e] border border-gray-800/50 transition duration-300 cursor-default"
      // ADDED: Hover effect for the Skill Item
      whileHover={{
        y: -3, // Slight lift
        boxShadow: `0 0 15px ${NEON_CYAN}30`, // Soft neon glow
        borderColor: NEON_CYAN + "80", // Border brightens
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {IconComponent && (
            <IconComponent size={20} color={NEON_CYAN} className="mr-3" />
          )}
          <h4 className="text-lg font-medium text-gray-100">{skill.name}</h4>
        </div>
        <span className="text-sm font-bold" style={{ color: NEON_CYAN }}>
          {skill.proficiency}%
        </span>
      </div>

      {/* Scifi Progress Bar */}
      <div
        className="h-2 rounded-full overflow-hidden relative"
        style={{ backgroundColor: "#2d2d44" }}
      >
        <motion.div
          className="h-full rounded-full relative"
          // UPDATED: Used a gradient for active energy look
          style={{
            background: `linear-gradient(90deg, ${NEON_PURPLE} 0%, ${NEON_CYAN} 100%)`,
          }}
          variants={barVariants}
          custom={skill.proficiency}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          {/* ENHANCEMENT: Pulsing/Stronger Glow for Active Bar */}
          <motion.div
            className="absolute inset-0 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            // Added purple to the glow for depth
            style={{
              boxShadow: `0 0 10px ${NEON_CYAN}, 0 0 20px ${NEON_PURPLE}`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- MAIN SKILLS COMPONENT ---

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: DARK_BG, color: "white" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-lg font-medium tracking-widest uppercase mb-2"
            style={{ color: NEON_CYAN }}
          >
            Technical Data Stream
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-100">
            <span className="relative">
              My Skill Matrix
              <span
                className="absolute bottom-[-10px] left-0 h-1 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgba(0, 255, 255, 0) 0%, ${NEON_CYAN} 100%)`,
                }}
              ></span>
            </span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-gray-700/50"
              style={{ backgroundColor: "#10101c" }}
              // ADDED: Category Card Hover for lift and shadow
              whileHover={{
                scale: 1.01,
                boxShadow: `0 0 25px ${NEON_CYAN}20`,
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex items-center mb-6 border-b border-neon-cyan/30 pb-3">
                <category.icon
                  size={28}
                  style={{ color: NEON_CYAN }}
                  className="mr-3"
                />
                <h3 className="text-2xl font-bold" style={{ color: NEON_CYAN }}>
                  {category.category}
                </h3>
              </div>

              {category.skills.map((skill, skillIndex) => (
                <SkillItem key={skillIndex} skill={skill} />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scifi Grid Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Skills;
