import { useEffect, useState } from 'react'
import { DesktopRail, MobileHeader } from './components/SiteNav'
import { ContactLoop, HeadingDoodle, HeroUnderline } from './components/Doodles'
import { ExperienceList } from './components/ExperienceList'
import { ProjectCard } from './components/ProjectCard'
import { SkillsPanel } from './components/SkillsPanel'
import { ArrowIcon, GithubIcon, LinkedinIcon } from './components/Icons'
import { education, experience, navigation, profile, projects, skillGroups } from './data/portfolio'

function SectionHeading({ label, title, note, doodle }) {
  return (
    <div className="mb-[34px] flex items-end justify-between gap-[30px] max-[780px]:mb-7 max-[780px]:flex-col max-[780px]:items-start max-[780px]:gap-3">
      <div className="grid gap-3">
        <span className="inline-flex w-fit items-center justify-self-start rounded-full bg-blue-soft px-2.5 py-1.5 text-[10px] font-[650] tracking-[0.08em] text-blue-dark uppercase">{label}</span>
        <div className="flex items-center gap-3.5">
          <h2 className="m-0 text-[clamp(2rem,4vw,2.8rem)] font-[520] leading-[1.05] tracking-[-0.055em] text-ink">{title}</h2>
          <HeadingDoodle type={doodle} />
        </div>
      </div>
      {note && <p className="m-0 mb-1 max-w-none text-right text-xs leading-[1.5] text-muted whitespace-nowrap max-[780px]:text-left">{note}</p>}
    </div>
  )
}

function ProblemBadge({ label, href, detail }) {
  const previewId = `link-preview-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <a
      aria-describedby={previewId}
      className="group problem-border problem-border-badge inline-flex items-center rounded-full bg-blue-soft px-2 py-1 text-[10px] font-[650] leading-[1.2] whitespace-nowrap !text-blue-dark no-underline transition duration-150 hover:-translate-y-px hover:bg-[#bfdbfe] focus-visible:-translate-y-px focus-visible:bg-[#bfdbfe]"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="text-blue-dark">{label}</span>
      <svg className="problem-border-svg text-[#93c5fd]" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <rect x="1" y="1" width="98" height="38" rx="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      </svg>
      <span
        id={previewId}
        role="tooltip"
        className="link-preview invisible pointer-events-none absolute bottom-[calc(100%+12px)] left-[calc(100%-6px)] z-[5] isolate w-[230px] p-4 pr-7 text-blue-dark max-[780px]:right-[-4px] max-[780px]:left-auto max-[780px]:w-[min(230px,calc(100vw_-_40px))]"
      >
        <span className="link-preview-layer absolute inset-[5px_-5px_-5px_5px] z-0 bg-blue-soft" aria-hidden="true" />
        <span className="link-preview-paper absolute inset-0 z-[1]" aria-hidden="true" />
        <span className="link-preview-fold absolute right-0 bottom-0 z-[2] size-[22px]" aria-hidden="true" />
        <span className="link-preview-content relative z-[3] grid gap-[5px]">
          <strong className="text-[15px] font-[650] text-blue-dark">{label}</strong>
          <span className="text-[11px] leading-[1.35] text-ink-soft">{detail}</span>
          <span className="overflow-hidden text-[10px] text-ellipsis whitespace-nowrap text-blue-dark">{href.replace('https://', '')}</span>
        </span>
      </span>
    </a>
  )
}

function PageShell({ activeSection, children }) {
  return (
    <div className="grid w-[min(1000px,calc(100%_-_max(24px,calc((100vw_-_1200px)/2))))] grid-cols-[184px_minmax(0,1fr)] gap-[72px] ml-[max(24px,calc((100vw_-_1200px)/2))] border-r border-border bg-[radial-gradient(circle_280px_at_calc(100%_+_40px)_-50px,var(--color-blue)_0_99.5%,transparent_100%)] bg-no-repeat max-[1080px]:grid-cols-[158px_minmax(0,1fr)] max-[1080px]:gap-12 max-[780px]:block max-[780px]:ml-0 max-[780px]:w-full max-[780px]:border-r-0 max-[780px]:bg-[radial-gradient(circle_180px_at_100%_-50px,var(--color-blue)_0_99.5%,transparent_100%)]">
      <DesktopRail activeSection={activeSection} />
      <main className="w-full min-w-0 max-w-none pr-[72px] max-[1080px]:pr-12 max-[780px]:overflow-x-clip max-[780px]:px-5 max-[780px]:pr-5">{children}</main>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('intro')

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)
    let animationFrame

    const updateActiveSection = () => {
      animationFrame = undefined
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      if (scrollTop <= 8) {
        setActiveSection(sections[0]?.id ?? 'intro')
        return
      }

      if (scrollTop >= maxScroll - 8) {
        setActiveSection(sections.at(-1)?.id ?? 'contact')
        return
      }

      const marker = Math.min(window.innerHeight * 0.34, 300)
      let currentSection = sections[0]

      for (const section of sections) {
        if (section.getBoundingClientRect().top > marker) break
        currentSection = section
      }

      if (currentSection) setActiveSection(currentSection.id)
    }

    const scheduleUpdate = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(updateActiveSection)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    scheduleUpdate()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
    }
  }, [])

  return (
    <>
      <MobileHeader activeSection={activeSection} />
      <PageShell activeSection={activeSection}>
        <section className="hero-with-pattern relative flex min-h-[min(800px,96svh)] max-w-full flex-col justify-center overflow-hidden scroll-mt-9 pt-[72px] pb-[62px] [&>*]:relative [&>*]:z-[1] max-[780px]:min-h-0 max-[780px]:scroll-mt-[78px] max-[780px]:pr-0 max-[780px]:pt-[62px] max-[780px]:pb-[50px]" id="intro">
          <span className="text-[13px] font-semibold text-blue">Hello! I&apos;m</span>
          <h1 className="m-0 mt-6 mb-[34px] grid w-max gap-[2px] font-display text-[clamp(4.9rem,9.1vw,7.35rem)] font-[680] leading-[0.73] tracking-[-0.065em] text-ink [font-stretch:condensed] max-[1080px]:text-[clamp(4.76rem,10.5vw,6.3rem)] max-[780px]:mb-8 max-[780px]:mt-6 max-[780px]:w-full max-[780px]:text-[clamp(4.06rem,18.2vw,5.6rem)] max-[430px]:text-[clamp(3.78rem,20.3vw,5.04rem)]" aria-label={profile.name}>
            <span>{profile.firstName.toUpperCase()}</span>
            <span className="after:text-blue after:content-['.']">{profile.lastName.toUpperCase()}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2.5 text-sm text-muted max-[430px]:items-start max-[430px]:flex-col">
            <span className="rounded-full bg-blue-soft px-2.5 py-1.5 text-[11px] font-[650] tracking-[0.04em] text-blue-dark">CS CO-OP</span>
            <strong className="font-[550] text-ink">{education.school}</strong>
            <span>{education.location}</span>
          </div>

          <p className="mt-[42px] max-w-[680px] text-[clamp(1.65rem,3vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.045em] text-ink max-[780px]:mt-9 max-[780px]:text-[clamp(1.6rem,7vw,2.15rem)]">
            Currently building <span className="relative inline-block">thoughtful<HeroUnderline /></span> web apps and learning backend development.
          </p>

          <ul className="mt-7 mb-0 grid max-w-[690px] list-none gap-3 p-0 text-sm leading-[1.55] text-ink-soft">
            <li className="relative pl-[25px] before:absolute before:top-[0.58em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-blue before:content-['']">studying computer science at Waterloo</li>
            <li className="relative pl-[25px] before:absolute before:top-[0.58em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-blue before:content-['']">built 10 iOS apps through an Apple-supported development program</li>
            <li className="relative pl-[25px] leading-[1.55] before:absolute before:top-[0.58em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-blue before:content-['']">
              <span>enjoy solving problems on</span>
              <span className="ml-[5px] inline-flex items-center gap-2 align-middle">
                <ProblemBadge label="DMOJ" href={profile.links.dmoj} detail="Competitive programming profile" />
                <span className="text-xs font-medium text-ink-soft">and</span>
                <ProblemBadge label="LeetCode" href={profile.links.leetcode} detail="Algorithms and data structures" />
              </span>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-[9px]">
            <a className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#171717] px-[15px] text-[13px] font-[550] !text-white no-underline shadow-[rgba(0,0,0,0.05)_0_1px_2px] transition duration-150 hover:-translate-y-px hover:bg-[#1e40af] focus-visible:-translate-y-px focus-visible:bg-[#1e40af]" href={`mailto:${profile.email}`}>Email me <ArrowIcon /></a>
            <a className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-border bg-canvas px-[15px] text-[13px] font-[550] text-ink-soft no-underline transition duration-150 hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-blue focus-visible:border-[#bfdbfe] focus-visible:bg-[#eff6ff] focus-visible:text-blue" href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
            <a className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-border bg-canvas px-[15px] text-[13px] font-[550] text-ink-soft no-underline transition duration-150 hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-blue focus-visible:border-[#bfdbfe] focus-visible:bg-[#eff6ff] focus-visible:text-blue" href={profile.links.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
          </div>
        </section>

        <section className="w-full max-w-[900px] scroll-mt-9 py-[59px] pb-[70px] max-[780px]:scroll-mt-[78px] max-[780px]:py-[49px] max-[780px]:pb-[59px]" id="experience">
          <SectionHeading label="experience" title="Where I&apos;ve worked" note="Select a role to read more" doodle="experience" />
          <ExperienceList items={experience} />
        </section>

        <section className="w-full max-w-[900px] scroll-mt-9 pt-[59px] pb-[78px] max-[780px]:scroll-mt-[78px] max-[780px]:pt-[49px] max-[780px]:pb-[67px]" id="projects">
          <SectionHeading label="projects" title="Things I&apos;ve built" note="Ideas I thought were useful, helpful, or fun" doodle="projects" />
          <div className="grid grid-cols-2 gap-x-7 gap-y-[52px] max-[780px]:w-full max-[780px]:grid-cols-1 max-[780px]:gap-12">
            {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
          </div>
        </section>

        <section className="w-full max-w-[900px] scroll-mt-9 py-[59px] pb-[70px] max-[780px]:scroll-mt-[78px] max-[780px]:py-[49px] max-[780px]:pb-[59px]" id="skills">
          <SectionHeading label="skills" title="My toolkit" note="Select to view technologies" doodle="skills" />
          <SkillsPanel groups={skillGroups} />
        </section>

        <section className="w-full max-w-[900px] scroll-mt-9 py-[59px] pb-[70px] max-[780px]:scroll-mt-[78px] max-[780px]:py-[49px] max-[780px]:pb-[59px]" id="education">
          <SectionHeading label="education" title="Current program" doodle="education" />
          <article className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-8 rounded-2xl border border-border bg-canvas p-6 max-[780px]:grid-cols-1 max-[780px]:gap-[18px] max-[780px]:p-[22px]">
            <div>
              <h3 className="m-0 text-lg font-[620] tracking-[-0.03em] text-ink">{education.school}</h3>
              <p className="mt-[7px] mb-0 text-sm leading-[1.5] text-muted">{education.degree}</p>
            </div>
            <div className="grid gap-[7px] text-right text-[11px] leading-[1.45] text-muted max-[780px]:text-left">
              <span>{education.location}</span>
              <span>{education.dates}</span>
            </div>
          </article>
        </section>

        <section className="relative mt-[18px] mb-14 w-full max-w-[900px] scroll-mt-9 overflow-hidden rounded-2xl border border-border bg-paper-soft p-[42px] max-[780px]:mt-0 max-[780px]:mb-[39px] max-[780px]:scroll-mt-[78px] max-[780px]:px-[22px] max-[780px]:py-7" id="contact">
          <ContactLoop />
          <div className="relative z-[1]">
            <span className="inline-flex w-fit items-center justify-self-start rounded-full bg-blue-soft px-2.5 py-1.5 text-[10px] font-[650] tracking-[0.08em] text-blue-dark uppercase">contact</span>
            <div className="mt-[18px] flex max-w-[620px] items-center gap-3.5">
              <h2 className="m-0 text-[clamp(2rem,4vw,2.8rem)] font-[520] leading-[1.05] tracking-[-0.055em] text-ink">Have something interesting in mind?</h2>
              <HeadingDoodle type="contact" />
            </div>
            <p className="my-[18px] mb-7 max-w-[520px] text-[15px] leading-[1.6] text-muted">I&apos;m always happy to talk about software, projects, and new opportunities.</p>
            <div className="flex flex-wrap items-center gap-[9px] max-[780px]:flex-col max-[780px]:items-stretch">
              <a className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#171717] px-[15px] text-[13px] font-[550] !text-white no-underline shadow-[rgba(0,0,0,0.05)_0_1px_2px] transition duration-150 hover:-translate-y-px hover:bg-[#1e40af] focus-visible:-translate-y-px focus-visible:bg-[#1e40af] max-[780px]:justify-start" href={`mailto:${profile.email}`}>{profile.email} <ArrowIcon /></a>
              <a className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-border bg-canvas px-[15px] text-[13px] font-[550] text-ink-soft no-underline transition duration-150 hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-blue focus-visible:border-[#bfdbfe] focus-visible:bg-[#eff6ff] focus-visible:text-blue max-[780px]:justify-start" href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
              <a className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-border bg-canvas px-[15px] text-[13px] font-[550] text-ink-soft no-underline transition duration-150 hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-blue focus-visible:border-[#bfdbfe] focus-visible:bg-[#eff6ff] focus-visible:text-blue max-[780px]:justify-start" href={profile.links.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
            </div>
          </div>
        </section>

        <footer className="flex w-full max-w-[900px] items-center justify-between gap-6 border-t border-border py-[22px] pb-7 text-[10px] text-muted uppercase max-[780px]:pb-6">
          <span>&copy; 2026 jason sun</span>
          <a className="inline-flex items-center gap-[5px] text-muted no-underline transition-colors duration-150 hover:text-blue focus-visible:text-blue" href="#intro">back to top <ArrowIcon direction="up" /></a>
        </footer>
      </PageShell>
    </>
  )
}

export default App
