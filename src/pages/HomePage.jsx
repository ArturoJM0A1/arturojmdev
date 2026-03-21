import { Link } from "react-router-dom";
import AboutSection from "../components/AboutSection.jsx";
import EducationSection from "../components/EducationSection.jsx";
import PageIntro from "../components/PageIntro.jsx";

const quickLinks = [
  {
    to: "/proyectos",
    title: "Explorar proyectos",
    description: "Repositorios, demos y videos de trabajo academico e independiente.",
  },
  {
    to: "/certificaciones",
    title: "Ver certificaciones",
    description: "Recorrido visual por reconocimientos y constancias del portafolio.",
  },
  {
    to: "/comentarios",
    title: "Abrir comentarios",
    description: "Espacio para dejar feedback o una nota directa dentro del sitio.",
  },
  {
    to: "/contacto",
    title: "Canales de contacto",
    description: "Correo, GitHub, LinkedIn y WhatsApp en una sola vista.",
  },
];

export default function HomePage() {
  return (
    <div className="page-stack">
  

      <AboutSection />

      <section className="route-overview">
        <h3>Recorridos del sitio</h3>
        <div className="quick-links-grid">
          {quickLinks.map((item) => (
            <Link key={item.to} to={item.to} className="route-card">
              <span className="route-card__kicker">Ver</span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <EducationSection />
    </div>
  );
}
