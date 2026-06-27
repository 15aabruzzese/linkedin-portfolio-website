import { Code2, Container, Rocket } from "lucide-react";
import PhotoCarousel from "./PhotoCarousel";

const credentials = [
  { icon: Code2, text: "BS Computer Science, AI concentration" },
  { icon: Container, text: "Kubernetes, Docker, Helm, EKS" },
  { icon: Rocket, text: "FastAPI, TypeScript, Python, Spring Boot" }
];

export default function About() {
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
              {credentials.map(({ icon: Icon, text }) => (
                <span key={text}>
                  <Icon size={17} aria-hidden="true" />
                  {text}
                </span>
              ))}
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
