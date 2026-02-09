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
                        {/* Backdrop - Only on Mobile */}
                        {window.innerWidth < 768 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md md:hidden"
                                onClick={() => setIsOpen(false)}
                            />
                        )}

                        {/* Desktop Backdrop - Invisible click area */}
                        {window.innerWidth >= 768 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[90] hidden md:block"
                                onClick={() => setIsOpen(false)}
                            />
                        )}

                        {/* Theme Selection Container */}
                        <motion.div
                            initial={
                                window.innerWidth < 768
                                    ? { opacity: 0, scale: 0.9, y: 20 }
                                    : { opacity: 0, y: 8, scale: 0.95 }
                            }
                            animate={
                                window.innerWidth < 768
                                    ? { opacity: 1, scale: 1, y: 0 }
                                    : { opacity: 1, y: 0, scale: 1 }
                            }
                            exit={
                                window.innerWidth < 768
                                    ? { opacity: 0, scale: 0.9, y: 20 }
                                    : { opacity: 0, y: 8, scale: 0.95 }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                mass: 0.8
                            }}
                            className={`
                                ${window.innerWidth < 768
                                    ? "fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] p-6 rounded-3xl"
                                    : "absolute top-full right-0 mt-3 p-2 min-w-[150px] rounded-2xl"
                                } 
                                shadow-2xl border z-[160] backdrop-blur-2xl
                            `}
                            style={{
                                ...(window.innerWidth < 768 ? {
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    maxHeight: 'calc(100vh - 120px)',
                                    overflowY: 'auto'
                                } : {}),
                                backgroundColor: window.innerWidth < 768 ? `${colors.CARD_BG}F8` : `${colors.CARD_BG}F0`,
                                borderColor: `${colors.NEON_CYAN}30`,
                                boxShadow: window.innerWidth < 768
                                    ? `0 24px 60px -12px rgba(0, 0, 0, 0.5), 0 0 30px ${colors.NEON_CYAN}20`
                                    : `0 12px 40px -8px rgba(0, 0, 0, 0.4), 0 0 20px ${colors.NEON_CYAN}15`,
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

                            <div className={window.innerWidth < 768 ? "flex flex-col gap-2" : "flex flex-col gap-1"}>
                                {themes.map((themeOption) => {
                                    const Icon = themeOption.icon;
                                    const isActive = theme === themeOption.name;
                                    const isMobile = window.innerWidth < 768;

                                    return (
                                        <button
                                            key={themeOption.name}
                                            onClick={() => {
                                                setTheme(themeOption.name);
                                                setIsOpen(false);
                                            }}
                                            className={`group flex items-center justify-between transition-all duration-200 ${isMobile ? "px-4 py-3.5 rounded-2xl" : "px-3 py-2.5 rounded-xl"
                                                }`}
                                            style={{
                                                backgroundColor: isActive ? `${colors.NEON_CYAN}15` : 'transparent',
                                                border: isMobile && isActive ? `1px solid ${colors.NEON_CYAN}30` : '1px solid transparent',
                                                color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY,
                                            }}
                                        >
                                            <div className={`flex items-center ${isMobile ? "gap-4" : "gap-3"}`}>
                                                <div
                                                    className={`rounded-lg flex items-center justify-center transition-colors ${isMobile ? "w-10 h-10 rounded-xl" : "w-8 h-8"
                                                        }`}
                                                    style={{
                                                        backgroundColor: isActive ? `${colors.NEON_CYAN}20` : `${colors.BORDER}10`,
                                                        boxShadow: isMobile && isActive ? `0 0 15px ${colors.NEON_CYAN}30` : 'none'
                                                    }}
                                                >
                                                    <Icon size={isMobile ? 18 : 16} className={isActive ? "text-cyan-400" : "opacity-70 group-hover:opacity-100"} />
                                                </div>
                                                <span className={`tracking-wide ${isMobile
                                                    ? "text-base font-bold"
                                                    : "text-sm font-semibold"
                                                    } ${isActive ? "text-white" : "opacity-80 group-hover:opacity-100"}`}>
                                                    {themeOption.label}
                                                </span>
                                            </div>

                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    className={isMobile ? "w-6 h-6 rounded-full flex items-center justify-center" : ""}
                                                    style={isMobile ? { backgroundColor: colors.NEON_CYAN } : {}}
                                                >
                                                    <Check size={14} className={isMobile ? "text-black" : "text-cyan-400"} />
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
        </div >
    );
};

export default ThemeToggle;
