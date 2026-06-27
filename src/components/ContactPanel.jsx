import { useState } from "react";
import { Link } from "react-router-dom";
import 'tailwindcss';
import 'tailwind-animations';

const contactItems = [
  {
    icon: "fas fa-envelope",
    label: "Correo",
    value: "juarezmonroyarturo574@gmail.com",
    href: "mailto:juarezmonroyarturo574@gmail.com",
  },
  {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/arturojuarezmonroy",
    href: "https://www.linkedin.com/in/arturojuarezmonroy",
  },
  {
    icon: "fab fa-github",
    label: "GitHub",
    value: "ArturoJM0A1",
    href: "https://github.com/ArturoJM0A1",
  },
  {
    icon: "fa-brands fa-youtube",
    label: "YouTube",
    value: "@arturojuarezmonroy3951",
    href: "https://www.youtube.com/@arturojuarezmonroy3951",
  },
  {
    icon: "fab fa-whatsapp",
    label: "WhatsApp",
    value: "+52 1 773 680 2105",
    href: "https://wa.me/5217736802105",
  },
];

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e, email) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <section
      id="contact-section"
      data-menu-section="true"
      className="contact-page animate-rotate-3d infinite"
    >
      <h3>Contacto directo</h3>
      <p className="contact-page__lead">
        Si te interesa colaborar, revisar un proyecto o conversar sobre
        desarrollo web, aqui estan mis canales principales.
      </p>

      <div className="contact-grid">
        {contactItems.map((item) => (
          <a
            key={item.label}
            className="contact-card"
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
            onClick={item.href.startsWith("mailto:") ? (e) => handleCopyEmail(e, item.value) : undefined}
          >
            <i className={item.icon} aria-hidden="true"></i>
            <span className="contact-card__label">{item.label}</span>
            <strong>{item.value}</strong>
          </a>
        ))}
      </div>
      {copied && <span className="copy-toast">Listo correo copiado</span>}

      <div className="contact-cta">
        <p>Tambien puedes dejarme un comentario directo dentro del portafolio.</p>
        <Link to="/comentarios" className="btn">
          Ir a comentarios
        </Link>
      </div>
    </section>
  );
}
