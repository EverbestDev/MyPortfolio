import React from "react";
import { motion } from "framer-motion";
import { useThemeColors } from "../../hooks/useThemeColors";

const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "Innovatech Solutions",
    duration: "2022 - Present",
    description: "Led the development team in migrating legacy systems to a modern React/Node.js stack, resulting in a 40% reduction in latency and a 25% decrease in hosting costs. Implemented continuous integration and deployment (CI/CD) pipelines.",
  },
  {
    role: "Frontend Specialist",
    company: "Creative Digital Agency",
    duration: "2019 - 2022",
    description: "Architected and built reusable component libraries using React and TypeScript, accelerating client project delivery time by 30%. Introduced component-based unit testing using Jest and Enzyme.",
  },
  {
    role: "Junior Web Developer",
    company: "Local Tech Startup",
    duration: "2018 - 2019",
    description: "Developed and maintained responsive web applications using HTML5, CSS3, and vanilla JavaScript. Assisted with content management system integration and database queries.",
  },
];

const TimelineEntry = ({ role, company, duration, description, index, colors }) => {
  const slideIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      delay: index * 0.15 + 0.1,
    },
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <motion.div className="flex relative" {...slideIn}>
      <div className="flex flex-col items-center mr-4 md:mr-6">
        <div
          className="flex-shrink-0 w-4 h-4 rounded-full relative z-10 transition duration-300 group-hover:scale-125"
          style={{
            backgroundColor: colors.NEON_CYAN,
            boxShadow: `0 0 10px ${colors.NEON_CYAN}80`
          }}
        />
        {index < experiences.length - 1 && (
          <div
            className="h-full w-0.5 mt-2 flex-grow"
            style={{ backgroundColor: colors.BORDER }}
          />
        )}
      </div>

      <motion.div
        className="flex-grow pb-12 p-6 -mt-2 mb-8 rounded-xl border transition duration-300 cursor-pointer"
        style={{
          backgroundColor: colors.SECTION_BG,
          borderColor: colors.BORDER,
          color: colors.TEXT_PRIMARY
        }}
        whileHover={{
          y: -2,
          borderColor: colors.NEON_CYAN,
          boxShadow: `0 10px 30px ${colors.NEON_CYAN}15`
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h3 className="font-bold text-xl mr-4" style={{ color: colors.TEXT_PRIMARY }}>{role}</h3>
          <p className="text-sm font-light mt-1 sm:mt-0 whitespace-nowrap" style={{ color: colors.TEXT_TERTIARY }}>
            {duration}
          </p>
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: colors.NEON_CYAN }}>
          {company}
        </p>
        <p className="leading-relaxed text-base" style={{ color: colors.TEXT_SECONDARY }}>{description}</p>
      </motion.div>
    </motion.div>
  );
};

const ExperienceTimeline = () => {
  const colors = useThemeColors();
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={headerVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
            Professional <span style={{ color: colors.NEON_CYAN }}>Journey</span>
          </h2>
          <p className="text-xl" style={{ color: colors.TEXT_SECONDARY }}>
            A chronological look at my career path and achievements.
          </p>
        </motion.div>

        <div className="relative pt-4">
          {experiences.map((exp, index) => (
            <div key={index} className="group">
              <TimelineEntry {...exp} index={index} colors={colors} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
