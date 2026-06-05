const experiences = [
  {
    role: "Desarrollador Backend",
    company: "INBURSA Grupo Financiero",
    period: "Mayo 2026 - Junio 2026",
    location: "Pachuca de Soto, Hidalgo, Mexico",
    description:
      "Uso de Java en entorno financiero, implementando operaciones mediante Hibernate, HQL y Criteria, desarrollo de servicios REST con Spring Boot, trabajo con Oracle y PL/SQL, análisis de código legacy y colaboración en una arquitectura por capas orientada a negocio y persistencia, siguiendo requerimientos funcionales, documentación técnica y metodología de Scrum.",
    technologies: ["Java", "Hibernate", "HQL", "Criteria API", "Spring Boot", "Oracle", "PL/SQL", "Scrum"],
  },
  {
    role: "Desarrollador Full Stack React",
    company: "Independent Developer",
    period: "Abril 2025 - Febrero 2026",
    location: "Ciudad de Mexico, Mexico",
    description:
      "Desarrollo de aplicaciones web modernas utilizando React, TypeScript, JavaScript y Node.js. Diseno de interfaces responsivas, integracion de APIs REST y construccion de soluciones frontend y backend.",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    role: "Desarrollo en PHP y WordPress",
    company: "Grupo Alternativas Solucione",
    period: "Julio 2024 - Diciembre 2024",
    location: "Mineral de la Reforma, Hidalgo, Mexico",
    description:
      "Desarrollo web con PHP y WordPress, creacion de temas y funcionalidades personalizadas. Mantenimiento de APIs REST desarrolladas con Laravel y soporte a aplicaciones React mediante correccion de errores y actualizacion de componentes.",
    technologies: ["PHP", "WordPress", "Laravel", "React", "REST APIs"],
  },
  {
    role: "Desarrollo Web Full Stack - SECTUR",
    company: "Gobierno del Estado de Hidalgo",
    period: "Diciembre 2023 - Agosto 2024",
    location: "Pachuca de Soto, Hidalgo, Mexico",
    description:
      "Desarrollo de una plataforma web para promocion turistica del estado de Hidalgo. Implementacion de interfaces modernas, navegacion dinamica, optimizacion de rendimiento y mejoras en experiencia de usuario.",
    technologies: ["JavaScript", "Tailwind CSS", "PHP", "MySQL", "Git", "jQuery"],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      data-menu-section="true"
      className="experience-section"
      aria-labelledby="experience-title"
    >
      <div className="experience-section__header">
        <span className="experience-section__eyebrow">Trayectoria</span>
        <h3 id="experience-title">Experiencia</h3>
        <p>
          Linea de tiempo con roles donde he construido, mantenido y mejorado
          aplicaciones web y sistemas empresariales en entornos reales.
        </p>
      </div>

      <div className="experience-timeline">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className="experience-card card"
          >
            <div className="experience-card__marker" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="experience-card__content">
              <div className="experience-card__header">
                <span className="experience-card__period">
                  {experience.period}
                </span>
                <h4>{experience.role}</h4>
                <div className="experience-card__meta">
                  <span>{experience.company}</span>
                  <span>{experience.location}</span>
                </div>
              </div>

              <p className="experience-card__description">
                {experience.description}
              </p>

              <ul
                className="experience-card__technologies"
                aria-label={`Tecnologias utilizadas en ${experience.company}`}
              >
                {experience.technologies.map((technology) => (
                  <li key={technology} className="skill-chip">
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
