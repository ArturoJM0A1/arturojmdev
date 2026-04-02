import { useState, useEffect, useRef } from "react";
import "./DevStackPulse.css";

const LANG_SET = {
  REACT: { name: "React", icon: "\u269B", bg: "#61dafb", adoption: 98.0, change: 2.5, seed: 42 },
  JS: { name: "JavaScript", icon: "JS", bg: "#f7df1e", adoption: 100.0, change: 0.8, seed: 23 },
  TAILWIND: { name: "Tailwind", icon: "T", bg: "#38bdf8", adoption: 89.0, change: 5.2, seed: 56 },
  SQL: { name: "SQL", icon: "Q", bg: "#e38c2c", adoption: 92.0, change: 1.2, seed: 11 },
  JAVA: { name: "Java", icon: "J", bg: "#b07219", adoption: 87.0, change: 0.9, seed: 37 },
  PYTHON: { name: "Python", icon: "Py", bg: "#3776ab", adoption: 99.0, change: 3.4, seed: 91 },
};

const getAccentColor = (isDarkMode) => isDarkMode ? "#00ff88" : "#2563eb";

const ORDERED_KEYS = ["REACT", "JS", "TAILWIND", "SQL", "JAVA", "PYTHON"];

function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function genAdoptionPath(langKey, tf = "1D") {
  const lang = LANG_SET[langKey];
  const rng = seededRng(lang.seed + (tf === "1D" ? 100 : 200));
  const pointsCount = 80;
  const pts = [];
  let currentVal = lang.adoption * (1 - 0.04 - rng() * 0.04);
  const drift = lang.change / 100 / pointsCount;
  for (let i = 0; i < pointsCount; i++) {
    currentVal += currentVal * drift + currentVal * (rng() - 0.5) * 0.018;
    pts.push(Math.max(0.5, currentVal));
  }
  pts.push(lang.adoption);
  return pts;
}

function ptsToCoords(pts, W, H, pad = 12) {
  const mn = Math.min(...pts);
  const mx = Math.max(...pts);
  const range = mx - mn || 1;
  return pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * W;
    const y = pad + (1 - (p - mn) / range) * (H - pad * 2);
    return [x, y];
  });
}

function buildSvgPath(coords) {
  return coords.map((c, i) => (i === 0 ? `M${c[0]},${c[1]}` : `L${c[0]},${c[1]}`)).join(" ");
}

export default function DevStackPulse() {
  const [activeLang, setActiveLang] = useState("REACT");
  const [adoptions, setAdoptions] = useState(() => ({
    REACT: 98.0, JS: 100.0, TAILWIND: 89.0, SQL: 92.0, JAVA: 87.0, PYTHON: 99.0
  }));
  const [points, setPoints] = useState(() => genAdoptionPath("REACT"));
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, adoption: 0, time: "" });
  const [chartWidth, setChartWidth] = useState(680);
  const [isDark, setIsDark] = useState(() => document.body.classList.contains("dark-mode"));
  const chartRef = useRef(null);
  const intervalRef = useRef(null);

  const computedCoords = ptsToCoords(points, chartWidth, 200);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth || 680);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAdoptions((prev) => {
        const currentAdoption = prev[activeLang];
        const volatility = 0.00068;
        const drift = (Math.random() - 0.49) * currentAdoption * volatility;
        let newAdoption = currentAdoption + drift;
        newAdoption = Math.min(Math.max(newAdoption, 15), 125);
        return { ...prev, [activeLang]: parseFloat(newAdoption.toFixed(2)) };
      });
      setPoints((_prev) => {
        const newAdoption = adoptions[activeLang];
        return [..._prev.slice(1), newAdoption];
      });
    }, 2400);
    return () => clearInterval(intervalRef.current);
  }, [activeLang, adoptions]);

  const handleTabClick = (key) => {
    setActiveLang(key);
  };

  const handleMouseMove = (e) => {
    if (!chartRef.current || computedCoords.length === 0) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const W = rect.width;
    const idx = Math.min(Math.round((x / W) * (computedCoords.length - 1)), computedCoords.length - 1);
    const [, cy] = computedCoords[idx] || [0, 0];
    const yPx = (cy / 200) * rect.height;
    const adoptionVal = points[idx];
    const hoursOffset = Math.floor(((computedCoords.length - 1 - idx) * 24) / computedCoords.length);
    setTooltip({
      visible: true,
      x: Math.min(x + 16, rect.width - 150),
      y: Math.max(yPx - 38, 6),
      adoption: adoptionVal,
      time: hoursOffset === 0 ? "Ahora" : `${hoursOffset}h atras`,
    });
  };

  const handleMouseLeave = () => setTooltip((prev) => ({ ...prev, visible: false }));

  const lang = LANG_SET[activeLang];
  const accentColor = getAccentColor(isDark);
  const gradId = `grad_${activeLang}`;

  const pathD = buildSvgPath(computedCoords);
  const last = computedCoords[computedCoords.length - 1] || [0, 0];
  const currentAdoption = adoptions[activeLang];
  const currentChange = LANG_SET[activeLang].change;

  return (
    <div className="devstack-pulse">
      <div className="devstack-pulse__widget">
        <div className="devstack-pulse__hdr">
          <div className="devstack-pulse__hdr-left">
            <div className="devstack-pulse__token-icon" style={{ background: lang.bg }}>
              {lang.icon}
            </div>
            <div>
              <div className="devstack-pulse__sym">{activeLang === "JS" ? "JavaScript" : lang.name}</div>
              <div className="devstack-pulse__name">
                {lang.name} <span className="devstack-pulse__live-dot" /> Adopcion en vivo
              </div>
            </div>
          </div>
          <div className="devstack-pulse__hdr-right">
            <div className="devstack-pulse__price">{currentAdoption.toFixed(1)}</div>
            <div className="devstack-pulse__delta">&#9650; +{Math.abs(currentChange).toFixed(2)}%</div>
          </div>
        </div>

        <div className="devstack-pulse__tabs">
          {ORDERED_KEYS.map((key) => {
            const l = LANG_SET[key];
            const labels = { REACT: "React", JS: "JS", TAILWIND: "Tailwind", SQL: "SQL", JAVA: "Java", PYTHON: "Python" };
            return (
              <button
                key={key}
                className={`devstack-pulse__tab ${activeLang === key ? "active" : ""}`}
                onClick={() => handleTabClick(key)}
              >
                <span className="devstack-pulse__tab-icon" style={{ background: l.bg, color: key === "JS" ? "#1e1e30" : "#fff" }}>
                  {l.icon}
                </span>
                {labels[key]}
              </button>
            );
          })}
        </div>

        <div
          className="devstack-pulse__chart-wrap"
          ref={chartRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <svg className="devstack-pulse__chart-svg" viewBox="0 0 680 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
                <stop offset="70%" stopColor={accentColor} stopOpacity="0.08" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </linearGradient>
              <filter id="glowLine">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {[0.25, 0.5, 0.75].map((y) => (
              <line key={y} x1="0" y1={y * 200} x2="680" y2={y * 200} className="devstack-pulse__grid-line" />
            ))}
            {pathD && (
              <>
                <path d={`${pathD} L${last[0]},200 L0,200 Z`} fill={`url(#${gradId})`} />
                <path d={pathD} fill="none" stroke={accentColor} strokeWidth="2.4" opacity="0.95" filter="url(#glowLine)" />
                <circle cx={last[0]} cy={last[1]} r="4.5" fill={accentColor} stroke="#05080f" strokeWidth="1.2" />
                <circle cx={last[0]} cy={last[1]} r="10" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.45" className="devstack-pulse__pulse-ring" />
              </>
            )}
          </svg>

          <div className="devstack-pulse__crosshair-line" style={{ left: tooltip.visible ? `${(tooltip.x / chartWidth) * 100}%` : 0, opacity: tooltip.visible ? 1 : 0 }} />
          <div className="devstack-pulse__crosshair-dot" style={{ left: `${(last[0] / 680) * 100}%`, top: `${(last[1] / 200) * 100}%`, opacity: tooltip.visible ? 1 : 0 }} />

          <div
            className="devstack-pulse__tooltip"
            style={{ left: tooltip.x, top: tooltip.y, opacity: tooltip.visible ? 1 : 0 }}
          >
            <div className="devstack-pulse__tooltip-price">Adopcion: {tooltip.adoption?.toFixed(1)}</div>
            <div className="devstack-pulse__tooltip-time">{tooltip.time}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
