import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";
import RecommendationCard from "./RecommendationCard.jsx";
import "./App.css";
import "tailwindcss";
import "tailwind-animations";

const CODE_BLOCK_PATTERN = /```([^\n`]*)\n?([\s\S]*?)```/g;

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  comment: "",
};

function normalizeLineEndings(value = "") {
  return value.replace(/\r\n/g, "\n");
}

function trimBlankLines(value = "") {
  return normalizeLineEndings(value).replace(/^\n+|\n+$/g, "");
}

function parseLegacyCommentContent(comment = "") {
  const normalizedComment = normalizeLineEndings(comment);
  const blocks = [];
  let lastIndex = 0;
  let match;

  CODE_BLOCK_PATTERN.lastIndex = 0;

  while ((match = CODE_BLOCK_PATTERN.exec(normalizedComment)) !== null) {
    const [rawBlock, rawLanguage = "", rawCode = ""] = match;
    const textBeforeCode = trimBlankLines(normalizedComment.slice(lastIndex, match.index));

    if (textBeforeCode) {
      blocks.push({ type: "text", content: textBeforeCode });
    }

    blocks.push({
      type: "code",
      language: rawLanguage.trim() || "text",
      content: rawCode.replace(/\n$/, ""),
    });

    lastIndex = match.index + rawBlock.length;
  }

  const trailingText = trimBlankLines(normalizedComment.slice(lastIndex));
  if (trailingText) {
    blocks.push({ type: "text", content: trailingText });
  }

  if (!blocks.length && normalizedComment) {
    return [{ type: "text", content: normalizedComment }];
  }

  return blocks;
}

function renderInlineCode(content = "") {
  return content.split(/(`[^`]+`)/g).map((segment, index) => {
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code key={`inline-code-${index}`} className="comment-inline-code">
          {segment.slice(1, -1)}
        </code>
      );
    }

    return segment;
  });
}

function CodeBlock({ language = "text", code = "" }) {
  if (!code) {
    return null;
  }

  return (
    <div className="comment-code-block">
      <div className="comment-code-toolbar">
        <span className="comment-code-language">{language}</span>
        <span className="comment-code-caption">bloque de codigo</span>
      </div>
      <pre className="comment-code-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CommentContent({ comment, code, codeLanguage }) {
  if (code) {
    return (
      <div className="comment-content">
        {comment ? <p className="comment-text">{renderInlineCode(comment)}</p> : null}
        <CodeBlock language={codeLanguage || "text"} code={code} />
      </div>
    );
  }

  const legacyBlocks = parseLegacyCommentContent(comment);

  if (!legacyBlocks.length) {
    return null;
  }

  return (
    <div className="comment-content">
      {legacyBlocks.map((block, index) => {
        if (block.type === "code") {
          return (
            <CodeBlock
              key={`legacy-code-block-${index}`}
              language={block.language}
              code={block.content}
            />
          );
        }

        return (
          <p key={`legacy-text-block-${index}`} className="comment-text">
            {renderInlineCode(block.content)}
          </p>
        );
      })}
    </div>
  );
}

function formatCommentDate(timestamp) {
  if (!timestamp) {
    return "Ahora mismo";
  }

  if (typeof timestamp === "string") {
    return new Date(timestamp).toLocaleString();
  }

  if (typeof timestamp?.toDate === "function") {
    return timestamp.toDate().toLocaleString();
  }

  return "Ahora mismo";
}

export default function CommentSection() {
  const [submittedComment, setSubmittedComment] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("myComment");

    if (!saved) {
      return;
    }

    try {
      setSubmittedComment(JSON.parse(saved));
    } catch (parseError) {
      console.error("Error al leer el comentario guardado:", parseError);
    }
  }, []);

  useEffect(() => {
    fetch("/recommendations.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar las recomendaciones");
        return res.json();
      })
      .then((data) => setRecommendations(data))
      .catch((err) => console.error("Error al cargar recomendaciones:", err));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const comment = trimBlankLines(formData.comment);

    if (!name) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!comment) {
      setError("El comentario es obligatorio.");
      return;
    }

    const commentPayload = {
      name,
      email: email || null,
      comment,
    };

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "comments"), {
        name,
        email: email || null,
        comment,
        timestamp: serverTimestamp(),
      });

      const newComment = {
        ...commentPayload,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("myComment", JSON.stringify(newComment));
      setSubmittedComment(newComment);
      setFormData(INITIAL_FORM_STATE);
    } catch (submitError) {
      console.error("Error al enviar comentario:", submitError);
      setError("Hubo un error al enviar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="comments-section" data-menu-section="true" className="comments">
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
          placeholder={"Escribe tu comentario aqui.`"}
          rows="16"
          value={formData.comment}
          onChange={handleChange}
          className="comment-form__textarea"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-describedby="comment-code-help"
          />

        <p id="comment-code-help" className="comment-code-help">
          Solo se enviaran nombre, correo, comentario y fecha.
        </p>

        {error && <p className="comment-error">{error}</p>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>

      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h4 className="recommendations-title">Recomendaciones</h4>
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      )}

      <div className="comment-list">
        {submittedComment ? (
          <>
            <p className="comment-success animate-bounce animate-duration-700">
              ¡Comentario enviado! 😊
            </p>
            <div className="comment-item">
              <div className="comment-header">
                <strong>{submittedComment.name}</strong>
                {submittedComment.email ? (
                  <span className="comment-email">({submittedComment.email})</span>
                ) : null}
                <span className="comment-date">
                  {formatCommentDate(submittedComment.timestamp)}
                </span>
              </div>

              <CommentContent
                comment={submittedComment.comment}
                code={submittedComment.code}
                codeLanguage={submittedComment.codeLanguage}
              />
            </div>
          </>
        ) : (
          <p className="no-comments">Aún no has enviado ningún comentario.</p>
        )}
      </div>
    </section>
  );
}
