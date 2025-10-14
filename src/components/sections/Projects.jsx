import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, X } from "lucide-react";

// --- CONFIGURATION DATA & STYLES ---
const NEON_CYAN = "#00ffff";
const DARK_BG = "#080812";

// Mock Project Data
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Headless Store",
    description:
      "A high-performance e-commerce frontend built with React, integrated with a decoupled backend API for inventory management and secure payments. This larger description would detail the architecture, challenges overcome, and core features implemented.",
    tech: ["React", "Tailwind CSS", "Redux", "Stripe"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=E-COMMERCE+MOCK",
    codeSnippet:
      "// fetch products from API\nconst res = await api.get('/products');",
  },
  {
    id: 2,
    title: "Real-time Chat App",
    description:
      "A scalable chat application utilizing WebSocket connections for low-latency, real-time message delivery and user presence indicators. The full project scope included private messaging, group chats, and read receipts.",
    tech: ["Node.js", "Express", "Socket.io", "MongoDB"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=CHAT+APP+UI",
    codeSnippet: "socket.on('message', (msg) => setMessage(msg));",
  },
  {
    id: 3,
    title: "Dev Portfolio (This Site)",
    description:
      "A modern, highly-animated portfolio showcasing design-developer hybrid skills using Framer Motion and a custom neon aesthetic. Focus on performance, responsiveness, and unique visual styling.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=NEON+PORTFOLIO",
    codeSnippet: "<motion.div whileHover={{ scale: 1.03 }} />",
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboards for viewing complex metrics, featuring D3.js charts and user-configurable layouts. Designed for performance handling large datasets efficiently.",
    tech: ["React", "D3.js", "TypeScript", "Recharts"],
    github: "#",
    live: "#",
    imageUrl:
      "https://placehold.co/600x350/1e1e3f/00ffff?text=DASHBOARD+CHARTS",
    codeSnippet: "const chart = d3.select(ref.current).append('svg');",
  },
  {
    id: 5,
    title: "Serverless API Gateway",
    description:
      "Implemented a robust, high-availability API using AWS Lambda and API Gateway to manage user authentication and data processing. Focused on cost optimization and speed.",
    tech: ["AWS Lambda", "API Gateway", "DynamoDB", "Python"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=SERVERLESS+FLOW",
    codeSnippet: "# python lambda function\nresponse = process_request(event);",
  },
  {
    id: 6,
    title: "Mobile-First Task Manager",
    description:
      "A progressive web app (PWA) designed for optimal mobile use, including offline sync and native-like performance. Focused on IndexedDB for reliable local storage.",
    tech: ["PWA", "IndexedDB", "React Native Web", "MUI"],
    github: "#",
    live: "#",
    imageUrl: "https://placehold.co/600x350/1e1e3f/00ffff?text=PWA+MOCKUP",
    codeSnippet: "const tasks = await localDB.getAll('tasks');",
  },
];

// --- FRAMER MOTION VARIANTS ---

// Container for staggered grid effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Item variant for subtle fade-in and lift
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

// --- REUSABLE COMPONENT (The Dope Project Card) ---

/**
 * Project Card component with motion, inner hover effect, and on-click handler.
 */
const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col h-full rounded-xl p-6 border border-gray-800/50 cursor-pointer transition duration-300 relative group"
      style={{
        transformOrigin: "50% 50%",
      }}
      whileHover={{
        scale: 1.03, // Subtle scale transform
        y: -5, // Subtle lift transform
        boxShadow: `0 10px 30px ${NEON_CYAN}40`, // Enhanced neon glow shadow
        transition: { duration: 0.3 },
      }}
      onClick={() => onClick(project)} // Handle click to open modal
    >
      {/* Inner hover effect: Subtle background shift */}
      <motion.div
        className="absolute inset-0 rounded-xl -z-10"
        initial={{ backgroundColor: "#1a1a2e" }}
        whileHover={{ backgroundColor: "#252540" }} // Darker blue/purple hue on hover
        transition={{ duration: 0.3 }}
      />

      {/* Image Display Section */}
      <div className="relative mb-5 rounded-lg overflow-hidden border border-neon-cyan/30 shadow-lg shadow-neon-cyan/10">
        <img
          src={project.imageUrl}
          alt={`Screenshot of ${project.title}`}
          className="w-full h-auto object-cover aspect-[4/2.5]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x350/333355/cccccc?text=NO+PREVIEW";
          }}
        />
      </div>

      {/* Middle Row: Title and Icons */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-gray-100">{project.title}</h3>
        <div className="flex space-x-3 mt-1">
          {/* GitHub Icon with Hover */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            whileHover={{ scale: 1.1, color: NEON_CYAN }}
            onClick={(e) => e.stopPropagation()} // Prevent card click on icon click
          >
            <Github size={20} />
          </motion.a>
          {/* Live Demo Icon with Hover */}
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            whileHover={{ scale: 1.1, color: NEON_CYAN }}
            onClick={(e) => e.stopPropagation()} // Prevent card click on icon click
          >
            <ExternalLink size={20} />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>

      {/* Code Snippet (Minimalist Console Line) */}
      <div className="mb-4 p-3 rounded-lg bg-[#0d0d1a] border border-gray-700">
        <p className="text-xs font-mono text-gray-500 truncate">
          <span className="text-neon-cyan mr-2 font-semibold">{">"}</span>
          <span className="text-gray-300">{project.codeSnippet}</span>
        </p>
      </div>

      {/* Technologies (Tags) - NEW HOVER EFFECT */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((tag) => (
          <motion.span
            key={tag}
            className="text-xs font-medium px-3 py-1 rounded-full text-neon-cyan/80 bg-neon-cyan/10 border border-neon-cyan/20 cursor-pointer"
            style={{ "--neon-cyan": NEON_CYAN }}
            whileHover={{
              backgroundColor: `${NEON_CYAN}30`, // Lighten background
              color: "white",
              boxShadow: `0 0 8px ${NEON_CYAN}80`, // Add subtle glow
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

// --- PROJECT MODAL COMPONENT (Full Details on Click) ---

const ProjectModal = ({ project, onClose }) => {
  // Escaped raw characters for JSX safety: '{' and '}'
  const openBrace = "{";
  const closeBrace = "}";

  // Framer Motion variants for the modal and backdrop
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
      style={{ backgroundColor: "rgba(8, 8, 18, 0.9)" }} // Darker background for modal overlay
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose} // Close on backdrop click
    >
      <motion.div
        className="w-full max-w-4xl max-h-[90vh] bg-[#1a1a2e] rounded-xl overflow-y-auto shadow-2xl relative"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        style={{
          border: `1px solid ${NEON_CYAN}40`,
          boxShadow: `0 0 40px ${NEON_CYAN}30`,
        }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 rounded-full z-10"
          style={{ backgroundColor: "#1a1a2e" }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>

        {/* Modal Content */}
        <div className="p-6 sm:p-10">
          <h2 className="text-4xl font-bold mb-4" style={{ color: NEON_CYAN }}>
            {project.title}
          </h2>
          <p className="text-gray-400 mb-6">{project.description}</p>

          {/* Image */}
          <div className="relative mb-8 rounded-lg overflow-hidden border border-neon-cyan/30 shadow-lg shadow-neon-cyan/10">
            <img
              src={project.imageUrl}
              alt={`Screenshot of ${project.title}`}
              className="w-full h-auto object-cover aspect-[4/2.5]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x450/333355/cccccc?text=NO+PREVIEW";
              }}
            />
          </div>

          {/* Extended Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gray-200 border-b border-gray-700/50 pb-1">
                Key Technologies
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium px-4 py-1.5 rounded-full text-neon-cyan bg-neon-cyan/15 border border-neon-cyan/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gray-200 border-b border-gray-700/50 pb-1">
                Links
              </h4>
              <div className="flex space-x-6">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition"
                  whileHover={{ scale: 1.05, color: NEON_CYAN }}
                >
                  <Github size={20} className="mr-2" />
                  GitHub Repo
                </motion.a>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition"
                  whileHover={{ scale: 1.05, color: NEON_CYAN }}
                >
                  <ExternalLink size={20} className="mr-2" />
                  Live Demo
                </motion.a>
              </div>
            </div>
          </div>

          {/* Extended Code Snippet Display */}
          <h4 className="text-xl font-semibold mb-3 text-gray-200 border-b border-gray-700/50 pb-1">
            Core Snippet
          </h4>
          <pre
            className="p-4 rounded-lg overflow-x-auto font-mono text-sm"
            style={{
              backgroundColor: "#0d0d1a",
              border: `1px solid ${NEON_CYAN}20`,
            }}
          >
            <code className="text-gray-300 whitespace-pre">
              <span className="text-red-400">import</span>{" "}
              <span className="text-cyan-300">React</span>{" "}
              <span className="text-red-400">from</span>{" "}
              <span className="text-green-400">'react'</span>; <br />
              <span className="text-red-400">const</span>{" "}
              <span className="text-yellow-400">ProjectDetails</span>{" "}
              <span className="text-red-400">=</span> (){" "}
              <span className="text-red-400">=&gt;</span>{" "}
              <span className="text-yellow-400">{openBrace}</span> <br />
              &nbsp;&nbsp;<span className="text-cyan-300">console</span>.
              <span className="text-white">log</span>(
              <span className="text-green-400">'Viewing project:'</span>,{" "}
              <span className="text-white">project</span>.
              <span className="text-purple-400">id</span>);
              <br />
              &nbsp;&nbsp;<span className="text-red-400">return</span> (<br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-white">&lt;div&gt;</span>...
              <span className="text-white">&lt;/div&gt;</span>
              <br />
              &nbsp;&nbsp;);
              <br />
              <span className="text-yellow-400">{closeBrace}</span>
            </code>
          </pre>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PROJECTS COMPONENT ---
const Projects = () => {
  // State to manage which project is currently selected for the modal
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    // Best practice to disable background scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset"; // Re-enable background scroll
  };

  return (
    <section
      id="projects"
      className="py-20 sm:py-32"
      style={{ backgroundColor: DARK_BG, color: "white" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            What I've Built
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-100">
            <span className="relative">
              My Portfolio
              <span
                className="absolute bottom-[-10px] left-0 h-1 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgba(0, 255, 255, 0) 0%, ${NEON_CYAN} 100%)`,
                }}
              ></span>
            </span>
          </h2>
        </motion.div>

        {/* Projects Grid: Staggered Reveal */}
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
              onClick={openModal} // Pass the openModal function
            />
          ))}
        </motion.div>
      </div>

      {/* Modal for viewing expanded project details */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
