import { ArrowUpRight, ChevronsRight, Code2, Globe, Puzzle } from 'lucide-react'
import { projects } from '../data/portfolio'
import { PageIntro } from '../components/Editorial'
import PageEmblem from '../components/PageEmblem'
import ProjectGallery from '../components/ProjectGallery'
import Silhouette from '../components/Silhouette'

function ProjectLink({ href, icon: Icon, children }) {
  return (
    <a className="project-destination" href={href} target="_blank" rel="noreferrer">
      <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={13} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default function Projects({ headingRef }) {
  return (
    <div className="inner-page projects-page">
      <PageIntro headingRef={headingRef} motif="projects">
        from thought
        <br />
        to <em>thing</em>
        <PageEmblem kind="projects" />
      </PageIntro>
      <div className="project-spreads">
        {projects.map((item) => {
          return (
            <article id={`project-${item.id}`} className={`project-spread project-${item.id}`} key={item.id}>
              <div className="project-top mono">
                <span>{item.dates}</span>
              </div>
              <div className="project-layout">
                <ProjectGallery media={item.media} title={item.title} />
                <div className="project-info">
                  <div className="project-overview">
                    <h2 tabIndex={-1}>{item.title}</h2>
                    <p className="project-description">{item.description}</p>
                  </div>
                  <div className="project-details">
                    <ul className="tags" aria-label="Technologies">
                      {item.tech.map((tech) => <li key={tech}>{tech}</li>)}
                    </ul>
                    <div className="project-links">
                      <ProjectLink href={item.github} icon={Code2}>source code</ProjectLink>
                      {item.live && <ProjectLink href={item.live} icon={Globe}>live project</ProjectLink>}
                      {item.storeLinks?.map((link) => (
                        <ProjectLink href={link.href} icon={Puzzle} key={link.label}>
                          find on {link.label.toLowerCase()}
                        </ProjectLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <a className="next-page" href="#contact">
        <span>let’s talk about it <ChevronsRight className="next-page-chevron" aria-hidden="true" size={22} strokeWidth={1.8} /></span>
        <Silhouette kind="letter" className="next-page-silhouette" />
      </a>
    </div>
  )
}
