import { useToggleSet } from '../hooks/useToggleSet'
import { CollapsiblePanel } from './CollapsiblePanel'
import { ArrowIcon } from './Icons'

export function SkillsPanel({ groups }) {
  const { openItems, toggle } = useToggleSet()

  return (
    <div className="border-t border-border">
      {groups.map((group) => {
        const open = openItems.has(group.id)
        const panelId = `skills-${group.id}`

        return (
          <article className="border-b border-border" key={group.id}>
            <button
              type="button"
              className={`flex w-[calc(100%+24px)] -ml-3 items-center justify-between gap-5 rounded-lg border-0 px-3 py-2 text-left text-ink transition duration-150 hover:bg-paper-soft focus-visible:bg-paper-soft ${open ? 'bg-paper-soft' : 'bg-transparent'}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(group.id)}
            >
              <strong className="text-base font-[580] tracking-[-0.02em]">{group.label}</strong>
              <span className={`grid size-8 place-items-center rounded-lg border border-border text-muted transition duration-200 ${open ? 'rotate-90 border-[#bfdbfe] bg-[#eff6ff] text-blue' : ''}`} aria-hidden="true"><ArrowIcon direction="right" /></span>
            </button>

            <CollapsiblePanel id={panelId} open={open}>
              <div className="px-[18px] pt-2.5 pb-4">
                <div className="flex flex-wrap gap-[7px]">
                  {group.values.map((skill, index) => (
                    <span className={`rounded-full border px-[11px] py-[7px] text-xs leading-[1.25] text-ink-soft ${index % 3 === 0 ? 'border-blue-soft bg-[#eff6ff]' : index % 3 === 1 ? 'border-violet bg-[#f5f3ff]' : 'border-border bg-paper'}`} key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </CollapsiblePanel>
          </article>
        )
      })}
    </div>
  )
}
