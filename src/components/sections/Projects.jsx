import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Headless Store",
    description: "A high-performance e-commerce frontend built with React, integrated with a decoupled backend API for inventory management and secure payments.",
    tech: ["React", "Tailwind CSS", "Redux", "Stripe"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=E-COMMERCE+MOCK",
    codeSnippet: "const res = await api.get('/products');",
  },
  {
    id: 2,
    title: "Real-time Chat App",
    description: "A scalable chat application utilizing WebSocket connections for low-latency, real-time message delivery and user presence indicators.",
    tech: ["Node.js", "Express", "Socket.io", "MongoDB"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=CHAT+APP+UI",
    codeSnippet: "socket.on('message', (msg) => setMessage(msg));",
  },
  {
    id: 3,
    title: "Dev Portfolio (This Site)",
    description: "A modern, highly-animated portfolio showcasing design-developer hybrid skills using Framer Motion and a custom neon aesthetic.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=NEON+PORTFOLIO",
    codeSnippet: "<motion.div whileHover={{ scale: 1.03 }} />",
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboards for viewing complex metrics, featuring D3.js charts and user-configurable layouts.",
    tech: ["React", "D3.js", "TypeScript", "Recharts"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=DASHBOARD+CHARTS",
    codeSnippet: "const chart = d3.select(ref.current).append('svg');",
  },
  {
    id: 5,
    title: "Serverless API Gateway",
    description: "Implemented a robust, high-availability API using AWS Lambda and API Gateway to manage user authentication and data processing.",
    tech: ["AWS Lambda", "API Gateway", "DynamoDB", "Python"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=SERVERLESS+FLOW",
    codeSnippet: "response = process_request(event);",
  },
  {
    id: 6,
    title: "Mobile-First Task Manager",
    description: "A progressive web app (PWA) designed for optimal mobile use, including offline sync and native-like performance.",
    tech: ["PWA", "IndexedDB", "React Native Web", "MUI"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=PWA+MOCKUP",
    codeSnippet: "const tasks = await localDB.getAll('tasks');",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const ProjectCard = ({ project, onClick, colors }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col h-full rounded-xl p-6 border cursor-pointer transition duration-300 relative group"
      style={{
        transformOrigin: "50% 50%",
        backgroundColor: colors.CARD_BG,
        borderColor: `${colors.BORDER}80`,
      }}
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: `0 10px 30px ${colors.NEON_CYAN}40`,
        transition: { duration: 0.3 },
      }}
      onClick={() => onClick(project)}
    >
      <motion.div
        className="absolute inset-0 rounded-xl -z-10"
        style={{ backgroundColor: colors.CARD_BG }}
        whileHover={{ backgroundColor: colors.SECTION_BG }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative mb-5 rounded-lg overflow-hidden border shadow-lg" style={{ borderColor: `${colors.NEON_CYAN}30`, boxShadow: `0 0 10px ${colors.NEON_CYAN}10` }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-auto object-cover aspect-[4/2.5]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x350/333355/cccccc?text=NO+PREVIEW";
          }}
        />
      </div>

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold" style={{ color: colors.TEXT_PRIMARY }}>{project.title}</h3>
        <div className="flex space-x-3 mt-1">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: colors.TEXT_TERTIARY }}
            whileHover={{ scale: 1.15, color: colors.NEON_CYAN }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={22} />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: colors.TEXT_TERTIARY }}
            whileHover={{ scale: 1.15, color: colors.NEON_CYAN }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink size={22} />
          </motion.a>
        </div>
      </div>

      <p className="text-sm mb-4 leading-relaxed" style={{ color: colors.TEXT_SECONDARY }}>{project.description}</p>

      <div className="mb-4 p-3 rounded-lg border" style={{ backgroundColor: colors.DARK_BG, borderColor: colors.BORDER }}>
        <p className="text-xs font-mono truncate" style={{ color: colors.TEXT_TERTIARY }}>
          <span style={{ color: colors.NEON_CYAN, marginRight: '0.5rem', fontWeight: 'bold' }}>{">"}</span>
          <span>{project.codeSnippet}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((tag) => (
          <motion.span
            key={tag}
            className="px-3 py-1 text-xs font-semibold rounded-full border cursor-pointer"
            style={{
              backgroundColor: `${colors.NEON_CYAN}15`,
              borderColor: `${colors.NEON_CYAN}40`,
              color: colors.NEON_CYAN,
            }}
            whileHover={{
              backgroundColor: `${colors.NEON_CYAN}30`,
              color: colors.TEXT_PRIMARY,
              boxShadow: `0 0 8px ${colors.NEON_CYAN}40`,
              y: -2,
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose, colors }) => {
  const openBrace = "{";
  const closeBrace = "}";

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: `${colors.DARK_BG}cc` }}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl max-h-[90vh] rounded-xl overflow-y-auto shadow-2xl relative"
        style={{
          backgroundColor: colors.CARD_BG,
          border: `1px solid ${colors.NEON_CYAN}40`,
          boxShadow: `0 0 40px ${colors.NEON_CYAN}20`,
        }}
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full z-10"
          style={{ backgroundColor: colors.SECTION_BG, color: colors.TEXT_TERTIARY }}
          whileHover={{ scale: 1.1, rotate: 90, color: colors.TEXT_PRIMARY }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>

        <div className="p-6 sm:p-10">
          <h2 className="text-4xl font-bold mb-4" style={{ color: colors.NEON_CYAN }}>
            {project.title}
          </h2>
          <p className="mb-6" style={{ color: colors.TEXT_SECONDARY }}>{project.description}</p>

          <div className="relative mb-8 rounded-lg overflow-hidden border shadow-lg" style={{ borderColor: `${colors.NEON_CYAN}30` }}>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto object-cover aspect-[4/2.5]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/800x450/333355/cccccc?text=NO+PREVIEW";
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-3 border-b pb-1" style={{ color: colors.TEXT_PRIMARY, borderColor: colors.BORDER }}>
                Key Technologies
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium px-4 py-1.5 rounded-full border"
                    style={{ color: colors.NEON_CYAN, backgroundColor: `${colors.NEON_CYAN}15`, borderColor: `${colors.NEON_CYAN}30` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 border-b pb-1" style={{ color: colors.TEXT_PRIMARY, borderColor: colors.BORDER }}>
                Links
              </h4>
              <div className="flex space-x-6">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition"
                  style={{ color: colors.TEXT_SECONDARY }}
                  whileHover={{ scale: 1.05, color: colors.NEON_CYAN }}
                >
                  <Github size={20} className="mr-2" />
                  GitHub Repo
                </motion.a>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition"
                  style={{ color: colors.TEXT_SECONDARY }}
                  whileHover={{ scale: 1.05, color: colors.NEON_CYAN }}
                >
                  <ExternalLink size={20} className="mr-2" />
                  Live Demo
                </motion.a>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-3 border-b pb-1" style={{ color: colors.TEXT_PRIMARY, borderColor: colors.BORDER }}>
            Core Snippet
          </h4>
          <pre
            className="p-4 rounded-lg overflow-x-auto font-mono text-sm"
            style={{
              backgroundColor: colors.DARK_BG,
              border: `1px solid ${colors.NEON_CYAN}20`,
            }}
          >
            <code style={{ color: colors.TEXT_SECONDARY }} className="whitespace-pre">
              <span style={{ color: colors.NEON_PURPLE }}>import</span>{" "}
              <span style={{ color: colors.NEON_CYAN }}>React</span>{" "}
              <span style={{ color: colors.NEON_PURPLE }}>from</span>{" "}
              <span>'react'</span>; <br />
              <span style={{ color: colors.NEON_PURPLE }}>const</span>{" "}
              <span>ProjectDetails</span>{" "}
              <span style={{ color: colors.NEON_PURPLE }}>=</span> (){" "}
              <span style={{ color: colors.NEON_PURPLE }}>=&gt;</span>{" "}
              <span>{openBrace}</span> <br />
              &nbsp;&nbsp;<span>console</span>.<span>log</span>('Viewing project:', project.id);<br />
              &nbsp;&nbsp;<span style={{ color: colors.NEON_PURPLE }}>return</span> (<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;div&gt;</span>...<span>&lt;/div&gt;</span><br />
              &nbsp;&nbsp;);<br />
              <span>{closeBrace}</span>
            </code>
          </pre>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const colors = useThemeColors();
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section
      id="projects"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            My Portfolio
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: colors.TEXT_PRIMARY }}>
            <span className="relative">
              Featured Projects
              <span
                className="absolute bottom-[-10px] left-0 h-1 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.NEON_CYAN} 0%, transparent 100%)`,
                }}
              ></span>
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={openModal}
              colors={colors}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} colors={colors} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
