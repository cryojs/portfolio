import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Copy, Check, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'
import { BrandMark } from '../components/Editorial'
import PageEmblem, { MotifRule } from '../components/PageEmblem'
import './Contact.css'

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
          <span className="contact-channel-label"><Mail size={15} aria-hidden="true" />drop me a line</span>
          <button
            className="email-copy"
            onClick={copy}
            aria-label={`copy email address: ${profile.email}`}
          >
            <span className="contact-address">{profile.email}</span>
            <span className="contact-copy-icon">{status === 'copied!' ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}</span>
          </button>
          <p className="copy-status" role="status">
            {status || 'click to copy'}
          </p>
        </div>
        <nav className="contact-socials" aria-label="Social profiles">
          <a className="contact-profile" href={profile.links.github} target="_blank" rel="noreferrer"><BrandMark brand="github" /><span><span className="contact-profile-name">GitHub</span><span className="contact-profile-detail">@CryoJS</span></span><ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          <a className="contact-profile" href={profile.links.linkedin} target="_blank" rel="noreferrer"><BrandMark brand="linkedin" /><span><span className="contact-profile-name">LinkedIn</span><span className="contact-profile-detail">let’s connect</span></span><ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        </nav>
      </div>
    </section>
  )
}
