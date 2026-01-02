import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot } from 'lucide-react';
import { useThemeColors } from '../../hooks/useThemeColors';

const PREDEFINED_QUESTIONS = [
    "What technologies do you specialize in?",
    "What's your experience with MERN stack?",
    "Can you tell me about your projects?",
    "What's your approach to web development?",
    "How can I contact you?",
    "What services do you offer?",
];

const KNOWLEDGE_BASE = {
    technologies: {
        keywords: ['tech', 'technology', 'technologies', 'stack', 'skills', 'tools', 'specialize'],
        response: "I'm a Full-Stack Software Developer specializing in Next.js, TypeScript, and the MERN stack. I also have deep experience with Python (FastAPI/Django) and modern cloud infrastructure. My focus is on building scalable, high-performance applications with exceptional UI/UX."
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
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: "Hi! I'm EverbestDev's AI assistant. Ask me anything about my skills, projects, or experience!",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const findResponse = (question) => {
        const lowerQuestion = question.toLowerCase();

        for (const [key, data] of Object.entries(KNOWLEDGE_BASE)) {
            if (data.keywords.some(keyword => lowerQuestion.includes(keyword))) {
                return data.response;
            }
        }

        return "I'm specialized in answering questions about EverbestDev's skills, experience, and projects. Try asking about technologies, projects, or how to get in touch!";
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
        }, 1000 + Math.random() * 1000);
    };

    const handlePredefinedQuestion = (question) => {
        handleSendMessage(question);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-24 right-6 z-[100] flex items-center gap-3"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
                            style={{
                                backgroundColor: colors.CARD_BG,
                                border: `1px solid ${colors.BORDER}`,
                                color: colors.TEXT_PRIMARY,
                            }}
                        >
                            <p className="text-sm font-medium">You've got questions? Ask Everbot!</p>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(true)}
                            className="p-4 rounded-full shadow-2xl"
                            style={{
                                backgroundColor: colors.NEON_CYAN,
                                color: colors.DARK_BG,
                                boxShadow: `0 0 20px ${colors.NEON_CYAN}60`,
                            }}
                            aria-label="Open chat"
                        >
                            <Bot size={28} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 100 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-120px)] h-[600px] rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden"
                            style={{
                                backgroundColor: colors.DARK_BG,
                                border: `1px solid ${colors.BORDER}`,
                                boxShadow: `0 0 40px ${colors.NEON_CYAN}20`,
                            }}
                        >
                            <div
                                className="p-4 flex items-center justify-between border-b"
                                style={{
                                    backgroundColor: colors.SECTION_BG,
                                    borderBottomColor: colors.BORDER,
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${colors.NEON_CYAN}20` }}
                                    >
                                        <Bot size={20} style={{ color: colors.NEON_CYAN }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold" style={{ color: colors.TEXT_PRIMARY }}>
                                            EverbestDev AI
                                        </h3>
                                        <p className="text-xs" style={{ color: colors.TEXT_TERTIARY }}>
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full"
                                    style={{ color: colors.TEXT_SECONDARY }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{
                                                backgroundColor: message.type === 'bot' ? `${colors.NEON_CYAN}20` : `${colors.NEON_PURPLE}20`,
                                            }}
                                        >
                                            {message.type === 'bot' ? (
                                                <Bot size={16} style={{ color: colors.NEON_CYAN }} />
                                            ) : (
                                                <User size={16} style={{ color: colors.NEON_PURPLE }} />
                                            )}
                                        </div>
                                        <div
                                            className="max-w-[70%] p-3 rounded-2xl"
                                            style={{
                                                backgroundColor: message.type === 'bot' ? colors.CARD_BG : `${colors.NEON_CYAN}20`,
                                                color: colors.TEXT_PRIMARY,
                                            }}
                                        >
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-2"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: `${colors.NEON_CYAN}20` }}
                                        >
                                            <Bot size={16} style={{ color: colors.NEON_CYAN }} />
                                        </div>
                                        <div
                                            className="p-3 rounded-2xl flex gap-1"
                                            style={{ backgroundColor: colors.CARD_BG }}
                                        >
                                            <motion.div
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: colors.NEON_CYAN }}
                                            />
                                            <motion.div
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: colors.NEON_CYAN }}
                                            />
                                            <motion.div
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: colors.NEON_CYAN }}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {messages.length === 1 && (
                                <div className="px-4 pb-2">
                                    <p className="text-xs mb-2" style={{ color: colors.TEXT_TERTIARY }}>
                                        Quick questions:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {PREDEFINED_QUESTIONS.slice(0, 3).map((question, index) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handlePredefinedQuestion(question)}
                                                className="text-xs px-3 py-1.5 rounded-full border"
                                                style={{
                                                    backgroundColor: `${colors.NEON_CYAN}10`,
                                                    borderColor: `${colors.NEON_CYAN}40`,
                                                    color: colors.NEON_CYAN,
                                                }}
                                            >
                                                {question}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div
                                className="p-4 border-t"
                                style={{
                                    backgroundColor: colors.SECTION_BG,
                                    borderTopColor: colors.BORDER,
                                }}
                            >
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage(inputValue);
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask me anything..."
                                        className="flex-1 px-4 py-2 rounded-full border outline-none"
                                        style={{
                                            backgroundColor: colors.CARD_BG,
                                            borderColor: colors.BORDER,
                                            color: colors.TEXT_PRIMARY,
                                        }}
                                    />
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-full"
                                        style={{
                                            backgroundColor: colors.NEON_CYAN,
                                            color: colors.DARK_BG,
                                        }}
                                    >
                                        <Send size={20} />
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
