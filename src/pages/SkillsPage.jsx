import PageIntro from "../components/PageIntro.jsx";
import SkillsContent from "../components/SkillsContent.jsx";

export default function SkillsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Perfil"
        title="Habilidades"
        description="Mis habilidades tecnicas y personales para revisar con mas detalle el perfil que acompana mis proyectos."
      />

      <SkillsContent variant="page" />
    </div>
  );
}
