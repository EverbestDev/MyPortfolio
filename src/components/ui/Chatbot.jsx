import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot, HelpCircle, ChevronRight } from 'lucide-react';
import { useThemeColors } from '../../hooks/useThemeColors';

const PREDEFINED_QUESTIONS = [
    "What's your tech stack?",
    "What are you working on right now?",
    "Tell me about Entrix.",
    "Are you available for hire?",
    "How can I contact you?",
    "What's your education?"
];

// Keywords are matched as whole words/phrases; the entry with the most matches wins.
const KNOWLEDGE_BASE = {
    greeting: {
        keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
        response: "Hey! 👋 I'm Everbot. Ask me about Usamah's tech stack, current work at StreetOps and Altris, projects like Entrix, education, or how to hire him."
    },
    about: {
        keywords: ['who', 'about you', 'yourself', 'introduce', 'intro', 'everbestdev', 'usamah'],
        response: "I'm Olawoore Usamah Abidemi (EverbestDev), a Full-Stack Software Engineer with 3+ years of experience building production web platforms in TypeScript and Python. I'm a full-time remote engineer at StreetOps, CTO of Altris Product Systems, founder of Entrix, and a final-year Computer Science undergraduate at TASUED."
    },
    current: {
        keywords: ['streetops', 'gummygum', 'paige', 'streetask', 'current', 'currently', 'right now', 'job', 'role', 'working on', 'work at', 'where do you work', 'employer'],
        response: "Right now I'm a full-time remote Full-Stack Software Engineer at StreetOps (2026 – present). I'm the lead developer on GummyGum, their team-culture platform, and built 13 live team experiences on it (Sabi Quiz, Townhall, Lucky Spinner and more). I also built the backend for Paige, their research platform, plus StreetAsk and the StreetOps dashboard. Alongside that I'm CTO at Altris Product Systems."
    },
    altris: {
        keywords: ['altris', 'cto', 'afribase', 'rekora', 'lexlearn', 'lexai', 'franklin', 'company', 'lead', 'leadership'],
        response: "I'm the CTO of Altris Product Systems (2026 – present), where I set technical direction and lead the engineering team. Our products include Afribase (an open-source Firebase/Supabase alternative for Africa), Rekora (a trading-education platform with a MetaTrader 5 bridge), LexLearn (an AI-graded CBT platform for schools) and the D'Franklin Apartments booking site."
    },
    entrix: {
        keywords: ['entrix', 'ticket', 'tickets', 'ticketing', 'event', 'events', 'startup'],
        response: "Entrix is my event ticketing startup for Nigeria. Organisers sell tickets right inside WhatsApp, check guests in with QR codes, manage team roles and get paid to their bank. It's built with React, TypeScript, NestJS and Prisma on Afribase. Try it at entrix.altrisco.tech."
    },
    technologies: {
        keywords: ['tech', 'stack', 'skills', 'tools', 'technologies', 'technology', 'specialize', 'languages', 'framework', 'frameworks'],
        response: "My core stack: TypeScript, JavaScript and Python. Frontend: React, Next.js, Vue, Tailwind CSS, GSAP and Framer Motion. Backend: NestJS, Node.js/Express, FastAPI and Django REST Framework. Data: PostgreSQL (Prisma), MongoDB and Redis. Platforms: Afribase, Supabase and Firebase. Plus Stripe, Paystack, Brevo, WhatsApp Cloud API, Docker, Vercel and Render."
    },
    backend: {
        keywords: ['backend', 'nestjs', 'nest', 'node', 'nodejs', 'express', 'fastapi', 'python', 'django', 'api', 'apis', 'database', 'postgres', 'postgresql', 'mongodb', 'prisma', 'redis'],
        response: "Yes. Backend is a big part of my work. I build REST APIs with NestJS, Express, Next.js route handlers and FastAPI, model data in PostgreSQL with Prisma or in MongoDB, and handle JWT/RBAC auth, two-factor login, rate limiting, payments and transactional email. Entrix runs on NestJS + Prisma, and Paige on Express + PostgreSQL."
    },
    frontend: {
        keywords: ['frontend', 'react', 'next', 'nextjs', 'vue', 'tailwind', 'gsap', 'framer', 'animation', 'animations', 'ui', 'design'],
        response: "On the frontend I work mostly in React and Next.js (and Vue when it fits), with Tailwind CSS and shadcn/ui. I like fast, responsive, animation-rich interfaces using GSAP, Framer Motion and Lenis, like this portfolio."
    },
    projects: {
        keywords: ['project', 'projects', 'portfolio', 'built', 'clients', 'momscomfort', 'bazetwo', 'sscf', 'ili', 'examples'],
        response: "Some highlights: Entrix (WhatsApp event ticketing), GummyGum for StreetOps, Afribase and Rekora at Altris, MOMSComfort (maternal healthcare booking and store), Bazetwo Barbers (booking with Stripe), a political campaign platform, ILI-Nigeria (translation marketplace) and E-Attendance, which won 1st place at the TASUED hackathon. Scroll to the Projects section for live previews!"
    },
    experience: {
        keywords: ['experience', 'years', 'background', 'career', 'journey', 'internship', 'solace'],
        response: "I have 3+ years of experience. I started as a Software Engineer Intern at Solace IT (2023 – 2025), have done paid freelance work for clients since 2025, and in 2026 became a Full-Stack Software Engineer at StreetOps and CTO of Altris Product Systems."
    },
    education: {
        keywords: ['education', 'degree', 'study', 'student', 'university', 'school', 'tasued', 'undergrad', 'undergraduate', 'graduate', 'final year'],
        response: "I'm a final-year B.Sc. Computer Science undergraduate at Tai Solarin Federal University of Education, Ijagun (2023 – present), studying alongside full-time engineering work."
    },
    awards: {
        keywords: ['hackathon', 'hackathons', 'award', 'awards', 'won', 'win', 'prize', 'achievement', 'achievements'],
        response: "I won 1st place at the EdTech COE TASUED Hackathon v2 (2025) with E-Attendance, a geofenced attendance system with face recognition. I also placed 4th at v1 (2024) with VisionAI, an AI-powered virtual classroom."
    },
    contact: {
        keywords: ['contact', 'reach', 'email', 'get in touch', 'phone', 'whatsapp', 'call', 'linkedin', 'github'],
        response: "You can reach me via:\n\nEmail: olawooreusamahabidemi@gmail.com\nPhone/WhatsApp: +234 911 745 0722\nLinkedIn: linkedin.com/in/usamah-abidemi-198464291\nGitHub: github.com/EverbestDev\n\nOr use the contact form on this page!"
    },
    services: {
        keywords: ['services', 'offer', 'freelance', 'build for me', 'help me', 'website', 'app', 'mvp'],
        response: "I build full-stack web products end to end: SaaS platforms, booking and e-commerce sites with payments, admin dashboards, REST APIs and backends, and fast animated marketing sites. I handle architecture, database design and deployment too."
    },
    availability: {
        keywords: ['available', 'availability', 'open to', 'hire', 'hiring', 'remote', 'relocate', 'start'],
        response: "I'm open to new opportunities: freelance and contract projects, or the right full-time remote role. Reach out via the contact form, email or WhatsApp and let's talk about your timeline."
    },
    location: {
        keywords: ['location', 'where', 'based', 'nigeria', 'country', 'timezone', 'time zone'],
        response: "I'm based in Nigeria (WAT, UTC+1) and work fully remotely with teams and clients across time zones."
    },
    resume: {
        keywords: ['resume', 'cv', 'download'],
        response: "Tap the \"Resume\" button in the navigation bar to view my resume online. You can download it there as a PDF or Word file."
    },
    salary: {
        keywords: ['salary', 'pay', 'cost', 'rate', 'rates', 'price', 'pricing', 'charge', 'budget'],
        response: "My rates depend on the project scope and complexity. For freelance work I usually give a fixed-price quote; for full-time roles I'm happy to discuss a package. Let's get in touch to talk details!"
    },
    approach: {
        keywords: ['approach', 'methodology', 'process', 'how do you work', 'workflow'],
        response: "I own products end to end: understand the business goal, design the architecture and data model, build clean, maintainable code with a polished UI, then ship and iterate. I care a lot about performance, security and code that's easy for a team to change."
    },
    hobbies: {
        keywords: ['hobbies', 'hobby', 'free time', 'fun', 'like to do'],
        response: "Outside work I mentor other developers, join hackathons and stay active in Nigerian developer communities, usually while trying out new UI and animation ideas."
    }
};

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const Chatbot = () => {
    const colors = useThemeColors();
    const [isOpen, setIsOpen] = useState(() => {
        return localStorage.getItem('chatbot_open') === 'true';
    });
    const [showScrollTop, setShowScrollTop] = useState(false);

    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatbot_messages');
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                return parsed.map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
            } catch (e) {
                console.error("Error parsing saved messages", e);
            }
        }
        return [
            {
                type: 'bot',
                text: "Hi! I'm EverbestDev's AI assistant. How can I help you build the future today?",
                timestamp: new Date()
            }
        ];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesContainerRef = useRef(null);

    // Scroll only the message list — scrollIntoView would also scroll the page behind the chat
    useEffect(() => {
        const el = messagesContainerRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping]);

    // On open, jump straight to the latest message (no smooth scroll through history)
    useEffect(() => {
        if (!isOpen) return;
        const id = requestAnimationFrame(() => {
            const el = messagesContainerRef.current;
            if (el) el.scrollTop = el.scrollHeight;
        });
        return () => cancelAnimationFrame(id);
    }, [isOpen]);

    useEffect(() => {
        localStorage.setItem('chatbot_messages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('chatbot_open', isOpen);
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const findResponse = (question) => {
        const lowerQuestion = question.toLowerCase().replace(/[’']/g, '');

        let best = null;
        let bestScore = 0;
        for (const data of Object.values(KNOWLEDGE_BASE)) {
            const score = data.keywords.filter(keyword =>
                new RegExp(`\\b${escapeRegExp(keyword)}\\b`).test(lowerQuestion)
            ).length;
            if (score > bestScore) {
                best = data;
                bestScore = score;
            }
        }
        if (best) return best.response;

        return "I can answer questions about EverbestDev's tech stack, current work at StreetOps and Altris, projects like Entrix, education, or how to hire him. Try one of those!";
    };

    const handleSendMessage = (text) => {
        if (!text.trim()) return;

        const userMessage = {
            type: 'user',
            text: text,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = {
                type: 'bot',
                text: findResponse(text),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1200 + Math.random() * 800);
    };

    const handlePredefinedQuestion = (question) => {
        handleSendMessage(question);
    };

    return (
        <>

            <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-end gap-4 pointer-events-none">
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileHover={{ scale: 1.1, backgroundColor: colors.NEON_CYAN, color: colors.DARK_BG }}
                            whileTap={{ scale: 0.9 }}
                            onClick={scrollToTop}
                            className="p-2 rounded-lg pointer-events-auto transition-colors duration-300"
                            style={{
                                backgroundColor: `${colors.CARD_BG}e6`,
                                border: `1px solid ${colors.NEON_CYAN}40`,
                                color: colors.NEON_CYAN,
                                backdropFilter: "blur(12px)",
                                boxShadow: `0 4px 12px -4px rgba(0,0,0,0.4), 0 0 8px ${colors.NEON_CYAN}10`,
                            }}
                            aria-label="Scroll to top"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!isOpen && (
                        <div className="flex items-center gap-4 pointer-events-auto">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: 0.5 }}
                                className="px-5 py-2.5 rounded-2xl shadow-xl whitespace-nowrap flex items-center gap-3"
                                style={{
                                    backgroundColor: `${colors.CARD_BG}f2`,
                                    border: `1px solid ${colors.BORDER}40`,
                                    color: colors.TEXT_PRIMARY,
                                    backdropFilter: "blur(12px)"
                                }}
                            >
                                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-[11px] font-semibold italic opacity-90">
                                    <span className="lg:hidden">Have any question?...</span>
                                    <span className="hidden lg:inline">Everbot is online</span>
                                </p>
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsOpen(true)}
                                className="w-9 h-9 rounded-lg shadow-lg relative group overflow-hidden"
                                style={{
                                    backgroundColor: colors.NEON_CYAN,
                                    color: colors.DARK_BG,
                                    boxShadow: `0 6px 20px -6px ${colors.NEON_CYAN}60`,
                                }}
                                aria-label="Open chat"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover rounded-lg relative z-10" />
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-bounce flex items-center justify-center">
                                    <span className="text-[7px] font-bold text-white">!</span>
                                </span>
                            </motion.button>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3100]"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                            data-lenis-prevent
                            className="fixed bottom-0 right-0 md:bottom-24 md:right-8 w-full md:w-[380px] max-w-full h-[100dvh] md:h-[600px] md:max-h-[calc(100dvh-140px)] md:rounded-3xl shadow-[0_24px_80px_-15px_rgba(0,0,0,0.6)] z-[3110] flex flex-col overflow-hidden border-t md:border"
                            style={{
                                backgroundColor: `${colors.DARK_BG}f8`,
                                borderColor: `${colors.NEON_CYAN}20`,
                                backdropFilter: "blur(24px)",
                            }}
                        >

                            <div
                                className="px-5 py-3.5 flex items-center justify-between border-b relative overflow-hidden flex-shrink-0"
                                style={{
                                    backgroundColor: `${colors.SECTION_BG}80`,
                                    borderBottomColor: `${colors.NEON_CYAN}15`,
                                }}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center relative shadow-inner"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.NEON_CYAN}25, ${colors.NEON_CYAN}05)`,
                                            border: `1px solid ${colors.NEON_CYAN}20`
                                        }}
                                    >
                                        <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover rounded-xl" />
                                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 shadow-sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base tracking-tight" style={{ color: colors.TEXT_PRIMARY }}>
                                            Everbot AI
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] font-mono tracking-widest uppercase opacity-60" style={{ color: colors.TEXT_TERTIARY }}>
                                                Expert Assistant
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsOpen(false)}
                                        className="p-2.5 rounded-xl transition-colors"
                                        style={{ color: colors.TEXT_SECONDARY }}
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>
                            </div>


                            <div
                                ref={messagesContainerRef}
                                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-5 space-y-4 custom-scrollbar"
                            >
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 15, x: message.type === 'user' ? 20 : -20 }}
                                        animate={{ opacity: 1, y: 0, x: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className={`flex gap-2.5 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
                                            style={{
                                                backgroundColor: message.type === 'bot' ? `${colors.NEON_CYAN}15` : colors.CARD_BG,
                                                border: `1px solid ${message.type === 'bot' ? colors.NEON_CYAN + '20' : colors.BORDER + '30'}`
                                            }}
                                        >
                                            {message.type === 'bot' ? (
                                                <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <User size={16} style={{ color: colors.TEXT_SECONDARY }} />
                                            )}
                                        </div>
                                        <div
                                            className={`max-w-[80%] px-3.5 py-2.5 shadow-sm relative ${message.type === 'bot'
                                                ? 'rounded-2xl rounded-tl-none'
                                                : 'rounded-2xl rounded-tr-none'
                                                }`}
                                            style={{
                                                backgroundColor: message.type === 'bot' ? `${colors.CARD_BG}90` : colors.NEON_CYAN,
                                                color: message.type === 'bot' ? colors.TEXT_PRIMARY : colors.DARK_BG,
                                                border: message.type === 'bot' ? `1px solid ${colors.BORDER}40` : 'none',
                                            }}
                                        >
                                            <p className="text-[13px] leading-relaxed break-words whitespace-pre-line">
                                                {message.text}
                                            </p>
                                            <span
                                                className="text-[9px] mt-1.5 block opacity-50 font-mono text-right"
                                                style={{ color: message.type === 'bot' ? colors.TEXT_TERTIARY : colors.DARK_BG }}
                                            >
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-2.5"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse"
                                            style={{ backgroundColor: `${colors.NEON_CYAN}15` }}
                                        >
                                            <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div
                                            className="px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-inner"
                                            style={{ backgroundColor: `${colors.CARD_BG}a0`, border: `1px solid ${colors.BORDER}30` }}
                                        >
                                            {[0, 0.2, 0.4].map((delay, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{
                                                        y: [0, -6, 0],
                                                        opacity: [0.3, 1, 0.3],
                                                        scale: [1, 1.2, 1]
                                                    }}
                                                    transition={{ duration: 0.9, repeat: Infinity, delay }}
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: colors.NEON_CYAN }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>


                            {messages.length < 5 && (
                                <div className="px-4 pt-3 pb-3 flex-shrink-0 bg-gradient-to-t from-black/20 to-transparent">
                                    <div className="flex items-center gap-2 mb-2 opacity-60">
                                        <HelpCircle size={14} style={{ color: colors.NEON_CYAN }} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.TEXT_TERTIARY }}>
                                            Popular Queries
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {PREDEFINED_QUESTIONS.slice(0, 3).map((question, index) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ x: 6, backgroundColor: `${colors.NEON_CYAN}15` }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handlePredefinedQuestion(question)}
                                                className="text-[12px] px-3.5 py-2 rounded-xl border text-left flex items-center justify-between group transition-all duration-300"
                                                style={{
                                                    backgroundColor: `${colors.CARD_BG}a0`,
                                                    borderColor: `${colors.NEON_CYAN}20`,
                                                    color: colors.TEXT_SECONDARY,
                                                    backdropFilter: "blur(8px)"
                                                }}
                                            >
                                                <span className="truncate pr-4 font-medium">{question}</span>
                                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.NEON_CYAN }} />
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}


                            <div
                                className="px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t md:rounded-b-3xl relative flex-shrink-0"
                                style={{
                                    backgroundColor: `${colors.SECTION_BG}95`,
                                    borderTopColor: `${colors.NEON_CYAN}15`,
                                }}
                            >
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage(inputValue);
                                    }}
                                    className="flex gap-2.5 items-center"
                                >
                                    <div className="flex-1 relative group">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Message Everbot..."
                                            className="w-full pl-4 pr-10 py-2.5 rounded-xl border outline-none transition-all duration-500 text-base md:text-sm"
                                            style={{
                                                backgroundColor: `${colors.CARD_BG}d0`,
                                                borderColor: `${colors.BORDER}60`,
                                                color: colors.TEXT_PRIMARY,
                                                boxShadow: `0 4px 12px -2px rgba(0,0,0,0.2)`
                                            }}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse pointer-events-none" />
                                        </div>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        disabled={!inputValue.trim()}
                                        whileHover={inputValue.trim() ? { scale: 1.05, rotate: -5 } : {}}
                                        whileTap={inputValue.trim() ? { scale: 0.9 } : {}}
                                        className="p-3 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:grayscale"
                                        style={{
                                            backgroundColor: colors.NEON_CYAN,
                                            color: colors.DARK_BG,
                                            boxShadow: inputValue.trim() ? `0 8px 24px -6px ${colors.NEON_CYAN}60` : 'none'
                                        }}
                                    >
                                        <Send size={18} />
                                    </motion.button>
                                </form>
                                <p className="text-[9px] text-center mt-2 opacity-30 font-mono" style={{ color: colors.TEXT_TERTIARY }}>
                                    AI-powered assistant • Powered by EverbestDev
                                </p>
                            </div>
                        </motion.div>


                        <style>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 5px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: transparent;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: ${colors.NEON_CYAN}20;
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: ${colors.NEON_CYAN}40;
                            }
                        `}</style>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;

