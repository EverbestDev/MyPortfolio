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
            {/* Toggle Button */}
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
                            className="fixed inset-0 z-[90]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 12, scale: 0.9, filter: "blur(10px)" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                            }}
                            className="absolute top-full right-0 mt-3 p-2 rounded-2xl min-w-[150px] shadow-2l border z-[100] backdrop-blur-2xl"
                            style={{
                                backgroundColor: `${colors.CARD_BG}F0`, // Slightly more opaque for better legibility
                                borderColor: `${colors.NEON_CYAN}30`,
                                boxShadow: `0 12px 40px -8px rgba(0, 0, 0, 0.4), 0 0 20px ${colors.NEON_CYAN}15`,
                            }}
                        >
                            <div className="flex flex-col gap-1">
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
                                            className="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200"
                                            style={{
                                                backgroundColor: isActive ? `${colors.NEON_CYAN}15` : 'transparent',
                                                color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY,
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                                    style={{
                                                        backgroundColor: isActive ? `${colors.NEON_CYAN}20` : `${colors.BORDER}10`,
                                                    }}
                                                >
                                                    <Icon size={16} className={isActive ? "text-cyan-400" : "opacity-70 group-hover:opacity-100"} />
                                                </div>
                                                <span className={`text-sm font-semibold tracking-wide ${isActive ? "text-white" : "opacity-80 group-hover:opacity-100"}`}>
                                                    {themeOption.label}
                                                </span>
                                            </div>

                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                >
                                                    <Check size={14} className="text-cyan-400" />
                                                </motion.div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeToggle;
