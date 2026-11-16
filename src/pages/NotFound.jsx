import { chapters } from '../data/chapters'
import { NextPage, PageIntro } from '../components/Editorial'

export default function NotFound({ headingRef }) {
  return (
    <div className="inner-page notfound-page">
      <PageIntro headingRef={headingRef}>
        lost in
        <br />
        <em>orbit</em>
      </PageIntro>
      <section className="notfound-body inner-rule">
        <span className="section-kicker">nothing here:</span>
        <p>
          the page at <code>{window.location.hash || '/'}</code> doesn’t exist, or it moved.
        </p>
        <ul className="bullet-list">
          {chapters.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a> · {item.subtitle.toLowerCase()}
            </li>
          ))}
        </ul>
      </section>
      <NextPage href="#home" silhouette="bear">
        back to the start
      </NextPage>
    </div>
  )
}
