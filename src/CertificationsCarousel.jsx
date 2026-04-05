import { useEffect, useRef, useState } from "react";
import certificationFiles from "virtual:certifications";

const basePath = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const stripImageExtensions = (fileName) =>
  fileName.replace(/(?:\.(?:png|jpe?g|webp|avif|gif|svg))+$/i, "");

const formatAltText = (fileName, index) => {
  const nameWithoutExtension = stripImageExtensions(fileName);
  const normalizedName = nameWithoutExtension
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalizedName || `Certificado ${index + 1}`;
};

const certificationSlides = certificationFiles.map((fileName, index) => ({
  id: `${fileName}-${index}`,
  fileName,
  displayName: stripImageExtensions(fileName),
  image: `${basePath}certificadosyreconocimientos/${encodeURIComponent(fileName)}`,
  alt: formatAltText(fileName, index),
}));

export default function CertificationsCarousel() {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeCertification, setActiveCertification] = useState(null);

  useEffect(() => {
    console.log("Certificaciones:", certificationSlides.map(c => c.displayName));

    const track = trackRef.current;
    if (!track) return undefined;

    const updateScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      setCanScrollPrev(track.scrollLeft > 8);
      setCanScrollNext(track.scrollLeft < maxScrollLeft - 8);
    };

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!activeCertification) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveCertification(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCertification]);

  const handleScroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const firstSlide = track.querySelector(".certifications-slide");
    const slideWidth =
      firstSlide?.getBoundingClientRect().width ?? track.clientWidth;
    const gap = parseFloat(
      window.getComputedStyle(track).columnGap ||
        window.getComputedStyle(track).gap ||
        "24",
    );

    track.scrollBy({
      left: direction * (slideWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="certifications-section"
      data-menu-section="true"
      className="certifications-section"
      aria-labelledby="certifications-title"
    >
      <h3 id="certifications-title">Certificaciones y reconocimientos</h3>

      <div className="certifications-carousel ">
        {certificationSlides.length > 0 && (
          <button
            type="button"
            className="certifications-nav certifications-nav--prev"
            onClick={() => handleScroll(-1)}
            disabled={!canScrollPrev}
            aria-label="Mostrar certificaciones anteriores"
          />
        )}

        <div className="certifications-track mask-luminance mask-r-from-white mask-r-from-80% mask-r-to-black" ref={trackRef}>
          {certificationSlides.length > 0 ? (
            certificationSlides.map(({ id, fileName, displayName, image, alt }, index) => (
              <article className="certifications-slide" key={id}>
                <div className="certifications-frame">
                  <span className="cert-badge">{String(index + 1).padStart(2, "0")}</span>
                  <button
                    type="button"
                    className="certifications-expand"
                    onClick={() => setActiveCertification({ image, alt })}
                    aria-label={`Abrir ${alt} en pantalla completa`}
                  >
                    <i className="fa-solid fa-maximize" aria-hidden="true"></i>
                  </button>
                  <img
                    className="certifications-image"
                    src={image}
                    alt={alt}
                    loading="lazy"
                  />
                </div>
                <p className="certifications-filename" title={displayName}>
                  {displayName}
                </p>
              </article>
            ))
          ) : (
            <article className="certifications-empty" aria-live="polite">
              Agrega imagenes a `public/certificadosyreconocimientos` para
              mostrarlas aqui.
            </article>
          )}
        </div>

        {certificationSlides.length > 0 && (
          <button
            type="button"
            className="certifications-nav certifications-nav--next"
            onClick={() => handleScroll(1)}
            disabled={!canScrollNext}
            aria-label="Mostrar más certificaciones"
          />
        )}
      </div>

      {activeCertification && (
        <div
          className="certifications-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeCertification.alt}
          onClick={() => setActiveCertification(null)}
        >
          <div
            className="certifications-modal__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="certifications-modal__close"
              onClick={() => setActiveCertification(null)}
              aria-label="Cerrar imagen"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>

            <div className="certifications-modal__frame">
              <img
                className="certifications-modal__image"
                src={activeCertification.image}
                alt={activeCertification.alt}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
