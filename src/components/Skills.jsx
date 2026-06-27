import { skills } from "../data";

export default function Skills() {
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
