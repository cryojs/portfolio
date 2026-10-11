import { useState } from 'react'
import { projects } from '../data/portfolio'
import { projectEditorial } from '../data/editorial'
import { ExternalLink, PageIntro, Star } from '../components/Editorial'

function ProjectImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className="missing-media">
      screenshot unavailable — explore the source below.
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

export default function Projects({ headingRef, anchor }) {
  return (
    <div className="inner-page projects-page">
      <PageIntro headingRef={headingRef}>
        from a thought
        <br />
        to a <em>thing.</em>
        <Star />
      </PageIntro>
      <nav className="project-index" aria-label="Project index">
        {projects.map((item) => (
          <a href={`#projects/${item.id}`} key={item.id}>
            {item.title}
            <span aria-hidden="true">↘</span>
          </a>
        ))}
      </nav>
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
                  <Star />
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
                <h2 tabIndex={-1}>{item.title}</h2>
                <div>
                  <p className="project-description">{item.description}</p>
                  <ul className="tags" aria-label="Technologies">
                    {item.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <details
                    key={`${item.id}-${anchor === `project-${item.id}`}`}
                    open={anchor === `project-${item.id}` || undefined}
                  >
                    <summary>
                      take a closer look <span aria-hidden="true">+</span>
                    </summary>
                    <div className="project-details">
                      <p>{editorial.detail}</p>
                      {editorial.contribution && (
                        <p>{editorial.contribution}</p>
                      )}
                      {item.media.video && (
                        <video
                          controls
                          preload="none"
                          poster={item.media.image}
                          aria-label="Readify product demonstration"
                        >
                          <source src={item.media.video} type="video/webm" />
                        </video>
                      )}
                      {item.media.editor && (
                        <ProjectImage
                          src={item.media.editor}
                          alt="Tidebreak in-game level editor"
                          width={1783}
                          height={1018}
                        />
                      )}
                    </div>
                  </details>
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
          let’s talk about it <i>↗</i>
        </span>
      </a>
    </div>
  )
}
