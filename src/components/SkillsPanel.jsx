import { useState } from 'react'
import { ArrowIcon } from './Icons'

export function SkillsPanel({ groups }) {
  const [openItems, setOpenItems] = useState(() => new Set())

  const toggle = (label) => {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  return (
    <div className="skills-disclosure">
      {groups.map((group) => {
        const open = openItems.has(group.label)
        const panelId = `skills-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

        return (
          <article className={`skills-item ${open ? 'is-open' : ''}`} key={group.label}>
            <button
              type="button"
              className="skills-trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(group.label)}
            >
              <span className="skills-trigger__copy">
                <strong>{group.label}</strong>
                <span>{open ? 'Hide skills' : 'View skills'}</span>
              </span>
              <span className="experience-icon" aria-hidden="true"><ArrowIcon direction="right" /></span>
            </button>

            <div className="skills-panel" id={panelId} aria-hidden={!open}>
              <div className="skills-panel__inner">
                <div className="skill-list">
                  {group.values.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
