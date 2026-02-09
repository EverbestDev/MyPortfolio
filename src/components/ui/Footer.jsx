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
