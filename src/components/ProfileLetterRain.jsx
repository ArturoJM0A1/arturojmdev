import { useEffect, useRef } from "react";

const CHARS = "!@#$%^*(){}[]<>/\\|+-=*~";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ProfileLetterRain() {
  const rainRef = useRef(null);

  useEffect(() => {
    const root = rainRef.current;
    if (!root) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const spawnDrop = () => {
      const host = rainRef.current;
      if (!host) return;

      const width = host.clientWidth;
      if (!width) return;

      const drop = document.createElement("span");
      drop.className = "profile-rain__drop";
      drop.textContent = randomChar();
      drop.style.left = `${Math.floor(Math.random() * width)}px`;
      drop.style.fontSize = `${0.58 + Math.random() * 0.95}rem`;
      drop.style.animationDuration = `${1.05 + Math.random() * 0.9}s`;
      host.appendChild(drop);

      window.setTimeout(() => {
        drop.remove();
      }, 2200);
    };

    const intervalId = window.setInterval(spawnDrop, 50);
    return () => window.clearInterval(intervalId);
  }, []);

  return <div className="profile-rain" ref={rainRef} aria-hidden="true" />;
}
