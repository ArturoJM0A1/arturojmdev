import { useEffect, useRef, useState } from "react";

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function RecommendationCard({ recommendation }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`recommendation-card ${visible ? "recommendation-card--visible" : ""}`}
      role="article"
      aria-label={`Recomendación de ${recommendation.name}`}
    >
      <div className="recommendation-card__header">
        <div className="recommendation-card__avatar">
          {recommendation.name
            .split(" ")
            .filter((_, i) => i === 0)
            .map((w) => w[0])
            .join("")
            .toUpperCase() || "?"}
        </div>
        <div className="recommendation-card__meta">
          <strong className="recommendation-card__name">
            {recommendation.name}
          </strong>
          <span className="recommendation-card__relation">
            {recommendation.headline}
          </span>
          <span className="recommendation-card__date">
            {recommendation.date
              ? formatDate(recommendation.date)
              : ""}
          </span>
        </div>
      </div>

      <div className="recommendation-card__body">
        <p className="recommendation-card__text">
          <span className="recommendation-card__quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          {recommendation.text}
          <span className="recommendation-card__quote-mark" aria-hidden="true">
            &rdquo;
          </span>
        </p>
      </div>

      {recommendation.linkedinUrl && (
        <a
          href={recommendation.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="recommendation-card__linkedin"
        >
          Ver en LinkedIn
        </a>
      )}
    </div>
  );
}

export default RecommendationCard;
