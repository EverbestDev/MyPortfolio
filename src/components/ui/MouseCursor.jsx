import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useThemeColors } from '../../hooks/useThemeColors';

const MouseCursor = () => {
    const colors = useThemeColors();
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use MotionValues for high-performance position tracking (no re-renders)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configurations for the "Butterfly" trail effect
    // Inner dot is snappy/accurate
    const innerSpringConfig = { damping: 20, stiffness: 400 };
    const dotX = useSpring(mouseX, innerSpringConfig);
    const dotY = useSpring(mouseY, innerSpringConfig);

    // Outer trail (the "butterfly") is slower and graceful
    const trailSpringConfig = { damping: 45, stiffness: 150 };
    const trailX = useSpring(mouseX, trailSpringConfig);
    const trailY = useSpring(mouseY, trailSpringConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button';

            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
            {/* Trail (The Butterfly Effect) */}
            <motion.div
                className="absolute top-0 left-0 w-6 h-6 rounded-full"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: `radial-gradient(circle, ${colors.NEON_CYAN}40 0%, transparent 70%)`,
                    border: `1px solid ${colors.NEON_CYAN}20`,
                    scale: isHovering ? 2 : 1,
                    opacity: 0.6,
                }}
            />

            {/* Core Point (Accurate Dot) */}
            <motion.div
                className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    backgroundColor: colors.NEON_CYAN,
                    boxShadow: `0 0 12px ${colors.NEON_CYAN}, 0 0 4px white`,
                    scale: isHovering ? 0.5 : 1,
                }}
            />

            {/* Subtle Atmospheric Light (Follows Trail) */}
            <motion.div
                className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: `radial-gradient(circle, ${colors.NEON_CYAN}08 0%, transparent 70%)`,
                    filter: "blur(40px)",
                }}
            />
        </div>
    );
};

export default MouseCursor;
