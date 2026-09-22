import { useState } from 'react'
import { navigation, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon, MailIcon, MenuIcon } from './Icons'

const socialLinks = [
  { label: `Email ${profile.firstName}`, href: `mailto:${profile.email}`, icon: MailIcon },
  { label: `${profile.name} on LinkedIn`, href: profile.links.linkedin, icon: LinkedinIcon },
  { label: `${profile.name} on GitHub`, href: profile.links.github, icon: GithubIcon },
]

function SocialLinks({ className = 'mb-2' }) {
  return (
    <div className={`flex gap-[7px] ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          className="grid size-[31px] place-items-center rounded-full border border-border text-muted transition duration-150 hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-blue focus-visible:border-[#bfdbfe] focus-visible:bg-[#eff6ff] focus-visible:text-blue"
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

function NavLinks({ activeSection, onNavigate, mobile = false }) {
  return (
    <nav className={`grid ${mobile ? 'mt-0 gap-0' : 'mt-[76px] gap-[5px]'} `} aria-label="Portfolio sections">
      {navigation.map((item) => {
        const active = activeSection === item.id

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`group flex items-center gap-2.5 py-2 no-underline transition-colors duration-150 hover:text-ink focus-visible:text-ink ${mobile ? 'text-[14px]' : 'text-[13px]'} ${active ? 'text-ink' : 'text-muted'}`}
            aria-current={active ? 'location' : undefined}
            onClick={onNavigate}
          >
            <span className={`size-1.5 shrink-0 rounded-full transition duration-150 ${active ? 'bg-blue shadow-[0_0_0_4px_var(--color-blue-soft)]' : 'bg-border-strong'}`} aria-hidden="true" />
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}

export function DesktopRail({ activeSection }) {
  return (
    <aside className="sticky top-0 flex h-svh flex-col border-r border-border py-8 pr-[30px] pl-6 max-[1080px]:pr-6 max-[780px]:hidden">
      <a className="inline-flex self-start items-baseline text-[33px] font-bold tracking-[-0.07em] text-ink no-underline" href="#intro" aria-label={`${profile.name}, back to top`}>
        <span>js</span><i className="text-blue not-italic">.</i>
      </a>
      <NavLinks activeSection={activeSection} />
      <div className="mt-auto grid gap-[9px] text-[10px] text-muted">
        <SocialLinks />
        <a className="overflow-hidden text-ellipsis whitespace-nowrap text-ink-soft no-underline" href={`mailto:${profile.email}`}>{profile.email}</a>
        <span>Waterloo, ON</span>
      </div>
    </aside>
  )
}

export function MobileHeader({ activeSection }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 hidden border-b border-border bg-white/95 backdrop-blur-[16px] max-[780px]:block">
      <div className="flex min-h-[58px] w-full items-center justify-between px-5">
        <a className="inline-flex items-baseline text-[33px] font-bold tracking-[-0.07em] text-ink no-underline" href="#intro" aria-label={`${profile.name}, back to top`} onClick={() => setOpen(false)}>
          <span>js</span><i className="text-blue not-italic">.</i>
        </a>
        <button
          type="button"
          className="grid size-[34px] place-items-center rounded-full border border-border bg-canvas text-ink"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((current) => !current)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
      {open && (
        <div className="animate-[menu-in_160ms_ease_both] border-t border-border px-5 pt-[9px] pb-5" id="mobile-navigation">
          <NavLinks activeSection={activeSection} onNavigate={() => setOpen(false)} mobile />
          <SocialLinks className="mt-[14px] mb-0" />
        </div>
      )}
    </header>
  )
}
