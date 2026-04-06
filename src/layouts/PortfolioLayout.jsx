import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../App.css";
import "../cohetegoup.css";
import avatarwelcome from "../../public/avatar2.png";
import avatarwelcomehover from "../../public/avatar5.png";
import avatarfooter from "../../public/avatar5.png";
import Particles from "../particulasfondo.jsx";
import GhostCursor from "../components/GhostCursor.jsx";
import SidebarInfo from "../components/SidebarInfo.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import { scrollToSection } from "../menuNavigation.js";

const pageTitles = {
  "/": "Inicio",
  "/sobre-mi": "Sobre mi",
  "/actualmente": "Actualmente",
  "/habilidades": "Habilidades",
  "/proyectos": "Proyectos",
  "/certificaciones": "Certificaciones",
  "/comentarios": "Comentarios",
  "/contacto": "Contacto",
};

const fullText = "Ingeniería en Software";

const basePath = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const cvHref = `${basePath}${encodeURIComponent("JuarezMonroyArturo CV.pdf")}`;
const portfolioTrackHref = `${basePath}${encodeURIComponent("music.mp3")}`;
const bladerunnerGifHref = `${basePath}${encodeURIComponent("blade runner joi.gif")}`;

function ThemeGlyph({ theme }) {
  if (theme === "dark") {
    return (
      <svg
        className="theme-icon__svg mask-l-from-50% mask-l-to-90%"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <defs>
          {/* Base ligeramente c?lida */}
          <radialGradient id="moon-base" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fffdf4" />
            <stop offset="55%" stopColor="#e8e3c8" />
            <stop offset="100%" stopColor="#9c9a8f" />
          </radialGradient>

          {/* Sombra */}
          <radialGradient id="moon-shadow" cx="75%" cy="55%" r="65%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
          </radialGradient>

          {/* Textura (ruido) */}
          <filter
            id="moon-texture"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.18" />
            </feComponentTransfer>
          </filter>

          {/* CLIP para evitar el cuadro */}
          <clipPath id="moon-clip">
            <circle cx="200" cy="200" r="100" />
          </clipPath>
        </defs>

        {/* Base */}
        <circle cx="200" cy="200" r="100" fill="url(#moon-base)" />

        {/* Textura recortada (SIN cuadro) */}
        <g clipPath="url(#moon-clip)">
          <rect
            x="100"
            y="100"
            width="200"
            height="200"
            filter="url(#moon-texture)"
          />
        </g>

        {/* Cr?teres con volumen */}
        <g>
          <circle cx="265" cy="230" r="24" fill="#6f6e66" />
          <circle cx="258" cy="223" r="24" fill="#d8d2b5" opacity="0.55" />

          <circle cx="235" cy="175" r="15" fill="#66655e" />
          <circle cx="230" cy="170" r="15" fill="#e6e0c2" opacity="0.55" />

          <circle cx="285" cy="155" r="9" fill="#5f5e58" />
          <circle cx="281" cy="151" r="9" fill="#f0ead0" opacity="0.6" />

          <circle cx="215" cy="260" r="18" fill="#6b6a63" />
          <circle cx="210" cy="255" r="18" fill="#e0dabd" opacity="0.55" />
        </g>

        {/* Manchas lunares */}
        <g opacity="0.15" fill="#000">
          <circle cx="180" cy="210" r="45" />
          <circle cx="250" cy="260" r="35" />
          <circle cx="260" cy="190" r="28" />
        </g>

        {/* Sombra */}
        <circle cx="200" cy="200" r="100" fill="url(#moon-shadow)" />

        {/* Luz */}
        <ellipse cx="165" cy="155" rx="35" ry="22" fill="#fff" opacity="0.08" />
      </svg>
    );
  }

  return (
    <svg className="theme-icon__svg" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        {/* N?cleo del sol */}
        <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#fff4a3" />
          <stop offset="55%" stopColor="#ffd54a" />
          <stop offset="80%" stopColor="#ff9a1f" />
          <stop offset="100%" stopColor="#ff5a00" />
        </radialGradient>

        {/* Glow */}
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#ffd54a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff8c00" stopOpacity="0" />
        </radialGradient>

        {/* Textura */}
        <filter id="sun-texture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
          />
          <feDisplacementMap in="SourceGraphic" scale="6" />
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>

      {/* Glow m?s grande */}
      <circle cx="100" cy="100" r="95" fill="url(#sun-glow)" />

      {/* Sol principal (MUCHO m?s grande) */}
      <circle
        cx="100"
        cy="100"
        r="89"
        fill="url(#sun-core)"
        filter="url(#sun-texture)"
      />

      {/* Centro brillante */}
      <circle cx="100" cy="100" r="40" fill="#ffffff" opacity="0.2" />
    </svg>
  );
}

export default function PortfolioLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState("dark");
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWelcomeClosing, setIsWelcomeClosing] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    document.documentElement.lang = "es";
  }, []);

  useEffect(() => {
    const sectionTitle = pageTitles[location.pathname] ?? "Portafolio";
    document.title = `Arturo Juárez Monroy | ${sectionTitle}`;
  }, [location.pathname]);

  useEffect(() => {
    const scrollTarget = location.state?.scrollTarget;

    if (!scrollTarget) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return undefined;
    }

    let frameId = 0;
    let attempts = 0;

    const scrollWhenReady = () => {
      if (scrollToSection(scrollTarget)) {
        return;
      }

      if (attempts >= 120) {
        return;
      }

      attempts += 1;
      frameId = window.requestAnimationFrame(scrollWhenReady);
    };

    frameId = window.requestAnimationFrame(scrollWhenReady);

    return () => window.cancelAnimationFrame(frameId);
  }, [location.key, location.pathname, location.state]);

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
    if (typeof Audio === "undefined") {
      return undefined;
    }

    const portfolioAudio = new Audio(portfolioTrackHref);
    portfolioAudio.preload = "auto";
    audioRef.current = portfolioAudio;

    const syncAudioState = () => {
      setIsAudioPlaying(!portfolioAudio.paused && !portfolioAudio.ended);
    };

    portfolioAudio.addEventListener("play", syncAudioState);
    portfolioAudio.addEventListener("pause", syncAudioState);
    portfolioAudio.addEventListener("ended", syncAudioState);

    return () => {
      portfolioAudio.pause();
      portfolioAudio.currentTime = 0;
      portfolioAudio.removeEventListener("play", syncAudioState);
      portfolioAudio.removeEventListener("pause", syncAudioState);
      portfolioAudio.removeEventListener("ended", syncAudioState);

      if (audioRef.current === portfolioAudio) {
        audioRef.current = null;
      }
    };
  }, []);

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

  const playPortfolioTrack = async () => {
    const portfolioAudio = audioRef.current;

    if (!portfolioAudio) {
      return;
    }

    if (portfolioAudio.ended) {
      portfolioAudio.currentTime = 0;
    }

    try {
      await portfolioAudio.play();
    } catch {
      // If autoplay is blocked, the visible Play button still lets the user start it manually.
    }
  };

  const pausePortfolioTrack = () => {
    const portfolioAudio = audioRef.current;

    if (!portfolioAudio) {
      return;
    }

    portfolioAudio.pause();
  };

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

    pausePortfolioTrack();
    setActiveVideo({ url: embedUrl, title });
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const handleWelcomeClose = () => {
    void playPortfolioTrack();
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

  if (showWelcome) {
    return (
      <>
        <Particles theme={theme} />
        <GhostCursor />

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
            <svg fill="none">
              <path d="M 64 160 C 46.327 160 32 174.327 32 192 C 32 209.673 46.327 224 64 224 C 81.673 224 96 209.673 96 192 L 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 Z M 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 L 160 192 C 160 209.673 174.327 224 192 224 C 209.673 224 224 209.673 224 192 C 224 174.327 209.673 160 192 160 Z M 64 0 C 99.346 0 128 28.654 128 64 L 96 64 C 96 46.327 81.673 32 64 32 C 46.327 32 32 46.327 32 64 C 32 81.673 46.327 96 64 96 L 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 L 192 96 C 209.673 96 224 81.673 224 64 C 224 46.327 209.673 32 192 32 C 174.327 32 160 46.327 160 64 L 128 64 C 128 28.654 156.654 0 192 0 Z"></path>
            </svg>
            <p className="welcome-kicker">
              Curriculum y portafolio de proyectos
            </p>
            <h1 className="welcome-title">Bienvenido</h1>
            <p className="welcome-text">Soy Arturo Juárez Monroy</p>
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
      </>
    );
  }

  return (
    <>
      <Particles theme={theme} />
      <GhostCursor />

      <div
        className={`theme-icon ${theme} icon-style-aesthetic-adjustment`}
        aria-hidden="true"
      >
        <ThemeGlyph theme={theme} />
      </div>

      <div className="container">
        <SiteHeader
          cvHref={cvHref}
          displayText={displayText}
          theme={theme}
          setTheme={setTheme}
        />

        <SidebarInfo
          showSkills={showSidebarSkills}
          isAudioPlaying={isAudioPlaying}
          onPlayAudio={() => {
            void playPortfolioTrack();
          }}
          onPauseAudio={pausePortfolioTrack}
        />

        <div className="right-column">
          <Outlet context={{ theme, handleOpenVideo }} />
        </div>

        <footer>
          <div className="footer-copy">
            <b className="graciasxv">Gracias por visitarme</b>
            <br />
            <b>(c) Arturo Juárez Monroy - Hecho con React, Vue y Firebase</b>
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

      <div className="footer-clock-stack">
        <div className="footer-clock__visual" aria-hidden="true">
          <img
            src={bladerunnerGifHref}
            alt=""
            className="footer-clock__gif"
          />
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



