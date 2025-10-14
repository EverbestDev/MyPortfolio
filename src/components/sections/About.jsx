import React from "react";
import { motion } from "framer-motion";
import { Code, User, Lightbulb } from "lucide-react";

// --- CONFIGURATION DATA & STYLES ---
const NEON_CYAN = "#00ffff";
const DARK_BG = "#080812";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delay: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const About = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-32 w-full overflow-hidden"
      style={{ backgroundColor: DARK_BG, color: "white" }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Animated on view */}
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
            Who I Am
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-100">
            <span className="relative">
              About Me
              {/* Accent underline: Fades out from neon cyan */}
              <span
                className="absolute bottom-[-10px] left-0 h-1 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${NEON_CYAN} 0%, rgba(0, 255, 255, 0) 100%)`,
                }}
              ></span>
            </span>
          </h2>
        </motion.div>

        {/* Content Grid: Text and Image/Code Block */}
        <div className="grid md:grid-cols-12 gap-8 items-center max-w-6xl mx-auto px-4">
          {/* Left Column: Text Content (md:col-span-7) */}
          <motion.div
            className="md:col-span-7 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="text-md text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              My journey began with a deep curiosity for how digital products
              are built and designed. I quickly grew into a **full-stack
              developer** specializing in the **React** ecosystem on the
              frontend and robust services with **Node.js/Express** on the
              backend.
            </motion.p>

            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              I thrive on being the **'design-developer hybrid'**—the person who
              can translate beautiful mockups into pixel-perfect, highly
              performant reality. My focus isn't just on writing clean code, but
              on creating seamless and intuitive **user experiences**.
            </motion.p>

            {/* Highlighted Skills/Pillars */}
            <motion.div
              className="pt-4 grid grid-cols-3 gap-4"
              variants={itemVariants}
            >
              <Pillar icon={Code} title="Full Stack" />
              <Pillar icon={Lightbulb} title="UX Focus" />
              <Pillar icon={User} title="Hybrid Skillset" />
            </motion.div>

            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              When I'm not coding, you can find me diving into new UI/UX trends
              or exploring state-of-the-art deployment architectures. I'm always
              looking for the next challenge to build something truly
              exceptional.
            </motion.p>
          </motion.div>

          {/* Right Column: Code Snippet/Visual (md:col-span-5) */}
          <motion.div
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {/* Code Block Mockup with Neon Accent */}
            <div
              className="w-full rounded-xl overflow-hidden shadow-2xl relative"
              style={{
                backgroundColor: "#1a1a2e",
                boxShadow: `0 0 20px ${NEON_CYAN}30`,
                border: `1px solid ${NEON_CYAN}40`,
              }}
            >
              <div className="p-3 sm:p-4 flex justify-between items-center text-xs text-gray-400 border-b border-gray-700">
                <span className="truncate">usamah.dev/About.jsx</span>
                <div className="flex space-x-2 flex-shrink-0 ml-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
              <pre className="p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto font-mono">
                <code className="block whitespace-pre">
                  {/* FIX: Escaped '=' and '=>' to prevent JSX compilation error */}
                  <span className="text-red-400">const</span>{" "}
                  <span className="text-cyan-300">Usamah</span>{" "}
                  <span className="text-red-400">{"="}</span> (){" "}
                  <span className="text-red-400">{"=>"}</span>{" "}
                  <span className="text-yellow-400">{"({"}</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">
                    role
                  </span>:{" "}
                  <span className="text-green-400">'FullStack Dev'</span>,<br />
                  &nbsp;&nbsp;<span className="text-purple-400">specialty</span>
                  : <span className="text-green-400">'React | Node.js'</span>,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-purple-400">designFocus</span>:{" "}
                  <span className="text-red-400">true</span>,<br />
                  &nbsp;&nbsp;<span className="text-purple-400">
                    passion
                  </span>:{" "}
                  <span className="text-green-400">'Exceptional DX'</span>,
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">skills</span>: [
                  <span className="text-green-400">'UI/UX'</span>,{" "}
                  <span className="text-green-400">'Scale'</span>,{" "}
                  <span className="text-green-400">'Motion'</span>]<br />
                  {/* FIX: Escaped '})' */}
                  <span className="text-yellow-400">{"}"});</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper component for the content pillars
const Pillar = ({ icon: Icon, title }) => (
  <div className="flex flex-col items-center text-center p-3 rounded-lg border border-gray-700/50 hover:border-white/50 transition duration-300">
    <Icon size={30} style={{ color: NEON_CYAN }} className="mb-2" />
    <p className="text-sm font-semibold text-gray-200">{title}</p>
  </div>
);

export default About;
