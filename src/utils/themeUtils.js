/**
 * Utility function to create theme-aware inline styles
 * This helps components transition smoothly between themes
 */
export const getThemeStyle = (property, value, colors) => {
    const styleMap = {
        backgroundColor: value,
        color: value,
        borderColor: value,
        boxShadow: value,
        textShadow: value,
        background: value,
    };

    return { [property]: styleMap[property] };
};

/**
 * Replace color constants in a string with theme-aware colors
 */
export const replaceThemeColors = (str, colors) => {
    if (!str) return str;

    return str
        .replace(/#00ffff/gi, colors.NEON_CYAN)
        .replace(/#a855f7/gi, colors.NEON_PURPLE)
        .replace(/#080812/gi, colors.DARK_BG)
        .replace(/#060010/gi, colors.SECTION_BG)
        .replace(/#1a1a2e/gi, colors.CARD_BG);
};
