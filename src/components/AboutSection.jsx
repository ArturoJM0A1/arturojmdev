import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CodeEditor from "./CodeEditor";

const aboutText = [
  "Ingeniero",
  "de",
  "software",
  "con",
  "experiencia",
  "en",
  "desarrollo",
  "web",
  "de",
  "principio",
  "a",
  "fin.",
  "He",
  "creado",
  "aplicaciones",
  "usando",
  "React,",
  "Next.js,",
  "Astro,",
  "PHP",
  "y",
  "bases",
  "de",
  "datos",
  "SQL.",
  "Tambien",
  "he",
  "trabajado",
  "en",
  "APIs,",
  "paneles",
  "administrativos,",
  "interfaces",
  "dinamicas",
  "y",
  "sistemas",
  "para",
  "mostrar",
  "datos.",
  "Me",
  "gusta",
  "el",
  "desarrollo",
  "frontend,",
  "las",
  "aplicaciones",
  "interactivas",
  "y",
  "las",
  "soluciones",
  "basadas",
  "en",
  "datos.",
];

export default function AboutSection() {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll(".word");
      gsap.from(words, {
        duration: 1,
        y: 10,
        stagger: 0.1,
        autoAlpha: 0,
        filter: "blur(10px)",
        ease: "power2.out",
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about-section" data-menu-section="true" className="about">
      <h3>Acerca de mi</h3>
      <p ref={textRef}>
        {aboutText.map((word, i) => (
          <span key={i} className="word">
            {word}{" "}
          </span>
        ))}
      </p>
      <CodeEditor />
    </section>
  );
}
