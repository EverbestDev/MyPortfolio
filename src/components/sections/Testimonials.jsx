import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, MessageSquare, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const testimonials = [
    {
        id: 1,
        name: "Amina Bello",
        role: "CEO of Zula Boutique",
        content: "EverbestDev built our Zula PWA store from the ground up. The offline shopping feature and the fluid mobile-first design have significantly boosted our sales in areas with poor network coverage. It feels just like a native app!",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&h=300&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 2,
        name: "Dr. Olumide Adeleke",
        role: "Foundation Director at SSCF",
        content: "The Digital Health Platform developed for SSCF has revolutionized how we provide medical wisdom to the sickle cell community in Nigeria. The genotype checker and video hubs are seamless, impactful, and vital resources.",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?q=80&w=300&h=300&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 3,
        name: "Olawoore Sufyan Ayemu",
        role: "CEO, ILI-Nigeria",
        content: "The Translation Hub simplified our complex interpreting workflows beyond expectations. The automated email notifications and secure file management have made our multilingual translation process 60% more efficient.",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&h=300&auto=format&fit=crop",
        rating: 5
    }
];

const Testimonials = () => {
    const colors = useThemeColors();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial();
        }, 8000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <section
            id="testimonials"
            className="py-16 sm:py-20 relative overflow-hidden"
            style={{ backgroundColor: colors.DARK_BG }}
        >


            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10">
                        <MessageSquare size={14} className="text-cyan-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Social Proof</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
                        Client <span style={{ color: colors.NEON_CYAN }}>Voices</span>
                    </h2>
                    <p className="max-w-2xl mx-auto opacity-60 text-lg">
                        Hear from the partners and clients who have collaborated with me to build exceptional digital experiences.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Mobile Navigation - Top */}
                    <div className="flex md:hidden justify-between items-center mb-6 px-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevTestimonial}
                            className="p-3 rounded-full border border-white/10 bg-white/5 text-white"
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextTestimonial}
                            className="p-3 rounded-full border border-white/10 bg-white/5 text-white"
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -50, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="p-8 md:p-12 rounded-[2rem] border relative"
                            style={{
                                backgroundColor: `${colors.CARD_BG}c0`,
                                borderColor: `${colors.BORDER}40`,
                                backdropFilter: "blur(20px)",
                                boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5)`
                            }}
                        >
                            <Quote className="absolute top-8 left-8 text-cyan-500/20" size={80} />

                            <div className="relative z-10">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-cyan-400 text-cyan-400" />
                                    ))}
                                </div>

                                <p className="text-xl md:text-2xl leading-relaxed font-medium transition-all" style={{ color: colors.TEXT_PRIMARY }}>
                                    "{testimonials[currentIndex].content}"
                                </p>

                                <div className="mt-12 flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-500/30">
                                        <img
                                            src={testimonials[currentIndex].avatar}
                                            alt={testimonials[currentIndex].name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold" style={{ color: colors.TEXT_PRIMARY }}>
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <p className="text-sm opacity-60" style={{ color: colors.TEXT_SECONDARY }}>
                                            {testimonials[currentIndex].role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>


                    <div className="hidden md:block">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: `${colors.NEON_CYAN}20` }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevTestimonial}
                            className="absolute left-[-60px] top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/10 bg-white/5 text-white transition-all shadow-xl backdrop-blur-md"
                            style={{ borderColor: `${colors.BORDER}20` }}
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: `${colors.NEON_CYAN}20` }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextTestimonial}
                            className="absolute right-[-60px] top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/10 bg-white/5 text-white transition-all shadow-xl backdrop-blur-md"
                            style={{ borderColor: `${colors.BORDER}20` }}
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </div>
                </div>


                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                                width: index === currentIndex ? '32px' : '8px',
                                backgroundColor: index === currentIndex ? colors.NEON_CYAN : `${colors.BORDER}40`
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
