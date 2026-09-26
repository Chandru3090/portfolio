import { profile } from "../../data/content";
import "./Hero.css";

function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero">
        <div className="glass-panel main-card">
          <div className="identity-row">
            <div className="avatar-ring">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="avatar-photo" />
              ) : (
                <div className="avatar">{profile.initials}</div>
              )}
            </div>
            <div className="identity-text">
              <div className="eyebrow">Portfolio · 2026</div>
              <h1>{profile.name}</h1>
            </div>
          </div>
          <div className="role">{profile.role}</div>
          <p className="bio">{profile.tagline}</p>
        </div>

        <div className="side">
          <div className="glass-panel status-widget widget">
            <div className="top-row">
              <span className="label">STATUS</span>
              <span className="dot" />
            </div>
            <div className="status-text">{profile.status}</div>
            <div className="label status-note">{profile.statusNote}</div>
            <div className="pill-tags">
              {(profile.topSkills || ["React", "Node.js", "Claude API", "MongoDB", "Angular"]).map((skill) => (
                <span key={skill} className="glass-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="stack-row">
            {profile.stats.map((stat) => (
              <div className="glass-panel widget" key={stat.label}>
                <div className="num">{stat.num}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="glass-panel cta-card widget">
            <a className="btn btn-primary" href="#projects" onClick={(e) => handleScroll(e, "projects")}>
              View Work
            </a>
            <a className="btn btn-ghost" href="#contact" onClick={(e) => handleScroll(e, "contact")}>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
