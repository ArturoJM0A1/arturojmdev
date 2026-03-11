// ===== App.jsx =====
// Mejoras: partículas con nueva colorimetría + botón cohete para scroll + botones de proyecto con Font Awesome

import { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import "./cohetegoup.css";
import profileImg from './assets/arurophoto.jpg';
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

  // Escuchar scroll para mostrar/ocultar el cohete
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowRocket(true);
      } else {
        setShowRocket(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWelcomeClose = () => {
    setIsWelcomeClosing(true);
    setTimeout(() => {
      setShowWelcome(false);
      setIsWelcomeClosing(false);
    }, 650);
  };

  // Aplicar la clase del tema de forma síncrona para evitar parpadeos
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
    }, 119);

    return () => clearInterval(interval);
  }, [showWelcome]);

  return (
    <>
      <Particles theme={theme} />
      <div className={`theme-icon ${theme} icon-style-aesthetic-adjustment`}>
        {theme === 'dark' ? '\u{1F319}' : theme === 'alt' ? '\u{1F342}' : '\u2600\uFE0F'}
      </div>

      <meta charSet="UTF-8" />
      <title>Arturo Juárez Monroy</title>

      <div className="container">
        <header className="hero">
          <div className="hero-text">
            <h1>Arturo Juárez Monroy</h1>
            <h2>{displayText}</h2>
            <div className="divider"></div>
            <a href="#about" className="btn vermitrayectoria">Ver mi trayectoria</a>
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
            <div className="photo-placeholder" style={{ backgroundImage: `url(${profileImg})` }}></div>
          </div>

          <section className="contact">
            <h3>Contacto</h3>
            <p>
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <a href="mailto:juarezmonroyarturo574@gmail.com">juarezmonroyarturo574@gmail.com</a>
            </p>
            <p>
              <i className="fab fa-linkedin" aria-hidden="true"></i>
              <a href="https://www.linkedin.com/in/arturo-juárez-monroy-259a28171" target="_blank" rel="noreferrer">linkedin.com/in/arturo-juarez</a>
            </p>
            <p>
              <i className="fab fa-youtube" aria-hidden="true"></i>
              <a href="https://www.youtube.com/@arturojuarezmonroy3951" target="_blank" rel="noreferrer">youtube.com/@arturojuarezmonroy3951</a>
            </p>
            <p>
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <a href="https://wa.me/5217736802105" target="_blank" rel="noreferrer">+52 1 773 680 2105</a>
            </p>
          </section>

          <section className="skills">
            <h3>Habilidades Técnicas</h3>
            <div className="skills-row">
              <div className="skills-left">
                <div className="skill-category">
                  <h4>Lenguajes</h4>
                  <ul >
                    <li>JavaScript</li>
                    <li>Python</li>
                    <li>PHP</li>
                    <li>Java</li>
                    <li>C++ / C</li>
                    <li>SQL</li>
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
              He trabajado en varios proyectos durante mis estudios, donde adquirí experiencia práctica en desarrollo de software. Me atraen especialmente los proyectos creativos y seguir mejorando mis habilidades mientras colaboro con otros desarrolladores.
            </p>
          </section>

          <section className="projects">
            <h3>Proyectos</h3>

            <div className="card">
              <h4>Pirámides de Tula con A-Frame</h4>
              <div className="date">Trabajo escolar · 2023</div>
              <p>Usando la etiqueta A-Frame para mostrar el sitio arqueológico. El resultado fue un proyecto atractivo y detallado, destacando por su cuidado en la presentación.</p>
              <div className="project-links">
                <a href="https://github.com/ArturoJM0A1/tollan-a-frame" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://youtu.be/TGilgQixh2I?si=LMujicSgD7mOZh7y" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
              </div>
            </div>

            <div className="card">
              <h4>Sitio Web del bar "El Mezcalito"</h4>
              <div className="date">Proyecto independiente · 2023</div>
              <p>Desarrollé un sitio web utilizando PHP y Bootstrap para el bar "El Mezcalito" en Tula de Allende. El sitio permitía a los usuarios explorar el establecimiento, visualizar la variedad de bebidas y comidas disponibles y realizar reservaciones de manera conveniente y eficiente.</p>
              <div className="project-links">
                <a href="https://github.com/ArturoJM0A1/El-Mezcalito" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://youtu.be/f9y2C5g_qdI?si=SmKCfJytWpgOxDuN" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
              </div>
            </div>

            <div className="card">
              <h4>Portal Turístico de Hidalgo</h4>
              <div className="date">Gobierno del Estado de Hidalgo · 2024</div>
              <p>Desarrollé un sitio web para la Secretaría de Turismo en Hidalgo para ofrecer a los visitantes una experiencia completa. El sitio incluye noticias, eventos y actividades turísticas, un calendario de eventos, mapas interactivos de lugares interesantes y filtros de navegación.</p>
              <div className="project-links">
                <a href="https://github.com/ArturoJM0A1/sitioturismo" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://youtu.be/m1IHI6Xd6_Q?si=gWAS46RWUquh2xPv" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
              </div>
            </div>

            <div className="card">
              <h4>Recetario</h4>
              <div className="date">Proyecto independiente · 2024</div>
              <p>Desarrollo de un sitio web interactivo de recetas, centrado en el frontend. La página ofrece una experiencia de usuario intuitiva para explorar y guardar recetas y bebidas.</p>
              <div className="project-links">
                <a href="https://github.com/ArturoJM0A1/recetarioCreativeKitchen" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://www.youtube.com/watch?v=mogJaqrFaL8" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
              </div>
            </div>

            <div className="card">
              <h4>Aplicación de Mapas Personalizados (SIG Hidalgo)</h4>
              <div className="date">Artículo y App · 2025</div>
              <p>Desarrollé una aplicacion SIG de mapas personalizados del estado de Hidalgo utilizando React Native, JSON y GeoJSON para visualizar datos específicos sobre población y vivienda (INEGI). Este proyecto permite a los usuarios acceder de manera detallada a información relevante sobre la región.</p>
              <div className="project-links">
                <a href="https://ciencialatina.org/index.php/cienciala/article/view/19604/28102" className="project-link" target="_blank" rel="noreferrer" title="Ver artículo"><i className="fas fa-book"></i> Artículo</a>
                <a href="https://github.com/ArturoJM0A1/HidalgoHorizon" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://youtu.be/avluPyj1kDg?si=-0tT1EwEOKFTSiDX" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
              </div>
            </div>

            <div className="card">
              <h4>Chat con IA Local (Ollama + Next.js)</h4>
              <div className="date">Aplicación Web Full Stack · 2026</div>
              <p>Desarrollo de chat local con Next.js, integrada con Ollama para ejecutar el modelo llama3.2:1b en entorno local, implementando API propia, manejo de estado en React y diseño responsive con Tailwind CSS, permitiendo interacción en tiempo real sin dependencia de servicios en la nube.</p>
              <div className="project-links">
                <a href="https://github.com/ArturoJM0A1/chatbotollama" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://youtu.be/xPE52ITnEyg?si=S0bAwIU81MfOBqzl" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
              </div>
            </div>

            <div className="card">
              <h4>Chat con IA Local (Ollama + Next.js)</h4>
              <div className="date">Aplicación Web · 2026</div>
              <p>Desarrollo de chat local con Next.js, integrada con Ollama para ejecutar el modelo llama3.2:1b en entorno local, implementando API propia, manejo de estado en React y diseño responsive con Tailwind CSS, permitiendo interacción en tiempo real sin dependencia de servicios en la nube.</p>
              <div className="project-links">
                <a href="https://github.com/ArturoJM0A1/chatbotollama" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://youtu.be/xPE52ITnEyg?si=S0bAwIU81MfOBqzl" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
              </div>
            </div>

            <div className="card">
              <h4>Aplicación de Venta de Refrescos</h4>
              <div className="date">Aplicación Web · 2026</div>
              <p>Desarrollé una aplicación web de venta de refrescos con Next.js, React y Prisma (ORM), con vista pública de productos y panel administrativo para actualizar precios mediante una API.</p>
              <div className="project-links">
                <a href="https://github.com/ArturoJM0A1/Refrescos-Coca-Cola" className="project-link" target="_blank" rel="noreferrer" title="Ver repositorio"><i className="fab fa-github"></i> Repo</a>
                <a href="https://youtu.be/1EkZTsWl7dA?si=s317CxD1qWQmy6qU" className="project-link" target="_blank" rel="noreferrer" title="Ver video"><i className="fas fa-video"></i> Video</a>
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
        </div>

        <footer>
          <b>(c) Arturo Juárez Monroy · Hecho con React, Vue y Firebase</b>
        </footer>
      </div>

      {/* Botón cohete para volver arriba (solo visible en escritorio y tras hacer scroll) */}
      {showRocket && (
        <div className="rocket-button" onClick={scrollToTop} role="button" tabIndex={0} aria-label="Volver arriba">
          <span className="rocket">{'\u{1F680}'}</span>
        </div>
      )}

      {showWelcome && (
        <div className={`welcome-overlay ${isWelcomeClosing ? "is-exiting" : ""}`}>
          <div className="welcome-ambient" aria-hidden="true">
            <span className="orb orb-1"></span>
            <span className="orb orb-2"></span>
            <span className="orb orb-3"></span>
          </div>
          <div className="welcome-screen">
            <p className="welcome-kicker">Curriculum y Portafolio de proyectos</p>
            <h1 className="welcome-title">Bienvenido</h1>
            <p className="welcome-text">Soy Arturo Juárez Monroy</p>
            <button className="btn welcome-cta" onClick={handleWelcomeClose}>
              Entrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;



