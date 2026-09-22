import { ArrowIcon, GithubIcon } from './Icons'
import { MediaPreview } from './MediaPreview'
import { Globe } from 'lucide-react'

export function ProjectCard({ project }) {
  return (
    <article className="group min-w-0">
      <a className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-paper no-underline" href={project.live ?? project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
        <MediaPreview media={project.media} title={project.title} />
        <span className="absolute top-3 right-3 grid size-[34px] translate-y-1 place-items-center rounded-full border border-[rgba(229,229,229,0.92)] bg-[rgba(255,255,255,0.94)] text-ink opacity-0 transition-[opacity,transform,color] duration-150 group-hover:translate-y-0 group-hover:text-blue group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:text-blue group-focus-within:opacity-100 max-[780px]:translate-y-0 max-[780px]:opacity-100" aria-hidden="true"><ArrowIcon /></span>
      </a>
      <div className="mt-4 flex items-baseline justify-between gap-4 max-[430px]:flex-col max-[430px]:items-start max-[430px]:gap-[5px]">
        <h3 className="m-0 text-lg font-[620] tracking-[-0.03em] text-ink"><a className="no-underline hover:text-blue focus-visible:text-blue" href={project.github} target="_blank" rel="noreferrer">{project.title}</a></h3>
        <span className="shrink-0 text-[10px] text-muted uppercase max-[430px]:order-[-1]">{project.dates}</span>
      </div>
      <p className="mt-[9px] mb-0 text-[13px] leading-[1.55] text-muted">{project.description}</p>
      <div className="mt-3.5 flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
        {project.tech.map((item) => <span className="rounded-full border border-border bg-paper px-2 py-[5px] text-[10px] leading-[1.2] text-ink-soft" key={item}>{item}</span>)}
      </div>
      <div className="mt-4 flex gap-4">
        <a className="inline-flex items-center gap-1.5 text-[11px] font-[550] text-muted no-underline transition-colors duration-150 hover:text-blue focus-visible:text-blue" href={project.github} target="_blank" rel="noreferrer"><GithubIcon className="size-[13px]" /> Source</a>
        {project.live && <a className="inline-flex items-center gap-1.5 text-[11px] font-[550] text-muted no-underline transition-colors duration-150 hover:text-blue focus-visible:text-blue" href={project.live} target="_blank" rel="noreferrer"><Globe className="size-[13px] shrink-0" aria-hidden="true" /> Live site</a>}
      </div>
    </article>
  )
}
