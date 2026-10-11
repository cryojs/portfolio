import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { chapters, resolveRoute } from './data/chapters'
import { profile } from './data/portfolio'
import { Star } from './components/Editorial'
import CyberBackdrop from './components/CyberGraphics'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

const readRoute = () => ({
  ...resolveRoute(window.location.hash),
  hash: window.location.hash,
})
const pages = {
  home: Home,
  about: About,
  work: Work,
  projects: Projects,
  contact: Contact,
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      return saved === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      /* Storage may be disabled. */
    }
    document.documentElement.style.colorScheme =
      theme === 'light' ? 'light' : 'dark'
  }, [theme])
  const headingRef = useRef(null)
  const navRef = useRef(null)
  const routeRef = useRef(route)
  const lastPlacedHash = useRef(route.hash)

  useEffect(() => {
    const sync = () => {
      const next = readRoute()
      if (next.hash === routeRef.current.hash) return
      next.restoreY = window.history.state?.portfolio?.scrollY
      routeRef.current = next
      setRoute(next)
    }
    const oldRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    window.addEventListener('portfolio:navigate', sync)
    return () => {
      window.history.scrollRestoration = oldRestoration
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('portfolio:navigate', sync)
    }
  }, [])

  useLayoutEffect(() => {
    document.title = 'Jason Sun - Portfolio'
    const target = route.anchor ? document.getElementById(route.anchor) : null
    const focusTarget = target?.querySelector('h2, h3') || headingRef.current
    if (
      focusTarget &&
      (lastPlacedHash.current !== route.hash || route.anchor)
    ) {
      focusTarget.setAttribute('tabindex', '-1')
      focusTarget.focus({ preventScroll: true })
    }
    const place = () => {
      if (typeof route.restoreY === 'number')
        window.scrollTo({ top: route.restoreY, behavior: 'instant' })
      else if (target)
        target.scrollIntoView({ block: 'start', behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
    place()
    const frame = requestAnimationFrame(place)
    lastPlacedHash.current = route.hash
    return () => cancelAnimationFrame(frame)
  }, [route])

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return undefined

    let frame = 0
    const updateIndicator = () => {
      const active = nav.querySelector('a[aria-current="page"]')
      if (!active) {
        // Keep the marker mounted so leaving a page contracts into a slanted
        // stroke instead of fading away and then reappearing on the next page.
        nav.style.setProperty('--nav-selection-width', '0px')
        nav.style.setProperty('--nav-selection-opacity', '1')
        return
      }
      const navRect = nav.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      nav.style.setProperty(
        '--nav-selection-left',
        `${activeRect.left - navRect.left}px`,
      )
      nav.style.setProperty('--nav-selection-width', `${activeRect.width}px`)
      nav.style.setProperty('--nav-selection-opacity', '1')
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateIndicator)
    }

    schedule()
    window.addEventListener('resize', schedule)
    document.fonts?.ready.then(schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', schedule)
    }
  }, [route.page])

  function navigate(event) {
    const link = event.target.closest('a')
    if (
      !link ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    const href = link.getAttribute('href')
    if (!href?.startsWith('#')) return
    event.preventDefault()
    if (href === '#content') {
      headingRef.current?.focus()
      return
    }
    if (href === window.location.hash) return
    window.history.replaceState(
      { ...window.history.state, portfolio: { scrollY: window.scrollY } },
      '',
    )
    window.history.pushState({ portfolio: {} }, '', href)
    window.dispatchEvent(new Event('portfolio:navigate'))
  }

  const Page = pages[route.page]
  const light = theme === 'light'
  return (
    <div
      className={`site ${light ? 'theme-paper' : 'theme-dark'} route-${route.page}`}
      onClickCapture={navigate}
    >
      <a className="skip-link" href="#content">
        skip to content
      </a>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Jason Sun — home">
          <Star />
          <span>jason sun</span>
        </a>
        <nav ref={navRef} aria-label="Main navigation">
          <span
            className="nav-selection"
            data-active={route.page !== 'home'}
            aria-hidden="true"
          />
          {chapters.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={route.page === item.id ? 'page' : undefined}
            >
              {item.label.toLowerCase()}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          {route.page !== 'home' && (
            <a href="#home" className="home-control">
              ↖ home
            </a>
          )}
          <button
            className="theme-toggle"
            onClick={() => setTheme(light ? 'dark' : 'light')}
            aria-label={`${light ? 'light' : 'dark'} theme`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {light ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.9 4.9L6.3 6.3M17.7 17.7L19.1 19.1M4.9 19.1L6.3 17.7M17.7 6.3L19.1 4.9" />
                </>
              ) : (
                <path d="M20.3 14.2A8.5 8.5 0 0 1 9.8 3.7A8.5 8.5 0 1 0 20.3 14.2Z" />
              )}
            </svg>
          </button>
        </div>
      </header>
      <CyberBackdrop page={route.page} key={`backdrop-${route.page}`} />
      <main id="content" key={route.page} className={`page page-${route.page}`}>
        <Page headingRef={headingRef} anchor={route.anchor} />
      </main>
      <footer className="site-footer" key={`footer-${route.page}`}>
        <span>© {new Date().getFullYear()} jason sun</span>
        <span className="site-footer-links">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            github ↗
          </a>
        </span>
      </footer>
    </div>
  )
}
