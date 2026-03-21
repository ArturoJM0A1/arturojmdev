export default function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="page-intro">
      <span className="page-intro__eyebrow">{eyebrow}</span>
      <h3 className="page-intro__title">{title}</h3>
      <p className="page-intro__description">{description}</p>
    </section>
  );
}
