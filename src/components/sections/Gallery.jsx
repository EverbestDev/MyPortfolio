import RollingGallery from "../effects/RollingGallery";
import React, { useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

// Sample images (replace with your own or pass as props)
function Gallery() {
  const NEON_CYAN = "#00ffff";
  const DARK_BG = "#080812";

  return (
    <div className="w-full flex items-center justify-center bg-[#080812] py-12 relative">
      <div
        className="text-white text-3xl mb-4 absolute top-4 z-10 font-bold"
        style={{
          textShadow: `0 0 8px ${NEON_CYAN}60, 0 0 16px ${NEON_CYAN}40`,
        }}
      >
        My Gallery
      </div>
      <RollingGallery autoplay={true} pauseOnHover={true} />
    </div>
  );
}
export default Gallery;
