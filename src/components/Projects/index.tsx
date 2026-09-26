import { projects } from "../../data/content";
import Reveal from "../Reveal";
import "../Section.css";
import "./Projects.css";

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Projects</span>
            <h2>Selected work</h2>
          </div>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 60}
              className={project.featured ? "project-span-2" : undefined}
            >
              <div
                className={
                  "glass-panel project-card" +
                  (project.featured ? " project-card-featured" : "")
                }
              >
                {project.featured && (
                  <span className="project-featured-badge">Featured</span>
                )}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="glass-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {project.href ? (
                  <a
                    className="project-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub &rarr;
                  </a>
                ) : (
                  <span className="project-link project-link-internal">
                    Internal project · HCL Technologies
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
