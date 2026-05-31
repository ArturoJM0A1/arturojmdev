import PageIntro from "../components/PageIntro.jsx";
import ExperienceSection from "../components/ExperienceSection.jsx";

export default function ExperiencePage() {
  return (
    <div className="page-stack experience-page">
      <PageIntro
        eyebrow="Trabajo"
        title="Experiencia"
        description="Roles profesionales y proyectos aplicados donde he trabajado con frontend, backend y plataformas web."
      />

      <ExperienceSection />
    </div>
  );
}
