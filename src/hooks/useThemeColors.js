import { useTheme } from '../contexts/ThemeContext';

export const useThemeColors = () => {
    const { resolvedTheme } = useTheme();

    const colors = {
        light: {
            NEON_CYAN: '#0891b2',
            NEON_PURPLE: '#7c3aed',
            DARK_BG: '#f8fafc',
            SECTION_BG: '#f8fafc',
            CARD_BG: '#f1f5f9',
            TEXT_PRIMARY: '#0f172a',
            TEXT_SECONDARY: '#475569',
            TEXT_TERTIARY: '#64748b',
            BORDER: '#cbd5e1',
            BORDER_ACCENT: '#0891b220',
        },
        dark: {
            NEON_CYAN: '#00ffff',
            NEON_PURPLE: '#a855f7',
            DARK_BG: '#000000',
            SECTION_BG: '#000000',
            CARD_BG: '#0a0a0a',
            TEXT_PRIMARY: '#ffffff',
            TEXT_SECONDARY: '#e2e8f0',
            TEXT_TERTIARY: '#94a3b8',
            BORDER: '#334155',
            BORDER_ACCENT: '#00ffff40',
        },
    };

    return colors[resolvedTheme] || colors.dark;
};
