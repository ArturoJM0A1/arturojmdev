import { useId, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function EducationBadge() {
  const rootRef = useRef(null);
  const floatRef = useRef(null);
  const haloRef = useRef(null);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const coreGlowRef = useRef(null);
  const capRef = useRef(null);
  const tasselRef = useRef(null);
  const diplomaRef = useRef(null);
  const sparkRefs = useRef([]);

  sparkRefs.current = [];

  const iconId = useId().replace(/:/g, "");
  const ringGradientId = `${iconId}-ring-gradient`;
  const capGradientId = `${iconId}-cap-gradient`;
  const scrollGradientId = `${iconId}-scroll-gradient`;
  const auraGradientId = `${iconId}-aura-gradient`;
  const coreGradientId = `${iconId}-core-gradient`;
  const glowFilterId = `${iconId}-glow-filter`;

  const registerSpark = (node) => {
    if (node) {
      sparkRefs.current.push(node);
    }
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Separate loops keep the emblem feeling alive without looking mechanical.
      gsap.to(floatRef.current, {
        y: -4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(haloRef.current, {
        scale: 1.08,
        opacity: 0.92,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      gsap.to(coreGlowRef.current, {
        scale: 1.12,
        opacity: 0.88,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 16,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(capRef.current, {
        y: -3,
        rotation: -2.4,
        transformOrigin: "50% 58%",
        duration: 1.85,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(tasselRef.current, {
        rotation: 14,
        transformOrigin: "82px 46px",
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(diplomaRef.current, {
        x: -1.4,
        y: 2.6,
        rotation: 1.5,
        transformOrigin: "60px 79px",
        duration: 2.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      sparkRefs.current.forEach((spark, index) => {
        gsap.to(spark, {
          opacity: index % 2 === 0 ? 0.34 : 1,
          scale: index % 2 === 0 ? 0.78 : 1.18,
          duration: 1.1 + index * 0.14,
          delay: index * 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="education-icon-shell" aria-hidden="true">
      <svg
        className="education-icon"
        viewBox="0 0 120 120"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={ringGradientId}
            x1="24"
            y1="22"
            x2="97"
            y2="98"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--education-primary)" />
            <stop offset="55%" stopColor="var(--education-secondary)" />
            <stop offset="100%" stopColor="var(--education-accent)" />
          </linearGradient>

          <linearGradient
            id={capGradientId}
            x1="32"
            y1="26"
            x2="89"
            y2="61"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--education-primary)" />
            <stop offset="100%" stopColor="var(--education-secondary)" />
          </linearGradient>

          <linearGradient
            id={scrollGradientId}
            x1="39"
            y1="72"
            x2="82"
            y2="87"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--education-surface)" />
            <stop offset="100%" stopColor="var(--education-surface-2)" />
          </linearGradient>

          <radialGradient
            id={auraGradientId}
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="var(--education-glow)" stopOpacity="0.9" />
            <stop
              offset="68%"
              stopColor="var(--education-secondary)"
              stopOpacity="0.16"
            />
            <stop
              offset="100%"
              stopColor="var(--education-secondary)"
              stopOpacity="0"
            />
          </radialGradient>

          <radialGradient
            id={coreGradientId}
            cx="50%"
            cy="42%"
            r="62%"
            fx="50%"
            fy="42%"
          >
            <stop offset="0%" stopColor="var(--education-surface)" stopOpacity="0.95" />
            <stop
              offset="100%"
              stopColor="var(--education-primary)"
              stopOpacity="0.14"
            />
          </radialGradient>

          <filter id={glowFilterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4.5" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g ref={haloRef} opacity="0.78" filter={`url(#${glowFilterId})`}>
          <circle cx="60" cy="60" r="40" fill={`url(#${auraGradientId})`} />
        </g>

        <g ref={outerRingRef}>
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={`url(#${ringGradientId})`}
            strokeWidth="2.8"
            strokeDasharray="6 10"
            strokeLinecap="round"
            opacity="0.98"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--education-shell)"
            strokeWidth="1.4"
            strokeDasharray="1 10"
            opacity="0.84"
          />
          <circle cx="60" cy="15" r="3" fill="var(--education-secondary)" />
          <circle cx="102" cy="60" r="2.8" fill="var(--education-accent)" />
          <circle cx="60" cy="105" r="2.8" fill="var(--education-primary)" />
          <circle cx="18" cy="60" r="2.8" fill="var(--education-secondary)" />
        </g>

        <g ref={innerRingRef} opacity="0.9">
          <circle
            cx="60"
            cy="60"
            r="34"
            fill="none"
            stroke="var(--education-shell)"
            strokeWidth="1.2"
          />
          <circle
            cx="60"
            cy="60"
            r="34"
            fill="none"
            stroke={`url(#${ringGradientId})`}
            strokeWidth="1.8"
            strokeDasharray="17 7 4 10"
            strokeLinecap="round"
          />
          <path
            d="M33 44.5c7.4 -8.7 16.7 -13 27 -13s19.6 4.3 27 13"
            fill="none"
            stroke="var(--education-shell)"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </g>

        <g ref={floatRef}>
          <ellipse
            ref={coreGlowRef}
            cx="60"
            cy="60"
            rx="20"
            ry="18"
            fill={`url(#${coreGradientId})`}
            opacity="0.65"
            filter={`url(#${glowFilterId})`}
          />

          <g ref={capRef}>
            <path
              d="M60 28L92 41.5L60 55L28 41.5L60 28Z"
              fill={`url(#${capGradientId})`}
              stroke="var(--education-outline)"
              strokeWidth="2.3"
              strokeLinejoin="round"
            />
            <path
              d="M43 49.5v10.5c0 4.8 8.1 9.1 17 9.1s17 -4.3 17 -9.1V49.5"
              fill={`url(#${coreGradientId})`}
              stroke="var(--education-outline)"
              strokeWidth="2.3"
              strokeLinejoin="round"
            />
            <path
              d="M82 45v14"
              fill="none"
              stroke="var(--education-accent)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            <g ref={tasselRef}>
              <circle cx="82" cy="46.5" r="2.5" fill="var(--education-accent)" />
              <path
                d="M82 48.5c2.5 3 4.8 6.1 4.8 10.8"
                fill="none"
                stroke="var(--education-accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M84.8 59.7h4.6"
                fill="none"
                stroke="var(--education-accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </g>

          <g ref={diplomaRef}>
            <rect
              x="39"
              y="71.5"
              width="42"
              height="14.5"
              rx="7.25"
              fill={`url(#${scrollGradientId})`}
              stroke="var(--education-outline)"
              strokeWidth="2.3"
            />
            <path
              d="M48 78.7h24"
              fill="none"
              stroke="rgba(15, 23, 42, 0.2)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 71.5v14.5"
              fill="none"
              stroke="var(--education-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M60 74l5.8 4.75L60 83.5l-5.8 -4.75L60 74Z"
              fill="var(--education-spark)"
              opacity="0.92"
            />
          </g>
        </g>

        <g filter={`url(#${glowFilterId})`}>
          <path
            ref={registerSpark}
            d="M23 28l2.2 5.1L30.3 35l-5.1 2.1L23 42.2l-2.1 -5.1L15.8 35l5.1 -1.9L23 28Z"
            fill="var(--education-spark)"
          />
          <path
            ref={registerSpark}
            d="M94 23l1.7 3.9L99.7 28l-4 1.7L94 33.7l-1.7 -4L88.3 28l4 -1.1L94 23Z"
            fill="var(--education-secondary)"
          />
          <path
            ref={registerSpark}
            d="M96 85l2.2 5.1L103.3 92l-5.1 2.1L96 99.2l-2.1 -5.1L88.8 92l5.1 -1.9L96 85Z"
            fill="var(--education-spark)"
          />
          <path
            ref={registerSpark}
            d="M25 88l1.5 3.4L30 92.5l-3.5 1.5L25 97.4 23.5 94 20 92.5l3.5 -1.1L25 88Z"
            fill="var(--education-primary)"
          />
        </g>
      </svg>
    </div>
  );
}