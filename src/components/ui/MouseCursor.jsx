import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useThemeColors } from '../../hooks/useThemeColors';

const MouseCursor = () => {
    const colors = useThemeColors();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mousePosition.x - 8, springConfig);
    const cursorY = useSpring(mousePosition.y - 8, springConfig);
    const dotX = useSpring(mousePosition.x - 2, springConfig);
    const dotY = useSpring(mousePosition.y - 2, springConfig);

    return (
        <>
            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[99999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    borderColor: colors.NEON_CYAN,
                    opacity: 0.5,
                    scale: isHovering ? 1.5 : 1,
                    borderWidth: isHovering ? '1px' : '2px',
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999]"
                style={{
                    x: dotX,
                    y: dotY,
                    backgroundColor: colors.NEON_CYAN,
                    boxShadow: `0 0 10px ${colors.NEON_CYAN}`,
                }}
            />
            {/* Large Glow */}
            <motion.div
                className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[-1]"
                style={{
                    x: mousePosition.x - 250,
                    y: mousePosition.y - 250,
                    background: `radial-gradient(circle, ${colors.NEON_CYAN}15 0%, transparent 70%)`,
                    filter: "blur(60px)",
                }}
            />
        </>
    );
};

export default MouseCursor;
