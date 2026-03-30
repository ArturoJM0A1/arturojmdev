import skillsSpriteUrl from "../assets/sprite.svg?url";
import 'tailwindcss';
import 'tailwind-animations';
import "./../App.css"; 

const technicalSkillGroups = [
  {
    title: "Lenguajes",
    items: [
      { label: "JavaScript", icons: ["javascript"] },
      { label: "Python", icons: ["python"] },
      { label: "PHP", icons: ["php"] },
      { label: "Java", icons: ["openjdk"] },
      { label: "C", icons: ["c"] },
      { label: "C++", icons: ["cplusplus"] },
      { label: "SQL", icons: ["sql"] },
      { label: "TypeScript", icons: ["typescript"] },
    ],
  },
  {
    title: "Frameworks / Librerias",
    items: [
      { label: "React", icons: ["react"] },
      { label: "React Native", icons: ["reactnative"] },
      { label: "Astro", icons: ["astro"] },
      { label: "Next.js", icons: ["nextdotjs"] },
      { label: "Node.js", icons: ["nodedotjs"] },
      { label: "Firebase", icons: ["firebase"] },
      { label: "Vue", icons: ["vuedotjs"] },
      { label: "Tailwind CSS", icons: ["tailwindcss"] },
      { label: "Bootstrap", icons: ["bootstrap"] },
    ],
  },
  {
    title: "Otros",
    items: [
      { label: "MySQL Workbench", icons: ["mysql"] },
      { label: "WordPress", icons: ["wordpress"] },
      { label: "Power BI", icons: ["powerbi"] },
      { label: "Canvas", icons: ["canvas"] },
      { label: "3ds Max", icons: ["threedsmax"] },
      { label: "Unity", icons: ["unity"] },
      { label: "AutoCAD", icons: ["autocad"] },
      { label: "Excel", icons: ["excelexcel"] },
    ],
  },
];

const personalSkills = [
  {
    title: "Creatividad",
    description:
      "Encuentro maneras visuales y funcionales de resolver problemas.",
  },
  {
    title: "Adaptabilidad",
    description:
      "Me ajusto rapido a herramientas, equipos y flujos de trabajo.",
  },
  {
    title: "Enfoque en el detalle",
    description:
      "Cuido tanto la experiencia visual como el comportamiento del producto.",
  },
  {
    title: "Compromiso con la calidad",
    description: "Busco que cada entrega sea clara, estable y bien presentada.",
  },
  {
    title: "Resiliencia",
    description: "Mantengo constancia para iterar, mejorar y cerrar cada reto.",
  },
];

function SkillSpriteIcon({ icon, className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={`${className} fill-current stroke-current`}
      focusable="false"
    >
      <use
        href={`${skillsSpriteUrl}#icon-${icon}`}
        xlinkHref={`${skillsSpriteUrl}#icon-${icon}`}
      />
    </svg>
  );
}
function TechnicalSkillChip({ skill }) {
  return (
    <li className="group flex flex-col items-center justify-center min-h-[5.5rem] gap-2 rounded-[1.15rem] border border-sky-100/80 bg-white/90 px-3 py-3 text-center shadow-[0_20px_45px_-35px_rgba(14,116,144,0.45)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_28px_60px_-38px_rgba(37,99,235,0.42)] dark:border-emerald-400/15 dark:bg-slate-950/65 dark:hover:border-emerald-300/25 dark:hover:shadow-[0_28px_60px_-38px_rgba(16,185,129,0.35)]">
      {/* ICONOS */}
      <div className="flex -space-x-2 ">
        {skill.icons.map((icon) => (
          <span
            key={icon}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-100/70 bg-sky-50/85 text-sky-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition duration-300 group-hover:scale-[1.05] dark:border-emerald-400/15 dark:bg-emerald-400/10 dark:text-emerald-300"
          >
            <SkillSpriteIcon icon={icon} />
          </span>
        ))}
      </div>

      {/* LABEL */}
      <div className="w-full min-w-0">
        <span className="block text-sm font-semibold text-slate-800 dark:text-slate-50 break-words leading-tight">
          {skill.label}
        </span>
      </div>
    </li>
  );
}
export default function SkillsContent({ variant = "sidebar" }) {
  if (variant === "page") {
    return (
      <div className="skills-page">
        <section
          id="skills-section"
          data-menu-section="true"
          className="skills-spotlight"
        >
          <div className="skills-spotlight__copy">
            <span className="skills-spotlight__eyebrow">Stack principal</span>
            <h3>Habilidades Tecnicas</h3>
            <p className="skills-spotlight__description">
              Lenguajes, frameworks y herramientas con las que construyo
              interfaces, aplicaciones y soluciones de software.
            </p>
          </div>

          <div
            className="skills-spotlight__stats"
            aria-label="Resumen de habilidades"
          >
            <div className="skills-spotlight__stat">
              <span>
                Conjunto de tecnologias que forman la base de mi trabajo en el
                desarrollo de software.
              </span>
            </div>
          </div>
        </section>

        <div className="skills-page__columns">
          {technicalSkillGroups.map((group) => (
            <article key={group.title} className="skill-card">
              <div className="skill-card__header">
                <span className="skill-card__label">Area</span>
                <h4 className="mb-[20px]">{group.title}</h4>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 ">
                {group.items.map((item) => (
                  <TechnicalSkillChip key={item.label} skill={item} />
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="skills-soft-panel">
          <div className="skills-soft-panel__header">
            <span className="skills-soft-panel__eyebrow">Perfil humano</span>
            <h3>Habilidades Personales</h3>
            <p>
              Capacidades que me ayudan a colaborar, resolver retos y sostener
              una ejecucion consistente en cada proyecto.
            </p>
          </div>

          <div className="soft-skills-list">
            {personalSkills.map((skill, index) => (
              <article key={skill.title} className="soft-skill">
                <span className="soft-skill__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
