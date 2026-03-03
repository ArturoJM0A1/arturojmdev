// ===== App.jsx =====
// Mejoras: partículas más suaves, cursor typewriter, transiciones, sin alterar contenido

import { useState, useEffect, useRef } from "react";
import "./App.css";
import profileImg from './assets/arurophoto.jpg';
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Componente de partículas mejorado (colores más integrados, menor cantidad para rendimiento)
function Particles({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const PARTICLE_COUNT = 97;
    const TRAIL_LENGTH = 4;

    const BASE_COLOR = theme === 'dark' ? '#b08d57' : '#d4c4a8';
    const TRAIL_COLOR = theme === 'dark' ? '176, 141, 87' : '180, 160, 120';

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      let color;
      if (theme === 'dark') {
        color = `hsl(${42 + Math.random() * 15}, 55%, 55%)`;
      } else {
        color = `hsl(40, 20%, ${70 + Math.random() * 15}%)`;
      }
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2 + 0.1,
        size: Math.random() * 2.5 + 1,
        trail: [],
        color,
      };
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticles = () => {
      particles.forEach(p => {
        p.trail.push({ x: p.x, y: p.y, opacity: 0.7 });
        if (p.trail.length > TRAIL_LENGTH) {
          p.trail.shift();
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
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
        for (let i = 0; i < p.trail.length; i++) {
          const trailPoint = p.trail[i];
          const opacity = (i / p.trail.length) * 0.4;
          ctx.beginPath();
          ctx.arc(trailPoint.x, trailPoint.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${TRAIL_COLOR}, ${opacity})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowColor = BASE_COLOR;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}

// Componente de comentarios (sin cambios funcionales)
function CommentSection() {
  const [submittedComment, setSubmittedComment] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('myComment');
    if (saved) {
      setSubmittedComment(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      setError("El nombre y el comentario son obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "comments"), {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        comment: formData.comment.trim(),
        timestamp: serverTimestamp()
      });

      const newComment = {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        comment: formData.comment.trim(),
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('myComment', JSON.stringify(newComment));
      setSubmittedComment(newComment);
      setFormData({ name: "", email: "", comment: "" });
    } catch (err) {
      console.error("Error al enviar comentario:", err);
      setError("Hubo un error al enviar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="comments">
      <h3>Comentarios</h3>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          name="name"
          placeholder="Tu nombre *"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico (opcional)"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Escribe tu comentario *"
          rows="3"
          value={formData.comment}
          onChange={handleChange}
          required
        />
        {error && <p className="comment-error">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>

      <div className="comment-list">
        {submittedComment ? (
          <>
            <p className="comment-success">¡Comentario enviado! Gracias 😊</p>
            <div className="comment-item">
              <div className="comment-header">
                <strong>{submittedComment.name}</strong>
                {submittedComment.email && <span className="comment-email">({submittedComment.email})</span>}
                <span className="comment-date">
                  {new Date(submittedComment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="comment-text">{submittedComment.comment}</p>
            </div>
          </>
        ) : (
          <p className="no-comments">Aún no has enviado ningún comentario.</p>
        )}
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [displayText, setDisplayText] = useState("");
  const fullText = "Ingeniería en Software";

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  // Efecto typewriter (mismo contenido, velocidad ligeramente aumentada)
  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 119); // velocidad

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Particles theme={theme} />
      <div className={`theme-icon ${theme} icon-style-aesthetic-adjustment`}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>


      <title>Arturo Juárez Monroy</title>

      <div className="container">
        <header className="hero">
          <div className="hero-text">
            <h1>Arturo Juárez Monroy</h1>
            <h2>{displayText}</h2> {/* El cursor se añade con CSS pseudo-elemento */}
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
          </div>
        </header>

        <div className="left-column">
          <div className="profile-photo">
            <div className="photo-placeholder" style={{ backgroundImage: `url(${profileImg})` }}></div>
          </div>

          <section className="contact">
            <h3>Contacto</h3>
            <p>✉️ juarezmonroyarturo574@gmail.com</p>
            <p>
              🔗 <a href="https://www.linkedin.com/in/arturo-juárez-monroy-259a28171/" target="_blank" rel="noreferrer">linkedin.com/in/arturo-juárez</a>
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              <a href="https://www.youtube.com/@arturojuarezmonroy3951" target="_blank" rel="noreferrer">Youtube.com/@arturojuarezmonroy3951</a>
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
                  <li>Java</li>
                  <li>C++ / C</li>
                  <li>SQL</li>
                </ul>
              </div>
              <div>
                <h4>Frameworks / Librerías / Otros</h4>
                <ul>
                  <li>React</li>
                  <li>React Native</li>
                  <li>Firebase</li>
                  <li>Vue</li>
                  <li>Tailwind CSS</li>
                  <li>Bootstrap</li>
                  <li>MySQL</li>
                  <li>WordPress </li>
                  <li>Excel </li>
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
              <div className="date">Gobierno del Estado de Hidalgo · 2024</div>
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
              <p>Universidad Autónoma del Estado de Hidalgo (2020 - 2024)</p>
            </div>
          </section>
        </div>

        <div className="comments-wrapper">
          <CommentSection />
        </div>

        <footer>
          <b>© Arturo Juárez Monroy · Hecho con React y Firebase ♡ </b>
        </footer>
      </div>
    </>
  );
}

export default App;