export const navigationItems = [
  { to: "/", label: "Inicio", end: true, scrollTarget: "about-section" },
  { to: "/sobre-mi", label: "Sobre mi", scrollTarget: "about-section" },
  { to: "/actualmente", label: "Actualmente", scrollTarget: "currently-section" },
  { to: "/habilidades", label: "Habilidades", scrollTarget: "skills-section" },
  { to: "/proyectos", label: "Proyectos", scrollTarget: "projects-section" },
  {
    to: "/certificaciones",
    label: "Certificaciones",
    scrollTarget: "certifications-section",
  },
  { to: "/comentarios", label: "Comentarios", scrollTarget: "comments-section" },
  { to: "/contacto", label: "Contacto", scrollTarget: "contact-section" },
];

function getScrollBehavior() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "auto";
  }

  return "smooth";
}

export function scrollToSection(scrollTarget) {
  if (!scrollTarget || typeof document === "undefined") {
    return false;
  }

  const section = document.getElementById(scrollTarget);

  if (!section) {
    return false;
  }

  section.scrollIntoView({
    behavior: getScrollBehavior(),
    block: "start",
  });

  return true;
}
