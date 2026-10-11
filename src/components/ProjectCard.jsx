import { Globe, Store } from 'lucide-react'
import { ArrowIcon, GithubIcon } from './Icons'
import { MediaPreview } from './MediaPreview'

export function ProjectCard({ project }) {
  return (
    <article className="group min-w-0">
      <div className="relative">
        <a className="project-media-link no-underline" href={project.live ?? project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
          <MediaPreview media={project.media} />
        </a>
        <div className="pointer-events-none absolute top-3 right-3 z-10">
          <a className="project-open-link pointer-events-auto translate-y-1 opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-[780px]:translate-y-0 max-[780px]:opacity-100" href={project.live ?? project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
            <ArrowIcon className="size-[18px]" />
          </a>
        </div>
      </div>
      <div className="project-note">
        <div className="flex items-baseline justify-between gap-4 max-[430px]:flex-col max-[430px]:items-start max-[430px]:gap-[5px]">
          <div className="flex min-w-0 items-center gap-2.5">
            <h3 className="m-0 text-lg font-[620] tracking-[-0.03em] text-ink"><a className="no-underline hover:text-blue focus-visible:text-blue" href={project.github} target="_blank" rel="noreferrer">{project.title}</a></h3>
            {project.status && <span className="rounded-full bg-mint px-2 py-1 text-[9px] font-[650] tracking-[0.06em] text-[#166534] uppercase">{project.status}</span>}
          </div>
          <span className="shrink-0 text-[10px] text-muted uppercase max-[430px]:order-[-1]">{project.dates}</span>
        </div>
        <p className="project-note-description mb-0 text-[13px] text-muted">{project.description}</p>
        <div className="project-note-tech flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
          {project.tech.map((item) => <span className="rounded-full border border-border bg-paper px-2 py-[5px] text-[10px] leading-[1.2] text-ink-soft" key={item}>{item}</span>)}
        </div>
        <div className="project-note-actions flex flex-wrap gap-x-4 gap-y-2">
          <a className="inline-flex items-center gap-1.5 text-[11px] font-[550] text-muted no-underline transition-colors duration-150 hover:text-blue focus-visible:text-blue" href={project.github} target="_blank" rel="noreferrer"><GithubIcon className="size-[13px]" /> Source</a>
          {project.live && <a className="inline-flex items-center gap-1.5 text-[11px] font-[550] text-muted no-underline transition-colors duration-150 hover:text-blue focus-visible:text-blue" href={project.live} target="_blank" rel="noreferrer"><Globe className="size-[13px] shrink-0" aria-hidden="true" /> Website</a>}
          {project.storeLinks?.map((link) => <a className="inline-flex items-center gap-1.5 text-[11px] font-[550] text-muted no-underline transition-colors duration-150 hover:text-blue focus-visible:text-blue" href={link.href} target="_blank" rel="noreferrer" key={link.label}><Store className="size-[13px] shrink-0" aria-hidden="true" /> {link.label}</a>)}
        </div>
      </div>
    </article>
  )
}
