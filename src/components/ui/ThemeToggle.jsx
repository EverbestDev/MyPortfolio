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
                                        initial={{ y: '100%', opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: '100%', opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 35,
                                            mass: 0.5
                                        }}
                                        className="fixed left-0 right-0 bottom-0 rounded-t-[32px] shadow-2xl border-t border-x backdrop-blur-3xl"
                                        style={{
                                            zIndex: 10000,
                                            maxHeight: '85vh',
                                            backgroundColor: colors.SURFACE,
                                            borderColor: `${colors.BORDER}40`,
                                            boxShadow: `0 -20px 60px -15px ${colors.BACKGROUND}90, 0 0 0 1px ${colors.BORDER}20, inset 0 1px 0 0 ${colors.BORDER}15`,
                                        }}
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby="theme-modal-title"
                                        aria-describedby="theme-modal-description"
                                    >
                                        {/* Drag Indicator */}
                                        <div className="flex justify-center pt-3 pb-2">
                                            <div
                                                className="w-12 h-1.5 rounded-full transition-all"
                                                style={{
                                                    backgroundColor: `${colors.TEXT_SECONDARY}40`,
                                                }}
                                            />
                                        </div>

                                        {/* Content Container with padding */}
                                        <div className="px-6 pb-8 pt-2 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 24px)' }}>
                                            {/* Mobile Header */}
                                            <div className="mb-6 text-center">
                                                <h3
                                                    id="theme-modal-title"
                                                    className="text-xl font-bold tracking-tight mb-1.5"
                                                    style={{
                                                        color: colors.TEXT_PRIMARY,
                                                        letterSpacing: '-0.02em'
                                                    }}
                                                >
                                                    Choose Theme
                                                </h3>
                                                <p
                                                    id="theme-modal-description"
                                                    className="text-sm"
                                                    style={{
                                                        color: colors.TEXT_SECONDARY,
                                                        opacity: 0.7
                                                    }}
                                                >
                                                    Select your preferred appearance
                                                </p>
                                            </div>

                                            {/* Theme Options */}
                                            <div className="flex flex-col gap-3 mb-5">
                                                {themes.map((themeOption, index) => {
                                                    const Icon = themeOption.icon;
                                                    const isActive = theme === themeOption.name;

                                                    return (
                                                        <motion.button
                                                            key={themeOption.name}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            onClick={() => {
                                                                setTheme(themeOption.name);
                                                                setTimeout(() => setIsOpen(false), 200);
                                                            }}
                                                            className="group relative flex items-center justify-between transition-all duration-300 px-5 py-4 rounded-2xl overflow-hidden"
                                                            style={{
                                                                minHeight: '72px',
                                                                backgroundColor: isActive
                                                                    ? `${colors.NEON_CYAN}12`
                                                                    : `${colors.BACKGROUND}60`,
                                                                border: isActive
                                                                    ? `2px solid ${colors.NEON_CYAN}50`
                                                                    : `2px solid ${colors.BORDER}30`,
                                                                boxShadow: isActive
                                                                    ? `0 8px 24px -8px ${colors.NEON_CYAN}40, inset 0 1px 0 ${colors.BORDER}20`
                                                                    : `inset 0 1px 0 ${colors.BORDER}10`,
                                                            }}
                                                            whileTap={{ scale: 0.97 }}
                                                            aria-label={`${themeOption.label} theme${isActive ? ', currently selected' : ''}`}
                                                            aria-pressed={isActive}
                                                        >
                                                            {/* Gradient overlay on active */}
                                                            {isActive && (
                                                                <div
                                                                    className="absolute inset-0 opacity-30"
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${colors.NEON_CYAN}15 0%, transparent 60%)`
                                                                    }}
                                                                />
                                                            )}

                                                            <div className="flex items-center gap-4 relative z-10">
                                                                {/* Icon Container */}
                                                                <div
                                                                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                                                                    style={{
                                                                        backgroundColor: isActive
                                                                            ? `${colors.NEON_CYAN}25`
                                                                            : `${colors.BORDER}20`,
                                                                        boxShadow: isActive
                                                                            ? `0 0 20px ${colors.NEON_CYAN}25, inset 0 1px 2px ${colors.BORDER}20`
                                                                            : `inset 0 1px 2px ${colors.BACKGROUND}40`
                                                                    }}
                                                                >
                                                                    <Icon
                                                                        size={22}
                                                                        style={{
                                                                            color: isActive ? colors.NEON_CYAN : colors.TEXT_SECONDARY
                                                                        }}
                                                                        className="transition-all duration-300"
                                                                        strokeWidth={2.5}
                                                                    />
                                                                </div>

                                                                {/* Label */}
                                                                <div className="flex flex-col items-start">
                                                                    <span
                                                                        className="text-base font-bold tracking-wide transition-all duration-300"
                                                                        style={{
                                                                            letterSpacing: '-0.01em',
                                                                            color: isActive ? colors.TEXT_PRIMARY : colors.TEXT_SECONDARY
                                                                        }}
                                                                    >
                                                                        {themeOption.label}
                                                                    </span>
                                                                    {isActive && (
                                                                        <motion.span
                                                                            initial={{ opacity: 0, y: -5 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            className="text-xs font-medium mt-0.5"
                                                                            style={{ color: colors.NEON_CYAN }}
                                                                        >
                                                                            Active
                                                                        </motion.span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Check Icon */}
                                                            {isActive && (
                                                                <motion.div
                                                                    initial={{ scale: 0, rotate: -180 }}
                                                                    animate={{ scale: 1, rotate: 0 }}
                                                                    transition={{
                                                                        type: "spring",
                                                                        stiffness: 400,
                                                                        damping: 25
                                                                    }}
                                                                    className="w-8 h-8 rounded-full flex items-center justify-center relative z-10"
                                                                    style={{
                                                                        backgroundColor: colors.NEON_CYAN,
                                                                        boxShadow: `0 4px 12px ${colors.NEON_CYAN}50`
                                                                    }}
                                                                >
                                                                    <Check size={16} className="text-slate-900" strokeWidth={3} />
                                                                </motion.div>
                                                            )}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>

                                            {/* Close Button - Larger touch target */}
                                            <motion.button
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setIsOpen(false)}
                                                className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 border-2"
                                                style={{
                                                    minHeight: '56px',
                                                    backgroundColor: `${colors.BACKGROUND}60`,
                                                    borderColor: `${colors.BORDER}40`,
                                                    color: colors.TEXT_SECONDARY,
                                                    boxShadow: `inset 0 1px 0 ${colors.BORDER}10`
                                                }}
                                                aria-label="Close theme selector"
                                            >
                                                Close
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </>,
                                document.body
                            )
                        ) : (
                            // Desktop: Normal dropdown
                            <>
                                {/* Invisible backdrop for click-away */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[90]"
                                    onClick={() => setIsOpen(false)}
                                />

                                {/* Dropdown */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                        mass: 0.8
                                    }}
                                    className="absolute top-full right-0 mt-3 p-2 min-w-[150px] rounded-2xl shadow-2xl border backdrop-blur-2xl z-[100]"
                                    style={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.98)',
                                        borderColor: 'rgba(71, 85, 105, 0.3)',
                                        boxShadow: '0 12px 40px -8px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.1)',
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
                                                    className="group flex items-center justify-between transition-all duration-200 px-3 py-2.5 rounded-xl"
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
                    </>
                )}
            </AnimatePresence>
        </div >
    );
};

export default ThemeToggle;
