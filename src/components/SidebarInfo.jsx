import profileImg from "../../public/artsearch2removebgpreview.png";
import ProfileLetterRain from "./ProfileLetterRain.jsx";
import SkillsContent from "./SkillsContent.jsx";

export default function SidebarInfo({ showSkills = true }) {
  return (
    <div className="left-column">
      <div className="profile-photo">
        <div
          className="photo-placeholder"
          style={{ backgroundImage: `url(${profileImg})` }}
        >
          <div className="photolaptop">
            <span>{"\uD83D\uDE09"}</span>
          </div>
        </div>
        <ProfileLetterRain />
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
          <a href="https://github.com/ArturoJM0A1" target="_blank" rel="noreferrer">
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
          <a href="https://wa.me/5217736802105" target="_blank" rel="noreferrer">
            +52 1 773 680 2105
          </a>
        </p>
      </section>

      {showSkills ? <SkillsContent /> : null}
    </div>
  );
}
