import { useMemo } from "react";
import BlueprintBackdrop from "./components/BlueprintBackdrop";
import Hero from "./components/Hero";
import About from "./components/About";
import EksArchitecture from "./components/EksArchitecture";
import Pipeline from "./components/Pipeline";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Contact from "./components/Contact";

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <BlueprintBackdrop />
      <Hero />
      <main>
        <About />
        <EksArchitecture />
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
