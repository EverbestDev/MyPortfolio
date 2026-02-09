import React from "react";
import { motion } from "framer-motion";
import {
    Download,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Globe,
    ExternalLink,
    ChevronLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeColors } from "../../hooks/useThemeColors";

const Resume = () => {
    const colors = useThemeColors();

    const handleDownload = () => {
        window.print();
    };

    return (
        <div
            className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
        >

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
                    style={{ backgroundColor: colors.NEON_CYAN }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
                    style={{ backgroundColor: colors.NEON_CYAN }} />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">

                <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4 print:hidden">
                    <Link
                        to="/"
                        className="flex items-center gap-2 font-medium transition-colors hover:gap-3"
                        style={{ color: colors.NEON_CYAN }}
                    >
                        <ChevronLeft size={20} /> Back to Portfolio
                    </Link>

                    <motion.button
                        onClick={handleDownload}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold shadow-lg transition-all"
                        style={{
                            backgroundColor: colors.NEON_CYAN,
                            color: colors.DARK_BG,
                            boxShadow: `0 0 20px ${colors.NEON_CYAN}40`
                        }}
                    >
                        <Download size={20} /> Download Resume
                    </motion.button>
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 sm:p-12 rounded-2xl shadow-2xl relative backdrop-blur-sm print:shadow-none print:p-0 resume-card"
                    style={{
                        backgroundColor: `${colors.CARD_BG}e0`,
                        color: colors.TEXT_PRIMARY,
                        border: `1px solid ${colors.BORDER}40`
                    }}
                >
                    <style>
                        {`
                @media print {
                    @page { margin: 0.5cm; }
                    body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
                    .print\\:hidden { display: none !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .resume-card { background: white !important; color: black !important; border: none !important; box-shadow: none !important; }
                    .resume-text-secondary { color: #4b5563 !important; }
                    .resume-header { border-color: black !important; }
                    .resume-accent { color: ${colors.NEON_CYAN} !important; }
                }
                `}
                    </style>


                    <div className="border-b-2 pb-8 mb-8 resume-header" style={{ borderColor: `${colors.BORDER}60` }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight mb-2">
                                    Usamah <span style={{ color: colors.NEON_CYAN }} className="resume-accent">Abidemi</span>
                                </h1>
                                <p className="text-xl font-medium resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>Full Stack Developer & Creative Technologist</p>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2 text-sm resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>
                                <a href="mailto:EverbestDev@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                                    <Mail size={16} /> EverbestDev@gmail.com
                                </a>
                                <a href="tel:+2349117450722" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                                    <Phone size={16} /> +234 911 745 0722
                                </a>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} /> Remote / Nigeria
                                </div>
                                <div className="flex gap-4 mt-1">
                                    <a href="https://linkedin.com" className="hover:text-cyan-400"><Linkedin size={18} /></a>
                                    <a href="https://github.com/everbestDev" className="hover:text-cyan-400"><Github size={18} /></a>
                                    <a href="https://everbestdev.com.ng" className="hover:text-cyan-400"><Globe size={18} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        {/* Left Column */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Summary */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Profile
                                </h2>
                                <p className="leading-relaxed resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>
                                    Innovative and detail-oriented Full Stack Developer with a passion for building scalable, user-centric web applications.
                                    Proficient in the MERN stack and modern frontend frameworks, with a strong ability to translate complex requirements
                                    into clean, efficient code. Dedicated to continuous learning and leveraging technology to solve real-world problems.
                                </p>
                            </section>

                            {/* Experience */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Experience
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        {
                                            role: "Full Stack Developer",
                                            company: "Everbest Studios",
                                            period: "2023 - Present",
                                            desc: "Leading development of client projects ranging from e-commerce platforms to business management tools. Implementing robust APIs and responsive UIs using React and Node.js."
                                        },
                                        {
                                            role: "Web Development Intern",
                                            company: "Tech Solutions Ltd",
                                            period: "2022 - 2023",
                                            desc: "Collaborated with senior developers to maintain legacy codebases and implement new features. Assisted in database optimization and frontend performance tuning."
                                        }
                                    ].map((job, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-lg" style={{ color: colors.TEXT_PRIMARY }}>{job.role}</h3>
                                                <span className="text-sm font-mono px-2 py-1 rounded resume-text-secondary" style={{ backgroundColor: `${colors.NEON_CYAN}10`, color: colors.TEXT_SECONDARY }}>{job.period}</span>
                                            </div>
                                            <p className="font-medium text-sm mb-2 resume-accent" style={{ color: colors.NEON_CYAN }}>{job.company}</p>
                                            <p className="text-sm leading-relaxed resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>{job.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Key Projects
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: "SSCF Digital Platform",
                                            tech: "React, Node.js, Tailwind",
                                            desc: "A comprehensive health platform featuring appointment scheduling, donation systems, and educational resources."
                                        },
                                        {
                                            name: "ILI-Nigeria",
                                            tech: "MERN Stack, Cloudinary, Brevo",
                                            desc: "Translation workflow management system with automated notifications and client dashboards."
                                        },
                                        {
                                            name: "University E-Attendance",
                                            tech: "Vue.js, Geofencing, Face-API.js",
                                            desc: "Smart attendance system utilizing Geofencing and face recognition for secure, automated student validation."
                                        }
                                    ].map((project, i) => (
                                        <div key={i} className="p-4 rounded-lg border resume-card" style={{ backgroundColor: `${colors.NEON_CYAN}05`, borderColor: `${colors.BORDER}20` }}>
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className="font-bold" style={{ color: colors.TEXT_PRIMARY }}>{project.name}</h3>
                                                <span className="text-xs resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>{project.tech}</span>
                                            </div>
                                            <p className="text-sm resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>{project.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Skills */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Skills
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2 uppercase" style={{ color: colors.TEXT_PRIMARY }}>Frontend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["React", "Vue.js", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"].map(s => (
                                                <span key={s} className="px-2 py-1 text-xs font-medium rounded-md resume-text-secondary" style={{ backgroundColor: `${colors.NEON_CYAN}15`, color: colors.TEXT_SECONDARY }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2 uppercase" style={{ color: colors.TEXT_PRIMARY }}>Backend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Node.js", "Express", "Python", "FastAPI", "MongoDB", "PostgreSQL"].map(s => (
                                                <span key={s} className="px-2 py-1 text-xs font-medium rounded-md resume-text-secondary" style={{ backgroundColor: `${colors.NEON_CYAN}15`, color: colors.TEXT_SECONDARY }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2 uppercase" style={{ color: colors.TEXT_PRIMARY }}>No-Code & Automation</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["WordPress", "Bubble", "Webflow", "Zapier", "Make.com", "FlutterFlow"].map(s => (
                                                <span key={s} className="px-2 py-1 text-xs font-medium rounded-md resume-text-secondary" style={{ backgroundColor: `${colors.NEON_CYAN}15`, color: colors.TEXT_SECONDARY }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2 uppercase" style={{ color: colors.TEXT_PRIMARY }}>IT & Management Tools</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Jira", "Postman", "Notion", "Slack", "Trello", "ClickUp"].map(s => (
                                                <span key={s} className="px-2 py-1 text-xs font-medium rounded-md resume-text-secondary" style={{ backgroundColor: `${colors.NEON_CYAN}15`, color: colors.TEXT_SECONDARY }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Education
                                </h2>
                                <div>
                                    <h3 className="font-bold text-lg" style={{ color: colors.TEXT_PRIMARY }}>B.Sc. Computer Science</h3>
                                    <p className="text-sm resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>Tai Solarin University of Education</p>
                                    <p className="text-xs mt-1 resume-text-secondary opacity-60" style={{ color: colors.TEXT_SECONDARY }}>2021 - Present</p>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-6 border-t text-center text-xs opacity-60 resume-text-secondary" style={{ borderColor: `${colors.BORDER}60`, color: colors.TEXT_SECONDARY }}>
                        <p>© {new Date().getFullYear()} Usamah Abidemi. Built with React & Tailwind CSS.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Resume;
