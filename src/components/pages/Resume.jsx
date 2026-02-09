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
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
                    style={{ backgroundColor: colors.NEON_CYAN }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
                    style={{ backgroundColor: colors.NEON_CYAN }} />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Actions */}
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

                {/* Resume Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 sm:p-12 rounded-2xl shadow-2xl relative backdrop-blur-sm print:shadow-none print:p-0"
                    style={{
                        backgroundColor: "white", // Resume usually looks best on white for printing
                        color: "#1a1a1a" // Dark text for readability
                    }}
                >
                    {/* Print-specific style override */}
                    <style>
                        {`
                @media print {
                    @page { margin: 0.5cm; }
                    body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
                    .print\\:hidden { display: none !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:p-0 { padding: 0 !important; }
                }
                `}
                    </style>

                    {/* Resume Header */}
                    <div className="border-b-2 pb-8 mb-8" style={{ borderColor: "#1a1a1a" }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight mb-2">
                                    Usamah <span style={{ color: colors.NEON_CYAN }}>Popoola</span>
                                </h1>
                                <p className="text-xl font-medium text-gray-600">Full Stack Developer & Creative Technologist</p>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2 text-sm text-gray-600">
                                <a href="mailto:popoolausamah8@gmail.com" className="flex items-center gap-2 hover:text-black transition-colors">
                                    <Mail size={16} /> popoolausamah8@gmail.com
                                </a>
                                <a href="tel:+2348074635671" className="flex items-center gap-2 hover:text-black transition-colors">
                                    <Phone size={16} /> +234 807 463 5671
                                </a>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} /> Lagos, Nigeria
                                </div>
                                <div className="flex gap-4 mt-1">
                                    <a href="https://linkedin.com" className="hover:text-black"><Linkedin size={18} /></a>
                                    <a href="https://github.com/everbestDev" className="hover:text-black"><Github size={18} /></a>
                                    <a href="https://portfolio-v2.vercel.app" className="hover:text-black"><Globe size={18} /></a>
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
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-black block"></span> Profile
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Innovative and detail-oriented Full Stack Developer with a passion for building scalable, user-centric web applications.
                                    Proficient in the MERN stack and modern frontend frameworks, with a strong ability to translate complex requirements
                                    into clean, efficient code. Dedicated to continuous learning and leveraging technology to solve real-world problems.
                                </p>
                            </section>

                            {/* Experience */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-black block"></span> Experience
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
                                                <h3 className="font-bold text-lg">{job.role}</h3>
                                                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{job.period}</span>
                                            </div>
                                            <p className="text-cyan-700 font-medium text-sm mb-2">{job.company}</p>
                                            <p className="text-gray-700 text-sm leading-relaxed">{job.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-black block"></span> Key Projects
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
                                            tech: "Vue.js, Firebase, QR Code",
                                            desc: "Automated student attendance tracking system reducing admin workload by 40%."
                                        }
                                    ].map((project, i) => (
                                        <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className="font-bold">{project.name}</h3>
                                                <span className="text-xs text-gray-500">{project.tech}</span>
                                            </div>
                                            <p className="text-sm text-gray-700">{project.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Skills */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-black block"></span> Skills
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-900 mb-2 uppercase">Frontend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["React", "Vue.js", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"].map(s => (
                                                <span key={s} className="px-2 py-1 bg-gray-200 text-xs font-medium rounded-md text-gray-800">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-900 mb-2 uppercase">Backend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Node.js", "Express", "Python", "FastAPI", "MongoDB", "PostgreSQL"].map(s => (
                                                <span key={s} className="px-2 py-1 bg-gray-200 text-xs font-medium rounded-md text-gray-800">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-900 mb-2 uppercase">Tools & DevOps</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Git", "Docker", "AWS", "Vite", "Figma", "Linux"].map(s => (
                                                <span key={s} className="px-2 py-1 bg-gray-200 text-xs font-medium rounded-md text-gray-800">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-black block"></span> Education
                                </h2>
                                <div>
                                    <h3 className="font-bold text-lg">B.Sc. Computer Science</h3>
                                    <p className="text-sm text-gray-600">Tai Solarin University of Education</p>
                                    <p className="text-xs text-gray-400 mt-1">2021 - Present</p>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
                        <p>© {new Date().getFullYear()} Usamah Popoola. Built with React & Tailwind CSS.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Resume;
