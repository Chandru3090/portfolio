import { experience } from "../../data/content";
import Reveal from "../Reveal";
import "../Section.css";
import "./Experience.css";

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Experience</span>
            <h2>Where I've worked</h2>
          </div>
        </Reveal>

        <div className="timeline">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 60}>
              <div className="glass-panel timeline-card">
                <div className="timeline-head">
                  <div>
                    <h3>{job.company}</h3>
                    <div className="timeline-role">{job.role}</div>
                  </div>
                  <span className="glass-tag timeline-period">{job.period}</span>
                </div>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
