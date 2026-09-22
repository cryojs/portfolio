import { useToggleSet } from '../hooks/useToggleSet'
import { CollapsiblePanel } from './CollapsiblePanel'
import { ArrowIcon } from './Icons'

export function ExperienceList({ items }) {
  const { openItems, toggle } = useToggleSet()

  return (
    <div className="border-t border-border">
      {items.map((item) => {
        const open = openItems.has(item.id)
        const panelId = `${item.id}-details`

        return (
          <article className="border-b border-border" key={item.id}>
            <button
              type="button"
              className={`grid w-[calc(100%+24px)] -ml-3 grid-cols-[minmax(0,1fr)_auto_34px] items-center gap-6 rounded-lg border-0 px-3 py-[18px] text-left text-ink transition duration-150 hover:bg-paper-soft focus-visible:bg-paper-soft max-[780px]:grid-cols-[minmax(0,1fr)_32px] max-[780px]:gap-[14px] max-[780px]:py-4 ${open ? 'bg-paper-soft' : 'bg-transparent'}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span className="grid min-w-0 gap-[5px]">
                <span className="text-base font-[580] tracking-[-0.02em] text-ink">{item.role}</span>
                <span className="text-[13px] text-muted">{item.company} &middot; {item.location}</span>
              </span>
              <span className="text-[11px] text-muted whitespace-nowrap max-[780px]:col-start-1 max-[780px]:row-start-2">{item.dates}</span>
              <span className={`grid size-8 place-items-center rounded-lg border border-border text-muted transition duration-200 max-[780px]:col-start-2 max-[780px]:row-span-2 max-[780px]:row-start-1 max-[780px]:self-start ${open ? 'rotate-90 border-[#bfdbfe] bg-[#eff6ff] text-blue' : ''}`} aria-hidden="true"><ArrowIcon direction="right" /></span>
            </button>
            <CollapsiblePanel id={panelId} open={open}>
              <ul className="m-0 grid max-w-180 list-none gap-3 px-8 pt-2.5 pb-6.5 text-sm leading-[1.65] text-ink-soft max-[780px]:px-2 max-[780px]:pb-5.5 max-[780px]:pl-4.5">
                {item.highlights.map((highlight) => <li className="relative pl-4 before:absolute before:top-[0.72em] before:left-0 before:size-1 before:rounded-full before:bg-blue before:content-['']" key={highlight}>{highlight}</li>)}
              </ul>
            </CollapsiblePanel>
          </article>
        )
      })}
    </div>
  )
}
