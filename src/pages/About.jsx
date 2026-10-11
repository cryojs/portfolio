import { aboutCopy, photographs } from '../data/editorial'
import { education, profile, skillGroups } from '../data/portfolio'
import { ExternalLink, PageIntro, Photo, Star } from '../components/Editorial'

export default function About({ headingRef }) {
  return (
    <div className="inner-page about-page">
      <PageIntro headingRef={headingRef}>
        still curious.
        <br />
        still <em>becoming.</em>
      </PageIntro>
      <div className="about-composition">
        <div className="about-portrait">
          <Photo photo={photographs.portrait} />
          <Star />
        </div>
        <div className="about-story">
          <p className="about-lede">{aboutCopy.intro}</p>
          <p>{aboutCopy.approach}</p>
          <p>{aboutCopy.learning}</p>
          <div className="about-links">
            <ExternalLink href={profile.links.dmoj}>dmoj</ExternalLink>
            <ExternalLink href={profile.links.leetcode}>leetcode</ExternalLink>
          </div>
        </div>
      </div>
      <div className="about-facts">
        <section id="education">
          <span className="mono">education</span>
          <h2>{education.school}</h2>
          <p>{education.degree}</p>
          <p className="mono">
            {education.dates}
            <br />
            {education.location}
          </p>
        </section>
        <section id="skills">
          <span className="mono">tools i use</span>
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.id}>
              <h3>{group.label}</h3>
              <p>{group.values.join(' / ')}</p>
            </div>
          ))}
        </section>
      </div>
      <div className="about-ending" id="currently">
        <div>
          <span className="mono">currently building</span>
          <h2>
            a more comfortable
            <br />
            corner of <em>the web.</em>
          </h2>
          <p>
            i’ve been building readify, a browser extension for a more personal
            reading experience.
          </p>
          <a className="text-link" href="#projects/readify">
            explore readify <span>↗</span>
          </a>
          {aboutCopy.outside && <p>{aboutCopy.outside}</p>}
        </div>
        <Photo photo={photographs.everyday} />
      </div>
      <a className="next-page" href="#work">
        <span>
          learning by doing <i>↗</i>
        </span>
      </a>
    </div>
  )
}
