import { about } from "../../data/content";
import Reveal from "../Reveal";
import "../Section.css";
import "./About.css";

function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">About</span>
            <h2>A little about how I work</h2>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={60}>
            <div className="glass-panel about-copy">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-panel about-highlights">
              {about.highlights.map((item) => (
                <div className="highlight-row" key={item.label}>
                  <span className="label">{item.label}</span>
                  <span className="value">{item.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
