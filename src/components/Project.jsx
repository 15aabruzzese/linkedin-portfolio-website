import { Github } from "lucide-react";
import { featuredProject } from "../data";

export default function Project() {
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
