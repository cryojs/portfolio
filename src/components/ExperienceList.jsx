import { useState } from 'react'
import { ArrowIcon } from './Icons'

export function ExperienceList({ items }) {
  const [openItems, setOpenItems] = useState(() => new Set())

  const toggle = (id) => {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="experience-list">
      {items.map((item) => {
        const open = openItems.has(item.id)
        const panelId = `${item.id}-details`

        return (
          <article className={`experience-item ${open ? 'is-open' : ''}`} key={item.id}>
            <button
              type="button"
              className="experience-trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span className="experience-copy">
                <span className="experience-role">{item.role}</span>
                <span className="experience-company">{item.company} · {item.location}</span>
              </span>
              <span className="experience-date">{item.dates}</span>
              <span className="experience-icon" aria-hidden="true"><ArrowIcon direction="right" /></span>
            </button>
            <div className="experience-panel" id={panelId} aria-hidden={!open}>
              <div className="experience-panel__inner">
                <ul>
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
