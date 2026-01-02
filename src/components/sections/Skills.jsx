import React from "react";
import { motion } from "framer-motion";
import { Layers3, Cpu, Terminal, Database, Cloud } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const ReactIcon = ({ size = 24, color = "#00ffff" }) => (
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

const JsIcon = ({ size = 24, color = "#00ffff" }) => (
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
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const skillsData = [
  {
    category: "Frontend Development",
    icon: Layers3,
    skills: [
      { name: "React / Next.js", icon: ReactIcon },
      { name: "TypeScript", icon: null },
      { name: "JavaScript / ES6+", icon: JsIcon },
      { name: "Tailwind CSS / SCSS", icon: null },
      { name: "Framer Motion / GSAP", icon: null },
    ],
  },
  {
    category: "Backend & Runtime",
    icon: Cpu,
    skills: [
      { name: "Node.js / Express", icon: null },
      { name: "Python / FastAPI / Django", icon: null },
      { name: "REST / GraphQL APIs", icon: null },
      { name: "CI/CD Pipelines", icon: null },
    ],
  },
  {
    category: "Databases & Cloud",
    icon: Database,
    skills: [
      { name: "Firestore / MongoDB", icon: null },
      { name: "PostgreSQL / SQL", icon: null },
      { name: "AWS / Google Cloud", icon: Cloud },
      { name: "Git / GitHub / Docker", icon: Terminal },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const SkillItem = ({ skill, colors }) => {
  const IconComponent = skill.icon;

  return (
    <motion.div
      className="p-4 rounded-lg border transition duration-300 cursor-default flex items-center gap-3"
      style={{
        backgroundColor: colors.CARD_BG,
        borderColor: `${colors.BORDER}80`,
      }}
      whileHover={{
        y: -3,
        boxShadow: `0 0 15px ${colors.NEON_CYAN}30`,
        borderColor: colors.NEON_CYAN,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {IconComponent && (
        <IconComponent size={20} color={colors.NEON_CYAN} />
      )}
      <h4 className="text-base font-medium" style={{ color: colors.TEXT_PRIMARY }}>
        {skill.name}
      </h4>
    </motion.div>
  );
};

const Skills = () => {
  const colors = useThemeColors();

  return (
    <section
      id="skills"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-lg font-medium tracking-widest uppercase mb-2"
            style={{ color: colors.NEON_CYAN }}
          >
            Technical Skills
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: colors.TEXT_PRIMARY }}>
            <span className="relative">
              My Skill Matrix
              <span
                className="absolute bottom-[-10px] left-0 h-1 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgba(0, 255, 255, 0) 0%, ${colors.NEON_CYAN} 100%)`,
                }}
              ></span>
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: colors.SECTION_BG,
                borderColor: `${colors.BORDER}50`,
              }}
              whileHover={{
                scale: 1.01,
                boxShadow: `0 0 25px ${colors.NEON_CYAN}20`,
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex items-center mb-6 border-b pb-3" style={{ borderBottomColor: `${colors.NEON_CYAN}30` }}>
                <category.icon
                  size={28}
                  style={{ color: colors.NEON_CYAN }}
                  className="mr-3"
                />
                <h3 className="text-2xl font-bold" style={{ color: colors.NEON_CYAN }}>
                  {category.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} skill={skill} colors={colors} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              `linear-gradient(${colors.NEON_CYAN}10 1px, transparent 1px), linear-gradient(90deg, ${colors.NEON_CYAN}10 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Skills;
