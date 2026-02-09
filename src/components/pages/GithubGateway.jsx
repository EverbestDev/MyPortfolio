import React from "react";
import { motion } from "framer-motion";
import {
    Github,
    ArrowRight,
    ChevronLeft,
    Code2,
    Star,
    GitFork,
    Terminal,
    Globe,
    ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeColors } from "../../hooks/useThemeColors";

const GithubCard = ({ icon: Icon, title, description, delay, colors }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5, boxShadow: `0 20px 40px ${colors.NEON_CYAN}15` }}
        className="p-6 rounded-2xl border transition-all duration-300 group"
        style={{
            backgroundColor: `${colors.CARD_BG}80`,
            borderColor: `${colors.BORDER}40`,
            backdropFilter: "blur(12px)"
        }}
    >
        <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110"
            style={{
                backgroundColor: `${colors.NEON_CYAN}15`,
                border: `1px solid ${colors.NEON_CYAN}30`
            }}
        >
            <Icon size={24} style={{ color: colors.NEON_CYAN }} />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: colors.TEXT_PRIMARY }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: colors.TEXT_SECONDARY }}>{description}</p>
    </motion.div>
);

const GithubGateway = () => {
    const colors = useThemeColors();
    const githubLink = "https://github.com/EverbestDev";

    return (
        <div
            className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
        >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[140px]"
                    style={{ backgroundColor: colors.NEON_CYAN }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[140px]"
                    style={{ backgroundColor: colors.BORDER }} />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header Actions */}
                <div className="mb-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 font-medium transition-all hover:gap-3 group"
                        style={{ color: colors.NEON_CYAN }}
                    >
                        <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                        Back to Portfolio
                    </Link>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Side: Intro */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-2"
                            style={{ backgroundColor: `${colors.NEON_CYAN}15`, color: colors.NEON_CYAN, border: `1px solid ${colors.NEON_CYAN}30` }}>
                            <Terminal size={12} /> Live From GitHub
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight">
                            Explore My <span style={{ color: colors.NEON_CYAN }}>Open Source</span> Journey
                        </h1>
                        <p className="text-xl leading-relaxed opacity-80" style={{ color: colors.TEXT_SECONDARY }}>
                            Welcome to my code laboratory. Here you'll find everything from production-ready
                            frameworks to experimental UI concepts and full-stack architecture patterns.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <motion.a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${colors.NEON_CYAN}40` }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all"
                                style={{
                                    backgroundColor: colors.NEON_CYAN,
                                    color: colors.DARK_BG
                                }}
                            >
                                <Github size={20} /> View Github Profile
                            </motion.a>

                            <motion.a
                                href={`${githubLink}?tab=repositories`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, backgroundColor: `${colors.NEON_CYAN}15` }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold border transition-all"
                                style={{
                                    borderColor: `${colors.NEON_CYAN}50`,
                                    color: colors.NEON_CYAN,
                                    backdropFilter: "blur(8px)"
                                }}
                            >
                                Browse Repositories <ExternalLink size={18} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Side: Visual/Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative z-10 p-8 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                            style={{ backgroundColor: `${colors.CARD_BG}c0`, backdropFilter: "blur(20px)" }}>
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Github size={200} />
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/50">
                                            <img src="https://github.com/EverbestDev.png" alt="Profile" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Usamah Abidemi</h4>
                                            <p className="text-xs opacity-60">@EverbestDev</p>
                                        </div>
                                    </div>
                                    <Github size={24} className="opacity-40" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-2xl font-bold tracking-tight" style={{ color: colors.NEON_CYAN }}>50+</div>
                                        <div className="text-[10px] uppercase opacity-50 font-semibold mt-1">Total Projects</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-2xl font-bold tracking-tight" style={{ color: colors.TEXT_PRIMARY }}>Fullstack</div>
                                        <div className="text-[10px] uppercase opacity-50 font-semibold mt-1">Focus Stack</div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-white/5 border border-white/5">
                                    <p className="text-sm italic opacity-80 leading-relaxed">
                                        "Code is my craft, and GitHub is my canvas. Join me as I build the future of the web, one commit at a time."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Rings */}
                        <div className="absolute -inset-4 border border-cyan-500/20 rounded-[40px] -z-10 animate-pulse" />
                        <div className="absolute -inset-8 border border-white/5 rounded-[45px] -z-20 animate-pulse delay-700" />
                    </motion.div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                    <GithubCard
                        colors={colors}
                        delay={0.3}
                        icon={Code2}
                        title="Architecture"
                        description="Clean code patterns and scalable folder structures for React and Node.js applications."
                    />
                    <GithubCard
                        colors={colors}
                        delay={0.4}
                        icon={Star}
                        title="Open Source"
                        description="Contributing to the ecosystem and sharing reusable components with the community."
                    />
                    <GithubCard
                        colors={colors}
                        delay={0.5}
                        icon={GitFork}
                        title="Collaboration"
                        description="Open for collaboration on innovative projects that push the boundaries of the modern web."
                    />
                </div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20 text-center opacity-40 text-sm font-mono"
                >
                    &lt;git commit -m "pushing limits" /&gt;
                </motion.div>
            </div>
        </div>
    );
};

export default GithubGateway;
