import { useEffect, useState } from 'react'
import './App.css'
import { DesktopRail, MobileHeader } from './components/SiteNav'
import { ContactLoop, HeadingDoodle, HeroUnderline } from './components/Doodles'
import { ExperienceList } from './components/ExperienceList'
import { ProjectCard } from './components/ProjectCard'
import { SkillsPanel } from './components/SkillsPanel'
import { ArrowIcon, GithubIcon, LinkedinIcon } from './components/Icons'
import { education, experience, navigation, profile, projects, skillGroups } from './data/portfolio'

function SectionHeading({ label, title, note, doodle }) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-label">{label}</span>
        <div className="section-title-row">
          <h2>{title}</h2>
          <HeadingDoodle type={doodle} />
        </div>
      </div>
      {note && <p>{note}</p>}
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
      <div className="portfolio-shell">
        <DesktopRail activeSection={activeSection} />

        <main className="portfolio-main">
          <section className="hero-section" id="intro">
            <span className="hero-kicker">HI, I&apos;M</span>
            <h1 aria-label={profile.name}>
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </h1>

            <div className="education-line">
              <span className="education-pill">CS CO-OP</span>
              <strong>{education.school}</strong>
              <span>{education.location}</span>
            </div>

            <p className="hero-statement">
              Currently building <span className="hero-thoughtful">thoughtful<HeroUnderline /></span> web apps and learning backend development.
            </p>

            <ul className="hero-highlights">
              <li>studying computer science at Waterloo</li>
              <li>built 10 iOS apps through an Apple-supported development program</li>
              <li>contributed editorials, tests, and guides to USACO Guide</li>
            </ul>

            <div className="hero-actions">
              <a className="primary-action" href={`mailto:${profile.email}`}>Email me <ArrowIcon /></a>
              <a className="secondary-action" href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
              <a className="secondary-action" href={profile.links.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
            </div>
          </section>

          <section className="content-section" id="experience">
            <SectionHeading label="experience" title="Where I’ve worked" note="Select a role to read more" doodle="experience" />
            <ExperienceList items={experience} />
          </section>

          <section className="content-section projects-section" id="projects">
            <SectionHeading label="projects" title="Things I’ve built" note="A mix of product, accessibility, and play" doodle="projects" />
            <div className="project-grid">
              {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
            </div>
          </section>

          <section className="content-section" id="skills">
            <SectionHeading label="skills" title="My toolkit" note="Select to view technologies" doodle="skills" />
            <SkillsPanel groups={skillGroups} />
          </section>

          <section className="content-section education-section" id="education">
            <SectionHeading label="education" title="Current program" doodle="education" />
            <article className="education-card">
              <div>
                <h3>{education.school}</h3>
                <p>{education.degree}</p>
              </div>
              <div className="education-card__meta">
                <span>{education.location}</span>
                <span>{education.dates}</span>
              </div>
            </article>
          </section>

          <section className="contact-section" id="contact">
            <ContactLoop />
            <span className="section-label">contact</span>
            <div className="contact-heading-row">
              <h2>Have something interesting in mind?</h2>
              <HeadingDoodle type="contact" />
            </div>
            <p>I’m always happy to talk about software, projects, and new opportunities.</p>
            <div className="contact-actions">
              <a className="primary-action" href={`mailto:${profile.email}`}>{profile.email} <ArrowIcon /></a>
              <a className="contact-social" href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>
              <a className="contact-social" href={profile.links.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
            </div>
          </section>

          <footer className="site-footer">
            <span>© 2026 Jason Sun</span>
            <a href="#intro">Back to top <ArrowIcon direction="up" /></a>
          </footer>
        </main>
      </div>
    </>
  )
}

export default App
