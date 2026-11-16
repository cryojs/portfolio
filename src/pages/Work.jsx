import { useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { experience } from '../data/portfolio'
import { NextPage, PageIntro } from '../components/Editorial'
import PageEmblem from '../components/PageEmblem'

function WorkEntry({ item, initiallyOpen }) {
  const [open, setOpen] = useState(initiallyOpen)
  const panelId = `work-${item.id}-details`
  const toggle = () => setOpen((value) => !value)
  // Keep the ↗ attached to the company's last word so it never wraps alone.
  const words = item.company.split(' ')
  const last = words.pop()
  const leading = words.length ? `${words.join(' ')} ` : ''
  return (
    // The whole entry is a pointer target; the button carries the semantics
    // for keyboard and screen readers. Links and text selection are left alone.
    <article
      id={`work-${item.id}`}
      className={`work-entry inner-rule${open ? ' is-open' : ''}`}
      onClick={(event) => {
        if (event.target.closest('a, button') || String(window.getSelection())) return
        toggle()
      }}
    >
      <div className="work-entry-top">
        <span className="work-entry-role">{item.role}</span>
        <p className="work-entry-meta">
          <span>{item.dates}</span>
          <span className="work-entry-dot" aria-hidden="true">·</span>
          <span>{item.location}</span>
        </p>
      </div>
      <div className="work-entry-row">
        <h2 className="work-entry-name">
          <img src={item.logo} alt="" loading="lazy" />
          <span>
            {leading}
            <span className="work-entry-tail">
              {last}
              <a className="work-entry-link" href={item.website} target="_blank" rel="noreferrer">
                <ArrowUpRight aria-hidden="true" size={20} strokeWidth={2} />
                <span className="sr-only">{item.company} website (opens in a new tab)</span>
              </a>
            </span>
          </span>
        </h2>
        <button
          type="button"
          className="work-entry-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
        >
          <span>{open ? 'less' : 'details'}</span>
          <span className="sr-only"> about {item.company}</span>
          <Plus aria-hidden="true" size={16} strokeWidth={2.2} />
        </button>
      </div>
      <div id={panelId} className="work-entry-panel" inert={!open}>
        <div>
          <ul className="bullet-list work-entry-highlights">
            {item.highlights.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function Work({ headingRef, anchor }) {
  return (
    <div className="inner-page work-page">
      <PageIntro headingRef={headingRef}>
        some of my
        <br />
        <em>contributions</em>
        <PageEmblem kind="work" />
      </PageIntro>

      <div className="work-list">
        {experience.map((item) => (
          <WorkEntry key={item.id} item={item} initiallyOpen={anchor === `work-${item.id}`} />
        ))}
      </div>

      <NextPage href="#projects" silhouette="quill">
        see what i’m making
      </NextPage>
    </div>
  )
}
