import { useState } from 'react'
import { navigation, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon, MailIcon, MenuIcon } from './Icons'

const socialLinks = [
  { label: 'Email Jason', href: `mailto:${profile.email}`, icon: MailIcon },
  { label: 'Jason on LinkedIn', href: profile.links.linkedin, icon: LinkedinIcon },
  { label: 'Jason on GitHub', href: profile.links.github, icon: GithubIcon },
]

function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}

function NavLinks({ activeSection, onNavigate }) {
  return (
    <nav className="section-nav" aria-label="Portfolio sections">
      {navigation.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeSection === item.id ? 'is-active' : ''}
          aria-current={activeSection === item.id ? 'location' : undefined}
          onClick={onNavigate}
        >
          <span className="nav-dot" aria-hidden="true" />
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export function DesktopRail({ activeSection }) {
  return (
    <aside className="desktop-rail">
      <a className="brand-mark" href="#intro" aria-label="Jason Sun, back to top">
        <span>js</span><i>.</i>
      </a>
      <NavLinks activeSection={activeSection} />
      <div className="rail-footer">
        <SocialLinks />
        <a className="rail-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <span>Waterloo, ON</span>
      </div>
    </aside>
  )
}

export function MobileHeader({ activeSection }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={`mobile-header ${open ? 'is-open' : ''}`}>
      <div className="mobile-header__bar">
        <a className="brand-mark" href="#intro" aria-label="Jason Sun, back to top" onClick={() => setOpen(false)}>
          <span>js</span><i>.</i>
        </a>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((current) => !current)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
      {open && (
        <div className="mobile-menu" id="mobile-navigation">
          <NavLinks activeSection={activeSection} onNavigate={() => setOpen(false)} />
          <SocialLinks className="mobile-social-links" />
        </div>
      )}
    </header>
  )
}
