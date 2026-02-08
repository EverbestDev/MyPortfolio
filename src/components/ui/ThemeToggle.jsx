import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);

    const themes = [
        { name: 'light', icon: Sun, label: 'Light' },
        { name: 'dark', icon: Moon, label: 'Dark' },
        { name: 'system', icon: Monitor, label: 'System' },
    ];

    const currentThemeData = themes.find(t => t.name === theme) || themes[2];
    const CurrentIcon = currentThemeData.icon;

    // Get theme colors based on resolved theme
    const getColors = () => {
        if (resolvedTheme === 'light') {
            return {
                neonColor: '#0891b2', // Cyan-600 for light mode
                bgColor: '#f8fafc',
                textColor: '#0f172a',
                borderColor: '#cbd5e1',
            };
        }
        return {
            neonColor: '#00ffff',
            bgColor: '#080812',
            textColor: '#ffffff',
            borderColor: '#00ffff40',
        };
    };

    const colors = getColors();

    return (
        <div className={`relative z-[100] ${className}`}>
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

                        {/* Theme Options - Changed to dropdown instead of popup */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden shadow-2xl border z-[95]"
                            style={{
                                backgroundColor: colors.bgColor,
                                borderColor: colors.borderColor,
                                boxShadow: `0 0 20px ${colors.neonColor}30`,
                            }}
                        >
                            {themes.map((themeOption) => {
                                const Icon = themeOption.icon;
                                const isActive = theme === themeOption.name;

                                return (
                                    <motion.button
                                        key={themeOption.name}
                                        onClick={() => {
                                            setTheme(themeOption.name);
                                            setIsOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 w-full text-left transition-all duration-200"
                                        style={{
                                            backgroundColor: isActive ? `${colors.neonColor}20` : 'transparent',
                                            color: isActive ? colors.neonColor : colors.textColor,
                                        }}
                                        whileHover={{
                                            backgroundColor: `${colors.neonColor}15`,
                                            x: 4,
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Icon size={18} />
                                        <span className="font-medium text-sm whitespace-nowrap">
                                            {themeOption.label}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTheme"
                                                className="ml-auto w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: colors.neonColor,
                                                    boxShadow: `0 0 8px ${colors.neonColor}`,
                                                }}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-full backdrop-blur-md border-2 transition-all duration-300 shadow-lg"
                style={{
                    backgroundColor: `${colors.bgColor}90`,
                    borderColor: colors.neonColor,
                    color: colors.neonColor,
                    boxShadow: `0 0 15px ${colors.neonColor}40`,
                }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 25px ${colors.neonColor}60`,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
            >
                <motion.div
                    key={theme}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <CurrentIcon size={20} />
                </motion.div>
            </motion.button>
        </div>
    );
};

export default ThemeToggle;
