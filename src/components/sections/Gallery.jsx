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
        className="text-center mb-8 absolute top-10 z-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: colors.TEXT_PRIMARY }}>
          My <span style={{ color: colors.NEON_CYAN }}>Gallery</span>
        </h2>
      </div>
      <RollingGallery autoplay={true} pauseOnHover={true} />
    </div>
  );
}
export default Gallery;
