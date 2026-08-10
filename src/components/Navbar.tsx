"use client";
import { useEffect, useState, useCallback } from "react";
import { personalInfo } from "@/lib/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollY = window.pageYOffset + 200;
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const id = el.getAttribute("id") || "";
        if (scrollY > top && scrollY <= top + height) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    },
    []
  );

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-logo">
          <span className="logo-text">{personalInfo.name}</span>
        </div>
        <div className="nav-links" id="navLinks">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? "active" : ""}`}
              data-section={link.id}
              onClick={(e) => handleClick(e, link.id)}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a
            href="#contact"
            className="nav-cta nav-cta-hireme"
            onClick={(e) => handleClick(e as React.MouseEvent<HTMLAnchorElement>, "contact")}
          >
            <i className="fas fa-handshake"></i> Hire Me
          </a>
          <a
            href={personalInfo.resumePath}
            className="nav-cta nav-cta-resume"
            download="Manasa_M_Resume.pdf"
          >
            <i className="fas fa-file-download"></i> Resume
          </a>
          <button
            className={`menu-toggle ${mobileOpen ? "active" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "active" : ""}`} id="mobileMenu">
        <div className="mobile-menu-links">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="mobile-link"
              onClick={(e) => handleClick(e, link.id)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-link mobile-hireme"
            onClick={(e) => { handleClick(e as React.MouseEvent<HTMLAnchorElement>, "contact"); }}
          >
            Hire Me
          </a>
          <a
            href={personalInfo.resumePath}
            className="mobile-link mobile-resume"
            download="Manasa_M_Resume.pdf"
            onClick={() => setMobileOpen(false)}
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
