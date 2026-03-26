import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/sobre-mi", label: "Sobre mi" },
  { to: "/actualmente", label: "Actualmente" },
  { to: "/habilidades", label: "Habilidades" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/certificaciones", label: "Certificaciones" },
  { to: "/comentarios", label: "Comentarios" },
  { to: "/contacto", label: "Contacto" },
];

export default function SiteHeader({ cvHref, displayText, theme, setTheme }) {
  const location = useLocation();
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  return (
    <header className="hero">
      <div className="hero-toolbar">
        <div className="hero-nav-shell" ref={menuRef}>
          <button
            type="button"
            className={`hero-nav-toggle${isMenuOpen ? " is-open" : ""}`}
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            aria-controls="site-navigation"
            aria-label={
              isMenuOpen
                ? "Cerrar menu de navegacion"
                : "Abrir menu de navegacion"
            }
          >
            <span className="hero-nav-toggle__label">Menu</span>
            <span
              className="hero-nav-toggle__chevron"
              aria-hidden="true"
            ></span>
          </button>

          <div
            className={`hero-nav-panel${isMenuOpen ? " is-open" : ""}`}
            aria-hidden={!isMenuOpen}
          >
            <nav
              className="hero-nav"
              aria-label="Navegacion principal"
              id="site-navigation"
            >
              {navigationItems.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `hero-nav__link${isActive ? " is-active" : ""}`
                  }
                >
                  <span>{label}</span>
                  <span className="hero-nav__marker" aria-hidden="true"></span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="theme-buttons">
          <button
            className="theme-btn"
            type="button"
            onClick={() => setTheme("light")}
            aria-pressed={theme === "light"}
            aria-label="Activar modo claro"
            title="Modo claro"
          >
            <span className="theme-btn__emoji" aria-hidden="true">
              {"\u2600\uFE0F"}
            </span>
          </button>
          <button
            className="theme-btn"
            type="button"
            onClick={() => setTheme("dark")}
            aria-pressed={theme === "dark"}
            aria-label="Activar modo oscuro"
            title="Modo oscuro"
          >
            <span className="theme-btn__emoji" aria-hidden="true">
              {"\u{1F319}"}
            </span>
          </button>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1>Arturo Juárez Monroy</h1>
          <h2>{displayText}</h2>
          <div className="divider"></div>
        </div>

        <div className="hero-actions">
          <a
            href={cvHref}
            download="Cv JM Arturo.pdf"
            className="btn botonhero"
          >
            Descargar CV
            <span class="absolute flex size-3 top-0 right-0.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full animacionDCV1 opacity-75"></span>
              <span class="relative inline-flex size-3 rounded-full animacionDCV2"></span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
