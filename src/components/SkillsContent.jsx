const technicalSkillGroups = [
  {
    title: "Lenguajes",
    items: [
      "JavaScript",
      "Python",
      "PHP",
      "Java",
      "C++ / C",
      "SQL",
      "TypeScript",
    ],
  },
  {
    title: "Frameworks / Librerias",
    items: [
      "React",
      "React Native",
      "Astro",
      "Next.js",
      "Node.js",
      "Firebase",
      "Vue",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    title: "Otros",
    items: [
      "MySQL Workbench",
      "WordPress",
      "Power BI",
      "Canvas",
      "3ds Max",
      "Unity",
      "AutoCAD",
      "Excel",
    ],
  },
];

const personalSkills = [
  {
    title: "Creatividad",
    description: "Encuentro maneras visuales y funcionales de resolver problemas.",
  },
  {
    title: "Adaptabilidad",
    description: "Me ajusto rapido a herramientas, equipos y flujos de trabajo.",
  },
  {
    title: "Enfoque en el detalle",
    description: "Cuido tanto la experiencia visual como el comportamiento del producto.",
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

export default function SkillsContent({ variant = "sidebar" }) {
  if (variant === "page") {
    return (
      <div className="skills-page">
        <section className="skills-spotlight">
          <div className="skills-spotlight__copy">
            <span className="skills-spotlight__eyebrow">Stack principal</span>
            <h3>Habilidades Tecnicas</h3>
            <p className="skills-spotlight__description">
              Lenguajes, frameworks y herramientas con las que construyo
              interfaces, aplicaciones y soluciones de software.
            </p>
          </div>

          <div className="skills-spotlight__stats" aria-label="Resumen de habilidades">
            <div className="skills-spotlight__stat">
              <span>Conjunto de tecnologías que forman la base de mi trabajo en el desarrollo de software.</span>
            </div>
          </div>
        </section>

        <div className="skills-page__columns">
          {technicalSkillGroups.map((group) => (
            <article key={group.title} className="skill-card">
              <div className="skill-card__header">
                <span className="skill-card__label">Area</span>
                <h4>{group.title}</h4>
              </div>

              <ul className="skill-chip-list">
                {group.items.map((item) => (
                  <li key={item} className="skill-chip">
                    {item}
                  </li>
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

  return (
    <>
      <section className="skills">
        <h3>Habilidades Tecnicas</h3>
        <div className="skills-row">
          <div className="skills-left">
            {technicalSkillGroups
              .filter((group) => group.title !== "Frameworks / Librerias")
              .map((group) => (
                <div key={group.title} className="skill-category">
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <div className="skills-right">
            {technicalSkillGroups
              .filter((group) => group.title === "Frameworks / Librerias")
              .map((group) => (
                <div key={group.title} className="skill-category">
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="skills">
        <h3>Habilidades Personales</h3>
        <ul>
          {personalSkills.map((skill) => (
            <li key={skill.title}>{skill.title}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
