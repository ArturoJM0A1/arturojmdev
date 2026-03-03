import { useState, useEffect, useRef } from "react";
import "./App.css";
import profileImg from './assets/arurophoto.jpg';

// Componente de partículas (integrado directamente)
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const PARTICLE_COUNT = 60;
    const TRAIL_LENGTH = 5; // longitud de la estela

    // Colores dorados
    const GOLDEN = '#b08d57';
    const GOLDEN_LIGHT = '#c9a86b';

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 + 0.1, // ligera tendencia hacia abajo
      size: Math.random() * 3 + 1,
      trail: [],
      color: `hsl(${42 + Math.random() * 10}, 10%, 55%)`, // tonos dorados variables
    });

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticles = () => {
      particles.forEach(p => {
        // Guardar posición actual en el trail
        p.trail.push({ x: p.x, y: p.y, opacity: 0.8 });
        if (p.trail.length > TRAIL_LENGTH) {
          p.trail.shift();
        }

        // Actualizar posición
        p.x += p.vx;
        p.y += p.vy;

        // Rebote suave en los bordes (con reinicio aleatorio para efecto continuo)
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          // Reiniciar la partícula en un borde aleatorio
          if (Math.random() > 0.5) {
            p.x = Math.random() * canvas.width;
            p.y = 0;
          } else {
            p.x = 0;
            p.y = Math.random() * canvas.height;
          }
          p.trail = [];
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Dibujar estela (de más antigua a más nueva)
        for (let i = 0; i < p.trail.length; i++) {
          const trailPoint = p.trail[i];
          const opacity = (i / p.trail.length) * 0.5; // opacidad creciente hacia la cabeza
          ctx.beginPath();
          ctx.arc(trailPoint.x, trailPoint.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(176, 141, 87, ${opacity})`;
          ctx.fill();
        }

        // Dibujar cabeza de la partícula (más brillante)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Pequeño resplandor
        ctx.shadowColor = GOLDEN_LIGHT;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color;
        ctx.fill();
        // Resetear sombra para no afectar a las siguientes partículas
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Configuración inicial
    resizeCanvas();
    initParticles();
    animate();

    // Manejar resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      // Opcional: reiniciar partículas para adaptarse al nuevo tamaño
      // pero no es necesario; simplemente continuan.
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Particles />
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
    </>
  );
}

export default App;