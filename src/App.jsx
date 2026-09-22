import { useEffect, useState } from 'react'
import { DesktopRail, MobileHeader } from './components/SiteNav'
import { ContactActions } from './components/ContactActions'
import { ContactLoop, HeadingDoodle, ScribbleUnderline } from './components/Doodles'
import { ExperienceList } from './components/ExperienceList'
import { LinkBadge } from './components/LinkBadge'
import { ProjectCard } from './components/ProjectCard'
import { SkillsPanel } from './components/SkillsPanel'
import { ArrowIcon } from './components/Icons'
import { education, experience, navigation, profile, projects, projectsById, skillGroups } from './data/portfolio'

const currentProject = projectsById[profile.currentProjectId]
const currentYear = new Date().getFullYear()
const currentProjectPreview = {
  id: currentProject.id,
  image: currentProject.media.image,
  imageAlt: currentProject.media.alt,
  imagePosition: '35% center',
  tags: currentProject.tech.slice(0, 3),
}

function SectionHeading({ label, title, note, doodle }) {
  return (
    <div className="mb-9 flex items-end justify-between gap-8 max-[780px]:mb-7 max-[780px]:flex-col max-[780px]:items-start max-[780px]:gap-3">
      <div className="grid gap-3">
        <span className="inline-flex w-fit items-center justify-self-start rounded-full bg-blue-soft px-2.5 py-1.5 text-[10px] font-[650] tracking-[0.08em] text-blue-dark uppercase">{label}</span>
        <div className="flex items-center gap-3.5">
          <h2 className="m-0 text-[clamp(2rem,4vw,2.8rem)] font-[520] leading-[1.05] tracking-[-0.055em] text-ink">{title}</h2>
          <HeadingDoodle type={doodle} />
        </div>
      </div>
      {note && <p className="m-0 mb-1 max-w-none text-right text-xs leading-normal text-muted whitespace-nowrap max-[780px]:text-left">{note}</p>}
    </div>
  )
}

function PageShell({ activeSection, children }) {
  return (
    <div className="grid w-[min(1000px,calc(100%-max(24px,calc((100vw-1200px)/2))))] grid-cols-[184px_minmax(0,1fr)] gap-18 ml-[max(24px,calc((100vw-1200px)/2))] border-r border-border bg-[radial-gradient(circle_280px_at_calc(100%+40px)_-50px,var(--color-blue)_0_99.5%,transparent_100%)] bg-no-repeat max-[1080px]:grid-cols-[158px_minmax(0,1fr)] max-[1080px]:gap-12 max-[780px]:block max-[780px]:ml-0 max-[780px]:w-full max-[780px]:border-r-0 max-[780px]:bg-[radial-gradient(circle_180px_at_100%_-50px,var(--color-blue)_0_99.5%,transparent_100%)]">
      <DesktopRail activeSection={activeSection} />
      <main className="w-full min-w-0 max-w-none pr-18 max-[1080px]:pr-12 max-[780px]:overflow-x-clip max-[780px]:px-5 max-[780px]:pr-5">{children}</main>
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
        <section className="hero-with-pattern relative flex min-h-[min(800px,96svh)] max-w-full flex-col justify-center overflow-hidden scroll-mt-9 pt-18 pb-16 *:z-1 max-[780px]:min-h-0 max-[780px]:scroll-mt-20 max-[780px]:pr-0 max-[780px]:pt-16 max-[780px]:pb-13" id="intro">
          <span className="text-[13px] font-semibold text-blue">Hello! I&apos;m</span>
          <h1 className="m-0 mt-6 mb-9 grid w-max gap-0.5 font-display text-[clamp(4.9rem,9.1vw,7.35rem)] font-[680] leading-[0.73] tracking-[-0.065em] text-ink font-stretch-condensed max-[1080px]:text-[clamp(4.76rem,10.5vw,6.3rem)] max-[780px]:mb-8 max-[780px]:mt-6 max-[780px]:w-full max-[780px]:text-[clamp(4.06rem,18.2vw,5.6rem)] max-[430px]:text-[clamp(3.78rem,20.3vw,5.04rem)]" aria-label={profile.name}>
            <span>{profile.firstName.toUpperCase()}</span>
            <span className="after:text-blue after:content-['.']">{profile.lastName.toUpperCase()}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2.5 text-sm text-muted max-[430px]:items-start max-[430px]:flex-col">
            <span className="rounded-full bg-blue-soft px-2.5 py-1.5 text-[11px] font-[650] tracking-[0.04em] text-blue-dark">CS CO-OP</span>
            <strong className="font-[550] text-ink">{education.school}</strong>
            <span>{education.location}</span>
          </div>

          <p className="mt-11 max-w-170 text-[clamp(1.65rem,3vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.045em] text-ink max-[780px]:mt-9 max-[780px]:text-[clamp(1.6rem,7vw,2.15rem)]">
            Currently building thoughtful{' '}
            <ScribbleUnderline>web</ScribbleUnderline>{' '}
            apps and{' '}
            <ScribbleUnderline>learning backend</ScribbleUnderline>{' '}
            development.
          </p>

          <ul className="mt-7 mb-0 grid max-w-173 list-none gap-3 p-0 text-sm leading-[1.55] text-ink-soft">
            <li className="relative pl-6 before:absolute before:top-[0.58em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-blue before:content-['']">Currently working on <LinkBadge label={currentProject.title} href={currentProject.github} detail={currentProject.description} preview={currentProjectPreview} />, {currentProject.spotlightDescription}</li>
            <li className="relative pl-6 before:absolute before:top-[0.58em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-blue before:content-['']">built 10 iOS apps through an Apple-supported development program</li>
            <li className="relative pl-6 leading-[1.55] before:absolute before:top-[0.58em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-blue before:content-['']">
              <span>enjoy solving problems on </span>
              <LinkBadge label="DMOJ" href={profile.links.dmoj} detail="Competitive programming profile" />
              <span> and </span>
              <LinkBadge label="LeetCode" href={profile.links.leetcode} detail="Algorithms and data structures" />
            </li>
          </ul>

          <ContactActions className="mt-8" />
        </section>

        <section className="w-full max-w-225 scroll-mt-9 py-15 pb-18 max-[780px]:scroll-mt-20 max-[780px]:py-12 max-[780px]:pb-15" id="experience">
          <SectionHeading label="experience" title="Where I&apos;ve worked" note="Select a role to read more" doodle="experience" />
          <ExperienceList items={experience} />
        </section>

        <section className="w-full max-w-225 scroll-mt-9 pt-15 pb-20 max-[780px]:scroll-mt-20 max-[780px]:pt-12 max-[780px]:pb-17" id="projects">
          <SectionHeading label="projects" title="Things I&apos;ve built" note="Ideas I thought were useful, helpful, or fun" doodle="projects" />
          <div className="grid grid-cols-2 gap-x-7 gap-y-13 max-[780px]:w-full max-[780px]:grid-cols-1 max-[780px]:gap-12">
            {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
          </div>
        </section>

        <section className="w-full max-w-225 scroll-mt-9 py-15 pb-18 max-[780px]:scroll-mt-20 max-[780px]:py-12 max-[780px]:pb-15" id="skills">
          <SectionHeading label="skills" title="My toolkit" note="Select to view technologies" doodle="skills" />
          <SkillsPanel groups={skillGroups} />
        </section>

        <section className="w-full max-w-225 scroll-mt-9 py-15 pb-18 max-[780px]:scroll-mt-20 max-[780px]:py-12 max-[780px]:pb-15" id="education">
          <SectionHeading label="education" title="Current program" doodle="education" />
          <article className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-8 rounded-2xl border border-border bg-canvas p-6 max-[780px]:grid-cols-1 max-[780px]:gap-5 max-[780px]:p-6">
            <div>
              <h3 className="m-0 text-lg font-[620] tracking-[-0.03em] text-ink">{education.school}</h3>
              <p className="mt-2 mb-0 text-sm leading-normal text-muted">{education.degree}</p>
            </div>
            <div className="grid gap-2 text-right text-[11px] leading-[1.45] text-muted max-[780px]:text-left">
              <span>{education.location}</span>
              <span>{education.dates}</span>
            </div>
          </article>
        </section>

        <section className="relative mt-5 mb-14 w-full max-w-225 scroll-mt-9 overflow-hidden rounded-2xl border border-border bg-paper-soft p-11 max-[780px]:mt-0 max-[780px]:mb-10 max-[780px]:scroll-mt-20 max-[780px]:px-6 max-[780px]:py-7" id="contact">
          <ContactLoop />
          <div className="relative z-1">
            <span className="inline-flex w-fit items-center justify-self-start rounded-full bg-blue-soft px-2.5 py-1.5 text-[10px] font-[650] tracking-[0.08em] text-blue-dark uppercase">contact</span>
            <div className="mt-5 max-w-155">
              <h2 className="m-0 text-[clamp(2rem,4vw,2.8rem)] font-[520] leading-[1.05] tracking-[-0.055em] text-ink">
                Have something interesting{' '}
                <span className="inline-flex items-center gap-3 align-middle whitespace-nowrap">
                  in mind?
                  <HeadingDoodle type="contact" />
                </span>
              </h2>
            </div>
            <p className="my-5 mb-7 max-w-130 text-base leading-[1.6] text-muted">I&apos;m always happy to talk about software, projects, and new opportunities.</p>
            <ContactActions emailLabel={profile.email} stackOnMobile />
          </div>
        </section>

        <footer className="flex w-full max-w-225 items-center justify-between gap-6 border-t border-border py-6 pb-7 text-[10px] text-muted max-[780px]:pb-6">
          <span>&copy; {currentYear} {profile.name}</span>
          <a className="inline-flex items-center gap-1 text-muted no-underline transition-colors duration-150 hover:text-blue" href="#intro">back to top <ArrowIcon direction="up" /></a>
        </footer>
      </PageShell>
    </>
  )
}

export default App
