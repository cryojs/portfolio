import { useState } from 'react'
import { ArrowIcon } from './Icons'

export function SkillsPanel({ groups }) {
  const [open, setOpen] = useState(false)
  const panelId = 'skills-details'

  return (
    <div className={`skills-disclosure ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="skills-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="skills-trigger__copy">
          <strong>Languages &amp; frameworks</strong>
          <span>{open ? 'Hide toolkit' : 'View toolkit'}</span>
        </span>
        <span className="experience-icon" aria-hidden="true"><ArrowIcon direction="right" /></span>
      </button>

      <div className="skills-panel" id={panelId} aria-hidden={!open}>
        <div className="skills-panel__inner">
          <div className="skills-grid">
            {groups.map((group) => (
              <div className="skill-group" key={group.label}>
                <h3>{group.label}</h3>
                <div className="skill-list">
                  {group.values.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
