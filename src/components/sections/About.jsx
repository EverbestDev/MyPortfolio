import React from "react";
import { motion } from "framer-motion";
import { Code, User, Lightbulb } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

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

const Pillar = ({ icon: Icon, title, colors }) => (
  <div
    className="flex flex-col items-center text-center p-3 rounded-lg border transition duration-300"
    style={{
      borderColor: `${colors.BORDER}80`,
    }}
  >
    <Icon size={30} style={{ color: colors.NEON_CYAN }} className="mb-2" />
    <p className="text-sm font-semibold" style={{ color: colors.TEXT_SECONDARY }}>{title}</p>
  </div>
);

const About = () => {
  const colors = useThemeColors();

  return (
    <section
      id="about"
      className="py-20 sm:py-32 w-full overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
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
            Who I Am
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: colors.TEXT_PRIMARY }}>
            <span className="relative">
              About Me
              <span
                className="absolute bottom-[-10px] left-0 h-1 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.NEON_CYAN} 0%, rgba(0, 255, 255, 0) 100%)`,
                }}
              ></span>
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center max-w-6xl mx-auto px-4">
          <motion.div
            className="md:col-span-7 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="text-lg leading-relaxed"
              style={{ color: colors.TEXT_SECONDARY }}
              variants={itemVariants}
            >
              My journey began with a deep curiosity for how digital products
              are built and designed. I quickly grew into a <strong style={{ color: colors.TEXT_PRIMARY }}>full-stack
                software developer</strong> specializing in modern architectures using <strong style={{ color: colors.NEON_CYAN }}>Next.js, TypeScript, and Python</strong>.
            </motion.p>

            <motion.p
              className="text-lg leading-relaxed"
              style={{ color: colors.TEXT_SECONDARY }}
              variants={itemVariants}
            >
              I thrive on being the <strong>'design-developer hybrid'</strong>—translating beautiful mockups into pixel-perfect, highly
              performant reality. My focus isn't just on writing clean code, but
              on creating seamless and intuitive <strong>user experiences</strong>.
            </motion.p>

            <motion.div
              className="pt-4 grid grid-cols-3 gap-4"
              variants={itemVariants}
            >
              <Pillar icon={Code} title="Full Stack" colors={colors} />
              <Pillar icon={Lightbulb} title="UX Focus" colors={colors} />
              <Pillar icon={User} title="Hybrid Skillset" colors={colors} />
            </motion.div>

            <motion.p
              className="text-lg leading-relaxed"
              style={{ color: colors.TEXT_SECONDARY }}
              variants={itemVariants}
            >
              When I'm not coding, I'm diving into new UI/UX trends or exploring
              state-of-the-art deployment architectures. I'm always looking for
              the next challenge to build something truly exceptional.
            </motion.p>
          </motion.div>

          <motion.div
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div
              className="w-full rounded-xl overflow-hidden shadow-2xl relative"
              style={{
                backgroundColor: colors.CARD_BG,
                boxShadow: `0 0 20px ${colors.NEON_CYAN}20`,
                border: `1px solid ${colors.NEON_CYAN}40`,
              }}
            >
              <div className="p-4 flex justify-between items-center text-xs border-b" style={{ color: colors.TEXT_TERTIARY, borderBottomColor: colors.BORDER }}>
                <span className="truncate">everbest.dev/About.jsx</span>
                <div className="flex space-x-2 flex-shrink-0 ml-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
              <pre className="p-6 text-xs sm:text-sm overflow-x-auto font-mono">
                <code className="block whitespace-pre">
                  <span style={{ color: colors.NEON_PURPLE }}>const</span>{" "}
                  <span style={{ color: colors.NEON_CYAN }}>EverbestDev</span>{" "}
                  <span style={{ color: colors.NEON_PURPLE }}>=</span> (){" "}
                  <span style={{ color: colors.NEON_PURPLE }}>=&gt;</span>{" "}
                  <span>({'{'}</span>
                  <br />
                  &nbsp;&nbsp;<span>role</span>:{" "}
                  <span style={{ color: colors.NEON_CYAN }}>'FullStack Dev'</span>,<br />
                  &nbsp;&nbsp;<span>specialty</span>
                  : <span style={{ color: colors.NEON_CYAN }}>'Next.js | Python'</span>,
                  <br />
                  &nbsp;&nbsp;<span>designFocus</span>:{" "}
                  <span style={{ color: colors.NEON_PURPLE }}>true</span>,<br />
                  &nbsp;&nbsp;<span>passion</span>:{" "}
                  <span style={{ color: colors.NEON_CYAN }}>'Exceptional DX'</span>,
                  <br />
                  &nbsp;&nbsp;<span>skills</span>: [
                  <span style={{ color: colors.NEON_CYAN }}>'UI/UX'</span>,{" "}
                  <span style={{ color: colors.NEON_CYAN }}>'Typescript'</span>,{" "}
                  <span style={{ color: colors.NEON_CYAN }}>'API'</span>]<br />
                  <span>{'}'});</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
