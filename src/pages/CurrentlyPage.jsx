import PageIntro from "../components/PageIntro.jsx";

export default function CurrentlyPage() {
  return (
    <div className="page-stack currently-page">
      <PageIntro
        eyebrow="Ahora"
        title="Actualmente"
        description="Una vista rapida de las areas en las que estoy invirtiendo tiempo y energia en esta etapa."
      />

      <section className="current-focus" aria-labelledby="current-focus-title">
        <div className="current-focus__content">
          <div className="current-focus__lead">
            <span className="current-focus__label">En construccion</span>
            <h3 id="current-focus-title">
              Estoy fortaleciendo mi perfil con aprendizaje continuo.
            </h3>
            <p>
              Por ahora esta seccion resume dos frentes que estoy trabajando
              activamente y que despues podre ampliar con mas estudios,
              actividades o proyectos.
            </p>
          </div>

          <div className="current-focus__cards">
            <article className="current-focus__card">
              <span className="current-focus__card-tag">Aprendizaje actual</span>
              <h4>Ciencia de datos</h4>
              <p>
                Estoy aprendiendo ciencia de datos para comprender mejor el
                analisis, la interpretacion y el uso practico de la informacion.
              </p>
            </article>

            <article className="current-focus__card">
              <span className="current-focus__card-tag">Desarrollo personal</span>
              <h4>Ingles</h4>
              <p>
                Estoy mejorando mi ingles para comunicar ideas tecnicas con mas
                claridad y abrir mas oportunidades de colaboracion.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
