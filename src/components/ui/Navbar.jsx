import React, { useState, useEffect } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = ({ sections = ["home", "about", "projects", "gallery", "testimonials", "contact"] }) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      let current = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop) {
          current = section;
        }
      });

      if (current !== activeSection) {
        setActiveSection(current);
        localStorage.setItem("last_section", current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, activeSection]);


  useEffect(() => {
    const lastSection = localStorage.getItem("last_section");
    if (lastSection && lastSection !== "home") {

      setTimeout(() => {
        scrollToSection(lastSection);
      }, 500);
    }
  }, []);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      setActiveSection(section);
      localStorage.setItem("last_section", section);
    }
  };

  return (
    <>
      <DesktopNav
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <MobileNav
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
    </>
  );
};

export default Navbar;