import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot, HelpCircle, ChevronRight } from 'lucide-react';
import { useThemeColors } from '../../hooks/useThemeColors';

const PREDEFINED_QUESTIONS = [
    "What technologies do you specialize in?",
    "Can you tell me about your projects?",
    "What's your approach to web development?",
    "How can I contact you?",
    "What services do you offer?",
    "Tell me about your tech stack."
];

const KNOWLEDGE_BASE = {
    technologies: {
        keywords: ['tech', 'technology', 'technologies', 'stack', 'skills', 'tools', 'specialize'],
        response: "I'm a Full-Stack Software Developer specializing in Next.js, Node.js, and the MERN stack. I also have deep expertise in No-Code Development (WordPress, Bubble, Webflow, Zapier) and modern IT management tools like Jira and Postman. My focus is on blending traditional engineering with efficient automation."
    },
    experience: {
        keywords: ['mern', 'react', 'node', 'mongodb', 'express', 'experience', 'background'],
        response: "I have extensive experience with the MERN stack (MongoDB, Express, React, Node.js) and have since expanded into Next.js and Python. I've built everything from real-time chat apps and e-commerce platforms to complex data visualization dashboards and serverless APIs."
    },
    projects: {
        keywords: ['project', 'projects', 'portfolio', 'work', 'built', 'created'],
        response: "I've worked on various projects including an E-Commerce Headless Store with React and Stripe integration, a Real-time Chat App using Socket.io, and this portfolio itself featuring advanced animations with Framer Motion. Check out my Projects section to see more!"
    },
    approach: {
        keywords: ['approach', 'methodology', 'process', 'how do you', 'development process', 'workflow'],
        response: "I focus on creating clean, scalable code with excellent user experience. I believe in the design-developer hybrid approach - translating beautiful mockups into pixel-perfect, performant reality. I prioritize responsive design, accessibility, and modern best practices."
    },
    contact: {
        keywords: ['contact', 'reach', 'email', 'hire', 'available', 'get in touch', 'phone', 'whatsapp', 'call', 'message'],
        response: "You can reach me via:\n\nEmail: EverbestDev@gmail.com\nPhone/WhatsApp: +234 911 745 0722\nLinkedIn: linkedin.com/in/everbest-studios-198464291\nGitHub: github.com/EverbestDev\n\nFeel free to use the contact form on this page or reach out directly!"
    },
    services: {
        keywords: ['services', 'offer', 'do', 'help', 'hire', 'freelance', 'work'],
        response: "I offer full-stack web development services including custom web applications, e-commerce solutions, API development, database design, and UI/UX implementation. I can help bring your digital ideas to life with modern, scalable solutions."
    },
    about: {
        keywords: ['who', 'about', 'yourself', 'background', 'experience', 'intro'],
        response: "I'm EverbestDev, a full-stack developer specializing in MERN & MEVM stacks. I'm passionate about creating exceptional digital experiences that blend clean design with robust, scalable code. I thrive as a design-developer hybrid, focusing on both aesthetics and functionality."
    },
    location: {
        keywords: ['location', 'where', 'based', 'from', 'live', 'country'],
        response: "I'm currently based in Nigeria, working from Solace IT Solution, but I'm available for remote work globally. I've worked with clients and teams across different time zones."
    },
    education: {
        keywords: ['education', 'degree', 'study', 'university', 'college', 'learn', 'training'],
        response: "I am a self-driven developer with a strong foundation in Computer Science principles. I've completed various advanced certifications in Full-Stack Development and continuously stay updated with the latest industry standards through hands-on practice and specialized training."
    },
    resume: {
        keywords: ['resume', 'cv', 'background', 'download', 'profile'],
        response: "You can find a download link for my full resume in the 'About' section or at the bottom of the page in the Footer. If you'd like a custom version for a specific role, feel free to email me!"
    },
    hobbies: {
        keywords: ['hobbies', 'free time', 'interest', 'fun', 'like to do'],
        response: "When I'm not coding, I enjoy exploring new design trends, contributing to open-source projects, and staying active in the tech community. I'm also a fan of tech podcasts and exploring futuristic UI concepts."
    },
    salary: {
        keywords: ['salary', 'pay', 'cost', 'rate', 'price', 'charge'],
        response: "My rates vary depending on the project scope and complexity. For freelance work, I typically offer fixed-price quotes or hourly rates. For full-time roles, I'm open to discussing competitive packages based on the value I bring to the team. Let's get in touch to discuss further!"
    },
    availability: {
        keywords: ['available', 'time', 'start', 'hire', 'now'],
        response: "I'm currently open to new opportunities, whether they are freelance projects or full-time roles. Please reach out via the contact form or my WhatsApp to discuss your timeline!"
    }
};

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
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
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
        const lowerQuestion = question.toLowerCase();

        for (const [key, data] of Object.entries(KNOWLEDGE_BASE)) {
            if (data.keywords.some(keyword => lowerQuestion.includes(keyword))) {
                return data.response;
            }
        }

        return "I'm specialized in answering questions about EverbestDev's skills, experience, and projects. Try asking about my tech stack, current projects, or how to hire me!";
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
                                className="px-5 py-2.5 rounded-2xl shadow-xl whitespace-nowrap hidden lg:flex items-center gap-3"
                                style={{
                                    backgroundColor: `${colors.CARD_BG}f2`,
                                    border: `1px solid ${colors.BORDER}40`,
                                    color: colors.TEXT_PRIMARY,
                                    backdropFilter: "blur(12px)"
                                }}
                            >
                                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-[11px] font-semibold italic opacity-90">Everbot is online</p>
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
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                            className="fixed bottom-0 right-0 md:bottom-24 md:right-8 w-full md:w-[410px] max-w-full md:max-w-md h-full md:h-[650px] md:max-h-[calc(100vh-140px)] md:rounded-3xl shadow-[0_24px_80px_-15px_rgba(0,0,0,0.6)] z-[130] flex flex-col overflow-hidden border-t md:border"
                            style={{
                                backgroundColor: `${colors.DARK_BG}f8`,
                                borderColor: `${colors.NEON_CYAN}20`,
                                backdropFilter: "blur(24px)",
                            }}
                        >

                            <div
                                className="px-6 py-5 flex items-center justify-between border-b relative overflow-hidden"
                                style={{
                                    backgroundColor: `${colors.SECTION_BG}80`,
                                    borderBottomColor: `${colors.NEON_CYAN}15`,
                                }}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center relative shadow-inner"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.NEON_CYAN}25, ${colors.NEON_CYAN}05)`,
                                            border: `1px solid ${colors.NEON_CYAN}20`
                                        }}
                                    >
                                        <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover rounded-xl" />
                                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 shadow-sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg tracking-tight" style={{ color: colors.TEXT_PRIMARY }}>
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
                                        <X size={22} />
                                    </motion.button>
                                </div>
                            </div>


                            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 custom-scrollbar">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 15, x: message.type === 'user' ? 20 : -20 }}
                                        animate={{ opacity: 1, y: 0, x: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                                            style={{
                                                backgroundColor: message.type === 'bot' ? `${colors.NEON_CYAN}15` : colors.CARD_BG,
                                                border: `1px solid ${message.type === 'bot' ? colors.NEON_CYAN + '20' : colors.BORDER + '30'}`
                                            }}
                                        >
                                            {message.type === 'bot' ? (
                                                <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <User size={18} style={{ color: colors.TEXT_SECONDARY }} />
                                            )}
                                        </div>
                                        <div
                                            className={`max-w-[82%] px-4 py-3 shadow-sm relative ${message.type === 'bot'
                                                ? 'rounded-2xl rounded-tl-none'
                                                : 'rounded-2xl rounded-tr-none'
                                                }`}
                                            style={{
                                                backgroundColor: message.type === 'bot' ? `${colors.CARD_BG}90` : colors.NEON_CYAN,
                                                color: message.type === 'bot' ? colors.TEXT_PRIMARY : colors.DARK_BG,
                                                border: message.type === 'bot' ? `1px solid ${colors.BORDER}40` : 'none',
                                            }}
                                        >
                                            <p className="text-[14.5px] leading-relaxed font-medium">
                                                {message.text}
                                            </p>
                                            <span
                                                className="text-[9px] mt-2 block opacity-50 font-mono text-right"
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
                                        className="flex gap-3"
                                    >
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse"
                                            style={{ backgroundColor: `${colors.NEON_CYAN}15` }}
                                        >
                                            <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div
                                            className="px-5 py-3.5 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-inner"
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
                                                    className="w-2.5 h-2.5 rounded-full"
                                                    style={{ backgroundColor: colors.NEON_CYAN }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} className="h-4" />
                            </div>


                            {messages.length < 5 && (
                                <div className="px-6 py-4 space-y-3 bg-gradient-to-t from-black/20 to-transparent">
                                    <div className="flex items-center gap-2 mb-2 opacity-60">
                                        <HelpCircle size={14} style={{ color: colors.NEON_CYAN }} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.TEXT_TERTIARY }}>
                                            Popular Queries
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        {PREDEFINED_QUESTIONS.slice(0, 3).map((question, index) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ x: 6, backgroundColor: `${colors.NEON_CYAN}15` }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handlePredefinedQuestion(question)}
                                                className="text-[12.5px] px-4 py-2.5 rounded-xl border text-left flex items-center justify-between group transition-all duration-300"
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
                                className="p-6 border-t md:rounded-b-3xl relative"
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
                                    className="flex gap-3 items-center"
                                >
                                    <div className="flex-1 relative group">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Message Everbot..."
                                            className="w-full pl-5 pr-12 py-3.5 rounded-2xl border outline-none transition-all duration-500 font-medium"
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
                                        className="p-4 rounded-2xl flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:grayscale"
                                        style={{
                                            backgroundColor: colors.NEON_CYAN,
                                            color: colors.DARK_BG,
                                            boxShadow: inputValue.trim() ? `0 8px 24px -6px ${colors.NEON_CYAN}60` : 'none'
                                        }}
                                    >
                                        <Send size={22} />
                                    </motion.button>
                                </form>
                                <p className="text-[9px] text-center mt-4 opacity-30 font-mono" style={{ color: colors.TEXT_TERTIARY }}>
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

