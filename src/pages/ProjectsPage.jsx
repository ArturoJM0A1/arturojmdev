import { useOutletContext } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";
import ProjectsSection from "../components/ProjectsSection.jsx";

export default function ProjectsPage() {
  const { theme, handleOpenVideo } = useOutletContext();

  return (
    <div className="page-stack">
      <ProjectsSection theme={theme} onOpenVideo={handleOpenVideo} />
    </div>
  );
}
