import { useEffect, useRef } from "react";
import PageIntro from "../components/PageIntro.jsx";

const CURRENT_BACKGROUND_IMAGE = "22.jpg";

export default function CurrentlyPage() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const section = parallaxRef.current;

    if (!section) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotionQuery.matches) {
      section.style.setProperty("--current-parallax-y", "0px");
      section.style.setProperty("--current-parallax-scale", "1.08");
      return undefined;
    }

    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      const offset = (0.5 - clampedProgress) * 84;
      const scale = 1.14 - clampedProgress * 0.06;

      section.style.setProperty("--current-parallax-y", `${offset.toFixed(2)}px`);
      section.style.setProperty(
        "--current-parallax-scale",
        scale.toFixed(3)
      );
    };

    const requestParallaxUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateParallax);
      }
    };

    requestParallaxUpdate();

    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="page-stack currently-page">
      <PageIntro
        eyebrow="Ahora"
        title="Actualmente"
        description="Una vista rapida de las areas en las que estoy invirtiendo tiempo y energia en esta etapa."
      />

      <section
        className="current-focus"
        ref={parallaxRef}
        style={{ "--current-image": `url("${CURRENT_BACKGROUND_IMAGE}")` }}
        aria-labelledby="current-focus-title"
      >
        <div className="current-focus__visual" aria-hidden="true">
          <div className="current-focus__image"></div>
          <div className="current-focus__mesh"></div>
          <div className="current-focus__grid"></div>
        </div>

        <div className="current-focus__content">
          <div className="current-focus__lead">
            <span className="current-focus__label">En construccion</span>
            <h3 id="current-focus-title">
              Estoy fortaleciendo mi perfil con aprendizaje continuo.
            </h3>
            <p>
              Por ahora esta seccion resume dos frentes que estoy trabajando
              activamente y que despues podre ampliar con mas estudios,
              actividades o proyectos.
            </p>
          </div>

          <div className="current-focus__cards">
            <article className="current-focus__card">
              <span className="current-focus__card-tag">Aprendizaje actual</span>
              <h4>Ciencia de datos</h4>
              <p>
                Estoy aprendiendo ciencia de datos para comprender mejor el
                analisis, la interpretacion y el uso practico de la informacion.
              </p>
            </article>

            <article className="current-focus__card">
              <span className="current-focus__card-tag">Desarrollo personal</span>
              <h4>Ingles</h4>
              <p>
                Estoy mejorando mi ingles para comunicar ideas tecnicas con mas
                claridad y abrir mas oportunidades de colaboracion.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}