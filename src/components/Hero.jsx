import { CloudCog, ServerCog } from "lucide-react";
import { contact } from "../data";

const heroMetrics = [
  { value: "99+%", label: "uptime" },
  { value: "3", label: "products launched" },
  { value: "14", label: "services owned" },
  { value: "100+", label: "images built" }
];

const coreStack = ["AWS", "EKS", "Docker", "Helm", "FastAPI", "Grafana", "Harness"];

export default function Hero() {
  return (
    <header className="hero" id="top">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Andrew Abruzzese home">
          <ServerCog size={22} aria-hidden="true" />
          <span>Andrew Abruzzese</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#eks-architecture">EKS</a>
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
            {heroMetrics.map((metric) => (
              <div key={metric.label}>
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="stack-strip" aria-label="Core stack">
            {coreStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
}
