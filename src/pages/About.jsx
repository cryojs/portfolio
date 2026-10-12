import { Fragment } from 'react'
import { ChevronsRight } from 'lucide-react'
import { aboutCopy, photographs } from '../data/editorial'
import { education, experience, profile } from '../data/portfolio'
import { BrandMark, ExternalLink, PageIntro, Photo } from '../components/Editorial'
import Hobbies from '../components/Hobbies'
import PageEmblem from '../components/PageEmblem'
import Silhouette from '../components/Silhouette'
import MusicPreview from '../components/MusicPreview'

function CompanyChip({ item, index }) {
  return (
    <a href={item.website} target="_blank" rel="noreferrer"
      className={`about-chip about-chip-company about-chip-${index}`}>
      <img src={item.logo} alt="" />
      <span>{item.company}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default function About({ headingRef }) {
  return (
    <div className="inner-page about-page">
      <PageIntro headingRef={headingRef}>
        sharing a little
        <br />
        about <em>myself</em>
        <PageEmblem kind="about" />
      </PageIntro>

      <div className="about-hero-grid">
        <figure className="about-portrait">
          <Photo photo={photographs.portrait} />
        </figure>

        <section className="about-current about-section" id="currently">
          <span className="about-section-kicker">currently:</span>
          <ul className="about-bullet-list about-current-list">
            <li>
              studying computer science at{' '}
              <a
                className="about-chip about-chip-waterloo"
                href="https://uwaterloo.ca/"
                target="_blank"
                rel="noreferrer"
              >
                <BrandMark brand="waterloo" />
                the University of Waterloo
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              building{' '}
              <a
                className="about-code-link about-code-link-readify"
                href="#projects/readify"
              >
                <BrandMark brand="readify" />
                Readify
              </a>
              , a browser extension for a more personal reading experience
            </li>
            <li>
              practicing competitive programming on{' '}
              <ExternalLink
                className="about-code-link about-code-link-dmoj"
                href={profile.links.dmoj}
              >
                <BrandMark brand="dmoj" />
                DMOJ
              </ExternalLink>{' and '}
              <ExternalLink
                className="about-code-link about-code-link-leetcode"
                href={profile.links.leetcode}
              >
                <BrandMark brand="leetcode" />
                LeetCode
              </ExternalLink>
            </li>
            <li>
              elsewhere:{' '}
              <ExternalLink
                className="about-code-link about-code-link-github"
                href={profile.links.github}
              >
                <BrandMark brand="github" />
                GitHub
              </ExternalLink>{' '}
              <ExternalLink
                className="about-code-link about-code-link-linkedin"
                href={profile.links.linkedin}
              >
                <BrandMark brand="linkedin" />
                LinkedIn
              </ExternalLink>
            </li>
          </ul>
        </section>
      </div>

      <section className="about-previous about-section" id="experience">
        <div className="about-section-heading">
          <span className="about-section-kicker">previously:</span>
        </div>
        <div className="about-experience-list">
          {experience.map((item, index) => (
            <Fragment key={item.id}>
              <article className="about-experience-item">
                <span className="about-experience-mark" aria-hidden="true">
                  •
                </span>
                <p className="about-experience-line">
                  {item.id === 'career-education-council' && (
                    <>built 10 iOS apps at <CompanyChip item={item} index={index} /></>
                  )}
                  {item.id === 'usaco-guide' && (
                    <>contributed 6 pull requests with algorithm explanations and solutions to <CompanyChip item={item} index={index} /></>
                  )}
                  {item.id === 'three-flavors' && (
                    <>taught python and programming fundamentals to 15+ students at <CompanyChip item={item} index={index} /></>
                  )}
                </p>
              </article>
              {index === 0 && (
                <article className="about-experience-item" key="governor-general">
                  <span className="about-experience-mark" aria-hidden="true">•</span>
                  <p className="about-experience-line">won the Governor General&apos;s Academic Medal from my high school</p>
                </article>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <div className="about-lower-grid">
        <section className="about-section about-next" id="next">
          <span className="about-section-kicker">next:</span>
          <ul className="about-bullet-list">
            {aboutCopy.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="about-section about-outside" id="outside">
          <span className="about-section-kicker">interests:</span>
          <ul className="about-bullet-list">
            <li>reading and philosophy (like camus and lacan)</li>
            <li>enjoys photography and eating chocolate</li>
            <li>currently listening to <MusicPreview /> by quadeca</li>
            <li>inspired by euler&apos;s work ethic and brilliance</li>
          </ul>
        </section>
      </div>

      <div className="about-info-grid">
        <section className="about-info-card" id="education">
          <span className="about-section-kicker">education:</span>
          <h2>{education.school}</h2>
        </section>
        <div className="education-details">
          <p className="education-degree">{education.degree}</p>
          <p className="education-dates">started 2026, expected 2031</p>
        </div>
      </div>

      <Hobbies />

      <a className="next-page" href="#work">
        <span>
          learning by doing <ChevronsRight className="next-page-chevron" aria-hidden="true" size={22} strokeWidth={1.8} />
        </span>
        <Silhouette kind="bear" className="next-page-silhouette" />
      </a>
    </div>
  )
}
