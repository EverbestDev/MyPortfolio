import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Cpu,
  Zap,
  Layout,
  Database,
  Terminal,
  Coffee,
  Workflow,
  Settings,
  MousePointer2,
  Activity
} from "lucide-react";
import { BorderBeam } from "../ui/BorderBeam";
import { useThemeColors } from "../../hooks/useThemeColors";

const BentoCard = ({ children, className = "", delay = 0, colors }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`relative overflow-hidden rounded-2xl p-6 border group ${className}`}
    style={{
      backgroundColor: `${colors.CARD_BG}80`,
      borderColor: `${colors.BORDER}60`,
      backdropFilter: "blur(10px)",
    }}
    whileHover={{
      y: -5,
      borderColor: colors.NEON_CYAN,
      boxShadow: `0 10px 30px -10px ${colors.NEON_CYAN}20`,
    }}
  >
    <BorderBeam size={150} duration={8} colorFrom={colors.NEON_CYAN} colorTo={colors.NEON_PURPLE} />
    {children}
  </motion.div>
);

const TechBadge = ({ name, icon: Icon, colors }) => (
  <div
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    style={{
      backgroundColor: `${colors.NEON_CYAN}10`,
      color: colors.NEON_CYAN,
      border: `1px solid ${colors.NEON_CYAN}20`,
    }}
  >
    <Icon size={16} />
    <span>{name}</span>
  </div>
);

const TechCategory = ({ title, icon: Icon, skills, colors }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b last:border-0" style={{ borderColor: `${colors.BORDER}40` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-2 text-left group transition-colors"
        style={{ color: colors.TEXT_PRIMARY }}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} style={{ color: colors.NEON_CYAN }} />
          <span className="font-medium">{title}</span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-4 pt-1 px-2 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <TechBadge key={skill.name} name={skill.name} icon={skill.icon} colors={colors} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const colors = useThemeColors();

  return (
    <section
      id="about"
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
            About <span style={{ color: colors.NEON_CYAN }}>Me</span>
          </h2>
          <motion.div
            className="h-1 w-24 mx-auto rounded-full"
            style={{ backgroundColor: colors.NEON_CYAN }}
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">

          <div className="md:col-span-6 lg:col-span-8">
            <BentoCard colors={colors} className="h-full flex flex-col justify-center">
              <div className="md:col-span-7 space-y-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
                  The Engine Behind Your Digital Growth
                </h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: colors.TEXT_SECONDARY }}>
                  I am a results-driven Full-Stack Developer specializing in high-performance SaaS engines and scalable digital architectures.
                  I bridge the gap between ambitious business goals and technical reality, transforming complex problems into elegant, market-ready solutions.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: colors.TEXT_SECONDARY }}>
                  By combining <strong style={{ color: colors.NEON_CYAN }}>robust backend logic</strong> with <strong style={{ color: colors.NEON_CYAN }}>high-conversion design</strong>,
                  I ensure every digital asset I build drives measurable ROI—whether it's a mission-critical dashboard or a high-speed No-Code MVP.
                </p>
              </div>
            </BentoCard>
          </div>


          <div className="md:col-span-3 lg:col-span-4">
            <BentoCard colors={colors} delay={0.1} className="h-full">
              <div className="flex flex-col h-full justify-between gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: colors.TEXT_PRIMARY }}>Experience</h4>
                  <div className="text-5xl font-bold tracking-tight" style={{ color: colors.NEON_CYAN }}>
                    3+
                  </div>
                  <p className="text-sm mt-1" style={{ color: colors.TEXT_TERTIARY }}>Years of Building</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3" style={{ color: colors.TEXT_SECONDARY }}>
                    <Globe size={18} style={{ color: colors.NEON_CYAN }} />
                    <span>Remote Work Ready</span>
                  </div>
                  <div className="flex items-center gap-3" style={{ color: colors.TEXT_SECONDARY }}>
                    <Coffee size={18} style={{ color: colors.NEON_CYAN }} />
                    <span>Fuelled by Coffee</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>


          <div className="md:col-span-3 lg:col-span-5">
            <BentoCard colors={colors} delay={0.2} className="h-full">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
                Tech Arsenal
              </h3>
              <div className="flex flex-col">
                <TechCategory
                  title="Frontend"
                  icon={Layout}
                  colors={colors}
                  skills={[
                    { name: 'React', icon: Code2 },
                    { name: 'Next.js', icon: Globe },
                    { name: 'Vue.js', icon: Globe },
                    { name: 'TypeScript', icon: Terminal },
                    { name: 'Tailwind CSS', icon: Layout },
                    { name: 'Framer Motion', icon: Zap },
                  ]}
                />
                <TechCategory
                  title="Backend"
                  icon={Cpu}
                  colors={colors}
                  skills={[
                    { name: 'Node.js', icon: Cpu },
                    { name: 'NestJS', icon: Globe },
                    { name: 'Python', icon: Code2 },
                    { name: 'FastAPI', icon: Zap },
                    { name: 'Django', icon: Code2 },
                  ]}
                />
                <TechCategory
                  title="Database"
                  icon={Database}
                  colors={colors}
                  skills={[
                    { name: 'PostgreSQL', icon: Database },
                    { name: 'MongoDB', icon: Database },
                    { name: 'Redis', icon: Zap },
                    { name: 'Prisma', icon: Terminal },
                  ]}
                />
                <TechCategory
                  title="DevOps & Tools"
                  icon={Terminal}
                  colors={colors}
                  skills={[
                    { name: 'Docker', icon: Globe },
                    { name: 'Git', icon: Code2 },
                    { name: 'AWS', icon: Globe },
                    { name: 'Linux', icon: Terminal },
                  ]}
                />
                <TechCategory
                  title="No-Code Development"
                  icon={Workflow}
                  colors={colors}
                  skills={[
                    { name: 'Bubble', icon: MousePointer2 },
                    { name: 'WordPress', icon: Globe },
                    { name: 'Webflow', icon: Layout },
                    { name: 'Zapier', icon: Zap },
                    { name: 'Make.com', icon: Workflow },
                    { name: 'FlutterFlow', icon: Globe },
                  ]}
                />
                <TechCategory
                  title="IT & Management Tools"
                  icon={Settings}
                  colors={colors}
                  skills={[
                    { name: 'Jira', icon: Activity },
                    { name: 'Postman', icon: Terminal },
                    { name: 'Notion', icon: Layout },
                    { name: 'Slack', icon: Globe },
                    { name: 'Trello', icon: Layout },
                  ]}
                />
              </div>
            </BentoCard>
          </div>


          <div className="md:col-span-6 lg:col-span-7">
            <BentoCard colors={colors} delay={0.3} className="h-full">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
                My Approach
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={20} style={{ color: colors.NEON_CYAN }} />
                    <h4 className="font-semibold" style={{ color: colors.TEXT_PRIMARY }}>Performance & SEO</h4>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: colors.TEXT_SECONDARY }}>
                    Engineering for speed, accessibility, and organic visibility. I build platforms that search engines reward and users love.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Layout size={20} style={{ color: colors.NEON_CYAN }} />
                    <h4 className="font-semibold" style={{ color: colors.TEXT_PRIMARY }}>Market-Ready Design</h4>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: colors.TEXT_SECONDARY }}>
                    I build products that are ready for the marketplace. High-conversion interfaces that turn visitors into loyal customers.
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
