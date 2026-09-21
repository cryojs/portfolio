import { ArrowIcon, GithubIcon } from './Icons'
import { MediaPreview } from './MediaPreview'

export function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <a className="project-media" href={project.live ?? project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
        <MediaPreview media={project.media} title={project.title} />
        <span className="project-open" aria-hidden="true"><ArrowIcon /></span>
      </a>
      <div className="project-heading">
        <h3><a href={project.github} target="_blank" rel="noreferrer">{project.title}</a></h3>
        <span>{project.dates}</span>
      </div>
      <p>{project.description}</p>
      <div className="project-tech" aria-label={`${project.title} technologies`}>
        {project.tech.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noreferrer"><GithubIcon /> Source</a>
        {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live site <ArrowIcon /></a>}
      </div>
    </article>
  )
}
