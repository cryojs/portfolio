import { Fragment } from 'react'
import { aboutCopy, photographs } from '../data/editorial'
import { education, experience, profile } from '../data/portfolio'
import { LinkBadge, NextPage, PageIntro, Photo } from '../components/Editorial'
import PageEmblem from '../components/PageEmblem'
import MusicPreview from '../components/MusicPreview'

function CompanyChip({ item, index }) {
  return (
    <LinkBadge
      href={item.website}
      external
      image={item.logo}
      className={`link-badge-company link-badge-company-${index}`}
    >
      {item.company}
    </LinkBadge>
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
          <span className="section-kicker">currently:</span>
          <ul className="bullet-list about-current-list">
            <li>
              studying computer science at{' '}
              <LinkBadge
                brand="waterloo"
                href="https://uwaterloo.ca/"
                external
                className="link-badge-waterloo"
              >
                the University of Waterloo
              </LinkBadge>
            </li>
            <li>
              building{' '}
              <LinkBadge
                brand="readify"
                href="#projects/readify"
              >
                Readify
              </LinkBadge>
              , a browser extension for a more personal reading experience, now available on{' '}
              <LinkBadge
                brand="chrome"
                href="https://chromewebstore.google.com/detail/readify/cpdfcocmpacdfogkbgjggdokppbffafb"
                external
              >
                Chrome Web Store
              </LinkBadge>{' '}and{' '}
              <LinkBadge
                brand="firefox"
                href="https://addons.mozilla.org/en-CA/firefox/addon/readify-web/"
                external
              >
                Firefox Add-ons
              </LinkBadge>
            </li>
            <li>
              elsewhere:{' '}
              <LinkBadge
                brand="github"
                href={profile.links.github}
                external
              >
                GitHub
              </LinkBadge>{' '}
              <LinkBadge
                brand="linkedin"
                href={profile.links.linkedin}
                external
              >
                LinkedIn
              </LinkBadge>
            </li>
          </ul>
        </section>
      </div>

      <section className="about-previous about-section" id="experience">
        <div className="about-section-heading">
          <span className="section-kicker">previously:</span>
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
                    <>merged 6 pull requests adding python solutions and quizzes to <CompanyChip item={item} index={index} /></>
                  )}
                  {item.id === 'stephen-lewis' && (
                    <>
                      led the CS and math clubs at <CompanyChip item={item} index={index} />, and open-sourced our{' '}
                      <LinkBadge brand={item.repo.brand} href={item.repo.href} external>
                        {item.repo.label}
                      </LinkBadge>
                    </>
                  )}
                </p>
              </article>
              {item.id === 'career-education-council' && (
                <article className="about-experience-item" key="competitive-programming">
                  <span className="about-experience-mark" aria-hidden="true">•</span>
                  <p className="about-experience-line">
                    practiced competitive programming on{' '}
                    <LinkBadge
                      brand="dmoj"
                      href={profile.links.dmoj}
                      external
                    >
                      DMOJ
                    </LinkBadge>{' and '}
                    <LinkBadge
                      brand="leetcode"
                      href={profile.links.leetcode}
                      external
                    >
                      LeetCode
                    </LinkBadge>, earned Honor Roll in CCC Senior 2026, and got a perfect score in CCC Junior 2024
                  </p>
                </article>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <div className="about-lower-grid">
        <section className="about-section about-next" id="next">
          <span className="section-kicker">next:</span>
          <ul className="bullet-list">
            {aboutCopy.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="about-section about-outside" id="outside">
          <span className="section-kicker">interests:</span>
          <ul className="bullet-list">
            <li>
              philosophy, photography{' '}
              <LinkBadge brand="instagram" href={profile.links.instagram} external>
                @cryojs
              </LinkBadge>
              , and reading
            </li>
            <li>cats and chocolate</li>
            <li>currently listening to <MusicPreview /> by quadeca</li>
          </ul>
        </section>
      </div>

      <div className="about-info-grid">
        <section className="about-info-card" id="education">
          <span className="section-kicker">education:</span>
          <h2>{education.school}</h2>
        </section>
        <div className="education-details">
          <p className="education-degree">{education.degree}</p>
          <p className="education-dates">started 2026, expected 2031</p>
        </div>
      </div>

      <NextPage href="#work" silhouette="bear">
        learning by doing
      </NextPage>
    </div>
  )
}
