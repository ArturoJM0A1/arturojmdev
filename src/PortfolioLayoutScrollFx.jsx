import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioLayout from "./layouts/PortfolioLayout.jsx";

gsap.registerPlugin(ScrollTrigger);

const getScrollAccent = (icon) => {
  const isCompactViewport = window.matchMedia("(max-width: 640px)").matches;
  const isDark = icon.classList.contains("dark");

  if (isDark) {
    return {
      x: isCompactViewport ? -2 : -5,
      y: isCompactViewport ? -10 : -18,
      rotate: isCompactViewport ? -2.4 : -4.5,
      scale: isCompactViewport ? 1.015 : 1.035,
    };
  }

  return {
    x: isCompactViewport ? 2 : 4,
    y: isCompactViewport ? -9 : -16,
    rotate: isCompactViewport ? 2.1 : 4,
    scale: isCompactViewport ? 1.02 : 1.04,
  };
};

const ensureMotionWrapper = (icon) => {
  let motionWrapper = icon.querySelector(".theme-icon__scroll-motion");
  const glyph = icon.querySelector(".theme-icon__svg");

  if (!motionWrapper && glyph?.parentElement) {
    motionWrapper = document.createElement("div");
    motionWrapper.className = "theme-icon__scroll-motion";
    glyph.parentElement.insertBefore(motionWrapper, glyph);
    motionWrapper.appendChild(glyph);
  }

  return motionWrapper;
};

export default function PortfolioLayoutScrollFx() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let cleanupAnimation = () => {};
    let iconObserver = null;
    let currentIcon = null;

    const destroyCurrentAnimation = () => {
      iconObserver?.disconnect();
      iconObserver = null;
      cleanupAnimation();
      cleanupAnimation = () => {};
      currentIcon = null;
    };

    const mountAnimation = () => {
      const icon = document.querySelector(".theme-icon");

      if (!icon) {
        destroyCurrentAnimation();
        return;
      }

      if (icon === currentIcon) {
        return;
      }

      destroyCurrentAnimation();

      const motionWrapper = ensureMotionWrapper(icon);

      if (!motionWrapper) {
        return;
      }

      currentIcon = icon;

      const ctx = gsap.context(() => {
        gsap.set(motionWrapper, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            start: "top top",
            end: "max",
            scrub: 1.35,
            invalidateOnRefresh: true,
          },
        }).to(
          motionWrapper,
          {
            x: () => getScrollAccent(icon).x,
            y: () => getScrollAccent(icon).y,
            rotate: () => getScrollAccent(icon).rotate,
            scale: () => getScrollAccent(icon).scale,
          },
          0,
        );
      }, icon);

      iconObserver = new MutationObserver((mutations) => {
        if (mutations.some((mutation) => mutation.attributeName === "class")) {
          ScrollTrigger.refresh();
        }
      });

      iconObserver.observe(icon, {
        attributes: true,
        attributeFilter: ["class"],
      });

      cleanupAnimation = () => {
        ctx.revert();
      };

      ScrollTrigger.refresh();
    };

    mountAnimation();

    const bodyObserver = new MutationObserver(() => {
      const icon = document.querySelector(".theme-icon");

      if (!icon) {
        destroyCurrentAnimation();
        return;
      }

      if (icon !== currentIcon) {
        mountAnimation();
      }
    });

    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      bodyObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      destroyCurrentAnimation();
    };
  }, []);

  return <PortfolioLayout />;
}
