import { ChevronRight } from "lucide-react";
import { experience } from "../data";

export default function Experience() {
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
