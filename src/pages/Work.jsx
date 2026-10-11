import { experience } from '../data/portfolio'
import { PageIntro, Star } from '../components/Editorial'
import Silhouette from '../components/Silhouette'

export default function Work({ headingRef }) {
  return (
    <div className="inner-page work-page">
      <PageIntro headingRef={headingRef}>
        some of the places
        <br />
        i’ve <em>worked.</em>
        <Star />
      </PageIntro>
      <div className="experience-gallery">
        {experience.map((item, index) => (
          <article
            key={item.id}
            className={`experience-panel experience-panel-${index}`}
          >
            <div className="experience-identity">
              <img src={item.logo} alt="" loading="lazy" />
              <h2>{item.company}</h2>
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
        <div className="work-aside" aria-hidden="true">
          <Silhouette kind="bear" />
        </div>
      </div>
      <a className="next-page" href="#projects">
        <span>
          see what i’m making <i>↗</i>
        </span>
      </a>
    </div>
  )
}
