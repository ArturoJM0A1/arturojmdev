// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import profileImg from './assets/arurophoto.jpg';

// Luego en el JSX:

function App() {
  const [theme, setTheme] = useState("dark"); // Ahora oscuro por defecto

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className="container">
      <header className="hero">
        <div className="hero-text">
          <h1>Arturo Juárez Monroy</h1>
          <h2>Licenciatura en Ingeniería de Software</h2>
          <div className="divider"></div>
          <a href="#about" className="btn">Ver mi trayectoria</a>
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
        </div>
      </header>

      <div className="left-column">
        <div className="profile-photo">
          <div className="photo-placeholder" style={{ backgroundImage: `url(${profileImg})` }}></div>

        </div>

        <section className="contact">
          <h3>Contacto</h3>
          <p>📞 +52 773 680 2105</p>
          <p>✉️ juarezmonroyarturo574@gmail.com</p>
          <p>
            🔗 <a href="https://www.linkedin.com/in/arturo-juárez-monroy-259a28171/" target="_blank" rel="noreferrer">linkedin.com/in/arturo-juárez</a>
          </p>
        </section>

        <section className="skills">
          <h3>Habilidades Técnicas</h3>
          <div className="skills-grid">
            <div>
              <h4>Lenguajes</h4>
              <ul>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>Python</li>
                <li>PHP</li>
              </ul>
            </div>
            <div>
              <h4>Frameworks / Librerías</h4>
              <ul>
                <li>React</li>
                <li>React Native</li>
                <li>Firebase</li>
                <li>Vue</li>
                <li>Tailwind CSS</li>
                <li>Bootstrap</li>
              </ul>
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
            <h4>Pirámides de Tula con A‑Frame</h4>
            <div className="date">Trabajo escolar · 2023</div>
            <p>Usando la etiqueta A‑Frame para mostrar el lugar. El resultado fue un proyecto atractivo y detallado, destacando por su cuidado en la presentación.</p>
          </div>

          <div className="card">
            <h4>Sitio Web del bar "El Mezcalito"</h4>
            <div className="date">Trabajo escolar · 2023</div>
            <p>Desarrollé un sitio web utilizando PHP y Bootstrap para el bar "El Mezcalito" en Tula de Allende. El sitio permitía a los usuarios explorar el establecimiento, visualizar la variedad de bebidas y comidas disponibles y realizar reservaciones de manera conveniente y eficiente.</p>
          </div>

          <div className="card">
            <h4>Portal Turístico de Hidalgo</h4>
            <div className="date">Servicio social · 2024</div>
            <p>Desarrollé un sitio web para la Secretaría de Turismo en Hidalgo para ofrecer a los visitantes una experiencia completa. El sitio incluye noticias, eventos y actividades turísticas, un calendario de eventos, mapas interactivos de lugares interesantes y filtros de navegación.</p>
          </div>

          <div className="card">
            <h4>Aplicación de Mapas Personalizados (SIG Hidalgo)</h4>
            <div className="date">Trabajo para titulación · 2025</div>
            <p>Desarrollé una aplicación SIG de mapas personalizados del estado de Hidalgo utilizando React Native, JSON y GeoJSON para visualizar datos específicos sobre población y vivienda (INEGI). Este proyecto permite a los usuarios acceder de manera detallada a información relevante sobre la región.</p>
          </div>
        </section>

        <section className="education">
          <h3>Educación</h3>
          <div className="education-item">
            <h4>Ingeniería en Software</h4>
            <p>Universidad Autónoma del Estado de Hidalgo – Escuela Superior de Tlahuelilpan (2021 - 2025)</p>
          </div>
        </section>
      </div>

      <footer>
        © 2026 Arturo Juárez Monroy · Hecho con React
      </footer>
    </div>
  );
}

export default App;