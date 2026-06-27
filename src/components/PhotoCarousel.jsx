import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { photos } from "../data";

export default function PhotoCarousel() {
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
