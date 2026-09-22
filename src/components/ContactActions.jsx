import { profile } from '../data/portfolio'
import { ArrowIcon, GithubIcon, LinkedinIcon } from './Icons'

const actionClassName = 'inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg px-[15px] text-[13px] font-[550] no-underline transition duration-150'
const emailClassName = `${actionClassName} bg-[#171717] !text-white shadow-[rgba(0,0,0,0.05)_0_1px_2px] hover:-translate-y-px hover:bg-[#1e40af] focus-visible:-translate-y-px focus-visible:bg-[#1e40af]`
const socialClassName = `${actionClassName} border border-border bg-canvas text-ink-soft hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-blue focus-visible:border-[#bfdbfe] focus-visible:bg-[#eff6ff] focus-visible:text-blue`

export function ContactActions({ emailLabel = 'Email me', stackOnMobile = false, className = '' }) {
  const mobileLayout = stackOnMobile ? 'max-[780px]:flex-col max-[780px]:items-stretch' : ''
  const mobileButtonLayout = stackOnMobile ? 'max-[780px]:justify-start' : ''

  return (
    <div className={`flex flex-wrap items-center gap-[9px] ${mobileLayout} ${className}`}>
      <a className={`${emailClassName} ${mobileButtonLayout}`} href={`mailto:${profile.email}`}>{emailLabel} <ArrowIcon /></a>
      <a className={`${socialClassName} ${mobileButtonLayout}`} href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
      <a className={`${socialClassName} ${mobileButtonLayout}`} href={profile.links.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
    </div>
  )
}
