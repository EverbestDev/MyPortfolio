import React from "react";
// Import motion to apply animations (assuming framer-motion is available)
import { motion } from "framer-motion";

// Mock data for the timeline entries
const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "Innovatech Solutions",
    duration: "2022 - Present",
    description:
      "Led the development team in migrating legacy systems to a modern React/Node.js stack, resulting in a 40% reduction in latency and a 25% decrease in hosting costs. Implemented continuous integration and deployment (CI/CD) pipelines.",
  },
  {
    role: "Frontend Specialist",
    company: "Creative Digital Agency",
    duration: "2019 - 2022",
    description:
      "Architected and built reusable component libraries using React and TypeScript, accelerating client project delivery time by 30%. Introduced component-based unit testing using Jest and Enzyme.",
  },
  {
    role: "Junior Web Developer",
    company: "Local Tech Startup",
    duration: "2018 - 2019",
    description:
      "Developed and maintained responsive web applications using HTML5, CSS3, and vanilla JavaScript. Assisted with content management system integration and database queries.",
  },
];

// Reusable component for a single timeline entry
const TimelineEntry = ({ role, company, duration, description, index }) => {
  // Define animation for staggered entry from the side, with a slight delay based on index
  const slideIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      delay: index * 0.15 + 0.1, // Staggered delay for each item
    },
    viewport: { once: true, amount: 0.3 }, // Triggers when 30% of the element is visible
  };

  return (
    <motion.div className="flex relative" {...slideIn}>
      {/* 1. Timeline Dot and Line */}
      <div className="flex flex-col items-center mr-4 md:mr-6">
        {/* Dot */}
        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-cyan-400 relative z-10 shadow-lg shadow-cyan-500/50 transition duration-300 group-hover:scale-125" />
        {/* Line */}
        {index < experiences.length - 1 && (
          <div className="h-full w-0.5 bg-gray-700 mt-2 flex-grow" />
        )}
      </div>

      {/* 2. Content Card with Modern Hover Effects */}
      <motion.div
        className="flex-grow pb-12 p-6 -mt-2 mb-2 rounded-xl border border-gray-800 transition duration-300 cursor-pointer 
                   hover:border-cyan-500/50 hover:bg-gray-800/50 hover:shadow-xl hover:shadow-cyan-500/20"
        whileHover={{ y: -2 }} // Subtle lift on hover
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h3 className="font-bold text-xl text-white mr-4">{role}</h3>
          <p className="text-sm font-light text-gray-500 mt-1 sm:mt-0 whitespace-nowrap">
            {duration}
          </p>
        </div>

        <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-3">
          {company}
        </p>
        <p className="leading-relaxed text-gray-300 text-base">{description}</p>
      </motion.div>
    </motion.div>
  );
};


// Main Experience Component
const ExperienceTimeline = () => {
  // Define animation for the header
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080812] text-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header with Animation */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={headerVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Professional <span className="text-[#00ffff]">Journey</span>
          </h2>
          <p className="text-xl text-gray-300">
            A chronological look at where I’ve applied my skills.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="relative pt-4">
          {experiences.map((exp, index) => (
            // Using a wrapper div to simplify the flex structure
            <div key={index} className="group">
              <TimelineEntry {...exp} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
