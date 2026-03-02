import "./App.css";

function App() {
  return (
    <div className="container">

      <section className="hero">
        <h1>Hola, soy Arturo</h1>
        <h2>Ingeniero en Software</h2>
        <div className="divider"></div>
        <a href="#cv" className="btn">Ver mi trayectoria</a>
      </section>

      <section className="about" id="cv">
        <h3>Acerca de mí</h3>
        <p>
          Ingeniero en Software con experiencia en desarrollo web y aplicaciones.
          Me interesan los proyectos creativos donde la estructura, el detalle
          y la calidad forman parte esencial del resultado.
        </p>
      </section>

      <section className="skills">
        <h3>Habilidades</h3>
        <div className="skills-grid">
          <div>
            <h4>Técnicas</h4>
            <ul>
              <li>JavaScript</li>
              <li>React</li>
              <li>React Native</li>
              <li>PHP</li>
              <li>Python</li>
              <li>Firebase</li>
            </ul>
          </div>
          <div>
            <h4>Personales</h4>
            <ul>
              <li>Creatividad</li>
              <li>Adaptabilidad</li>
              <li>Enfoque en el detalle</li>
              <li>Compromiso con la calidad</li>
              <li>Resiliencia</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="projects">
        <h3>Proyectos</h3>

        <div className="card">
          <h4>Pirámides de Tula (A-Frame)</h4>
          <p>Proyecto visual 3D destacando presentación y detalle.</p>
        </div>

        <div className="card">
          <h4>Sitio Web "El Mezcalito"</h4>
          <p>Desarrollo con PHP y Bootstrap para gestión y reservaciones.</p>
        </div>

        <div className="card">
          <h4>Aplicación SIG Hidalgo</h4>
          <p>App en React Native con visualización GeoJSON de datos INEGI.</p>
        </div>

        <div className="card">
          <h4>Portal Turístico Hidalgo</h4>
          <p>Sitio institucional con noticias, eventos y mapas interactivos.</p>
        </div>
      </section>

      <section className="contact">
        <h3>Contacto</h3>
        <p>Email: juarezmonroyarturo574@gmail.com</p>
        <p>Tel: +52 773 680 2105</p>
        <p>
          LinkedIn: 
          <a href="https://www.linkedin.com/in/arturo-juárez-monroy-259a28171/" target="_blank">
            Ver perfil
          </a>
        </p>
      </section>

      <footer>
        © 2026 Arturo Juárez
      </footer>

    </div>
  );
}

export default App;
