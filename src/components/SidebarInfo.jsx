import profileImg from "../../public/artsearch2-removebg-preview.png";

export default function SidebarInfo() {
  return (
    <div className="left-column">
      <div className="profile-photo">
        <div
          className="photo-placeholder"
          style={{ backgroundImage: `url(${profileImg})` }}
        >
          <div className="photolaptop">
            <span>{"\uD83D\uDCBB"}</span>
          </div>
        </div>
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
          <a href="https://github.com/ArturoJM0A1" target="_blank" rel="noreferrer">
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
          <a href="https://wa.me/5217736802105" target="_blank" rel="noreferrer">
            +52 1 773 680 2105
          </a>
        </p>
      </section>

      <section className="skills">
        <h3>Habilidades Tecnicas</h3>
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
                <li>Power BI</li>
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
              <h4>Frameworks / Librerias</h4>
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
  );
}
