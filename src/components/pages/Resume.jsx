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
    Award,
    Trophy,
    Target,
    TrendingUp,
    CheckCircle2
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
            label: "Full-Stack Software Engineer | CTO, Altris Product Systems",
            email: "olawooreusamahabidemi@gmail.com",
            phone: "+234 911 745 0722",
            location: "Remote / Nigeria",
            website: "https://everbestdev.vercel.app",
            profiles: [
                { network: "LinkedIn", url: "https://www.linkedin.com/in/usamah-abidemi-198464291/" },
                { network: "GitHub", url: "https://github.com/EverbestDev" }
            ]
        },
        summary: "Full-Stack Software Engineer with 3+ years of experience building and shipping production web platforms in TypeScript and Python. Currently a full-time remote Full-Stack Software Engineer at StreetOps and CTO of Altris Product Systems, leading the engineering of Afribase, Rekora, LexLearn and client products. Experienced in designing REST APIs with NestJS, Express, Next.js and FastAPI; modelling data in PostgreSQL (Prisma) and MongoDB; implementing JWT, RBAC and two-factor authentication, Stripe payments and transactional email; and building fast, responsive, animation-rich interfaces with React and Next.js.",
        experience: [
            {
                company: "StreetOps — Full-time, Remote (Contract)",
                position: "Full-Stack Software Engineer",
                startDate: "2026",
                endDate: "Present",
                highlights: [
                    "Lead developer on GummyGum, StreetOps’ team-culture and employee-engagement platform (Next.js, TypeScript, Firebase), with 13 live interactive team experiences including Sabi Quiz, Townhall, Lucky Spinner and Story Swap",
                    "Refactored GummyGum from a 9,000+ line monolith into a modular, single-responsibility architecture",
                    "Built the backend for Paige, a research and insights platform: Express/TypeScript on PostgreSQL with JWT, TOTP two-factor login, rate limiting and Zod validation",
                    "Built StreetAsk (polls and surveys with PDF report export) and the StreetOps operations dashboard in React and TypeScript"
                ]
            },
            {
                company: "Altris Product Systems",
                position: "Chief Technology Officer (CTO)",
                startDate: "2026",
                endDate: "Present",
                highlights: [
                    "Set technical direction and architecture for Altris’ products and client builds; lead the engineering team through code review, Git workflows and deployment",
                    "Afribase: open-source Firebase/Supabase alternative for Africa with auth, auto-generated REST APIs, realtime, storage and multi-tenant organisations",
                    "Rekora: trading-education platform with FastAPI, PostgreSQL, Redis and a MetaTrader 5 bridge for live prices and trade management",
                    "LexLearn: AI-graded CBT platform for schools with LexAI semantic grading and question import from PDF, Word and Excel",
                    "D’Franklin Apartments: hotel booking redesign on Afribase (Next.js 16, TypeScript), first phase of a hotel management system"
                ]
            },
            {
                company: "Client Projects (Paid Contracts)",
                position: "Freelance Full-Stack Developer",
                startDate: "2025",
                endDate: "Present",
                highlights: [
                    "MOMSComfort: maternal healthcare platform with appointment booking, store, WhatsApp checkout, admin panel and Express/Prisma/PostgreSQL API",
                    "Political campaign platform: website, admin panel and API with Next.js, PostgreSQL/Prisma, JWT and Brevo email",
                    "Bazetwo Barbers: booking platform with Stripe payments, QR booking verification and customer, barber and admin dashboards (React, FastAPI, MongoDB)",
                    "ILI-Nigeria, Zula and SSCF: translation marketplace, WhatsApp-checkout e-commerce and foundation website"
                ]
            },
            {
                company: "Solace IT Ltd — Ogun State",
                position: "Software Engineer Intern",
                startDate: "2023",
                endDate: "2025",
                highlights: [
                    "Built CRUD service modules and authentication workflows with Node.js, Express and MongoDB",
                    "Supported frontend improvements, debugging, Linux deployment preparation and Git workflows"
                ]
            }
        ],
        skills: {
            languages: ["Python", "JavaScript", "TypeScript", "C++", "HTML", "CSS"],
            frontend: ["React", "Next.js", "Vue.js", "Tailwind CSS", "shadcn/ui", "Redux", "Zustand", "GSAP", "Framer Motion", "Lenis"],
            backend: ["NestJS", "Node.js", "Express", "FastAPI", "Django REST Framework", "GraphQL", "Swagger/OpenAPI"],
            database: ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "Prisma", "SQLAlchemy", "Redis"],
            platforms: ["Afribase", "Supabase", "Firebase"],
            "payments & comms": ["Stripe", "Paystack", "Twilio", "SendGrid", "Brevo", "Resend", "WhatsApp Cloud API"],
            devops: ["Docker", "Git", "GitHub", "Vercel", "Render", "Cloudinary", "Postman", "Figma"]
        },
        projects: [
            {
                name: "Entrix — WhatsApp-First Event Ticketing",
                technologies: ["React", "TypeScript", "NestJS", "Prisma", "Afribase"],
                description: "My event ticketing startup: organisers sell tickets inside WhatsApp, check guests in with QR codes, manage team roles and get paid to their bank",
                impact: "Personal startup, 2026 – Present",
                url: "https://entrix.altrisco.tech"
            },
            {
                name: "E-Attendance — University Platform",
                technologies: ["FastAPI", "MongoDB", "OpenCV", "Geofencing", "JWT"],
                description: "University attendance system combining geofencing and face recognition to prevent proxy attendance",
                impact: "1st Place, EdTech COE TASUED Hackathon v2 (2025)",
                url: "https://e-attendance.com.ng"
            },
            {
                name: "Kommunity — Community Management Platform",
                technologies: ["Node.js", "Express", "MongoDB", "JWT", "RBAC"],
                description: "Multi-tenant backend for activity coordination, land ownership and tenancy workflows",
                impact: "Multi-tenant architecture with role-based access control"
            }
        ],
        certifications: [
            { name: "1st Place — EdTech COE TASUED Hackathon v2", issuer: "Built E-Attendance", year: "2025" },
            { name: "4th Place — EdTech COE TASUED Hackathon v1", issuer: "Built VisionAI", year: "2024" }
        ],
        achievements: [
            { title: "3+ Years", description: "Building production web platforms" },
            { title: "CTO", description: "Altris Product Systems" },
            { title: "Full-Stack Engineer", description: "StreetOps (Remote)" },
            { title: "1st Place", description: "TASUED EdTech Hackathon 2025" }
        ],
        education: {
            institution: "Tai Solarin Federal University of Education, Ijagun",
            degree: "B.Sc. Computer Science (In View)",
            startDate: "2024",
            endDate: "2027"
        }
    };

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/cv/Usamah Abidemi CV.pdf';
        link.download = 'Usamah Abidemi CV.pdf';
        link.click();
        setShowDownloadMenu(false);
    };

    const handleDownloadDOCX = () => {
        const link = document.createElement('a');
        link.href = '/cv/Usamah Abidemi CV.docx';
        link.download = 'Usamah Abidemi CV.docx';
        link.click();
        setShowDownloadMenu(false);
    };

    return (
        <div
            className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
        >


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
                                            <div className="text-xs opacity-60">Professional PDF version</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={handleDownloadDOCX}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                                        style={{ color: colors.TEXT_PRIMARY }}
                                    >
                                        <FileText size={18} style={{ color: colors.NEON_CYAN }} />
                                        <div className="text-left">
                                            <div className="font-semibold text-sm">Word/DOC Format</div>
                                            <div className="text-xs opacity-60">Editable Word version</div>
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
                                <p className="text-xl font-medium resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>{resumeData.basics.label}</p>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2 text-sm resume-text-secondary" style={{ color: colors.TEXT_SECONDARY }}>
                                <a href="mailto:olawooreusamahabidemi@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                                    <Mail size={16} /> olawooreusamahabidemi@gmail.com
                                </a>
                                <a href="tel:+2349117450722" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                                    <Phone size={16} /> +234 911 745 0722
                                </a>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} /> Remote / Nigeria
                                </div>
                                <div className="flex gap-4 mt-1">
                                    <a href="https://www.linkedin.com/in/usamah-abidemi-198464291/" className="hover:text-cyan-400"><Linkedin size={18} /></a>
                                    <a href="https://github.com/EverbestDev" className="hover:text-cyan-400"><Github size={18} /></a>
                                    <a href="https://everbestdev.vercel.app" className="hover:text-cyan-400"><Globe size={18} /></a>
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
                                    <span className="w-2 h-8 block" style={{ backgroundColor: colors.TEXT_PRIMARY }}></span> Awards
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
