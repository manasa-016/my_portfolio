"use client";
import { useEffect, useRef, useCallback } from "react";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Typewriter from "@/components/Typewriter";
import {
  personalInfo,
  aboutText,
  skills,
  projects,
  certifications,
  education,
} from "@/lib/portfolioData";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll(".hero .animate-in").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 120);
      });
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(
      ".section-header, .skill-category, .edu-card, .contact-card, .contact-form-wrapper, .about-text, .about-visual, .certifications, .project-card, .personal-card"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("reveal"), index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const handlers = new Map<
      HTMLElement,
      { move: (e: MouseEvent) => void; leave: () => void }
    >();
    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };
      const leave = () => {
        card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.set(card, { move, leave });
    });
    return () => {
      handlers.forEach(({ move, leave }, card) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const heroVisual = document.querySelector<HTMLElement>(".hero-visual");
      if (heroVisual)
        heroVisual.style.transform = `translateY(${window.pageYOffset * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const subject = fd.get("subject") as string;
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    const btn = form.querySelector<HTMLButtonElement>(".btn-submit");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
      btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
        form.reset();
      }, 3000);
    }
  }, []);

  return (
    <>
      <Background />
      <CustomCursor />
      <Loader />
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero" id="home" ref={heroRef}>
          <div className="hero-content">
            <div className="hero-badge animate-in">
              <span className="badge-dot"></span>
              {personalInfo.badge.toUpperCase()}
            </div>
            <h1 className="hero-title animate-in">
              <span className="hero-greeting">Hello, I&apos;m</span>
              <span className="hero-name">
                <span className="name-word gradient-text">{personalInfo.name}</span>
              </span>
            </h1>
            <Typewriter />
            <p className="hero-description animate-in">{personalInfo.tagline}</p>
            <div className="hero-education animate-in">
              <p className="hero-degree">{personalInfo.degree}</p>
              <p className="hero-college">
                <i className="fas fa-map-marker-alt"></i> {personalInfo.college}
              </p>
              <div className="hero-meta">
                <span className="meta-badge">{personalInfo.period}</span>
                <span className="meta-badge">
                  CGPA: {personalInfo.cgpa}
                </span>
              </div>
            </div>
            <div className="hero-actions animate-in">
              <a href="#projects" className="btn btn-primary btn-glow">
                <span>View My Projects</span>
                <i className="fas fa-arrow-right"></i>
              </a>
              <a
                href={personalInfo.resumePath}
                className="btn btn-outline"
                download="Manasa_M_Resume.pdf"
              >
                <span>Download Resume</span>
                <i className="fas fa-download"></i>
              </a>
            </div>
            <div className="hero-socials animate-in">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact-social-link"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="code-window hero-code-window tilt-card">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="code-filename">engineer.profile</span>
              </div>
              <div className="code-body">
                <pre>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: `<span class="code-keyword">const</span> <span class="code-class">engineer</span> = {
  <span class="code-param">name</span>: <span class="code-string">'Manasa M'</span>,
  <span class="code-param">degree</span>: <span class="code-string">'B.E. Computer Science'</span>,
  <span class="code-param">skills</span>: [<span class="code-string">'Full Stack'</span>, <span class="code-string">'AI/ML'</span>],
  <span class="code-param">passion</span>: <span class="code-string">'Building Practical Solutions'</span>
};`,
                    }}
                  />
                </pre>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-line"></div>
            <span>Scroll Down</span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about-section" id="about">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                About <span className="gradient-text">Me</span>
              </h2>
            </div>
            <div className="about-grid">
              <div className="about-text">
                {aboutText.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <div className="about-highlights">
                  <div className="highlight-card">
                    <div className="highlight-icon">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="highlight-info">
                      <h4>{personalInfo.college}</h4>
                      <p>{personalInfo.degree}</p>
                    </div>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <div className="highlight-info">
                      <h4>Full Stack Development</h4>
                      <p>Frontend, Backend &amp; AI/ML</p>
                    </div>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <div className="highlight-info">
                      <h4>Expected Graduation</h4>
                      <p>{personalInfo.graduation}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-visual">
                <div className="code-window tilt-card">
                  <div className="code-header">
                    <div className="code-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <span className="code-filename">about.py</span>
                  </div>
                  <div className="code-body">
                    <pre>
                      <code
                        dangerouslySetInnerHTML={{
                          __html: `<span class="code-keyword">class</span> <span class="code-class">Developer</span>:
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(<span class="code-param">self</span>):
        <span class="code-param">self</span>.name = <span class="code-string">"Manasa M"</span>
        <span class="code-param">self</span>.role = <span class="code-string">"Full Stack Developer"</span>
        <span class="code-param">self</span>.cgpa = <span class="code-number">8.83</span>
        <span class="code-param">self</span>.location = <span class="code-string">"Mysore, India"</span>

    <span class="code-keyword">def</span> <span class="code-func">focus</span>(<span class="code-param">self</span>):
        <span class="code-keyword">return</span> [
            <span class="code-string">"Web Development"</span>,
            <span class="code-string">"Backend APIs"</span>,
            <span class="code-string">"Generative AI"</span>
        ]`,
                        }}
                      />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section skills-section" id="skills">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Technical <span className="gradient-text">Skills</span>
              </h2>
            </div>
            <div className="skills-grid">
              {skills.map((cat, idx) => (
                <div className="skill-category tilt-card" key={idx}>
                  <div className="skill-category-header">
                    <div className="skill-icon">
                      <i className={`fas ${cat.icon}`}></i>
                    </div>
                    <h3>{cat.title}</h3>
                  </div>
                  <div className="skill-tags">
                    {cat.items.map((name) => (
                      <span className="skill-tag" key={name}>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section projects-section" id="projects">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="section-subtitle">
                Practical builds that reflect my interest in full stack development
                and AI-enabled products.
              </p>
            </div>
            <div className="projects-grid">
              {projects.map((project, idx) => (
                <div className="project-card tilt-card" key={idx}>
                  {project.image ? (
                    <div className="project-image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.image} alt={project.title} />
                    </div>
                  ) : (
                    <div className="project-image project-image-placeholder">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                  )}
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <i className="fab fa-github"></i> GitHub
                        </a>
                      ) : (
                        <span className="project-link disabled">
                          <i className="fab fa-github"></i> GitHub
                        </span>
                      )}
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <i className="fas fa-external-link-alt"></i> Live Demo
                        </a>
                      ) : (
                        <span className="project-link disabled">
                          <i className="fas fa-external-link-alt"></i> Live Demo
                        </span>
                      )}
                    </div>
                    <div className="project-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="section certifications-section" id="certifications">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Certifications <span className="gradient-text">&amp; Awards</span>
              </h2>
            </div>
            <div className="certifications">
              <div className="cert-grid">
                {certifications.map((cert, i) => (
                  <div className="cert-card tilt-card" key={i}>
                    <div className="cert-icon">
                      <i className={cert.icon}></i>
                    </div>
                    <div className="cert-info">
                      <span className="cert-name">{cert.title}</span>
                      <span className="cert-org">{cert.organization}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section education-section" id="education">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Academic <span className="gradient-text">Background</span>
              </h2>
            </div>
            <div className="education-grid education-grid-three">
              {education.map((edu, idx) => (
                <div className="edu-card tilt-card" key={idx}>
                  <div className="edu-icon">
                    <i className={`fas ${edu.icon}`}></i>
                  </div>
                  <div className="edu-content">
                    <h3>{edu.institution}</h3>
                    <p className="edu-degree">{edu.degree}</p>
                    <p className="edu-date">
                      <i className="far fa-calendar-alt"></i> {edu.period}
                    </p>
                    <div className="edu-score">
                      <span className="score-label">{edu.scoreLabel}</span>
                      <span className="score-value">{edu.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Let&apos;s <span className="gradient-text">Connect</span>
              </h2>
              <p className="section-subtitle">
                Have a project in mind or want to connect? I&apos;d love to hear
                from you.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-card tilt-card">
                  <div className="contact-icon">
                    <i className="fab fa-github"></i>
                  </div>
                  <div className="contact-detail">
                    <h4>GitHub</h4>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/manasa-016
                    </a>
                  </div>
                </div>
                <div className="contact-card tilt-card">
                  <div className="contact-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <div className="contact-detail">
                    <h4>LinkedIn</h4>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/manasa-m-73618b318
                    </a>
                  </div>
                </div>
                <div className="contact-card tilt-card">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-detail">
                    <h4>Email</h4>
                    <a href={`mailto:${personalInfo.email}`}>
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      id="formName"
                      placeholder=" "
                      required
                    />
                    <label htmlFor="formName">Your Name</label>
                    <div className="form-line"></div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="formEmail"
                      placeholder=" "
                      required
                    />
                    <label htmlFor="formEmail">Your Email</label>
                    <div className="form-line"></div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      id="formSubject"
                      placeholder=" "
                      required
                    />
                    <label htmlFor="formSubject">Subject</label>
                    <div className="form-line"></div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="formMessage"
                      rows={4}
                      placeholder=" "
                      required
                    ></textarea>
                    <label htmlFor="formMessage">Message</label>
                    <div className="form-line"></div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-submit btn-glow">
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">&lt;MM/&gt;</span>
            <p>Aspiring Full Stack Developer</p>
          </div>
          <div className="footer-center">
            <p>&copy; 2026 Manasa M. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href={`mailto:${personalInfo.email}`}>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
