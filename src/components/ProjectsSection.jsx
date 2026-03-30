import { useState, useEffect } from "react";

export default function ProjectsSection({ onOpenVideo, theme }) {
  const [projects, setProjects] = useState([]);
  const [projectOrder, setProjectOrder] = useState("asc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 🔥 Cargar JSON desde /public
  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error cargando proyectos:", error));
  }, []);

  const projectSortTheme = theme === "dark" ? "oscuro" : "claro";

  const visibleProjects = projects.filter(
    (project) => !showFavoritesOnly || project.favorite
  );

  const orderedProjects = [...visibleProjects].sort(
    (firstProject, secondProject) => {
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
    }
  );

  return (
    <section
      id="projects-section"
      data-menu-section="true"
      className="projects"
    >
      <h3>Mis proyectos</h3>

      <div className="projects-controls">
        <button
          type="button"
          className={`projects-sort-btn projects-sort-btn--${projectSortTheme}`}
          onClick={() =>
            setProjectOrder((previousOrder) =>
              previousOrder === "asc" ? "desc" : "asc"
            )
          }
          title="Ordenar proyectos por Año"
        >
          {projectOrder === "asc" ? "Año ascendente " : "Año descendente "}
          <i
            className={`fas fa-arrow-${projectOrder === "asc" ? "up" : "down"}`}
          ></i>
        </button>

        <button
          type="button"
          className={`projects-favorites-btn projects-sort-btn--${projectSortTheme} ${
            showFavoritesOnly ? "is-active" : ""
          }`}
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

            <div className="relative inline-block date">
              {project.date}
              <div
                className="absolute inset-0 
                bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100
                mask-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_70%)]
                opacity-10
                pointer-events-none"
              ></div>
            </div>

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
                )
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