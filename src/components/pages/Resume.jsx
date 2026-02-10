import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Globe,
    ExternalLink,
    ChevronLeft,
    FileText,
    FileJson,
    Award,
    Trophy,
    Target,
    TrendingUp,
    CheckCircle2,
    Code2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeColors } from "../../hooks/useThemeColors";

const Resume = () => {
    const colors = useThemeColors();
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

    // Resume data in JSON format for export
    const resumeData = {
        basics: {
            name: "Usamah Abidemi",
            label: "Full Stack Developer & SaaS Architect",
            email: "EverbestDev@gmail.com",
            phone: "+234 911 745 0722",
            location: "Remote / Nigeria",
            website: "https://everbestdev.com.ng",
            profiles: [
                { network: "LinkedIn", url: "https://linkedin.com/in/everbestdev" },
                { network: "GitHub", url: "https://github.com/everbestDev" }
            ]
        },
        summary: "Results-driven Full Stack Developer with 3+ years of experience building scalable SaaS platforms and high-performance web applications. Specialized in MERN stack, microservices architecture, and rapid MVP deployment. Proven track record of reducing deployment times by 60%, improving page load speeds by 65%, and delivering projects that serve 1000+ daily active users. Expert in translating complex business requirements into production-ready solutions with measurable ROI.",
        experience: [
            {
                company: "Everbest Studios",
                position: "Senior Full Stack Developer",
                startDate: "2023-01",
                endDate: "Present",
                highlights: [
                    "Architected and deployed 15+ production-ready web applications serving 10K+ combined users",
                    "Reduced average page load time by 65% through code splitting and lazy loading optimization",
                    "Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes (87.5% improvement)",
                    "Mentored 5 junior developers, improving team code quality score from 6.5/10 to 8.9/10"
                ]
            },
            {
                company: "Freelance / Contract Work",
                position: "Full Stack Developer",
                startDate: "2022-01",
                endDate: "2023-01",
                highlights: [
                    "Delivered 20+ client projects with 98% satisfaction rate and 100% on-time delivery",
                    "Built MERN stack translation platform automating 80% of manual workflow processes",
                    "Developed e-attendance system eliminating identity fraud and reducing admin time by 12 hours/week"
                ]
            }
        ],
        skills: {
            frontend: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
            backend: ["Node.js", "Express", "NestJS", "Python", "FastAPI", "Django"],
            database: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
            devops: ["Docker", "AWS", "Git", "Linux", "CI/CD"],
            nocode: ["Bubble", "WordPress", "Webflow", "Zapier", "Make.com", "FlutterFlow"],
            tools: ["Jira", "Postman", "Notion", "Slack", "Trello", "ClickUp", "Figma"]
        },
        projects: [
            {
                name: "SSCF Digital Health Platform",
                technologies: ["React", "Three.js", "Tailwind", "Framer Motion"],
                description: "Comprehensive digital platform for sickle cell awareness with interactive genotype checkers and donation portal",
                impact: "Serving 1000+ daily users, 40% increase in community donations",
                url: "https://sscf.com.ng"
            },
            {
                name: "ILI-Nigeria Translation Hub",
                technologies: ["MongoDB", "Express", "React", "Node.js", "Cloudinary", "Brevo"],
                description: "Full-stack translation workflow platform with automated notifications and file management",
                impact: "60% workflow efficiency improvement, 80% reduction in manual email tasks",
                url: "https://ilin-nigeria.vercel.app"
            },
            {
                name: "University E-Attendance System",
                technologies: ["Vue.js", "Geofencing", "Face-API.js", "Firebase"],
                description: "Smart attendance management with location-based validation and facial recognition",
                impact: "Eliminated manual roll-call errors, saved 12 hours/week of admin time"
            }
        ],
        certifications: [
            { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
            { name: "Meta Frontend Developer Professional", issuer: "Meta (Coursera)", year: "2023" },
            { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2022" },
            { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", year: "2022" }
        ],
        achievements: [
            { title: "15+ Production Apps Deployed", description: "Successfully delivered and maintained" },
            { title: "10K+ Combined Users", description: "Across all deployed platforms" },
            { title: "98% Client Satisfaction", description: "Based on project feedback" },
            { title: "60% Deployment Speed Increase", description: "Through CI/CD optimization" }
        ],
        education: {
            institution: "Tai Solarin University of Education",
            degree: "B.Sc. Computer Science",
            startDate: "2021",
            endDate: "Present"
        }
    };

    const handleDownloadPDF = () => {
        window.print();
        setShowDownloadMenu(false);
    };

    const handleDownloadJSON = () => {
        const dataStr = JSON.stringify(resumeData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'usamah_abidemi_resume.json';
        link.click();
        URL.revokeObjectURL(url);
        setShowDownloadMenu(false);
    };

    const handleDownloadTXT = () => {
        let txtContent = `${resumeData.basics.name}\n${resumeData.basics.label}\n\n`;
        txtContent += `Email: ${resumeData.basics.email}\n`;
        txtContent += `Phone: ${resumeData.basics.phone}\n`;
        txtContent += `Location: ${resumeData.basics.location}\n`;
        txtContent += `Website: ${resumeData.basics.website}\n\n`;
        txtContent += `PROFESSIONAL SUMMARY\n${resumeData.summary}\n\n`;
        txtContent += `EXPERIENCE\n`;
        resumeData.experience.forEach(exp => {
            txtContent += `\n${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
            exp.highlights.forEach(h => txtContent += `• ${h}\n`);
        });
        txtContent += `\nSKILLS\n`;
        Object.entries(resumeData.skills).forEach(([category, skills]) => {
            txtContent += `${category.toUpperCase()}: ${skills.join(', ')}\n`;
        });

        const dataBlob = new Blob([txtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'usamah_abidemi_resume.txt';
        link.click();
        URL.revokeObjectURL(url);
        setShowDownloadMenu(false);
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

                    <div className="relative">
                        <motion.button
                            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
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

                        <AnimatePresence>
                            {showDownloadMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl overflow-hidden border z-50"
                                    style={{
                                        backgroundColor: colors.CARD_BG,
                                        borderColor: `${colors.BORDER}40`
                                    }}
                                >
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                                        style={{ color: colors.TEXT_PRIMARY }}
                                    >
                                        <FileText size={18} style={{ color: colors.NEON_CYAN }} />
                                        <div className="text-left">
                                            <div className="font-semibold text-sm">PDF Format</div>
                                            <div className="text-xs opacity-60">Print-ready version</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={handleDownloadJSON}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                                        style={{ color: colors.TEXT_PRIMARY }}
                                    >
                                        <FileJson size={18} style={{ color: colors.NEON_CYAN }} />
                                        <div className="text-left">
                                            <div className="font-semibold text-sm">JSON Format</div>
                                            <div className="text-xs opacity-60">Machine-readable data</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={handleDownloadTXT}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                                        style={{ color: colors.TEXT_PRIMARY }}
                                    >
                                        <Code2 size={18} style={{ color: colors.NEON_CYAN }} />
                                        <div className="text-left">
                                            <div className="font-semibold text-sm">TXT Format</div>
                                            <div className="text-xs opacity-60">Plain text version</div>
                                        </div>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                    .resume-accent { color: #00d9ff !important; }
                }
                `}
                    </style>

                    {/* Header */}
                    <div className="border-b-2 pb-8 mb-8 resume-header" style={{ borderColor: `${colors.BORDER}60` }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight mb-2">
                                    Usamah <span style={{ color: colors.NEON_CYAN }} className="resume-accent">Abidemi</span>
                                </h1>
                                <p className="text-xl font-medium resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>Full Stack Developer & SaaS Architect</p>
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
                                    <a href="https://linkedin.com/in/everbestdev" className="hover:text-cyan-400"><Linkedin size={18} /></a>
                                    <a href="https://github.com/everbestDev" className="hover:text-cyan-400"><Github size={18} /></a>
                                    <a href="https://everbestdev.com.ng" className="hover:text-cyan-400"><Globe size={18} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Achievements Banner */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 print:mb-6">
                        {resumeData.achievements.map((achievement, i) => (
                            <div key={i} className="p-4 rounded-xl border text-center" style={{ backgroundColor: `${colors.NEON_CYAN}08`, borderColor: `${colors.NEON_CYAN}20` }}>
                                <div className="flex justify-center mb-2">
                                    <Trophy size={20} style={{ color: colors.NEON_CYAN }} />
                                </div>
                                <div className="font-bold text-sm mb-1" style={{ color: colors.TEXT_PRIMARY }}>{achievement.title}</div>
                                <div className="text-xs opacity-70" style={{ color: colors.TEXT_SECONDARY }}>{achievement.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Left Column */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Professional Summary */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Professional Summary
                                </h2>
                                <p className="leading-relaxed resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>
                                    {resumeData.summary}
                                </p>
                            </section>

                            {/* Experience */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Experience
                                </h2>
                                <div className="space-y-6">
                                    {resumeData.experience.map((job, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-lg" style={{ color: colors.TEXT_PRIMARY }}>{job.position}</h3>
                                                <span className="text-sm font-mono px-2 py-1 rounded resume-text-secondary" style={{ backgroundColor: `${colors.NEON_CYAN}10`, color: colors.TEXT_SECONDARY }}>
                                                    {job.startDate} - {job.endDate}
                                                </span>
                                            </div>
                                            <p className="font-medium text-sm mb-3 resume-accent" style={{ color: colors.NEON_CYAN }}>{job.company}</p>
                                            <ul className="space-y-2">
                                                {job.highlights.map((highlight, j) => (
                                                    <li key={j} className="text-sm leading-relaxed flex gap-2 resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>
                                                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.NEON_CYAN }} />
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Key Projects */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Key Projects
                                </h2>
                                <div className="space-y-4">
                                    {resumeData.projects.map((project, i) => (
                                        <div key={i} className="p-4 rounded-lg border resume-card" style={{ backgroundColor: `${colors.NEON_CYAN}05`, borderColor: `${colors.BORDER}20` }}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold" style={{ color: colors.TEXT_PRIMARY }}>{project.name}</h3>
                                                {project.url && (
                                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="print:hidden">
                                                        <ExternalLink size={14} style={{ color: colors.NEON_CYAN }} />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm mb-2 resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>{project.description}</p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp size={14} style={{ color: colors.NEON_CYAN }} />
                                                <span className="text-xs font-semibold" style={{ color: colors.NEON_CYAN }}>{project.impact}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.map((tech, j) => (
                                                    <span key={j} className="text-xs px-2 py-0.5 rounded bg-white/5" style={{ color: colors.TEXT_TERTIARY }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
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
                                    {Object.entries(resumeData.skills).map(([category, skills]) => (
                                        <div key={category}>
                                            <h4 className="font-semibold text-sm mb-2 uppercase" style={{ color: colors.TEXT_PRIMARY }}>
                                                {category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map(skill => (
                                                    <span key={skill} className="px-2 py-1 text-xs font-medium rounded-md resume-text-secondary"
                                                        style={{ backgroundColor: `${colors.NEON_CYAN}15`, color: colors.TEXT_SECONDARY }}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Certifications */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Certifications
                                </h2>
                                <div className="space-y-3">
                                    {resumeData.certifications.map((cert, i) => (
                                        <div key={i} className="flex gap-3">
                                            <Award size={16} className="flex-shrink-0 mt-1" style={{ color: colors.NEON_CYAN }} />
                                            <div>
                                                <div className="font-semibold text-sm" style={{ color: colors.TEXT_PRIMARY }}>{cert.name}</div>
                                                <div className="text-xs opacity-70" style={{ color: colors.TEXT_SECONDARY }}>{cert.issuer} • {cert.year}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2" style={{ borderColor: `${colors.BORDER}40` }}>
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Education
                                </h2>
                                <div>
                                    <h3 className="font-bold text-lg" style={{ color: colors.TEXT_PRIMARY }}>{resumeData.education.degree}</h3>
                                    <p className="text-sm resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>{resumeData.education.institution}</p>
                                    <p className="text-xs mt-1 resume-text-secondary opacity-60" style={{ color: colors.TEXT_SECONDARY }}>
                                        {resumeData.education.startDate} - {resumeData.education.endDate}
                                    </p>
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
