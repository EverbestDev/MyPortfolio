import React, { useEffect, useState } from "react";

export const GridBackground = ({
    className = "",
    children,
    gridSize = 25,
    gridColor = "rgba(255, 255, 255, 0.05)",
    darkGridColor = "rgba(255, 255, 255, 0.05)",
    showFade = true,
    fadeIntensity = 20,
    ...props
}) => {
    const [currentGridColor, setCurrentGridColor] = useState(gridColor);

    useEffect(() => {
        const prefersDarkMode =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDarkModeActive =
            document.documentElement.classList.contains("dark") || prefersDarkMode;
        setCurrentGridColor(isDarkModeActive ? darkGridColor : gridColor);

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "class") {
                    const updatedIsDarkModeActive =
                        document.documentElement.classList.contains("dark");
                    setCurrentGridColor(
                        updatedIsDarkModeActive ? darkGridColor : gridColor
                    );
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return function () {
            return observer.disconnect();
        };
    }, [gridColor, darkGridColor]);

    return (
        <div
            className={`relative flex w-full items-center justify-center bg-transparent ${className}`}
            {...props}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundSize: gridSize + "px " + gridSize + "px",
                    backgroundImage:
                        "linear-gradient(to right, " +
                        currentGridColor +
                        " 1px, transparent 1px), " +
                        "linear-gradient(to bottom, " +
                        currentGridColor +
                        " 1px, transparent 1px)",
                }}
            />

            {showFade && (
                <div
                    className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center translate-z-0"
                    style={{
                        background: "var(--dark-bg, #000000)",
                        maskImage:
                            "radial-gradient(ellipse at center, transparent " +
                            fadeIntensity +
                            "%, black)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, transparent " +
                            fadeIntensity +
                            "%, black)",
                    }}
                />
            )}

            <div className="relative z-10 w-full flex flex-col items-center">{children}</div>
        </div>
    );
};
