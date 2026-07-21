import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";

export default function NotFoundPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="404"
        title="Ruta no encontrada"
        description="La navegacion ya esta controlada por React Router, pero esta ruta no existe dentro del portafolio."
      />

      <section className="not-found-panel">
        <h3>Busca otra seccion del sitio</h3>
        <p>
          Puedes volver al recorrido o abrir directamente la seccion de proyectos.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn">
            Ir al recorrido
          </Link>
        </div>
        <img src="/clickgato.gif" alt="" className="not-found-gif" />
      </section>
    </div>
  );
}
