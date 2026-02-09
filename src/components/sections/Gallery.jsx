import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useThemeColors } from "../../hooks/useThemeColors";
import { Maximize2, Camera, Heart, Share2, X } from "lucide-react";

const images = [
  { id: 1, src: "/src/assets/gallery/gal_new_1.jpg", title: "Creative Workspace", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/src/assets/gallery/gal_new_2.jpg", title: "Digital Art", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "/src/assets/gallery/gal_new_3.jpg", title: "Minimal Setup", span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: "/src/assets/gallery/gal_new_4.jpg", title: "Abstract Flow", span: "md:col-span-1 md:row-span-2" },
  { id: 5, src: "/src/assets/gallery/gal_new_5.jpg", title: "Neon Nights", span: "md:col-span-1 md:row-span-1" },
  { id: 6, src: "/src/assets/gallery/gal_new_6.jpg", title: "Studio Session", span: "md:col-span-2 md:row-span-1" },
  { id: 7, src: "/src/assets/gallery/gal_new_7.jpg", title: "Creative Process", span: "md:col-span-1 md:row-span-1" },
  { id: 8, src: "/src/assets/gallery/gal_new_8.jpg", title: "Visual Narrative", span: "md:col-span-1 md:row-span-1" },
  { id: 9, src: "/src/assets/gallery/img9.jpg", title: "Urban Exploration", span: "md:col-span-1 md:row-span-1" },
  { id: 11, src: "/src/assets/gallery/img11.jpg", title: "Cloud Architecture", span: "md:col-span-2 md:row-span-1" },
];

const GalleryItem = ({ image, colors, index, onViewFull }) => {
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(`gallery_liked_${image.id}`);
    return saved === 'true';
  });

  const handleLike = (e) => {
    e.stopPropagation();
    const newState = !isLiked;
    setIsLiked(newState);
    localStorage.setItem(`gallery_liked_${image.id}`, newState);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareData = {
      title: image.title,
      text: `Check out this visual piece from EverbestDev's gallery: ${image.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group overflow-hidden rounded-3xl ${image.span} cursor-pointer`}
      style={{
        border: `1px solid ${colors.BORDER}40`,
        backgroundColor: colors.CARD_BG
      }}
      onClick={() => onViewFull(image)}
    >
      <motion.img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={handleLike}
              className="p-2 rounded-full backdrop-blur-md transition-colors"
              style={{
                backgroundColor: isLiked ? '#ef4444' : 'rgba(255,255,255,0.1)',
                boxShadow: isLiked ? '0 0 15px #ef444460' : 'none'
              }}
            >
              <Heart
                size={16}
                className={isLiked ? "fill-white text-white" : "text-white"}
              />
            </motion.button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-cyan-500/50 transition-colors"
            >
              <Share2 size={16} className="text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onViewFull(image); }}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-cyan-500/50 transition-colors ml-auto"
            >
              <Maximize2 size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};

function Gallery() {
  const colors = useThemeColors();
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yMove = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10">
            <Camera size={14} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Visual Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
            Creative <span style={{ color: colors.NEON_CYAN }}>Capture</span>
          </h2>
          <p className="max-w-2xl mx-auto opacity-60 text-lg">
            A curation of moments, designs, and visual experiments that fuel my creative process.
          </p>
        </motion.div>

        <motion.div
          style={{ y: yMove }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]"
        >
          {images.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              colors={colors}
              index={index}
              onViewFull={setSelectedImage}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
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
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
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
                  High Resolution Preview
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-full h-full -z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}

export default Gallery;
