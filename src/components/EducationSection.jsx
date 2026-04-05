import EducationBadge from "./EducationBadge.jsx";

export default function EducationSection() {
  return (
    <section className="education">
      <h3>Educacion</h3>
      <div className="education-item">
        <div className="education-copy">
          <h4>Ingeniería en Software</h4>
          <p>Universidad Autonoma del Estado de Hidalgo (2020 - 2024)</p>
        </div>
        <EducationBadge />
      </div>
    </section>
  );
}