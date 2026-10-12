import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { BrandMark, ExternalLink } from '../components/Editorial'
import PageEmblem, { MotifRule } from '../components/PageEmblem'

export default function Contact({ headingRef }) {
  const [status, setStatus] = useState('')
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setStatus('copied!')
    } catch {
      setStatus('couldn’t copy automatically · select the address to copy it.')
    }
    timer.current = setTimeout(() => setStatus(''), 5500)
  }
  return (
    <section className="contact-page">
      <div className="contact-postmark" aria-hidden="true"><span /><span /><span /></div>
      <div className="contact-heading">
        <h1 ref={headingRef} tabIndex={-1}>
          let’s make
          <br />
          <em>something.</em>
          <PageEmblem kind="contact" />
        </h1>
      </div>
      <MotifRule variant="contact" />
      <div className="contact-bottom">
        <div className="contact-email">
          <button
            className="email-copy"
            onClick={copy}
            aria-label={`copy email address: ${profile.email}`}
          >
            {profile.email}
            <span aria-hidden="true">{status === 'copied!' ? '✓' : '⧉'}</span>
          </button>
          <p className="copy-status" role="status">
            {status || 'click to copy'}
          </p>
        </div>
        <div className="contact-socials">
          <ExternalLink href={profile.links.github}><BrandMark brand="github" />GitHub</ExternalLink>
          <ExternalLink href={profile.links.linkedin}><BrandMark brand="linkedin" />LinkedIn</ExternalLink>
        </div>
      </div>
    </section>
  )
}
