import { useState } from "react";
import { pipelineSteps } from "../data";
import { pipelineIconMap } from "../lib/iconMaps";

export default function Pipeline() {
  const [active, setActive] = useState(0);
  const activeStep = pipelineSteps[active];
  const ActiveIcon = pipelineIconMap[activeStep.icon];

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
            const Icon = pipelineIconMap[step.icon];
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
