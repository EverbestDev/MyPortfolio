import React, { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScrollProvider integrates Lenis for high-end inertial scrolling.
 * This gives the portfolio a premium, buttery-smooth feel similar to high-end design agencies.
 */
const SmoothScrollProvider = ({ children }) => {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Request animation frame for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        // Optional: Sync with scroll reveal animations if needed
        // lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        //   console.log({ scroll, limit, velocity, direction, progress })
        // })

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScrollProvider;
