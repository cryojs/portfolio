import { ChevronsRight } from 'lucide-react'
import { experience } from '../data/portfolio'
import { PageIntro } from '../components/Editorial'
import PageEmblem from '../components/PageEmblem'
import Silhouette from '../components/Silhouette'

export default function Work({ headingRef }) {
  return (
    <div className="inner-page work-page">
      <PageIntro headingRef={headingRef} motif="work">
        some of my
        <br />
        <em>contributions</em>
        <PageEmblem kind="work" />
      </PageIntro>
      <div className="experience-gallery">
        {experience.map((item, index) => (
          <article
            key={item.id}
            className={`experience-panel experience-panel-${index}`}
          >
            <div className="experience-identity">
              <img src={item.logo} alt="" loading="lazy" />
              <h2><a href={item.website} target="_blank" rel="noreferrer">{item.company}<span className="company-link-arrow" aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a></h2>
            </div>
            <p className="experience-role">{item.role}</p>
            <p className="experience-meta">
              <span>{item.dates}</span>
              <span>{item.location}</span>
            </p>
            <div className="experience-body">
              {item.highlights.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
      <a className="next-page" href="#projects">
        <span>
          see what i’m making <ChevronsRight className="next-page-chevron" aria-hidden="true" size={22} strokeWidth={1.8} />
        </span>
        <Silhouette kind="quill" className="next-page-silhouette" />
      </a>
    </div>
  )
}
