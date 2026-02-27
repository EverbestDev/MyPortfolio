import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const ThemeToggle = ({ className = "" }) => {
    const { theme, setTheme } = useTheme();
    const colors = useThemeColors();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
                        {isMobile ? (
                            // Mobile: Use portal for full-screen modal with bottom sheet
                            typeof document !== 'undefined' && ReactDOM.createPortal(
                                <>
                                    {/* Full-screen backdrop with blur */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                                        className="fixed inset-0 backdrop-blur-sm"
                                        style={{
                                            zIndex: 9999,
                                            backgroundColor: `${colors.BACKGROUND}80`
                                        }}
                                        onClick={() => setIsOpen(false)}
                                        aria-hidden="true"
                                    />

                                    {/* Bottom Sheet Modal - Slides up from bottom */}
                                    <motion.div
                                        initial={{ y: '100%' }}
                                        animate={{ y: 0 }}
                                        exit={{ y: '100%' }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 40
                                        }}
                                        className="fixed left-0 right-0 bottom-0 rounded-t-[2.5rem] border-t backdrop-blur-3xl overflow-hidden"
                                        style={{
                                            zIndex: 10000,
                                            backgroundColor: `${colors.DARK_BG}e0`,
                                            borderColor: `${colors.NEON_CYAN}20`,
                                            boxShadow: `0 -20px 40px -10px rgba(0,0,0,0.5)`,
                                        }}
                                        role="dialog"
                                        aria-modal="true"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />

                                        {/* Drag Indicator */}
                                        <div className="flex justify-center pt-4 pb-2">
                                            <div className="w-12 h-1.5 rounded-full bg-white/10" />
                                        </div>

                                        <div className="px-6 pb-10 pt-4">
                                            <div className="mb-8 text-center">
                                                <h3 className="text-xl font-bold tracking-tight mb-2" style={{ color: colors.TEXT_PRIMARY }}>
                                                    Display Mode
                                                </h3>
                                                <p className="text-sm opacity-60" style={{ color: colors.TEXT_SECONDARY }}>
                                                    Customize your visual experience
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3">
                                                {themes.map((themeOption) => {
                                                    const Icon = themeOption.icon;
                                                    const isActive = theme === themeOption.name;

                                                    return (
                                                        <motion.button
                                                            key={themeOption.name}
                                                            onClick={() => {
                                                                setTheme(themeOption.name);
                                                                setTimeout(() => setIsOpen(false), 200);
                                                            }}
                                                            className="relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 overflow-hidden group"
                                                            style={{
                                                                backgroundColor: isActive ? `${colors.NEON_CYAN}10` : `${colors.CARD_BG}80`,
                                                                border: `1px solid ${isActive ? colors.NEON_CYAN + '40' : colors.BORDER + '20'}`,
                                                            }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <div className="flex items-center gap-4 relative z-10">
                                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                                                                    style={{
                                                                        backgroundColor: isActive ? `${colors.NEON_CYAN}20` : 'transparent',
                                                                        border: `1px solid ${isActive ? colors.NEON_CYAN + '40' : 'transparent'}`
                                                                    }}
                                                                >
                                                                    <Icon size={20} style={{ color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY }} />
                                                                </div>
                                                                <span className="font-bold tracking-wide" style={{ color: isActive ? colors.TEXT_PRIMARY : colors.TEXT_SECONDARY }}>
                                                                    {themeOption.label}
                                                                </span>
                                                            </div>
                                                            {isActive && (
                                                                <div className="w-6 h-6 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: colors.NEON_CYAN }}>
                                                                    <Check size={14} className="text-black" strokeWidth={3} />
                                                                </div>
                                                            )}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                </>,
                                document.body
                            )
                        ) : (
                            // Desktop: Refined Dropdown
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[90]"
                                    onClick={() => setIsOpen(false)}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="absolute top-full right-0 mt-3 p-2 min-w-[170px] rounded-2xl border backdrop-blur-2xl z-[100] overflow-hidden"
                                    style={{
                                        backgroundColor: `${colors.CARD_BG}f5`,
                                        borderColor: `${colors.NEON_CYAN}30`,
                                        boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8), 0 0 0 1px ${colors.BORDER}10`,
                                    }}
                                >
                                    <div className="flex flex-col gap-1 relative z-10">
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
                                                    className="group flex items-center justify-between p-2.5 rounded-xl transition-all duration-200"
                                                    style={{
                                                        backgroundColor: isActive ? `${colors.NEON_CYAN}15` : 'transparent',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                                            style={{
                                                                backgroundColor: isActive ? `${colors.NEON_CYAN}20` : 'transparent'
                                                            }}
                                                        >
                                                            <Icon size={16} style={{ color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY }} />
                                                        </div>
                                                        <span className={`text-sm font-bold tracking-wide transition-colors ${isActive ? "text-white" : "opacity-60 group-hover:opacity-100"}`}
                                                            style={{ color: isActive ? colors.TEXT_PRIMARY : colors.TEXT_SECONDARY }}
                                                        >
                                                            {themeOption.label}
                                                        </span>
                                                    </div>

                                                    {isActive && (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                            <Check size={14} style={{ color: colors.NEON_CYAN }} strokeWidth={3} />
                                                        </motion.div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                                </motion.div>
                            </>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div >
    );
};

export default ThemeToggle;
