import RollingGallery from "../effects/RollingGallery";
import { useThemeColors } from "../../hooks/useThemeColors";

function Gallery() {
  const colors = useThemeColors();

  return (
    <div
      className="w-full flex items-center justify-center py-20 relative sm:py-32"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      <div
        className="text-3xl mb-4 absolute top-10 z-10 font-extrabold tracking-tight"
        style={{
          color: colors.TEXT_PRIMARY,
          textShadow: `0 0 10px ${colors.NEON_CYAN}40`,
        }}
      >
        My Gallery
      </div>
      <RollingGallery autoplay={true} pauseOnHover={true} />
    </div>
  );
}
export default Gallery;
