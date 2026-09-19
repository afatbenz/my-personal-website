import React from 'react';
import { experiences } from '../data/profileData';

const Experience: React.FC = () => (
  <section id="experience" className="site-section experience-section">
    <div className="section-shell experience-shell">
      <div className="soft-circle soft-circle-experience" aria-hidden="true" />
      <div className="experience-header">
        <p className="section-eyebrow">Experience</p>
        <h2 className="section-title">My Professional Journey</h2>
        <p className="section-lede">A concise view of my professional experience and key achievements.</p>
        <div className="section-rule" />
      </div>

      <div className="experience-timeline">
        {experiences.map((experience) => (
          <article className="experience-entry" key={experience.id}>
            <div className="experience-date">
              <p className="experience-period">{experience.period}</p>
              <p className="experience-location">{experience.location}</p>
            </div>
            <div className="experience-marker" aria-hidden="true"><span /></div>
            <div className="experience-card surface-card">
              <header className="experience-card-header">
                <div>
                  <h3 className="experience-role">{experience.role}</h3>
                  <p className="experience-company">{experience.company}</p>
                </div>
              </header>
              <ul className="experience-responsibilities">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
              {experience.techStack && (
                <div className="experience-tech-stack" aria-label="Technologies used">
                  <span className="pill-tag">{experience.techStack}</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
