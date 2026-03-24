// CommentSection.jsx
import { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./App.css"; // Puedes mantener estilos aquí o moverlos a otro CSS específico
import 'tailwindcss';
import 'tailwind-animations';

export default function CommentSection() {
  const [submittedComment, setSubmittedComment] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('myComment');
    if (saved) {
      setSubmittedComment(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      setError("El nombre y el comentario son obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "comments"), {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        comment: formData.comment.trim(),
        timestamp: serverTimestamp()
      });

      const newComment = {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        comment: formData.comment.trim(),
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('myComment', JSON.stringify(newComment));
      setSubmittedComment(newComment);
      setFormData({ name: "", email: "", comment: "" });
    } catch (err) {
      console.error("Error al enviar comentario:", err);
      setError("Hubo un error al enviar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="comments">
      <h3>Comentarios</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          name="name"
          placeholder="Tu nombre *"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico (opcional)"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Escribe tu comentario *"
          rows="3"
          value={formData.comment}
          onChange={handleChange}
          required
        />
        {error && <p className="comment-error">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>

      <div className="comment-list animate-swing animate-delay-[25ms]">
        {submittedComment ? (
          <>
            <p className="comment-success">¡Comentario enviado! 😊</p>
            <div className="comment-item">
              <div className="comment-header">
                <strong>{submittedComment.name}</strong>
                {submittedComment.email && <span className="comment-email">({submittedComment.email})</span>}
                <span className="comment-date">
                  {new Date(submittedComment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="comment-text">{submittedComment.comment}</p>
            </div>
          </>
        ) : (
          <p className="no-comments">Aún no has enviado ningún comentario.</p>
        )}
      </div>
    </section>
  );
}
