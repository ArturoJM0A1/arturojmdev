import { useState, useEffect, useRef } from "react";
import "./DevStackPulse.css";

const LANG_SET = [
  { id: "JS", name: "JavaScript", icon: "JS", bg: "#f7df1e", experience: 73 },
  { id: "REACT", name: "React", icon: "R", bg: "#61dafb", experience: 70 },
  { id: "SQL", name: "SQL", icon: "Q", bg: "#e38c2c", experience: 64 },
  { id: "TAILWIND", name: "Tailwind", icon: "T", bg: "#38bdf8", experience: 60 },
  { id: "JAVA", name: "Java", icon: "J", bg: "#b07219", experience: 56 },
  { id: "PYTHON", name: "Python", icon: "Py", bg: "#3776ab", experience: 42 },
];

const getAccentColor = (isDarkMode) => isDarkMode ? "#00ff88" : "#2563eb";

export default function DevStackPulse() {
  const [isDark, setIsDark] = useState(() => document.body.classList.contains("dark-mode"));
  const [hoveredLang, setHoveredLang] = useState(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const accentColor = getAccentColor(isDark);
  const sortedLangs = [...LANG_SET].sort((a, b) => b.experience - a.experience);

  return (
    <div className="devstack-pulse">
      <div className="devstack-pulse__widget">
        <div className="devstack-pulse__hdr">
          <div className="devstack-pulse__hdr-left">
            <div className="devstack-pulse__token-icon" style={{ background: accentColor }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: "22px" }}>R</span>
            </div>
            <div>
              <div className="devstack-pulse__sym">Experiencia</div>
              <div className="devstack-pulse__name">
                Nivel tecnico <span className="devstack-pulse__live-dot" />
              </div>
            </div>
          </div>
          <div className="devstack-pulse__hdr-right">
            <div className="devstack-pulse__total">{sortedLangs[0].experience}%</div>
            <div className="devstack-pulse__delta">Max: {sortedLangs[0].name}</div>
          </div>
        </div>

        <div className="devstack-pulse__chart-wrap">
          {sortedLangs.map((lang, index) => (
            <div
              key={lang.id}
              className={`devstack-pulse__bar-row ${hoveredLang === lang.id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredLang(lang.id)}
              onMouseLeave={() => setHoveredLang(null)}
            >
              <div className="devstack-pulse__bar-label">
                <div className="devstack-pulse__bar-icon" style={{ background: lang.bg }}>
                  <span style={{ 
                    color: lang.id === "JS" ? "#1e1e30" : "#fff",
                    fontWeight: 900,
                    fontSize: lang.id === "PYTHON" ? "8px" : "11px"
                  }}>
                    {lang.icon}
                  </span>
                </div>
                <span className="devstack-pulse__lang-name">{lang.name}</span>
              </div>
              
              <div className="devstack-pulse__bar-track">
                <div
                  className="devstack-pulse__bar-fill"
                  style={{
                    width: `${lang.experience}%`,
                    background: lang.bg,
                    boxShadow: `0 0 12px ${lang.bg}60`,
                  }}
                />
                <div
                  className="devstack-pulse__bar-glow"
                  style={{
                    left: `${lang.experience}%`,
                    background: `linear-gradient(90deg, transparent, ${lang.bg}80)`,
                  }}
                />
              </div>
              
              <div className="devstack-pulse__bar-value" style={{ color: lang.bg }}>
                {lang.experience}%
              </div>
            </div>
          ))}
        </div>

        <div className="devstack-pulse__legend">
          <span className="devstack-pulse__legend-item">
            <span className="devstack-pulse__legend-dot" style={{ background: accentColor }} />
            Escala: 0-100%
          </span>
        </div>
      </div>
    </div>
  );
}
