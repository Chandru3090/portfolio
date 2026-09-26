import { skillGroups } from "../../data/content";
import Reveal from "../Reveal";
import "../Section.css";
import "./Skills.css";

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Skills</span>
            <h2>Tools I reach for</h2>
          </div>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 60}>
              <div className="glass-panel skill-card">
                <h3>{group.title}</h3>
                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span className="glass-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
