import { useState } from 'react'
import { ChevronsRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import { projectEditorial } from '../data/editorial'
import { ExternalLink, PageIntro } from '../components/Editorial'
import PageEmblem from '../components/PageEmblem'
import Silhouette from '../components/Silhouette'
import ProjectMark from '../components/ProjectMark'

function ProjectImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className="missing-media">
      screenshot unavailable · explore the source below.
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      {...props}
    />
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
          const editorial = projectEditorial[item.id] || {
            category: 'software project',
            line: item.title,
            detail: item.description,
          }
          return (
            <article
              id={`project-${item.id}`}
              className={`project-spread project-${item.id}`}
              key={item.id}
            >
              <div className="project-top mono">
                <span>
                  {editorial.category.replace(/^\d+ \/ /, '').toLowerCase()}
                </span>
                <span>{item.dates}</span>
              </div>
              <div className="project-art">
                {item.id === 'readify' && (
                  <span className="reading-glyph" aria-hidden="true">
                    Aa
                  </span>
                )}
                {item.id === 'refrain' && (
                  <div className="focus-dial" aria-hidden="true" />
                )}
                <div className="project-art-copy">
                  <p>
                    {editorial.line.split('\n').map((line, i) => (
                      <span key={line}>
                        {i ? <em>{line}</em> : line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <ProjectMark kind={item.id} />
                </div>
                <a
                  className="project-screen"
                  href={item.live || item.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Explore ${item.title} (opens in a new tab)`}
                >
                  <ProjectImage
                    src={item.media.image || item.media.gameplay}
                    alt={item.media.alt}
                    width={item.media.width}
                    height={item.media.height}
                  />
                </a>
              </div>
              <div className="project-info">
                <div className="project-overview">
                  <h2 tabIndex={-1}>{item.title}</h2>
                  <p className="project-description">{item.description}</p>
                </div>
                <div>
                  <ul className="tags" aria-label="Technologies">
                    {item.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    <ExternalLink href={item.github}>source code</ExternalLink>
                    {item.live && (
                      <ExternalLink href={item.live}>live project</ExternalLink>
                    )}
                    {item.storeLinks?.map((link) => (
                      <ExternalLink href={link.href} key={link.label}>
                        find on {link.label.toLowerCase()}
                      </ExternalLink>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <a className="next-page" href="#contact">
        <span>
          let’s talk about it <ChevronsRight className="next-page-chevron" aria-hidden="true" size={22} strokeWidth={1.8} />
        </span>
        <Silhouette kind="letter" className="next-page-silhouette" />
      </a>
    </div>
  )
}
