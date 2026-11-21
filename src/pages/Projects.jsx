import { Award } from 'lucide-react'
import { projects, smallProjects } from '../data/portfolio'
import { LinkBadge, NextPage, PageIntro } from '../components/Editorial'
import PageEmblem from '../components/PageEmblem'
import ProjectGallery from '../components/ProjectGallery'

const storeBrands = {
  chrome: ['chrome', 'Chrome Web Store'],
  firefox: ['firefox', 'Firefox Add-ons'],
}

function ProjectLinks({ item }) {
  return (
    <div className="project-links">
      <LinkBadge brand="github" href={item.github} external>
        source code
      </LinkBadge>
      {item.live && (
        <LinkBadge brand="web" href={item.live} external>
          live project
        </LinkBadge>
      )}
      {item.storeLinks?.map((link) => {
        const [brand, label] = storeBrands[link.label.toLowerCase()]
        return (
          <LinkBadge brand={brand} href={link.href} external key={link.label}>
            {label}
          </LinkBadge>
        )
      })}
    </div>
  )
}

export default function Projects({ headingRef }) {
  return (
    <div className="inner-page projects-page">
      <PageIntro headingRef={headingRef}>
        from thought
        <br />
        to <em>thing</em>
        <PageEmblem kind="projects" />
      </PageIntro>
      <div className="project-spreads">
        {projects.map((item) => (
          <article id={`project-${item.id}`} className={`project-spread project-${item.id}`} key={item.id}>
            <div className="project-info inner-rule">
              <p className="project-meta">
                <span className="project-dates">{item.dates}</span>
              </p>
              <h2 tabIndex={-1}>{item.title}</h2>
              {item.context && (
                <p className="project-context">
                  <Award className="project-context-icon" aria-hidden="true" size={14} strokeWidth={2.2} />
                  <span>
                    {item.context.prefix}{' '}
                    <a href={item.context.href} target="_blank" rel="noreferrer">
                      {item.context.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </span>
                </p>
              )}
              <p className="project-description">{item.description}</p>
              <p className="project-tech">
                <span className="project-tech-label">built with</span>
                <span className="sr-only">: </span>
                {item.tech.join(' · ')}
              </p>
              <ProjectLinks item={item} />
            </div>
            <ProjectGallery media={item.media} title={item.title} />
          </article>
        ))}
      </div>

      {smallProjects.length > 0 && (
        <section className="small-projects" aria-labelledby="small-projects-heading">
          <span className="section-kicker" id="small-projects-heading">
            smaller projects:
          </span>
          <div className="small-project-list">
            {smallProjects.map((item) => (
              <article id={`project-${item.id}`} className={`small-project project-${item.id}`} key={item.id}>
                {item.image && (
                  <div className="small-project-thumb">
                    <img src={item.image.src} alt={item.image.alt} loading="lazy" />
                  </div>
                )}
                <div className="small-project-info">
                  <p className="project-meta">
                    <span className="project-dates">{item.dates}</span>
                  </p>
                  <h3>{item.title}</h3>
                  <p className="small-project-description">{item.description}</p>
                  <p className="project-tech">
                    <span className="project-tech-label">built with</span>
                    <span className="sr-only">: </span>
                    {item.tech.join(' · ')}
                  </p>
                  <ProjectLinks item={item} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <NextPage href="#contact" silhouette="letter">
        let’s talk about it
      </NextPage>
    </div>
  )
}
