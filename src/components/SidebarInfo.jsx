import profileImg from "../../public/artsearch2removebgpreview.png";
import ProfileLetterRain from "./ProfileLetterRain.jsx";
import SkillsContent from "./SkillsContent.jsx";

export default function SidebarInfo({
  showSkills = true,
  isAudioPlaying = false,
  onPlayAudio,
  onPauseAudio,
}) {
  return (
    <div className="left-column">
      <div className="profile-photo">
        <div className="profile-photo-shell">
          <div
            className="photo-audio-controls"
            aria-label="Controles de musica del portafolio"
          >
            <button
              type="button"
              className={`photo-audio-btn ${isAudioPlaying ? "is-active" : ""}`}
              onClick={onPlayAudio}
              disabled={!onPlayAudio || isAudioPlaying}
              aria-pressed={isAudioPlaying}
              title="Reproducir cancion"
            >
              <span className="photo-audio-btn__emoji" aria-hidden="true">
                <i class="fa-solid fa-play"></i>
              </span>
            </button>

            <button
              type="button"
              className={`photo-audio-btn photo-audio-btn--pause ${
                !isAudioPlaying ? "is-active" : ""
              }`}
              onClick={onPauseAudio}
              disabled={!onPauseAudio || !isAudioPlaying}
              aria-pressed={!isAudioPlaying}
              title="Pausar cancion"
            >
              <span className="photo-audio-btn__emoji" aria-hidden="true">
                <i class="fa-solid fa-pause"></i>
              </span>
            </button>
          </div>

          <div className="profile-photo-visual">
            <div
              className="photo-placeholder"
              style={{ backgroundImage: `url(${profileImg})` }}
            >
              <svg
                className="photo-wizard-hat"
                viewBox="0 0 180 140"
                role="presentation"
                focusable="false"
                aria-hidden="true"
              >
                <ellipse
                  className="photo-wizard-hat__shadow"
                  cx="92"
                  cy="118"
                  rx="58"
                  ry="10"
                />
                <path
                  className="photo-wizard-hat__brim"
                  d="M22 104c17-12 43-18 69-18c30 0 54 7 67 18c-15 11-41 17-68 17s-53-6-68-17Z"
                />
                <path
                  className="photo-wizard-hat__body"
                  d="M57 99L88 23c2.3-5.5 9.7-5.9 12.4-0.7L131 99c-9.9-5.6-23.3-8.8-39-8.8c-14.2 0-26 2.7-35 8.8Z"
                />
                <path
                  className="photo-wizard-hat__highlight"
                  d="M94 28c7.2 14.8 14.6 35.7 22.4 61.8c-6.2-2.1-12.9-3.2-20.2-3.4L94 28Z"
                />
                <path
                  className="photo-wizard-hat__band"
                  d="M49 86.8c11.8-6.2 28.1-10.2 44.3-10.2c15.2 0 28.3 2.9 39.1 8.8l-8.4 12.5c-8.4-4.1-18.4-6.1-30.4-6.1c-13.7 0-25.8 2.7-36 8.1L49 86.8Z"
                />
                <path
                  className="photo-wizard-hat__buckle"
                  d="M79 84.2h18l-3.9 9.2H75.1l3.9-9.2Z"
                />
                <path
                  className="photo-wizard-hat__star"
                  d="M116.4 60.2l2.6 6.1 6.6.6-5 4.1 1.5 6.4-5.7-3.5-5.7 3.5 1.5-6.4-5-4.1 6.6-.6 2.6-6.1Z"
                />
                <circle
                  className="photo-wizard-hat__orb"
                  cx="93.5"
                  cy="23.5"
                  r="5.4"
                />
              </svg>
              <div className="photolaptop">
                <span>{"\u{1F9E9}"}</span>
              </div>
            </div>

            <ProfileLetterRain />
          </div>
        </div>
      </div>

      <section className="contact">
        <h3>Conecta conmigo</h3>
        <p>
          <i className="fas fa-envelope" aria-hidden="true"></i>
          <a href="mailto:juarezmonroyarturo574@gmail.com">
            juarezmonroyarturo574@gmail.com
          </a>
        </p>
        <p>
          <i className="fab fa-linkedin" aria-hidden="true"></i>
          <a
            href="https://www.linkedin.com/in/arturojuarezmonroy"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/arturojuarezmonroy
          </a>
        </p>
        <p>
          <i className="fab fa-github" aria-hidden="true"></i>
          <a
            href="https://github.com/ArturoJM0A1"
            target="_blank"
            rel="noreferrer"
          >
            ArturoJM0A1
          </a>
        </p>
        <p>
          <i className="fab fa-youtube" aria-hidden="true"></i>
          <a
            href="https://www.youtube.com/@arturojuarezmonroy3951"
            target="_blank"
            rel="noreferrer"
          >
            @arturojuarezmonroy3951
          </a>
        </p>
        <p>
          <i className="fab fa-whatsapp" aria-hidden="true"></i>
          <a
            href="https://wa.me/5217736802105"
            target="_blank"
            rel="noreferrer"
          >
            +52 1 773 680 2105
          </a>
        </p>
      </section>

      {showSkills ? <SkillsContent /> : null}
    </div>
  );
}
