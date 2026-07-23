const experiences = [
  {
    role: "Analista Desarrollador",
    company: "INBURSA Grupo Financiero",
    period: "Abril 2026 - Junio 2026",
    location: "Pachuca de Soto, Hidalgo",
    logo: "/experienciaempresas/inbursa.png",
    logoAlt: "Logotipo de INBURSA",
    description:
      "Desarrollé y di soporte a la lógica backend en Java para el sector financiero. Estructuré el código usando una arquitectura por capas (APP → Business Logic → DAO) y empleé Hibernate para facilitar la conexión con la base de datos. Implementé y analicé operaciones de persistencia con Hibernate, HQL y Criteria API sobre Oracle. Participé en el análisis de calidad de código con Sonar. Implementación de lógica de negocio y manejo de DTO y VO. Desarrollo de interfaces utilizando ExtJS, así como validaciones en el frontend. Colaboré en servicios REST con Spring Boot, consultas PL/SQL, documentación técnica. Participación en equipos Scrum.",
    technologies: ["Java", "Hibernate", "HQL", "Criteria API", "Spring Boot", "Oracle", "PL/SQL", "ExtJS", "Sonar", "Scrum"],
  },
  {
    role: "Desarrollador Full Stack",
    company: "Independent Developer",
    period: "Julio 2025 - Febrero 2026",
    location: "Pachuca de Soto, Hidalgo",
    logo: "/experienciaempresas/independiente.png",
    logoAlt: "Logotipo de Independent Developer",
    description:
      "Desarrollo de aplicaciones web modernas utilizando JavaScript, TypeScript, React, Angular y Node.js. Diseño e implementación de interfaces responsivas enfocadas en experiencia de usuario. Consumo e integración de APIs REST. Manejo de bases de datos relacionales con MySQL, PostgreSQL y SQLite. Visualización de archivos Excel a elementos web o transformación en SQL.",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Angular",
      "Node.js",
      "Tailwind CSS",
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "REST APIs",
    ],
  },
  {
    role: "Desarrollador en PHP",
    company: "Grupo Alternativas Solucione",
    period: "Julio 2024 - Diciembre 2024",
    location: "Mineral de la Reforma, Hidalgo",
    logo: "/experienciaempresas/alternativas.png",
    logoAlt: "Logotipo de Grupo Alternativas Solucione",
    description:
      "Desarrollo web con PHP en WordPress, creación de temas, plugins y funcionalidades personalizadas. Administración de WordPress: configuración, optimización, seguridad y gestión de contenido. Mantenimiento de APIs REST en PHP con Laravel: corrección de endpoints, optimización y gestión de servicios. Mantenimiento de aplicación en React: corrección de errores, mejoras y actualización de componentes. Documentación técnica de componentes, endpoints y procesos de desarrollo. Además di mantenimiento preventivo y correctivo de servidores, instalación, ponchado y pruebas de cableado.",
    technologies: ["PHP", "WordPress", "Laravel", "React", "REST APIs"],
  },
  {
    role: "Desarrollo Web Full Stack - SECTUR",
    company: "Gobierno del Estado de Hidalgo, Secretaria de Turismo",
    period: "Diciembre 2023 - Agosto 2024",
    location: "Pachuca de Soto, Hidalgo",
    logo: "/experienciaempresas/hidalgogob.png",
    logoAlt: "Logotipo del Gobierno del Estado de Hidalgo",
    description:
      "Desarrollé una plataforma web interactiva orientada a la difusión turística del estado de Hidalgo, integrando tecnologías como JavaScript, Tailwind CSS, PHP, MySQL y Git. Integración de Google Maps API con GeoJSON, marcadores dinámicos desde MySQL, trazado de rutas con geolocalización del usuario y exploración Street View con fallback automático. Sistema de trazado de rutas, traza una línea directa en el mapa desde tu posición actual en Hidalgo hasta el marcador que seleccionaste. Implementé una interfaz moderna y responsiva, con navegación dinámica que mejora la interacción del usuario y facilita el acceso a la información. Incorporé efectos visuales y comportamientos dinámicos mediante JavaScript y jQuery, logrando una experiencia más atractiva y fluida. Optimicé la estructura y organización del sitio, mejorando la accesibilidad, el rendimiento y la experiencia general del usuario.",
    technologies: ["JavaScript", "Tailwind CSS", "PHP", "MySQL", "Git", "jQuery", "Google Maps API", "GeoJSON"],
  },
  {
    role: "Desarrollo Web Full Stack - El Mezcalito",
    company: "Terraza Mezcalito",
    period: "Enero 2023 - Abril 2023",
    location: "Tula de Allende, Hidalgo",
    logo: "/experienciaempresas/Mescalito.png",
    logoAlt: "Logotipo de El Mezcalito",
    description:
      "Desarrollo del sitio web 'El Mezcalito' con diseño adaptado a dispositivos móviles, animaciones con AOS, galería interactiva y secciones de menú, eventos y ubicación. Sistema de reservas PHP/MySQL con plano interactivo de 7 zonas. El cliente elige asistentes, fecha, hora y área, con validación en tiempo real y respuesta visual. Autenticación de sesión para administradores y gestión de estados de reserva en tiempo real. Dashboard en PHP con Bootstrap para el admin del bar, incluyendo CRUD de reservaciones, visualización por estados. Base de datos relacional normalizada (MySQL).",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Node.js", "PHP", "MySQL"],
  },
  {
    type: "volunteer",
    role: "Desarrollo web",
    company: "IEEE Student Branch, UAEH - ESTL",
    period: "Febrero 2024 - Abril 2024",
    location: "Tlahuelilpan, Hidalgo, Mexico",
    logo: "/experienciaempresas/ieeeUAEHestl.png",
    logoAlt: "Logotipo de IEEE Student Branch UAEH ESTL",
    description:
      "Colaboré en el desarrollo del sitio web de la rama estudiantil IEEE de la UAEH ESTL. Participación en proyectos de código abierto y tecnologías web modernas.",
    technologies: ["Astro", "CSS", "React", "Tailwind CSS"],
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

      <div className="experience-ready">
        <span className="experience-ready__dot"></span>
        <span className="experience-ready__text">Listo para el siguiente reto.</span>
      </div>

      <div className="experience-timeline">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className={`experience-card card${experience.type === "volunteer" ? " experience-card--volunteer" : ""}`}
          >
            {experience.type === "volunteer" && (
              <span className="experience-card__volunteer-badge">Voluntariado</span>
            )}
            <div className="experience-card__marker" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="experience-card__content">
              <div className="experience-card__top">
                <div className="experience-card__logo">
                  <img
                    src={experience.logo}
                    alt={experience.logoAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

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
