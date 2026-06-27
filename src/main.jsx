import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  Code2,
  Container,
  Database,
  Github,
  GitPullRequest,
  HeartPulse,
  Linkedin,
  Mail,
  MapPin,
  PackageCheck,
  Rocket,
  ServerCog,
  ShieldCheck,
  Terminal,
  Workflow
} from "lucide-react";
import "./styles.css";
import {
  contact,
  experience,
  featuredProject,
  photos,
  pipelineSteps,
  skills
} from "./portfolioData";

const iconMap = {
  pr: GitPullRequest,
  build: Terminal,
  security: ShieldCheck,
  registry: PackageCheck,
  helm: Boxes,
  deploy: Workflow,
  eks: CloudCog,
  data: Database,
  observability: HeartPulse,
  production: CheckCircle2
};

const interactiveSelector = [
  "a",
  "button",
  ".signal-panel",
  ".timeline-card",
  ".skill-card",
  ".project-panel",
  ".pipeline-detail",
  ".pipeline-step",
  ".carousel",
  ".profile-summary",
  ".contact-links",
  ".hero-actions"
].join(",");

function BlueprintBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll(".hero, .section, .contact"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let scrollFrame = 0;
    let pointerFrame = 0;
    let lastPointerEvent = null;

    const updateScrollProgress = () => {
      scrollFrame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const requestScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScrollProgress);
    };

    const updateCursor = (event) => {
      pointerFrame = 0;
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.dataset.pointerIdle = event.target.closest(interactiveSelector) ? "true" : "false";
    };

    const requestCursorUpdate = (event) => {
      lastPointerEvent = event;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => updateCursor(lastPointerEvent));
    };

    const clearCursor = () => {
      root.dataset.pointerIdle = "true";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("blueprint-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "-11% 0px -20% 0px", threshold: 0.11 }
    );

    sections.forEach((section) => observer.observe(section));
    updateScrollProgress();
    root.dataset.pointerIdle = "true";
    root.dataset.revealReady = "true";

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    if (!prefersReducedMotion && canHover) {
      window.addEventListener("pointermove", requestCursorUpdate, { passive: true });
      window.addEventListener("pointerleave", clearCursor);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("pointermove", requestCursorUpdate);
      window.removeEventListener("pointerleave", clearCursor);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      delete root.dataset.pointerIdle;
      delete root.dataset.revealReady;
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
      root.style.removeProperty("--scroll-progress");
    };
  }, []);

  return (
    <div className="blueprint-backdrop" aria-hidden="true">
      <div className="blueprint-base" />
      <div className="blueprint-reveal" />
      <div className="blueprint-progress blueprint-progress-x" />
      <div className="blueprint-progress blueprint-progress-y" />
      <div className="blueprint-node node-a" />
      <div className="blueprint-node node-b" />
      <div className="blueprint-node node-c" />
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Andrew Abruzzese home">
          <ServerCog size={22} aria-hidden="true" />
          <span>Andrew Abruzzese</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="hero-grid compact-hero">
        <section className="hero-copy" aria-labelledby="hero-title">
          <div className="eyebrow">
            <CloudCog size={18} aria-hidden="true" />
            Platform-oriented DevOps and Software Engineer
          </div>
          <h1 id="hero-title">Cloud-native systems to production.</h1>
          <p>
            I build and operate AWS, EKS, Kubernetes, and FastAPI platforms that
            make delivery safer, observability clearer, and engineering teams
            faster.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href={`mailto:${contact.email}`}>
              Contact
            </a>
            <a className="button secondary" href={contact.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        <aside className="signal-panel hero-signal" aria-label="Technical focus">
          <div className="status-row">
            <span className="pulse" aria-hidden="true" />
            Production systems focus
          </div>
          <div className="metric-grid">
            <div>
              <span className="metric-value">99+%</span>
              <span className="metric-label">uptime</span>
            </div>
            <div>
              <span className="metric-value">3</span>
              <span className="metric-label">products launched</span>
            </div>
            <div>
              <span className="metric-value">14</span>
              <span className="metric-label">services owned</span>
            </div>
            <div>
              <span className="metric-value">100+</span>
              <span className="metric-label">images built</span>
            </div>
          </div>
          <div className="stack-strip" aria-label="Core stack">
            {["AWS", "EKS", "Docker", "Helm", "FastAPI", "Grafana", "Harness"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
}

function PhotoCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentPhoto = photos[active];

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (nextIndex) => {
    setActive((nextIndex + photos.length) % photos.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") goTo(active + 1);
    if (event.key === "ArrowLeft") goTo(active - 1);
  };

  return (
    <div
      className="carousel"
      role="region"
      aria-label="Landscape photography carousel"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <img src={currentPhoto.src} alt={currentPhoto.alt} loading="lazy" decoding="async" />
      <div className="carousel-overlay">
        <div>
          <span className="photo-count">
            {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          <h3>{currentPhoto.title}</h3>
          <p>{currentPhoto.caption}</p>
        </div>
      </div>
      <button className="icon-button previous" type="button" onClick={() => goTo(active - 1)} aria-label="Previous photo">
        <ArrowLeft size={20} aria-hidden="true" />
      </button>
      <button className="icon-button next" type="button" onClick={() => goTo(active + 1)} aria-label="Next photo">
        <ArrowRight size={20} aria-hidden="true" />
      </button>
      <div className="carousel-dots" aria-label="Photo selection">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={active === index ? "active" : ""}
            onClick={() => goTo(index)}
            aria-label={`Show ${photo.title}`}
            aria-current={active === index}
          />
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="section-heading about-heading">
        <span className="section-kicker">About Me</span>
        <h2>Creative problem solving, production discipline, and a camera roll full of perspective.</h2>
      </div>
      <div className="about-layout">
        <div className="about-copy about-text-column">
          <p>
            I am a DevOps and software engineer based in Charles Town, West Virginia.
            I like building systems that make complicated work feel calmer, clearer,
            and more repeatable for the people operating them.
          </p>
          <p>
            Outside of work, I enjoy traveling, hiking, and being a bit of an
            amateur photographer when the light is good. That same curiosity shows
            up in my engineering: I like finding the shape of a problem, spotting
            the constraints, and turning messy workflows into reliable platforms.
          </p>
          <p>
            At Marriott International, I design and operate FastAPI microservices,
            EKS-hosted platforms, Grafana observability, centralized authentication,
            and CI/CD standards across enterprise Kubernetes environments.
          </p>
          <div className="profile-summary">
            <div className="portrait-card hero-headshot about-headshot">
              <img
                src="assets/photos/optimized/andrew-sunset.jpg"
                alt="Professional portrait of Andrew Abruzzese"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="credential-list" aria-label="Professional highlights">
              <span><Code2 size={17} aria-hidden="true" /> BS Computer Science, AI concentration</span>
              <span><Container size={17} aria-hidden="true" /> Kubernetes, Docker, Helm, EKS</span>
              <span><Rocket size={17} aria-hidden="true" /> FastAPI, TypeScript, Python, Spring Boot</span>
            </div>
          </div>
        </div>
        <div className="about-carousel-wrap">
          <PhotoCarousel />
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  const [active, setActive] = useState(0);
  const activeStep = pipelineSteps[active];
  const ActiveIcon = iconMap[activeStep.icon];

  return (
    <section className="section pipeline-section" id="pipeline">
      <div className="section-heading">
        <span className="section-kicker">Interactive Architecture</span>
        <h2>Deploying an EKS microservice stack</h2>
        <p>
          Hover, focus, or tap through the release path from pull request to production readiness.
        </p>
      </div>

      <div className="pipeline-layout">
        <div className="pipeline-track" aria-label="EKS deployment pipeline">
          {pipelineSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <button
                key={step.title}
                className={`pipeline-step ${active === index ? "active" : ""}`}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className="step-number">{index + 1}</span>
                <span className="step-icon"><Icon size={22} aria-hidden="true" /></span>
                <span className="step-title">{step.title}</span>
                {index < pipelineSteps.length - 1 && <span className="connector" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <article className="pipeline-detail" aria-live="polite">
          <div className="detail-icon">
            <ActiveIcon size={28} aria-hidden="true" />
          </div>
          <span className="detail-label">Step {active + 1}</span>
          <h3>{activeStep.title}</h3>
          <p>{activeStep.detail}</p>
          <div className="detail-tags">
            {activeStep.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="section-heading">
        <span className="section-kicker">Experience</span>
        <h2>From network automation to cloud platform ownership</h2>
      </div>
      <div className="timeline">
        {experience.map((role) => (
          <article className="timeline-item" key={`${role.company}-${role.title}`}>
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-card">
              <div className="timeline-topline">
                <div>
                  <h3>{role.title}</h3>
                  <span>{role.company}</span>
                </div>
                <span className="timeline-date">{role.date}</span>
              </div>
              <p>{role.summary}</p>
              <div className="impact-list">
                {role.impact.map((item) => (
                  <span key={item}><ChevronRight size={15} aria-hidden="true" />{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <span className="section-kicker">Technical Range</span>
        <h2>Tools for building, shipping, and operating systems</h2>
      </div>
      <div className="skills-grid">
        {skills.map((group) => (
          <article className="skill-card" key={group.category}>
            <h3>{group.category}</h3>
            <div className="skill-tags">
              {group.items.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Project() {
  return (
    <section className="section project-section" id="project">
      <div className="project-panel">
        <div>
          <span className="section-kicker">Featured Project</span>
          <h2>{featuredProject.title}</h2>
          <p>{featuredProject.summary}</p>
        </div>
        <div className="project-stats">
          {featuredProject.highlights.map((highlight) => (
            <span key={highlight}><Github size={16} aria-hidden="true" />{highlight}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div>
        <span className="section-kicker">Contact</span>
        <h2>Let's build reliable cloud platforms.</h2>
      </div>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`}><Mail size={18} aria-hidden="true" />{contact.email}</a>
        <a href={contact.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden="true" />{contact.linkedin}</a>
        <span><MapPin size={18} aria-hidden="true" />{contact.location}</span>
      </div>
    </footer>
  );
}

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <BlueprintBackdrop />
      <Hero />
      <main>
        <About />
        <Pipeline />
        <Experience />
        <Skills />
        <Project />
      </main>
      <Contact />
      <div className="copyright">(c) {year} Andrew Abruzzese. Built as a static React portfolio.</div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
