import { profile } from '../data/portfolio'
import { ArrowIcon, GithubIcon, LinkedinIcon } from './Icons'

const actionClassName = 'inline-flex items-center justify-center gap-2 rounded-lg px-[15px] text-[13px] font-[550] no-underline transition duration-150'
const emailClassName = `${actionClassName} bg-ink !text-white shadow-[rgba(36,52,47,0.12)_0_2px_0] hover:-translate-y-px hover:bg-blue-dark focus-visible:-translate-y-px focus-visible:bg-blue-dark`
const socialClassName = `${actionClassName} border border-border bg-canvas text-ink-soft hover:border-blue-soft hover:bg-paper-note hover:text-blue focus-visible:border-blue-soft focus-visible:bg-paper-note focus-visible:text-blue`

export function ContactActions({ emailLabel = 'Email me', stackOnMobile = false, className = '' }) {
  const mobileLayout = stackOnMobile ? 'max-[780px]:flex-col max-[780px]:items-stretch' : ''
  const mobileButtonLayout = stackOnMobile ? 'max-[780px]:justify-start' : ''

  return (
    <div className={`contact-actions flex flex-wrap items-center gap-[9px] ${mobileLayout} ${className}`}>
      <a className={`${emailClassName} ${mobileButtonLayout}`} href={`mailto:${profile.email}`}>{emailLabel} <ArrowIcon /></a>
      <a className={`${socialClassName} ${mobileButtonLayout}`} href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
      <a className={`${socialClassName} ${mobileButtonLayout}`} href={profile.links.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
    </div>
  )
}
