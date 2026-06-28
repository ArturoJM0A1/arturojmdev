import { useEffect, useRef, useState } from "react";
import certificationFiles from "virtual:certifications";

const basePath = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const stripImageExtensions = (fileName) =>
  fileName.replace(/(?:\.(?:png|jpe?g|webp|avif|gif|svg))+$/i, "");

const formatAltText = (fileName) => {
  const nameWithoutExtension = stripImageExtensions(fileName);
  return nameWithoutExtension
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const categories = Object.entries(certificationFiles);
let globalIdx = 0;
const categorySlides = categories.map(([categoryName, files]) => {
  const slides = files.map((fileName) => {
    const idx = globalIdx++;
    return {
      id: `${categoryName}-${fileName}`,
      fileName,
      displayName: stripImageExtensions(fileName),
      image: `${basePath}certificadosyreconocimientos/${encodeURIComponent(categoryName)}/${encodeURIComponent(fileName)}`,
      alt: formatAltText(fileName),
      globalIndex: idx,
    };
  });
  return { categoryName, slides };
});

function CategoryCarousel({ categoryName, slides, activeCertification, setActiveCertification }) {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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
    <div className="certifications-carousel">
      {slides.length > 0 && (
        <button
          type="button"
          className="certifications-nav certifications-nav--prev"
          onClick={() => handleScroll(-1)}
          disabled={!canScrollPrev}
          aria-label="Mostrar certificaciones anteriores"
        />
      )}

      <div className="certifications-track mask-luminance mask-r-from-white mask-r-from-80% mask-r-to-black" ref={trackRef}>
        {slides.length > 0 ? (
          slides.map(({ id, displayName, image, alt, globalIndex }) => (
            <article className="certifications-slide" key={id}>
              <div className="certifications-frame">
                <span className="cert-badge">{String(globalIndex + 1).padStart(2, "0")}</span>
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
            Sin certificados en esta categoria.
          </article>
        )}
      </div>

      {slides.length > 0 && (
        <button
          type="button"
          className="certifications-nav certifications-nav--next"
          onClick={() => handleScroll(1)}
          disabled={!canScrollNext}
          aria-label="Mostrar más certificaciones"
        />
      )}
    </div>
  );
}

console.log("Certificaciones cargadas:", categorySlides.flatMap(c => c.slides).map(s => `${String(s.globalIndex + 1).padStart(2, "0")} - ${s.displayName}`));

export default function CertificationsCarousel() {
  const [activeCertification, setActiveCertification] = useState(null);

  useEffect(() => {
    if (!activeCertification) return;

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

  return (
    <section
      id="certifications-section"
      data-menu-section="true"
      className="certifications-section"
    >
      <h3>Certificaciones y reconocimientos</h3>

      {categorySlides.length > 0 ? (
        categorySlides.map(({ categoryName, slides }) => (
          <div key={categoryName} className="certifications-category">
            <h4 className="certifications-category__title">{categoryName}</h4>
            <CategoryCarousel
              categoryName={categoryName}
              slides={slides}
              activeCertification={activeCertification}
              setActiveCertification={setActiveCertification}
            />
          </div>
        ))
      ) : (
        <article className="certifications-empty" aria-live="polite">
          Agrega imagenes a `public/certificadosyreconocimientos` para
          mostrarlas aqui.
        </article>
      )}

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
