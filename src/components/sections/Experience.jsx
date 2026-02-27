import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { BorderBeam } from "../ui/BorderBeam";

const experiences = [
  {
    id: 1,
    role: "Senior Full-Stack Developer",
    company: "Innovatech Solutions",
    duration: "2022 - Present",
    description: "Spearheaded the migration of legacy monoliths to microservices using Node.js and Docker, reducing deployment times by 60%. Mentored junior devs and implemented strict code quality standards.",
    tech: ["Node.js", "React", "Docker", "AWS"],
  },
  {
    id: 2,
    role: "Frontend Specialist",
    company: "Creative Digital Agency",
    duration: "2019 - 2022",
    description: "Designed and developed award-winning interactive web experiences for Fortune 500 clients. Specialized in complex GSAP animations and accessible, responsive UI components.",
    tech: ["React", "TypeScript", "GSAP", "Figma"],
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "Local Tech Startup",
    duration: "2018 - 2019",
    description: "Collaborated in an agile team to build the MVP of a SaaS product. Handled UI implementation and integrated third-party APIs for payment and authentication.",
    tech: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
  },
];

const TimelineCard = ({ data, index, colors }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="relative pl-10 sm:pl-0 sm:flex sm:items-center sm:justify-between group w-full"
  >

    <div
      className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 mt-6 sm:mt-0 z-10 transition-all duration-300 group-hover:scale-125"
      style={{
        backgroundColor: colors.DARK_BG,
        borderColor: colors.NEON_CYAN,
        boxShadow: `0 0 10px ${colors.NEON_CYAN}`
      }}
    />


    <div className={`w-full sm:w-[45%] ${index % 2 === 0 ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'} relative`}>
      <motion.div
        className="p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
        style={{
          backgroundColor: `${colors.CARD_BG}60`,
          borderColor: `${colors.BORDER}40`,
          boxShadow: `0 10px 30px -10px rgba(0,0,0,0.3)`
        }}
        whileHover={{
          borderColor: colors.NEON_CYAN,
          boxShadow: `0 0 20px ${colors.NEON_CYAN}20`
        }}
      >
        <BorderBeam size={120} duration={10} colorFrom={colors.NEON_CYAN} colorTo={colors.NEON_PURPLE} />
        <div className={`flex flex-col ${index % 2 === 0 ? 'sm:items-end' : 'sm:items-start'}`}>

          <div className="sm:hidden mb-4 self-start">
            <span className="text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-tighter" style={{ backgroundColor: `${colors.NEON_CYAN}20`, color: colors.NEON_CYAN, border: `1px solid ${colors.NEON_CYAN}30` }}>
              {data.duration}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-1" style={{ color: colors.TEXT_PRIMARY }}>{data.role}</h3>
          <div className="flex items-center gap-2 mb-3 text-sm font-medium" style={{ color: colors.NEON_CYAN }}>
            <Building2 size={14} />
            <span>{data.company}</span>
          </div>

          <p className="text-sm leading-relaxed mb-6 opacity-80" style={{ color: colors.TEXT_SECONDARY }}>
            {data.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'sm:justify-end' : 'sm:justify-start'}`}>
            {data.tech.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border font-medium" style={{ borderColor: `${colors.BORDER}40`, color: colors.TEXT_TERTIARY }}>
                {t}
              </span>
            ))}
          </div>

          <div className={`absolute -bottom-2 ${index % 2 === 0 ? 'left-4' : 'right-4'} opacity-10 pointer-events-none`}>
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent">
              0{data.id}
            </span>
          </div>
        </div>
      </motion.div>


      <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'right-[-120%] text-left pl-8' : 'left-[-120%] text-right pr-8'} hidden sm:block w-full`}>
        <div className="flex items-center gap-2 font-mono text-sm tracking-widest opacity-70" style={{ color: colors.TEXT_TERTIARY }}>
          <Calendar size={14} />
          {data.duration}
        </div>
      </div>
    </div>
  </motion.div>
);

const ExperienceTimeline = () => {
  const colors = useThemeColors();

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: colors.TEXT_PRIMARY }}>
            Professional <span style={{ color: colors.NEON_CYAN }}>Journey</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.TEXT_SECONDARY }}>
            A timeline of my career growth, key roles, and the impact I've made along the way.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto space-y-12 sm:space-y-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1 }}
        >
          {/* background */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

          {experiences.map((exp, index) => (
            <TimelineCard key={exp.id} data={exp} index={index} colors={colors} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
