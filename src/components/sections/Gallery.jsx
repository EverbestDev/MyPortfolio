import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeColors } from "../../hooks/useThemeColors";
import { Camera, X } from "lucide-react";

import img1 from "../../assets/gallery/gal_new_1.jpg";
import img2 from "../../assets/gallery/gal_new_2.jpg";
import img3 from "../../assets/gallery/gal_new_3.jpg";
import img4 from "../../assets/gallery/gal_new_4.jpg";
import img5 from "../../assets/gallery/gal_new_5.jpg";
import img6 from "../../assets/gallery/gal_new_6.jpg";
import img7 from "../../assets/gallery/gal_new_7.jpg";
import img8 from "../../assets/gallery/gal_new_8.jpg";
import img9 from "../../assets/gallery/img9.jpg";
import img11 from "../../assets/gallery/img11.jpg";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const galleryImages = [
  { src: img1, title: "Creative Workspace" },
  { src: img2, title: "Digital Art" },
  { src: img3, title: "Minimal Setup" },
  { src: img4, title: "Abstract Flow" },
  { src: img5, title: "Neon Nights" },
  { src: img6, title: "Studio Session" },
  { src: img7, title: "Creative Process" },
  { src: img8, title: "Visual Narrative" },
  { src: img9, title: "Urban Exploration" },
  { src: img11, title: "Cloud Architecture" },
];

const ThreeDHoverGallery = ({
  images = galleryImages.map(img => img.src),
  itemWidth = 12,
  itemHeight = 20,
  gap = 1.2,
  perspective = 50,
  hoverScale = 15,
  transitionDuration = 1.25,
  backgroundColor,
  grayscaleStrength = 1,
  brightnessLevel = 0.5,
  activeWidth = 45,
  rotationAngle = 35,
  zDepth = 10,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3000,
  className,
  style,
  onImageClick,
}) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    if (autoPlay && images.length > 0) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
      }, autoPlayDelay);
      return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
    }
    if (!autoPlay && autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, [autoPlay, autoPlayDelay, images.length]);

  const handleKeyDown = (event, index) => {
    if (!enableKeyboardNavigation) return;
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        onImageClick?.(index, images[index]);
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : images.length - 1;
        containerRef.current?.children[prevIndex]?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = index < images.length - 1 ? index + 1 : 0;
        containerRef.current?.children[nextIndex]?.focus();
        break;
    }
  };

  const getItemStyle = (index) => {
    const isActive = activeIndex === index;
    const isFocused = focusedIndex === index;
    const baseWidthPx = 10;

    return {
      width: isActive ? `${activeWidth}vw` : `calc(${itemWidth}vw + ${baseWidthPx}px)`,
      height: `calc(${itemHeight}vw + ${itemHeight}vh)`,
      backgroundImage: `url(${images[index]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: "pointer",
      filter: isActive || isFocused ? "inherit" : `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
      transform: isActive ? `translateZ(calc(${hoverScale}vw + ${hoverScale}vh))` : "none",
      transition: `transform ${transitionDuration}s cubic-bezier(.1, .7, 0, 1), filter 3s cubic-bezier(.1, .7, 0, 1), width ${transitionDuration}s cubic-bezier(.1, .7, 0, 1)`,
      willChange: "transform, filter, width",
      zIndex: isActive ? 100 : "auto",
      margin: isActive ? "0 0.45vw" : "0",
      outline: isFocused ? "2px solid #00ffff" : "none",
      outlineOffset: "2px",
      borderRadius: "1rem",
    };
  };

  return (
    <div
      className={cn("flex items-center justify-center min-h-[500px] w-full overflow-hidden", className)}
      style={style}
    >
      <div
        ref={containerRef}
        className="flex justify-center items-center w-full py-20"
        style={{
          perspective: `calc(${perspective}vw + ${perspective}vh)`,
          gap: `${gap}rem`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative will-change-transform rounded-2xl shadow-2xl border border-white/5"
            style={getItemStyle(index)}
            tabIndex={enableKeyboardNavigation ? 0 : -1}
            onClick={() => onImageClick?.(index, image)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const colors = useThemeColors();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section
      id="gallery"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10">
            <Camera size={14} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Visual Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
            Creative <span style={{ color: colors.NEON_CYAN }}>Capture</span>
          </h2>
          <p className="max-w-2xl mx-auto opacity-60 text-lg leading-relaxed">
            An immersive 3D exploration of moments, designs, and visual experiments that fuel my creative process.
          </p>
        </motion.div>

        <ThreeDHoverGallery onImageClick={(index, image) => setSelectedImage({ src: image, title: galleryImages[index].title })} />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.2)]"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <div className="flex items-center gap-2 justify-center text-cyan-400 font-mono text-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Neural Processing Complete
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
