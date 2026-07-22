import { Link, useOutletContext } from "react-router-dom";


const quickLinks = [
  {
    to: "/",
    title: "Recorrido",
    description: "Pantalla principal con resumen del portafolio y acceso rapido a secciones.",
    end: true,
  },
  {
    to: "/sobre-mi",
    title: "Ir a sobre mi",
    description: "Informacion personal, formacion y perfil profesional.",
  },
  {
    to: "/habilidades",
    title: "Ir a habilidades",
    description: "Habilidades tecnicas y personales reunidas en una pagina dedicada.",
  },
  {
    to: "/experiencia",
    title: "Revisar experiencia",
    description: "Linea de tiempo con roles profesionales, empresas y tecnologias utilizadas.",
  },
  {
    action: "services",
    title: "Servicios",
    description: "Hago sitios web que multiplican tus clientes y ventas.",
  },
  {
    to: "/certificaciones",
    title: "Ver certificaciones",
    description: "Recorrido visual por reconocimientos y constancias del portafolio.",
  },
  {
    to: "/proyectos",
    title: "Explorar proyectos",
    description: "Repositorios, demos y videos de trabajo academico e independiente.",
  },
  {
    to: "/actualmente",
    title: "Ver actualmente",
    description: "Vista del enfoque actual, aprendizaje en curso y objetivos presentes.",
  },
  {
    to: "/comentarios",
    title: "Abrir comentarios",
    description: "Espacio para dejar feedback o una nota directa dentro del sitio.",
  },
  {
    to: "/contacto",
    title: "Canales de contacto",
    description: "Correo, GitHub, LinkedIn y WhatsApp.",
  },
  {
    to: "https://starlightnoreturn.vercel.app",
    title: "Jugar",
    description: "Controlas un cohete, evitas obstáculos, disparas, recoges mejoras y tratas de sobrevivir",
    external: true,
  },
];

export default function HomePage() {
  const { openServicesModal } = useOutletContext();
  return (
    <div className="page-stack">
      <section className="route-overview">
        <h3>Recorrido del sitio</h3>
        <div className="quick-links-grid">
          {quickLinks.map((item) =>
            item.action ? (
              <button
                key={item.action}
                type="button"
                className="route-card"
                onClick={openServicesModal}
              >
                <span className="route-card__kicker">Ver</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </button>
            ) : item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="route-card"
              >
                <span className="route-card__kicker">Ver</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </a>
            ) : (
              <Link key={item.to} to={item.to} className="route-card">
                <span className="route-card__kicker">Ver</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}

