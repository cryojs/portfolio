import { useState } from 'react'
import { EntryTrail } from './Visuals'

function ExternalLink({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
}
function ProjectMedia({ project }) {
  const [playing, setPlaying] = useState(false)
  const [editor, setEditor] = useState(false)
  const media = project.media
  if (media.variant === 'tidebreak') return <div className="project-media"><img src={editor ? media.editor : media.gameplay} alt={editor ? 'Tidebreak in-game level editor' : 'Tidebreak platformer gameplay'} loading="lazy"/><button className="media-button" onClick={() => setEditor(!editor)}>{editor ? 'show gameplay' : 'show level editor'} ↔</button></div>
  return <div className="project-media">
    {playing ? <video controls autoPlay muted playsInline preload="metadata" poster={media.image}><source src={media.video} type="video/webm"/><a href={media.video}>watch the demo</a></video> : <img src={media.image} alt={media.alt} loading="lazy" style={{ objectPosition: media.position }}/>} 
    {media.video && <button className="media-button demo-toggle" onClick={() => setPlaying(!playing)}>{playing ? '× close demo' : '▷ play demo'}</button>}
  </div>
}
function Projects({ projects }) {
  return <>
    <nav className="project-index" aria-label="Jump to a project">{projects.map(project => <a href={`#projects/${project.id}`} key={project.id}>{project.title.toLowerCase()} <span aria-hidden="true">↓</span></a>)}</nav>
    <div className="project-collection"><EntryTrail/>{projects.map(project => <article className="project-story" id={`project-${project.id}`} key={project.id}>
      <span className="trail-node" data-trail-node aria-hidden="true"/>
      <ProjectMedia project={project}/>
      <div className="project-details"><p className="entry-date">{project.dates}</p><h2 tabIndex={-1}>{project.title.toLowerCase()}</h2><p>{project.description}</p><ul className="tech-list" aria-label={`${project.title} technologies`}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul><div className="project-links">{project.live && <ExternalLink href={project.live}>try it out</ExternalLink>}{project.storeLinks?.map(link => <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>)}<ExternalLink href={project.github}>source code</ExternalLink></div></div>
    </article>)}</div>
  </>
}
function Experience({ experience }) {
  return <div className="experience-log"><EntryTrail/>{experience.map(job => <article className="log-entry" key={job.id}>
    <span className="trail-node" data-trail-node aria-hidden="true"/>
    <aside><p className="entry-date">{job.dates}</p><span>{job.location}</span></aside>
    <div className="log-copy"><p className="log-company"><img src={job.logo} alt="" width="30" height="30"/>{job.company}</p><h2>{job.role}</h2><ul>{job.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></div>
  </article>)}</div>
}
export function AboutContent({ education, profile, skillGroups }) {
  return <div className="about-home" id="about-details">
    <section className="now-section" id="currently"><h2 tabIndex={-1}>what i’m up to</h2><p>building <a href="#projects/readify">readify</a>, a browser extension for more accessible reading, and <a href="#projects/friction">friction</a>, an AI tool for testing websites.</p><p>away from those projects, i enjoy working through programming problems on <ExternalLink href={profile.links.dmoj}>DMOJ</ExternalLink> and <ExternalLink href={profile.links.leetcode}>LeetCode</ExternalLink>.</p></section>
    <section className="education-note" id="education"><h2 tabIndex={-1}>{education.school}</h2><p>{education.degree}</p><p className="education-meta">{education.dates}<br/>{education.location}</p></section>
    <section className="toolkit" id="skills"><details><summary><h2 tabIndex={-1}>my toolkit</h2><span aria-hidden="true">+</span></summary><div className="toolkit-content">{skillGroups.map(group => <div className="toolkit-group" key={group.id}><h3>{group.label}</h3><ul>{group.values.map(value => <li key={value}>{value}</li>)}</ul></div>)}</div></details></section>
  </div>
}
function Contact({ profile }) {
  return <section className="contact-content"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a><div className="contact-links"><ExternalLink href={profile.links.github}>GitHub</ExternalLink><ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink></div></section>
}
export function ChapterContent(props) {
  if (props.chapter === 'work') return <Experience experience={props.experience}/>
  if (props.chapter === 'projects') return <Projects projects={props.projects}/>
  return <Contact profile={props.profile}/>
}
