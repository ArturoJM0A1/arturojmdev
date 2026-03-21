import { useState } from "react";

const projects = [
  {
    id: "tollan-a-frame",
    title: "Piramides de Tula con A-Frame",
    year: 2023,
    date: "Trabajo escolar 2023",
    description:
      "Use A-Frame para desarrollar una experiencia de realidad virtual que permite explorar un sitio arqueologico en un entorno 3D; todas las composiciones y estructuras del escenario fueron disenadas por mi.",
    links: [
      {
        type: "external",
        href: "https://github.com/ArturoJM0A1/tollan-a-frame",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "video",
        href: "https://youtu.be/TGilgQixh2I?si=LMujicSgD7mOZh7y",
        label: "Video",
        icon: "fas fa-video",
        title: "Ver video",
      },
    ],
  },
  {
    id: "mezcalito",
    title: 'Sitio Web del bar "El Mezcalito"',
    year: 2023,
    date: "Proyecto independiente 2023",
    description:
      "Desarrolle un sitio web con PHP y Bootstrap para el bar El Mezcalito en Tula de Allende. Permite explorar el lugar, ver el menu de bebidas y comida, y realizar reservaciones.",
    links: [
      {
        type: "external",
        href: "https://github.com/ArturoJM0A1/El-Mezcalito",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "video",
        href: "https://youtu.be/f9y2C5g_qdI?si=SmKCfJytWpgOxDuN",
        label: "Video",
        icon: "fas fa-video",
        title: "Ver video",
      },
    ],
  },
  {
    id: "turismo-hidalgo",
    title: "Portal Turistico de Hidalgo",
    year: 2024,
    date: "Gobierno del Estado de Hidalgo 2024",
    description:
      "Desarrolle un sitio web en PHP para la Secretaria de Turismo de Hidalgo con noticias, eventos, calendario, mapas interactivos y filtros de navegacion para explorar actividades turisticas.",
    links: [
      {
        type: "external",
        href: "https://github.com/ArturoJM0A1/sitioturismo",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "video",
        href: "https://youtu.be/m1IHI6Xd6_Q?si=gWAS46RWUquh2xPv",
        label: "Video",
        icon: "fas fa-video",
        title: "Ver video",
      },
    ],
  },
  {
    id: "ieee",
    title: "Sitio web IEEE Student Web Hub",
    year: 2024,
    date: "Proyecto de la universidad 2024",
    description:
      "Colaboracion en portal web para la rama estudiantil usando Astro, React, CSS, JavaScript y Tailwind.",
    links: [
      {
        type: "external",
        href: "https://github.com/IEEE-ESTl/IEEE-ESTl-Student-Web-Hub",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "external",
        href: "https://ieee-estl.com/",
        label: "Visitar",
        icon: "fa-solid fa-globe",
        title: "Visitar sitio",
      },
    ],
  },
  {
    id: "recetario",
    title: "Recetario",
    year: 2024,
    date: "Proyecto independiente 2024",
    description:
      "Desarrollo de un sitio web interactivo de recetas utilizando CSS, Bootstrap y Swiper, enfocado en el frontend, que permite explorar y guardar recetas y bebidas mediante una interfaz intuitiva y una experiencia de usuario fluida.",
    links: [
      {
        type: "external",
        href: "https://github.com/ArturoJM0A1/recetarioCreativeKitchen",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "video",
        href: "https://www.youtube.com/watch?v=mogJaqrFaL8",
        label: "Video",
        icon: "fas fa-video",
        title: "Ver video",
      },
    ],
  },
  {
    id: "sig-hidalgo",
    title: "Aplicacion de Mapas Personalizados (SIG Hidalgo)",
    year: 2025,
    date: "Articulo y App 2025",
    description:
      "App SIG de mapas del estado de Hidalgo con React Native, usando JSON y GeoJSON para visualizar datos de poblacion y vivienda del INEGI. Permite consultar informacion regional de forma clara y detallada.",
    favorite: true,
    links: [
      {
        type: "external",
        href: "https://ciencialatina.org/index.php/cienciala/article/view/19604/28102",
        label: "Articulo",
        icon: "fas fa-book",
        title: "Ver articulo",
      },
      {
        type: "external",
        href: "https://github.com/ArturoJM0A1/HidalgoHorizon",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "video",
        href: "https://youtu.be/avluPyj1kDg?si=-0tT1EwEOKFTSiDX",
        label: "Video",
        icon: "fas fa-video",
        title: "Ver video",
      },
    ],
  },
  {
    id: "chat-ia-local",
    title: "Chat con IA Local (Ollama + Next.js)",
    year: 2026,
    date: "Aplicacion Web Full Stack 2026",
    description:
      "Chat local de IA con Next.js, integrado con Ollama para ejecutar llama3.2:1b. Incluye API propia, manejo de estado en React y diseno responsive con Tailwind CSS.",
    links: [
      {
        type: "external",
        href: "https://github.com/ArturoJM0A1/chatbotollama",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "video",
        href: "https://youtu.be/xPE52ITnEyg?si=S0bAwIU81MfOBqzl",
        label: "Video",
        icon: "fas fa-video",
        title: "Ver video",
      },
    ],
  },
  {
    id: "refrescos",
    title: "Aplicacion de Venta de Refrescos",
    year: 2026,
    date: "Aplicacion Web 2026",
    description:
      "Aplicacion web de venta de refrescos con Next.js, React y Prisma (ORM), con vista publica de productos y panel administrativo para actualizar precios mediante una API.",
    links: [
      {
        type: "external",
        href: "https://github.com/ArturoJM0A1/Refrescos-Coca-Cola",
        label: "Repo",
        icon: "fab fa-github",
        title: "Ver repositorio",
      },
      {
        type: "video",
        href: "https://youtu.be/1EkZTsWl7dA?si=s317CxD1qWQmy6qU",
        label: "Video",
        icon: "fas fa-video",
        title: "Ver video",
      },
    ],
  },
  {
    id: "gastos",
    title: "Sistema de gestion de gastos personales",
    year: 2026,
    date: "Aplicacion Web 2026",
    description: "Usando Astro y PostgreSQL, en desarrollo...",
    inDevelopment: true,
    links: [],
  },
];

export default function ProjectsSection({ onOpenVideo, theme }) {
  const [projectOrder, setProjectOrder] = useState("asc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const projectSortTheme = theme === "dark" ? "oscuro" : "claro";

  const visibleProjects = projects.filter(
    (project) => !showFavoritesOnly || project.favorite,
  );

  const orderedProjects = [...visibleProjects].sort((firstProject, secondProject) => {
    const yearDifference =
      projectOrder === "asc"
        ? firstProject.year - secondProject.year
        : secondProject.year - firstProject.year;

    if (yearDifference !== 0) {
      return yearDifference;
    }

    return firstProject.title.localeCompare(secondProject.title, "es", {
      sensitivity: "base",
    });
  });

  return (
    <section className="projects">
      <h3>Mis proyectos</h3>

      <div className="projects-controls">
        <button
          type="button"
          className={`projects-sort-btn projects-sort-btn--${projectSortTheme}`}
          onClick={() =>
            setProjectOrder((previousOrder) =>
              previousOrder === "asc" ? "desc" : "asc",
            )
          }
          title="Ordenar proyectos por año"
        >
          {projectOrder === "asc" ? "Año ascendente " : "Año descendente "}
          <i
            className={`fas fa-arrow-${projectOrder === "asc" ? "up" : "down"}`}
          ></i>
        </button>

        <button
          type="button"
          className={`projects-favorites-btn projects-sort-btn--${projectSortTheme} ${showFavoritesOnly ? "is-active" : ""}`}
          onClick={() => setShowFavoritesOnly((previous) => !previous)}
          title={
            showFavoritesOnly
              ? "Mostrar todos los proyectos"
              : "Mostrar solo favoritos"
          }
        >
          Favoritos <div className="verFav"></div>
        </button>
      </div>

        <div className="projects-list">
        {orderedProjects.map((project) => (
          <article
            key={project.id}
            className={`card${project.favorite ? " card--favorito" : ""}`}
          >
            <h4>{project.title}</h4>
            <div className="date">{project.date}</div>
            <p>{project.description}</p>

            <div className="project-links">
              {project.links.map((link) =>
                link.type === "video" ? (
                  <button
                    key={link.href}
                    type="button"
                    className="project-link project-video"
                    onClick={() => onOpenVideo(link.href, project.title)}
                    title={link.title}
                    aria-haspopup="dialog"
                  >
                    <i className={link.icon}></i> {link.label}
                  </button>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                    title={link.title}
                  >
                    <i className={link.icon}></i> {link.label}
                  </a>
                ),
              )}
            </div>

            {project.favorite && <div className="favoritos"></div>}

            {project.inDevelopment && (
              <div className="contenedorTuerca">
                <div className="Tuerca"></div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
