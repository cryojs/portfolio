import { Fragment } from 'react'
import { ChevronsRight } from 'lucide-react'
import { aboutCopy, photographs } from '../data/editorial'
import { education, experience, profile } from '../data/portfolio'
import { AboutLinkBadge, PageIntro, Photo } from '../components/Editorial'
import Hobbies from '../components/Hobbies'
import PageEmblem from '../components/PageEmblem'
import Silhouette from '../components/Silhouette'
import MusicPreview from '../components/MusicPreview'

function CompanyChip({ item, index }) {
  return (
    <AboutLinkBadge
      href={item.website}
      external
      image={item.logo}
      className={`about-link-badge-company about-link-badge-company-${index}`}
    >
      {item.company}
    </AboutLinkBadge>
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
              <AboutLinkBadge
                brand="waterloo"
                href="https://uwaterloo.ca/"
                external
                className="about-link-badge-waterloo"
              >
                the University of Waterloo
              </AboutLinkBadge>
            </li>
            <li>
              building{' '}
              <AboutLinkBadge
                brand="readify"
                href="#projects/readify"
              >
                Readify
              </AboutLinkBadge>
              , a browser extension for a more personal reading experience, now available on{' '}
              <AboutLinkBadge
                brand="chrome"
                href="https://chromewebstore.google.com/detail/readify/cpdfcocmpacdfogkbgjggdokppbffafb"
                external
              >
                Chrome Web Store
              </AboutLinkBadge>{' '}and{' '}
              <AboutLinkBadge
                brand="firefox"
                href="https://addons.mozilla.org/en-CA/firefox/addon/readify-web/"
                external
              >
                Firefox Add-ons
              </AboutLinkBadge>
            </li>
            <li>
              elsewhere:{' '}
              <AboutLinkBadge
                brand="github"
                href={profile.links.github}
                external
              >
                GitHub
              </AboutLinkBadge>{' '}
              <AboutLinkBadge
                brand="linkedin"
                href={profile.links.linkedin}
                external
              >
                LinkedIn
              </AboutLinkBadge>
            </li>
          </ul>
        </section>
      </div>

      <section className="about-previous about-section" id="experience">
        <div className="about-section-heading">
          <span className="about-section-kicker">previously:</span>
        </div>
        <div className="about-experience-list">
          <article className="about-experience-item" key="governor-general">
            <span className="about-experience-mark" aria-hidden="true">•</span>
            <p className="about-experience-line">won the Governor General&apos;s Academic Medal from my high school</p>
          </article>
          {experience.map((item, index) => (
            <Fragment key={item.id}>
              <article className="about-experience-item">
                <span className="about-experience-mark" aria-hidden="true">
                  •
                </span>
                  <p className="about-experience-line">
                    {item.id === 'career-education-council' && (
                    <>built and designed iOS apps at <CompanyChip item={item} index={index} /></>
                  )}
                  {item.id === 'usaco-guide' && (
                    <>contributed 6 pull requests with algorithm explanations and solutions to <CompanyChip item={item} index={index} /></>
                  )}
                  {item.id === 'three-flavors' && (
                    <>taught python and programming fundamentals to 15+ students at <CompanyChip item={item} index={index} /></>
                  )}
                </p>
              </article>
              {item.id === 'career-education-council' && (
                <article className="about-experience-item" key="competitive-programming">
                  <span className="about-experience-mark" aria-hidden="true">•</span>
                  <p className="about-experience-line">
                    practiced competitive programming on{' '}
                    <AboutLinkBadge
                      brand="dmoj"
                      href={profile.links.dmoj}
                      external
                    >
                      DMOJ
                    </AboutLinkBadge>{' and '}
                    <AboutLinkBadge
                      brand="leetcode"
                      href={profile.links.leetcode}
                      external
                    >
                      LeetCode
                    </AboutLinkBadge>, and earned Honor Roll in CCC Senior 2026
                  </p>
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
            <li>philosophy, photography, and reading</li>
            <li>cats and chocolate</li>
            <li>currently listening to <MusicPreview /> by quadeca</li>
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
