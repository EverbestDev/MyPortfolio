import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronUp } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

export default function Footer() {
  const colors = useThemeColors();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer
      className="w-full py-16 relative overflow-hidden"
      style={{
        backgroundColor: colors.DARK_BG,
        color: colors.TEXT_PRIMARY,
        borderTop: `1px solid ${colors.NEON_CYAN}20`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 tracking-wider flex items-center gap-2">
              <span className="text-cyan-400" style={{ color: colors.NEON_CYAN }}>Everbest</span>Dev
            </h3>
            <p className="text-sm leading-relaxed mb-6 opacity-80" style={{ color: colors.TEXT_SECONDARY }}>
              Building digital experiences that merge creativity with robust engineering. Let's create something memorable.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="https://github.com/EverbestDev" icon={Github} colors={colors} />
              <SocialIcon href="https://www.linkedin.com/in/everbest-studios-198464291" icon={Linkedin} colors={colors} />
              <SocialIcon href="mailto:EverbestDev@gmail.com" icon={Mail} colors={colors} />
              <motion.a
                href="https://wa.me/2349117450722"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors border border-transparent hover:border-cyan-500/30 bg-white/5 hover:bg-cyan-500/10 grayscale hover:grayscale-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                style={{ color: colors.TEXT_SECONDARY }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754c-1.836 0-3.633-.485-5.204-1.402l-.374-.223-3.875 1.015 1.034-3.778-.245-.39a9.66 9.66 0 01-1.477-5.147C2.5 4.545 6.64 1 11.66 1c2.43 0 4.717.946 6.438 2.668 1.72 1.722 2.66 4.008 2.66 6.439 0 5.056-4.14 8.604-9.16 8.604m10.153-12.724C19.083 2.697 15.503 1 11.66 1 5.23 1 .01 6.225.01 12.655c0 2.05.534 4.054 1.55 5.85L0 23l4.63-.122-4.63-1.212c1.71 1.03 3.67 1.577 5.7 1.577h.001c6.43 0 11.65-5.225 11.65-11.655 0-3.116-1.21-6.046-3.41-8.245z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest" style={{ color: colors.TEXT_TERTIARY }}>Navigation</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="#home" label="Home" colors={colors} />
              <FooterLink href="#about" label="About Me" colors={colors} />
              <FooterLink href="#projects" label="Projects" colors={colors} />
              <FooterLink href="/resume" label="Resume" colors={colors} isExternal />
            </ul>
          </div>

          {/* Services/Tags */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest" style={{ color: colors.TEXT_TERTIARY }}>Expertise</h4>
            <ul className="space-y-3 text-sm">
              <li className="opacity-70">Full-Stack Development</li>
              <li className="opacity-70">UI/UX Design</li>
              <li className="opacity-70">Cloud Solutions</li>
              <li className="opacity-70">Technical Writing</li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: colors.NEON_CYAN }}>Start a Project</h4>
            <p className="text-xs mb-4 opacity-70">Ready to bring your ideas to life? I'm just a click away.</p>
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-lg text-sm font-bold transition-all border"
              style={{
                borderColor: colors.NEON_CYAN,
                color: colors.NEON_CYAN,
                backgroundColor: `${colors.NEON_CYAN}05`
              }}
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex justify-center items-center text-xs opacity-60" style={{ borderColor: `${colors.BORDER}30` }}>
          <p className="font-mono">&copy; {new Date().getFullYear()} EverbestDev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ href, icon: Icon, colors }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg transition-colors border border-transparent hover:border-cyan-500/30 bg-white/5 hover:bg-cyan-500/10"
    whileHover={{ scale: 1.1, color: colors.NEON_CYAN }}
    style={{ color: colors.TEXT_SECONDARY }}
  >
    <Icon size={18} />
  </motion.a>
);

const FooterLink = ({ href, label, colors, isExternal }) => (
  <li>
    <a
      href={href}
      className="transition-colors hover:text-cyan-400 flex items-center gap-1 group"
      style={{ color: colors.TEXT_SECONDARY }}
    >
      <span className="group-hover:translate-x-1 transition-transform">{label}</span>
    </a>
  </li>
);
