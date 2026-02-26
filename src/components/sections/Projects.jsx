import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ArrowUpRight, Sparkles, Zap, Trophy, Rocket, Lock } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const projectsData = [
  {
    id: 1,
    title: "SSCF - Digital Health Platform",
    description: "A comprehensive digital platform for sickle cell awareness, featuring interactive genotype checkers, video hubs, and a secure donation portal. Built to empower the community with medical wisdom.",
    impact: "Serving 1000+ daily users with vital health resources.",
    tech: ["React", "Three.js", "Tailwind", "Framer Motion"],
    github: "#",
    live: "https://sscf.com.ng",
    iframeUrl: "https://sscf.com.ng",
    imageUrl: "https://placehold.co/1200x800/080812/00ffff?text=SSCF+Platform",
  },
  {
    id: 2,
    title: "FundedU — Find Student Funding",
    description: "A comprehensive platform connecting students with verified scholarships, grants, and internships. Designed to simplify the search for educational funding with a stress-free experience and deadline tracking.",
    impact: "Empowering students to access global funding opportunities with zero stress.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Lucide React"],
    github: "#",
    live: "https://fundedu.com.ng",
    iframeUrl: "https://fundedu.com.ng",
    imageUrl: "https://placehold.co/1200x800/080812/00ffff?text=FundedU+Platform",
  },
  {
    id: 3,
    title: "ILI-Nigeria Translation Hub",
    description: "A full-stack MERN platform streamlining multilingual translation workflows. Features client dashboards, automated email notifications (Brevo), and secure file management via Cloudinary.",
    impact: "Optimized workflow efficiency by 60% for interpreters.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "#",
    live: "https://ilin-nigeria.vercel.app",
    iframeUrl: "https://ilin-nigeria.vercel.app",
    imageUrl: "https://placehold.co/600x400/080812/00ffff?text=ILIN+Dashboard",
  },
  {
    id: 4,
    title: "University E-Attendance",
    description: "A smart attendance management system utilizing Geofencing technology and face recognition for secure, location-based student validation. Developed as a collaborative group initiative.",
    impact: "Eliminated manual roll-call errors and identity fraud.",
    tech: ["Vue.js", "Geofencing", "Face-API.js", "Firebase"],
    github: "#",
    live: "https://e-attendance.com.ng",
    iframeUrl: "https://e-attendance.com.ng",
    imageUrl: "https://placehold.co/600x400/080812/00ffff?text=E-Attendance",
  },
  {
    id: 5,
    title: "Zula - Modern E-Commerce",
    description: "A progressive web app (PWA) for e-commerce with seamless cart management, offline capabilities, and a fluid mobile-first shopping experience.",
    impact: "Native-app like experience with instant loading.",
    tech: ["React", "Vite PWA", "Tailwind", "Framer Motion"],
    github: "#",
    live: "https://zula-shop.vercel.app",
    iframeUrl: "https://zula-shop.vercel.app",
    imageUrl: "https://placehold.co/600x400/080812/00ffff?text=Zula+Store",
  },
  {
    id: 6,
    title: "Everbot - AI Assistant",
    description: "An intelligent WhatsApp bot built with Python and FastAPI. Handles automated scheduling, user queries, and real-time interaction management.",
    impact: "Automated 80% of routine user inquiries.",
    tech: ["Python", "FastAPI", "WhatsApp API", "Pydantic"],
    github: "#",
    live: "#",
    iframeUrl: null,
    imageUrl: "https://placehold.co/600x400/080812/00ffff?text=Everbot+AI",
  },
  {
    id: 7,
    title: "Dynamic Empire",
    description: "A high-performance business management platform featuring real-time data synchronization and an immersive user interface designed for modern enterprises.",
    impact: "Streamlining large-scale operations with sub-second latency.",
    tech: ["React", "Node.js", "Firebase", "Tailwind"],
    github: "#",
    live: "https://dynamic-empire.vercel.app/",
    iframeUrl: "https://dynamic-empire.vercel.app/",
    imageUrl: "https://placehold.co/600x400/080812/00ffff?text=Dynamic+Empire",
  },
  {
    id: 8,
    title: "BookSync",
    description: "A collaborative booktracking and library management system that synchronizes reading progress across multiple devices and platforms.",
    impact: "Used by 500+ active readers to track collections.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Auth.js"],
    github: "#",
    live: "https://booksync2.vercel.app",
    iframeUrl: "https://booksync2.vercel.app",
    imageUrl: "https://placehold.co/600x400/080812/00ffff?text=BookSync",
  },
];

const IframePreview = ({ url, fallbackImage, title, colors }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!url) {
    return (
      <img
        src={fallbackImage}
        alt={title}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full relative bg-white">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: colors.CARD_BG }}>
          <div className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full" style={{ borderColor: colors.NEON_CYAN, borderTopColor: 'transparent' }} />
        </div>
      )}

      {hasError ? (
        <img
          src={fallbackImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0 pointer-events-none"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          style={{
            width: '200%',
            height: '200%',
            transform: 'scale(0.5)',
            transformOrigin: '0 0'
          }}
        />
      )}

      <div className="absolute inset-0 z-20 bg-transparent" />
    </div>
  );
};

const FeaturedProject = ({ project, colors, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="col-span-1 lg:col-span-3 relative rounded-3xl overflow-hidden group cursor-pointer"
    style={{
      backgroundColor: colors.CARD_BG,
      border: `1px solid ${colors.NEON_CYAN}40`,
      boxShadow: `0 0 20px ${colors.NEON_CYAN}10`,
      height: '500px'
    }}
    onClick={() => onClick(project)}
  >
    <div className="absolute inset-0 z-0">
      <IframePreview
        url={project.iframeUrl}
        fallbackImage={project.imageUrl}
        title={project.title}
        colors={colors}
      />
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

    <div className="absolute top-6 left-6 z-20">
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md border"
        style={{ color: colors.NEON_CYAN, borderColor: colors.NEON_CYAN }}
      >
        <Sparkles size={14} /> Featured Project
      </div>
    </div>

    <div className="absolute bottom-0 left-0 p-8 z-20 w-full md:w-2/3 text-white">
      <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
      <p className="text-lg mb-6 line-clamp-2 opacity-90">{project.description}</p>

      <div className="flex flex-wrap gap-3 mb-6">
        {project.tech.map(t => (
          <span key={t} className="px-3 py-1 text-sm bg-white/10 backdrop-blur-md rounded-lg text-white">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all hover:gap-3"
          style={{ backgroundColor: colors.NEON_CYAN, color: colors.DARK_BG }}
        >
          View Case Study <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, colors, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
    style={{
      backgroundColor: colors.CARD_BG,
      border: `1px solid ${colors.BORDER}60`,
    }}
    onClick={() => onClick(project)}
  >
    <div className="relative h-48 overflow-hidden bg-black/50">
      <IframePreview
        url={project.iframeUrl}
        fallbackImage={project.imageUrl}
        title={project.title}
        colors={colors}
      />

      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-20" />

      <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors" style={{ color: colors.TEXT_PRIMARY }}>
        {project.title}
      </h3>
      <p className="text-sm mb-4 line-clamp-3" style={{ color: colors.TEXT_SECONDARY }}>
        {project.description}
      </p>

      {project.impact && (
        <div className="mt-auto mb-4 flex items-start gap-2 text-xs" style={{ color: colors.NEON_CYAN }}>
          <Rocket size={14} className="mt-0.5 flex-shrink-0" />
          <span>{project.impact}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: `${colors.BORDER}40` }}>
        {project.tech.slice(0, 3).map(t => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-white/5" style={{ color: colors.TEXT_TERTIARY }}>
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-xs px-2 py-1" style={{ color: colors.TEXT_TERTIARY }}>+{project.tech.length - 3}</span>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const colors = useThemeColors();
  const [selectedProject, setSelectedProject] = useState(() => {
    const savedId = localStorage.getItem('selected_project_id');
    if (savedId) {
      return projectsData.find(p => p.id === parseInt(savedId)) || null;
    }
    return null;
  });

  useEffect(() => {
    if (selectedProject) {
      localStorage.setItem('selected_project_id', selectedProject.id);
    } else {
      localStorage.removeItem('selected_project_id');
    }
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-10 md:flex md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: colors.TEXT_PRIMARY }}>
              Selected <span style={{ color: colors.NEON_CYAN }}>Works</span>
            </h2>
            <p className="text-lg" style={{ color: colors.TEXT_SECONDARY }}>
              A collection of projects where design meets robust engineering.
              Each piece represents a unique challenge solved with modern code.
            </p>
          </div>
          <div className="hidden md:block">
            <button className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all" style={{ color: colors.NEON_CYAN }}>
              View GitHub Information <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            index === 0
              ? <FeaturedProject key={project.id} project={project} colors={colors} onClick={setSelectedProject} />
              : <ProjectCard key={project.id} project={project} colors={colors} onClick={setSelectedProject} />
          ))}
        </div>
      </div>

      {/* project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
            style={{ backgroundColor: `rgba(0, 0, 0, 0.8)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden relative flex flex-col mx-4"
              style={{
                backgroundColor: colors.CARD_BG,
                border: `1px solid ${colors.NEON_CYAN}40`,
                boxShadow: `0 24px 48px -12px rgba(0,0,0,0.5)`
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Content - Scrollable area */}
              <div className="overflow-y-auto custom-scrollbar h-full">

                <div className="relative h-64 sm:h-96 w-full bg-black/20 flex-shrink-0">
                  <IframePreview
                    url={selectedProject.iframeUrl}
                    fallbackImage={selectedProject.imageUrl}
                    title={selectedProject.title}
                    colors={colors}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>

                <div className="p-6 sm:p-10 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.TEXT_PRIMARY }}>
                      {selectedProject.title}
                    </h3>

                    <div className="flex gap-3">
                      {selectedProject.github !== "#" && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5"
                          style={{ color: colors.TEXT_SECONDARY, borderColor: `${colors.BORDER}40` }}
                        >
                          <Github size={18} /> Source
                        </a>
                      )}
                      {selectedProject.live !== "#" ? (
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:gap-3"
                          style={{ backgroundColor: colors.NEON_CYAN, color: colors.DARK_BG }}
                        >
                          <ExternalLink size={18} /> Live Demo
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm opacity-50 bg-white/5" style={{ color: colors.TEXT_SECONDARY }}>
                          <Lock size={18} /> Internal
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-10">
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-5 opacity-50" style={{ color: colors.TEXT_TERTIARY }}>Overview</h4>
                        <p className="text-lg sm:text-xl leading-relaxed opacity-90" style={{ color: colors.TEXT_SECONDARY }}>
                          {selectedProject.description}
                        </p>
                      </div>

                      <div className="p-8 rounded-2xl border" style={{ backgroundColor: `${colors.NEON_CYAN}08`, borderColor: `${colors.NEON_CYAN}20` }}>
                        <h4 className="flex items-center gap-2 font-bold mb-4 text-lg" style={{ color: colors.NEON_CYAN }}>
                          <Trophy size={22} /> Project Impact
                        </h4>
                        <p className="text-lg leading-relaxed" style={{ color: colors.TEXT_PRIMARY }}>{selectedProject.impact}</p>
                      </div>
                    </div>

                    <div className="space-y-10">
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-5 opacity-50" style={{ color: colors.TEXT_TERTIARY }}>Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map(t => (
                            <span
                              key={t}
                              className="px-4 py-2 rounded-xl text-sm font-medium border"
                              style={{ backgroundColor: `${colors.BORDER}08`, borderColor: `${colors.BORDER}30`, color: colors.TEXT_SECONDARY }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-red-500/80 transition-all z-[80] shadow-xl group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
