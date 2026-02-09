import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const ThemeToggle = ({ className = "" }) => {
    const { theme, setTheme } = useTheme();
    const colors = useThemeColors();
    const [isOpen, setIsOpen] = React.useState(false);

    const themes = [
        { name: 'light', icon: Sun, label: 'Light' },
        { name: 'dark', icon: Moon, label: 'Dark' },
        { name: 'system', icon: Monitor, label: 'System' },
    ];

    const currentThemeData = themes.find(t => t.name === theme) || themes[2];
    const CurrentIcon = currentThemeData.icon;

    return (
        <div className={`relative ${className}`}>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group"
                style={{
                    backgroundColor: `${colors.NEON_CYAN}08`,
                    border: `1px solid ${colors.NEON_CYAN}20`,
                    color: colors.TEXT_PRIMARY,
                }}
                whileHover={{
                    scale: 1.05,
                    backgroundColor: `${colors.NEON_CYAN}15`,
                    borderColor: `${colors.NEON_CYAN}40`,
                    boxShadow: `0 0 20px ${colors.NEON_CYAN}20`,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={theme}
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <CurrentIcon size={20} className="relative z-10" />
                    </motion.div>
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Theme Selection Container */}
                        <motion.div
                            initial={
                                window.innerWidth < 768
                                    ? { opacity: 0, scale: 0.9, y: 20 }
                                    : { opacity: 0, y: 12, scale: 0.9, filter: "blur(10px)" }
                            }
                            animate={
                                window.innerWidth < 768
                                    ? { opacity: 1, scale: 1, y: 0 }
                                    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                            }
                            exit={
                                window.innerWidth < 768
                                    ? { opacity: 0, scale: 0.9, y: 20 }
                                    : { opacity: 0, y: 12, scale: 0.9, filter: "blur(10px)" }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                            }}
                            className={`
                                ${window.innerWidth < 768
                                    ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[320px] p-6"
                                    : "absolute top-full right-0 mt-3 p-2 min-w-[150px]"
                                } 
                                rounded-3xl shadow-2xl border z-[160] backdrop-blur-2xl
                            `}
                            style={{
                                backgroundColor: `${colors.CARD_BG}F8`,
                                borderColor: `${colors.NEON_CYAN}30`,
                                boxShadow: `0 24px 60px -12px rgba(0, 0, 0, 0.5), 0 0 30px ${colors.NEON_CYAN}20`,
                            }}
                        >
                            {/* Mobile Header */}
                            {window.innerWidth < 768 && (
                                <div className="mb-6 text-center">
                                    <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: colors.TEXT_PRIMARY }}>
                                        Select Appearance
                                    </h3>
                                    <p className="text-sm opacity-60" style={{ color: colors.TEXT_SECONDARY }}>
                                        Choose your preferred theme
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                {themes.map((themeOption) => {
                                    const Icon = themeOption.icon;
                                    const isActive = theme === themeOption.name;

                                    return (
                                        <button
                                            key={themeOption.name}
                                            onClick={() => {
                                                setTheme(themeOption.name);
                                                setIsOpen(false);
                                            }}
                                            className="group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300"
                                            style={{
                                                backgroundColor: isActive ? `${colors.NEON_CYAN}15` : 'transparent',
                                                border: isActive ? `1px solid ${colors.NEON_CYAN}30` : '1px solid transparent',
                                                color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY,
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                                                    style={{
                                                        backgroundColor: isActive ? `${colors.NEON_CYAN}20` : `${colors.BORDER}10`,
                                                        boxShadow: isActive ? `0 0 15px ${colors.NEON_CYAN}30` : 'none'
                                                    }}
                                                >
                                                    <Icon size={18} className={isActive ? "text-cyan-400" : "opacity-70 group-hover:opacity-100"} />
                                                </div>
                                                <span className={`text-base font-bold tracking-wide transition-colors ${isActive ? "text-white" : "opacity-80 group-hover:opacity-100"}`}>
                                                    {themeOption.label}
                                                </span>
                                            </div>

                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    className="w-6 h-6 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: colors.NEON_CYAN }}
                                                >
                                                    <Check size={14} className="text-black" />
                                                </motion.div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Mobile Close Button */}
                            {window.innerWidth < 768 && (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsOpen(false)}
                                    className="mt-6 w-full py-3 rounded-2xl font-bold text-sm transition-all border"
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderColor: `${colors.BORDER}40`,
                                        color: colors.TEXT_SECONDARY
                                    }}
                                >
                                    Cancel
                                </motion.button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeToggle;
