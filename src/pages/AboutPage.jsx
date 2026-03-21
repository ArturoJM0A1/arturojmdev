import AboutSection from "../components/AboutSection.jsx";
import EducationSection from "../components/EducationSection.jsx";
import PageIntro from "../components/PageIntro.jsx";

export default function AboutPage() {
  return (
    <div className="page-stack">
      <AboutSection />
      <EducationSection />
    </div>
  );
}
