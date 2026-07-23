import { useState } from "react";

const chatOptions = [
  {
    question: "Principales habilidades técnicas",
    answer:
      "React, Java, Angular y PHP. Son las tecnologías con las que más cómodo me siento y mayor experiencia tengo.",
  },
  {
    question: "Ubicación",
    answer:
      "Resido en Pachuca, Hidalgo, con disponibilidad para cambiar de residencia a la CDMX según los requerimientos del puesto. También estoy abierto a trabajo remoto.",
  },
  {
    question: "Explícame ¿por qué crees que deberíamos contratarte?",
    answer:
      "Soy proactivo, me gusta documentar mi código, y siempre busco mejorar la experiencia de usuario sin descuidar el rendimiento y la mantenibilidad del software.",
  },
  {
    question: "¿Cómo manejas el estrés o los conflictos?",
    answer:
      "Ante situaciones de estrés priorizo las tareas por impacto y urgencia, manteniendo la comunicación clara con el equipo. Frente a conflictos busco entender primero todas las perspectivas antes de proponer una solución. Considero que la actitud y la disposición para escuchar son clave para resolver cualquier diferencia.",
  },
];

export default function ChatPanel({ isOpen, onClose }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
  };

  const handleBack = () => {
    setSelectedQuestion(null);
  };

  return (
    <>
      <div
        className={`chat-overlay ${isOpen ? "chat-overlay--visible" : ""}`}
        onClick={onClose}
      ></div>
      <aside
        className={`chat-panel ${isOpen ? "chat-panel--open" : ""}`}
        role="dialog"
        aria-label="Chat con R2-D2"
      >
        <div className="chat-panel__header">
          <div className="chat-panel__header-info">
            <img src="/r2d2.png" alt="" className="chat-panel__avatar" />
            <span className="chat-panel__title">Asistente</span>
          </div>
          <button
            type="button"
            className="chat-panel__close"
            onClick={onClose}
            aria-label="Cerrar chat"
          >
            ✕
          </button>
        </div>

        <div className="chat-panel__body">
          {selectedQuestion === null ? (
            <div className="chat-panel__welcome">
              <p className="chat-panel__greeting">
                ¡Hola! Soy el asistente de Arturo. Selecciona una pregunta
              </p>
              <div className="chat-panel__options">
                {chatOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className="chat-panel__option-btn"
                    onClick={() => handleQuestionClick(index)}
                  >
                    {option.question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="chat-panel__conversation">
              <button
                type="button"
                className="chat-panel__back-btn"
                onClick={handleBack}
              >
                ← Volver
              </button>
              <div className="chat-panel__bubble chat-panel__bubble--question">
                {chatOptions[selectedQuestion].question}
              </div>
              <div className="chat-panel__bubble chat-panel__bubble--answer">
                {chatOptions[selectedQuestion].answer}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}