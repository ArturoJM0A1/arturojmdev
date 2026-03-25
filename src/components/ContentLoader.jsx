export default function ContentLoader({
  label = "Cargando contenido",
  caption = "Preparando la siguiente vista...",
}) {
  return (
    <div
      className="content-loader-shell"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="content-loader" aria-hidden="true">
        <span className="content-loader__ring content-loader__ring--outer"></span>
        <span className="content-loader__ring content-loader__ring--middle"></span>
        <span className="content-loader__ring content-loader__ring--inner"></span>
        <span className="content-loader__beam"></span>
        <span className="content-loader__core">
          <span className="content-loader__core-dot"></span>
        </span>
      </div>

      <div className="content-loader__copy">
        <span className="content-loader__eyebrow">Sistema activo</span>
        <strong className="content-loader__title">{label}</strong>
        <span className="content-loader__caption">{caption}</span>
      </div>
    </div>
  );
}
