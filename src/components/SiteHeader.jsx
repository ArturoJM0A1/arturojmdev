import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navigationItems, scrollToSection } from "../menuNavigation.js";

export default function SiteHeader({ cvHref, displayText, theme, setTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleNavigationClick = (event, { to, scrollTarget }) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === to) {
      if (!scrollToSection(scrollTarget)) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    navigate(to, {
      state: { scrollTarget, fromMenuNavigation: true },
    });
  };

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
            <span className="hero-nav-toggle__content">
              <span className="hero-nav-toggle__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 7.5h7.5M5 12h14M5 16.5h10"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="17.5"
                    cy="7.5"
                    r="2.2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </span>
              <span className="hero-nav-toggle__label">Menu</span>
            </span>
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
              {navigationItems.map(({ to, label, end, scrollTarget }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={(event) =>
                    handleNavigationClick(event, { to, scrollTarget })
                  }
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
            download="JuarezMonroyArturo CV.pdf"
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