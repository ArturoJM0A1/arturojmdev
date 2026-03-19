// ===== App.jsx =====
<html lang="es">
  <head>
    <meta charset="UTF-8" />
  </head>
</html>;
import { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import "./cohetegoup.css";
import profileImg from "../public/artsearch2.png";
import artavatar1 from "../public/avatar1.png";
import artavatar3 from "../public/avatar3.png";

import Particles from "./particulasfondo.jsx";

import CommentSection from "./CommentSection.jsx";

function App() {
  const [theme, setTheme] = useState("dark"); // Tema inicial oscuro
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWelcomeClosing, setIsWelcomeClosing] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Ingeniería en Software";

  // Estado para el botón cohete
  const [showRocket, setShowRocket] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  // Escuchar scroll para mostrar/ocultar el cohete
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowRocket(true);
      } else {
        setShowRocket(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace("www.", "");
      let videoId = "";

      if (host === "youtu.be") {
        videoId = parsed.pathname.split("/")[1] || "";
      } else if (host.endsWith("youtube.com")) {
        if (parsed.pathname.startsWith("/watch")) {
          videoId = parsed.searchParams.get("v") || "";
        } else if (parsed.pathname.startsWith("/embed/")) {
          videoId = parsed.pathname.split("/")[2] || "";
        } else if (parsed.pathname.startsWith("/shorts/")) {
          videoId = parsed.pathname.split("/")[2] || "";
        }
      }

      if (!videoId) return null;
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&vq=hd720&cc_load_policy=0`;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return null;
    }
  };

  const handleOpenVideo = (url, title) => {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (!embedUrl) return;
    setActiveVideo({ url: embedUrl, title });
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const handleWelcomeClose = () => {
    setIsWelcomeClosing(true);
    setTimeout(() => {
      setShowWelcome(false);
      setIsWelcomeClosing(false);
    }, 650);
  };

  useLayoutEffect(() => {
    document.body.classList.remove("dark-mode", "alt-mode");
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    }
    if (theme === "alt") {
      document.body.classList.add("alt-mode");
    }
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = showWelcome ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showWelcome]);

  useEffect(() => {
    if (!activeVideo) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  // Efecto typewriter
  useEffect(() => {
    if (showWelcome) return;

    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 123);

    return () => clearInterval(interval);
  }, [showWelcome]);

  return (
    <>
      <Particles theme={theme} />
      <div className={`theme-icon ${theme} icon-style-aesthetic-adjustment`}>
        {theme === "dark"
          ? "\u{1F319}"
          : theme === "alt"
            ? "\u{1FA90}"
            : "\u2600\uFE0F"}
      </div>

      <meta charSet="UTF-8" />
      <title>Arturo Juárez Monroy</title>

      <div className="container">
        <header className="hero">
          <div className="hero-text">
            <h1>Arturo Juárez Monroy</h1>
            <h2>{displayText}</h2>
            <div className="divider"></div>
            <a href="#about" className="btn botonhero">
              Ver mi trayectoria
            </a>
            <a
              href="/Currículum Arturo JM.pdf"
              download="Currículum Arturo JM.pdf"
              className="btn botonhero"
              style={{ marginBottom: "10px" }}
            >
              Descargar CV
            </a>
          </div>
          <div className="theme-buttons">
            <button
              className="theme-btn"
              onClick={() => setTheme("light")}
              disabled={theme === "light"}
            >
              Claro
            </button>
            <button
              className="theme-btn"
              onClick={() => setTheme("dark")}
              disabled={theme === "dark"}
            >
              Oscuro
            </button>
            <button
              className="theme-btn"
              onClick={() => setTheme("alt")}
              disabled={theme === "alt"}
            >
              Alternativo
            </button>
          </div>
        </header>

        <div className="left-column">
          <div className="profile-photo">
            <div
              className="photo-placeholder"
              style={{ backgroundImage: `url(${profileImg})` }}
            ></div>
          </div>

          <section className="contact">
            <h3>Conecta conmigo</h3>
            <p>
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <a href="mailto:juarezmonroyarturo574@gmail.com">
                juarezmonroyarturo574@gmail.com
              </a>
            </p>
            <p>
              <i className="fab fa-linkedin" aria-hidden="true"></i>
              <a
                href="https://www.linkedin.com/in/arturojuarezmonroy"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/arturojuarezmonroy
              </a>
            </p>
            <p>
              <i className="fab fa-github" aria-hidden="true"></i>
              <a
                href="https://github.com/ArturoJM0A1"
                target="_blank"
                rel="noreferrer"
              >
                ArturoJM0A1
              </a>
            </p>
            <p>
              <i className="fab fa-youtube" aria-hidden="true"></i>
              <a
                href="https://www.youtube.com/@arturojuarezmonroy3951"
                target="_blank"
                rel="noreferrer"
              >
                @arturojuarezmonroy3951
              </a>
            </p>
            <p>
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <a
                href="https://wa.me/5217736802105"
                target="_blank"
                rel="noreferrer"
              >
                +52 1 773 680 2105
              </a>
            </p>
          </section>

          <section className="skills">
            <h3>Habilidades Técnicas</h3>
            <div className="skills-row">
              <div className="skills-left">
                <div className="skill-category">
                  <h4>Lenguajes</h4>
                  <ul>
                    <li>JavaScript</li>
                    <li>Python</li>
                    <li>PHP</li>
                    <li>Java</li>
                    <li>C++ / C</li>
                    <li>SQL</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h4>Otros</h4>
                  <ul>
                    <li>MySQL Workbench</li>
                    <li>WordPress</li>
                    <li>Power Bi</li>
                    <li>Canvas</li>
                    <li>3ds Max</li>
                    <li>Unity</li>
                    <li>AutoCAD</li>
                    <li>Excel</li>
                  </ul>
                </div>
              </div>
              <div className="skills-right">
                <div className="skill-category">
                  <h4>Frameworks / Librerías</h4>
                  <ul>
                    <li>React</li>
                    <li>React Native</li>
                    <li>Astro</li>
                    <li>Next.js</li>
                    <li>Node.js</li>
                    <li>Firebase</li>
                    <li>Vue</li>
                    <li>Tailwind CSS</li>
                    <li>Bootstrap</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="skills">
            <h3>Habilidades Personales</h3>
            <ul>
              <li>Creatividad</li>
              <li>Adaptabilidad</li>
              <li>Enfoque en el detalle</li>
              <li>Compromiso con la calidad</li>
              <li>Resiliencia</li>
            </ul>
          </section>
        </div>

        <div className="right-column">
          <section className="about" id="about">
            <h3>Acerca de mí</h3>
            <p>
              Ingeniero de software con experiencia en desarrollo web de
              principio a fin. He creado aplicaciones usando React, Next.js,
              Astro, PHP y bases de datos SQL.También he trabajado en APIs,
              paneles administrativos, interfaces dinámicas y sistemas para
              mostrar datos. Me gusta el desarrollo frontend, las
              aplicacionesinteractivas y las soluciones basadas en datos.
            </p>
          </section>

          <section className="projects">
            <h3>Mis proyectos</h3>

            <div className="card">
              <h4>Pirámides de Tula con A-Frame</h4>
              <div className="date">Trabajo escolar 2023</div>
              <p>
                Usé A-Frame para desarrollar una experiencia de realidad virtual
                que permite explorar un sitio arqueológico en un entorno 3D;
                todas las composiciones y estructuras del escenario fueron
                diseñadas por mí.
              </p>
              <div className="project-links">
                <a
                  href="https://github.com/ArturoJM0A1/tollan-a-frame"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <button
                  type="button"
                  className="project-link project-video"
                  onClick={() =>
                    handleOpenVideo(
                      "https://youtu.be/TGilgQixh2I?si=LMujicSgD7mOZh7y",
                      "Pirámides de Tula con A-Frame",
                    )
                  }
                  title="Ver video"
                  aria-haspopup="dialog"
                >
                  <i className="fas fa-video"></i> Video
                </button>
              </div>
            </div>

            <div className="card">
              <h4>Sitio Web del bar "El Mezcalito"</h4>
              <div className="date">Proyecto independiente 2023</div>
              <p>
                Desarrollé un sitio web con PHP y Bootstrap para el bar “El
                Mezcalito” en Tula de Allende. Permite explorar el lugar, ver el
                menú de bebidas y comida, y realizar reservaciones.
              </p>
              <div className="project-links">
                <a
                  href="https://github.com/ArturoJM0A1/El-Mezcalito"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <button
                  type="button"
                  className="project-link project-video"
                  onClick={() =>
                    handleOpenVideo(
                      "https://youtu.be/f9y2C5g_qdI?si=SmKCfJytWpgOxDuN",
                      "Sitio Web del bar El Mezcalito",
                    )
                  }
                  title="Ver video"
                  aria-haspopup="dialog"
                >
                  <i className="fas fa-video"></i> Video
                </button>
              </div>
            </div>

            <div className="card">
              <h4>Portal Turístico de Hidalgo</h4>
              <div className="date">Gobierno del Estado de Hidalgo 2024</div>
              <p>
                Desarrollé un sitio web en PHP para la Secretaría de Turismo de
                Hidalgo con noticias, eventos, calendario, mapas interactivos y
                filtros de navegación para explorar actividades turísticas.
              </p>
              <div className="project-links">
                <a
                  href="https://github.com/ArturoJM0A1/sitioturismo"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <button
                  type="button"
                  className="project-link project-video"
                  onClick={() =>
                    handleOpenVideo(
                      "https://youtu.be/m1IHI6Xd6_Q?si=gWAS46RWUquh2xPv",
                      "Portal Tur�stico de Hidalgo",
                    )
                  }
                  title="Ver video"
                  aria-haspopup="dialog"
                >
                  <i className="fas fa-video"></i> Video
                </button>
              </div>
            </div>

            <div className="card">
              <h4>Sitio web IEEE Student Web Hub</h4>
              <div className="date">Proyecto de la universidad 2024</div>
              <p>
                Colaboración en portal web para la rama estudiantil. Usando
                Astro, React, CSS, JavaScript, Tailwind.
              </p>
              <div className="project-links">
                <a
                  href="https://github.com/IEEE-ESTl/IEEE-ESTl-Student-Web-Hub"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <a
                  href="https://ieee-estl.com/"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver artículo"
                >
                  <i className="fa-solid fa-globe"></i> Visitar
                </a>
              </div>
            </div>

            <div className="card">
              <h4>Recetario</h4>
              <div className="date">Proyecto independiente 2024</div>
              <p>
                Desarrollo de un sitio web interactivo de recetas utilizando
                CSS, Bootstrap y Swiper, enfocado en el frontend, que permite
                explorar y guardar recetas y bebidas mediante una interfaz
                intuitiva y una experiencia de usuario fluida.
              </p>
              <div className="project-links">
                <a
                  href="https://github.com/ArturoJM0A1/recetarioCreativeKitchen"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <button
                  type="button"
                  className="project-link project-video"
                  onClick={() =>
                    handleOpenVideo(
                      "https://www.youtube.com/watch?v=mogJaqrFaL8",
                      "Recetario",
                    )
                  }
                  title="Ver video"
                  aria-haspopup="dialog"
                >
                  <i className="fas fa-video"></i> Video
                </button>
              </div>
            </div>

            <div className="card">
              <h4>Aplicación de Mapas Personalizados (SIG Hidalgo)</h4>
              <div className="date">Artículo y App 2025</div>
              <p>
                App SIG de mapas del estado de Hidalgo con React Native, usando
                JSON y GeoJSON para visualizar datos de población y vivienda del
                INEGI. Permite consultar información regional de forma clara y
                detallada.
              </p>
              <div className="project-links">
                <a
                  href="https://ciencialatina.org/index.php/cienciala/article/view/19604/28102"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver artículo"
                >
                  <i className="fas fa-book"></i> Artículo
                </a>
                <a
                  href="https://github.com/ArturoJM0A1/HidalgoHorizon"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <button
                  type="button"
                  className="project-link project-video"
                  onClick={() =>
                    handleOpenVideo(
                      "https://youtu.be/avluPyj1kDg?si=-0tT1EwEOKFTSiDX",
                      "Aplicación de Mapas Personalizados (SIG Hidalgo)",
                    )
                  }
                  title="Ver video"
                  aria-haspopup="dialog"
                >
                  <i className="fas fa-video"></i> Video
                </button>
              </div>

              <div className="favoritos"></div>
            </div>

            <div className="card">
              <h4>Chat con IA Local (Ollama + Next.js)</h4>
              <div className="date">Aplicación Web Full Stack 2026</div>
              <p>
                Chat local de IA con Next.js, integrado con Ollama para ejecutar
                llama3.2:1b. Incluye API propia, manejo de estado en React y
                diseño responsive con Tailwind CSS
              </p>
              <div className="project-links">
                <a
                  href="https://github.com/ArturoJM0A1/chatbotollama"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <button
                  type="button"
                  className="project-link project-video"
                  onClick={() =>
                    handleOpenVideo(
                      "https://youtu.be/xPE52ITnEyg?si=S0bAwIU81MfOBqzl",
                      "Chat con IA Local (Ollama + Next.js)",
                    )
                  }
                  title="Ver video"
                  aria-haspopup="dialog"
                >
                  <i className="fas fa-video"></i> Video
                </button>
              </div>
            </div>

            <div className="card">
              <h4>Aplicación de Venta de Refrescos</h4>
              <div className="date">Aplicación Web 2026</div>
              <p>
                Aplicación web de venta de refrescos con Next.js, React y Prisma
                (ORM), con vista pública de productos y panel administrativo
                para actualizar precios mediante una API.
              </p>
              <div className="project-links">
                <a
                  href="https://github.com/ArturoJM0A1/Refrescos-Coca-Cola"
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                  title="Ver repositorio"
                >
                  <i className="fab fa-github"></i> Repo
                </a>
                <button
                  type="button"
                  className="project-link project-video"
                  onClick={() =>
                    handleOpenVideo(
                      "https://youtu.be/1EkZTsWl7dA?si=s317CxD1qWQmy6qU",
                      "Aplicación de Venta de Refrescos",
                    )
                  }
                  title="Ver video"
                  aria-haspopup="dialog"
                >
                  <i className="fas fa-video"></i> Video
                </button>
              </div>
            </div>

            <div className="card">
              <h4>Sistema de gestion de gastos personales</h4>
              <div className="date">Aplicación Web 2026</div>
              <p>Usando Astro y PostgreSQL, en desarrollo...</p>
              <div className="project-links"></div>
              <div className="contenedorTuerca">
                <div className="Tuerca"></div>
              </div>
            </div>
          </section>

          <section className="education">
            <h3>Educación</h3>
            <div className="education-item">
              <h4>Ingeniería en Software</h4>
              <p>Universidad Autónoma del Estado de Hidalgo (2020 - 2024)</p>
            </div>
          </section>
        </div>

        <div className="comments-wrapper">
          <CommentSection />
   
        <footer>
          <b>(c) Arturo Juárez Monroy - Hecho con React, Vue y Firebase</b>
          <br></br>
          <b>¡Gracias por visitarme!</b>
        </footer>
      </div>

      <div className="footeradios">
        {" "}
        <img src={artavatar3} alt="Bienvenido" className="avatar3" />
      </div>

      {/*  cohete para volver arriba (solo visible en escritorio y tras hacer scroll) */}
      {showRocket && (
        <div
          className="rocket-button"
          onClick={scrollToTop}
          role="button"
          tabIndex={0}
          aria-label="Volver arriba"
        >
          <span className="rocket">{"\u{1F680}"}</span>
        </div>
      )}

      {showWelcome && (
        <div
          className={`welcome-overlay ${isWelcomeClosing ? "is-exiting" : ""}`}
        >
          <div className="welcome-ambient" aria-hidden="true">
            <span className="orb orb-1"></span>
            <span className="orb orb-2"></span>
            <span className="orb orb-3"></span>
          </div>
          <div className="welcome-screen">
            <p className="welcome-kicker">
              Currículum y Portafolio de proyectos
            </p>
            <h1 className="welcome-title">Bienvenido</h1>
            <p className="welcome-text">Soy Arturo Juárez Monroy</p>
            <button className="btn welcome-cta" onClick={handleWelcomeClose}>
              Entrar
              <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="mouth"></div>
              </div>
            </button>
            <img src={artavatar1} alt="Bienvenido" className="avatar1" />
          </div>
        </div>
      )}
      {activeVideo && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={
            activeVideo.title
              ? `Video: ${activeVideo.title}`
              : "Video del proyecto"
          }
          onClick={handleCloseVideo}
        >
          <div
            className="video-modal__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="video-modal__close"
              onClick={handleCloseVideo}
              aria-label="Cerrar video"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="video-modal__frame">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title || "Video del proyecto"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
