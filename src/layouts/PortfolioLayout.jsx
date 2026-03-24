import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../App.css";
import "../cohetegoup.css";
import avatarwelcome from "../../public/avatar2.png";
import avatarwelcomehover from "../../public/avatar5.png";
import avatarfooter from "../../public/avatar5.png";
import Particles from "../particulasfondo.jsx";
import SidebarInfo from "../components/SidebarInfo.jsx";
import SiteHeader from "../components/SiteHeader.jsx";

const pageTitles = {
  "/": "Inicio",
  "/sobre-mi": "Sobre mi",
  "/habilidades": "Habilidades",
  "/proyectos": "Proyectos",
  "/certificaciones": "Certificaciones",
  "/comentarios": "Comentarios",
  "/contacto": "Contacto",
};

const fullText = "Ingenieria en Software";

const basePath = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const cvHref = `${basePath}${encodeURIComponent("Currículum Arturo JM.pdf")}`;

export default function PortfolioLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState("dark");
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWelcomeClosing, setIsWelcomeClosing] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [showRocket, setShowRocket] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    document.documentElement.lang = "es";
  }, []);

  useEffect(() => {
    const sectionTitle = pageTitles[location.pathname] ?? "Portafolio";
    document.title = `Arturo Juarez Monroy | ${sectionTitle}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useLayoutEffect(() => {
    document.body.classList.remove("dark-mode");

    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    const overflowState = showWelcome || activeVideo ? "hidden" : "";
    document.body.style.overflow = overflowState;

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo, showWelcome]);

  useEffect(() => {
    const handleScroll = () => {
      setShowRocket(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!activeVideo) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  useEffect(() => {
    if (showWelcome) {
      return undefined;
    }

    let index = 0;
    setDisplayText("");

    const interval = window.setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        index += 1;
        return;
      }

      window.clearInterval(interval);
    }, 123);

    return () => window.clearInterval(interval);
  }, [showWelcome]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

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

      if (!videoId) {
        return null;
      }

      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&vq=hd720&cc_load_policy=0`;
    } catch {
      return null;
    }
  };

  const handleOpenVideo = (url, title) => {
    const embedUrl = getYouTubeEmbedUrl(url);

    if (!embedUrl) {
      return;
    }

    setActiveVideo({ url: embedUrl, title });
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const handleWelcomeClose = () => {
    setIsWelcomeClosing(true);
    window.setTimeout(() => {
      setShowWelcome(false);
      setIsWelcomeClosing(false);
    }, 150);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  const footerDate = currentTime.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const footerClockLabel = `${hours}:${minutes}:${seconds}`;
  const showSidebarSkills = location.pathname === "/";

  return (
    <>
      <Particles theme={theme} />

      <div className={`theme-icon ${theme} icon-style-aesthetic-adjustment`}>
        {theme === "dark" ? "\u{1F319}" : "\u2600\uFE0F"}
      </div>

      <div className="container">
        <SiteHeader
          cvHref={cvHref}
          displayText={displayText}
          theme={theme}
          setTheme={setTheme}
        />

        <SidebarInfo showSkills={showSidebarSkills} />

        <div className="right-column">
          <Outlet context={{ theme, handleOpenVideo }} />
        </div>

        <footer>
          <div className="footer-copy">
            <b className="graciasxv">Gracias por visitarme</b>
            <br />
            <b>(c) Arturo Juarez Monroy - Hecho con React, Vue y Firebase</b>
          </div>
        </footer>

        <div className="footeradios">
          <img
            src={avatarfooter}
            alt="Avatar de despedida"
            className="avatar3"
          />
        </div>
      </div>

      <div
        className="footer-clock"
        aria-label={`Hora local del usuario: ${footerClockLabel}`}
      >
        <span className="footer-clock__label">Hora</span>
        <div className="footer-clock__display" aria-hidden="true">
          <span className="footer-clock__segment">{hours}</span>
          <span className="footer-clock__separator">:</span>
          <span className="footer-clock__segment">{minutes}</span>
          <span className="footer-clock__separator">:</span>
          <span className="footer-clock__segment">{seconds}</span>
        </div>
        <span className="footer-clock__meta">{footerDate}</span>
      </div>

      {showRocket && (
        <div
          className="rocket-button"
          onClick={scrollToTop}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              scrollToTop();
            }
          }}
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

          <div
            className="absolute inset-0
               bg-gradient-to-r from-blue-900 via-green-900 to-blue-900
               opacity-40
               blur-3xl
               rounded-lg
               pointer-events-none
               animate-gradient-x"
          ></div>
          <div className="welcome-screen">
            <p className="welcome-kicker">
              Curriculum y portafolio de proyectos
            </p>
            <h1 className="welcome-title">Bienvenido</h1>
            <p className="welcome-text">Soy Arturo Juarez Monroy</p>
            <button className="btn welcome-cta" onClick={handleWelcomeClose}>
              Entrar
              <div className="face">
                <div className="eye left"></div>
                <div className="eye right"></div>
                <div className="mouth"></div>
              </div>
            </button>

            <img
              src={avatarwelcome}
              alt="Avatar de bienvenida"
              className="avatarwelcome"
            />
            <img
              src={avatarwelcomehover}
              alt="Avatar secundario de bienvenida"
              className="avatarwelcome avatarwelcomehover"
            />
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
