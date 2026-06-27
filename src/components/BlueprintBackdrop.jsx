import { useEffect } from "react";

const interactiveSelector = [
  "a",
  "button",
  ".signal-panel",
  ".timeline-card",
  ".skill-card",
  ".project-panel",
  ".pipeline-detail",
  ".pipeline-step",
  ".eks-layer",
  ".eks-component",
  ".eks-node",
  ".eks-layer-tab",
  ".carousel",
  ".profile-summary",
  ".contact-links",
  ".hero-actions"
].join(",");

export default function BlueprintBackdrop() {
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
