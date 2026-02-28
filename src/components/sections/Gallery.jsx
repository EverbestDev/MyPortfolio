import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useThemeColors } from "../../hooks/useThemeColors";
import { Camera, X, Maximize2 } from "lucide-react";
import { BorderBeam } from "../ui/BorderBeam";

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

/* -------------------------
   Utility: wrap
   ------------------------- */
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ThreeDScrollTriggerContext = React.createContext(null);

/* --------------------------
   Container that provides velocity
   -------------------------- */
export function ThreeDScrollTriggerContainer({ children, className, ...props }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <ThreeDScrollTriggerContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ThreeDScrollTriggerContext.Provider>
  );
}

/* --------------------------
   Row entry that chooses shared or local velocity
   -------------------------- */
export function ThreeDScrollTriggerRow(props) {
  const sharedVelocityFactor = useContext(ThreeDScrollTriggerContext);
  if (sharedVelocityFactor) {
    return (
      <ThreeDScrollTriggerRowImpl
        {...props}
        velocityFactor={sharedVelocityFactor}
      />
    );
  }
  return <ThreeDScrollTriggerRowLocal {...props} />;
}

function ThreeDScrollTriggerRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  ...props
}) {
  const containerRef = useRef(null);
  const [numCopies, setNumCopies] = useState(3);
  const x = useMotionValue(0);

  const prevTimeRef = useRef(null);
  const unitWidthRef = useRef(0);
  const baseXRef = useRef(0);

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const BlockContent = useMemo(() => {
    return (
      <div className="inline-flex shrink-0" style={{ contain: "paint" }}>
        {childrenArray}
      </div>
    );
  }, [childrenArray]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const block = container.querySelector(".threed-scroll-trigger-block");
    if (block) {
      unitWidthRef.current = block.scrollWidth;
      const containerWidth = container.offsetWidth;
      const needed = Math.max(3, Math.ceil(containerWidth / unitWidthRef.current) + 2);
      setNumCopies(needed);
    }
  }, [childrenArray]);

  const isInView = useInView(containerRef, { margin: "20%" });

  useAnimationFrame((time) => {
    if (!isInView) return;

    if (prevTimeRef.current == null) prevTimeRef.current = time;
    const dt = Math.max(0, (time - prevTimeRef.current) / 1000);
    prevTimeRef.current = time;

    const unitWidth = unitWidthRef.current;
    if (unitWidth <= 0) return;

    const velocity = velocityFactor.get();
    const speedMultiplier = Math.min(5, Math.abs(velocity));
    const scrollDirection = velocity >= 0 ? 1 : -1;
    const currentDirection = direction * scrollDirection;

    const pixelsPerSecond = (unitWidth * baseVelocity) / 100;
    const moveBy = currentDirection * pixelsPerSecond * (1 + speedMultiplier) * dt;

    const newX = baseXRef.current + moveBy;

    if (newX >= unitWidth) {
      baseXRef.current = newX % unitWidth;
    } else if (newX <= 0) {
      baseXRef.current = unitWidth + (newX % unitWidth);
    } else {
      baseXRef.current = newX;
    }

    x.set(baseXRef.current);
  });

  const xTransform = useTransform(x, (v) => `translate3d(${-v}px,0,0)`);

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap", className)}
      {...props}
    >
      <motion.div
        className="inline-flex will-change-transform transform-gpu"
        style={{ transform: xTransform }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "inline-flex shrink-0",
              i === 0 ? "threed-scroll-trigger-block" : ""
            )}
          >
            {BlockContent}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ThreeDScrollTriggerRowLocal(props) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <ThreeDScrollTriggerRowImpl
      {...props}
      velocityFactor={localVelocityFactor}
    />
  );
}

const GalleryCard = ({ image, colors, onOpen }) => (
  <div
    className="relative shrink-0 w-[280px] sm:w-[350px] md:w-[450px] aspect-[4/3] mx-3 sm:mx-4 rounded-2xl overflow-hidden group cursor-pointer"
    style={{
      border: `1px solid ${colors.BORDER}40`,
      backgroundColor: colors.CARD_BG
    }}
    onClick={() => onOpen(image)}
  >
    <BorderBeam size={100} duration={8} colorFrom={colors.NEON_CYAN} colorTo={colors.NEON_PURPLE} />
    <img
      src={image.src}
      alt={image.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
      <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
      <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
        <Maximize2 size={12} /> Click to examine
      </div>
    </div>
  </div>
);

const Gallery = () => {
  const colors = useThemeColors();
  const [selectedImage, setSelectedImage] = useState(null);

  const row1 = galleryImages.slice(0, 5);
  const row2 = galleryImages.slice(5, 10);

  return (
    <section
      id="gallery"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center mb-16">
        <motion.div
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
            Scroll to accelerate the neural transmission of visual data.
          </p>
        </motion.div>
      </div>

      <ThreeDScrollTriggerContainer>
        <div className="space-y-8 sm:space-y-12">
          <ThreeDScrollTriggerRow baseVelocity={-2} direction={-1}>
            {row1.map((img, idx) => (
              <GalleryCard key={idx} image={img} colors={colors} onOpen={setSelectedImage} />
            ))}
          </ThreeDScrollTriggerRow>

          <ThreeDScrollTriggerRow baseVelocity={3} direction={1}>
            {row2.map((img, idx) => (
              <GalleryCard key={idx} image={img} colors={colors} onOpen={setSelectedImage} />
            ))}
          </ThreeDScrollTriggerRow>
        </div>
      </ThreeDScrollTriggerContainer>

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
