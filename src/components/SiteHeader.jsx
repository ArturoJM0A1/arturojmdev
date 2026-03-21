import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/sobre-mi", label: "Sobre mi" },
  { to: "/habilidades", label: "Habilidades" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/certificaciones", label: "Certificaciones" },
  { to: "/comentarios", label: "Comentarios" },
  { to: "/contacto", label: "Contacto" },
];

export default function SiteHeader({ cvHref, displayText, theme, setTheme }) {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Arturo Juarez Monroy</h1>
          <h2>{displayText}</h2>
          <div className="divider"></div>
        </div>

        <div className="hero-actions">
          <NavLink to="/sobre-mi" className="btn botonhero">
            Ver mi trayectoria
          </NavLink>
          <a
            href={cvHref}
            download="Curriculum Arturo JM.pdf"
            className="btn botonhero"
          >
            Descargar CV
          </a>
        </div>

        <nav className="hero-nav" aria-label="Navegacion principal">
          {navigationItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `hero-nav__link${isActive ? " is-active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
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
  );
}
