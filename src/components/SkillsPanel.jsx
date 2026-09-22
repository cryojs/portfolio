import {
  SiCplusplus,
  SiGit,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiSwift,
  SiTypescript,
  SiWxt,
} from 'react-icons/si'
import { TbBrandCSharp, TbBrandCss3, TbBrandOpenai, TbBrowser, TbCode, TbTopologyStar } from 'react-icons/tb'
import { useToggleSet } from '../hooks/useToggleSet'
import { CollapsiblePanel } from './CollapsiblePanel'
import { ArrowIcon } from './Icons'

const skillMetadata = {
  Python: { icons: [{ component: SiPython, color: '#3776ab' }], color: '#3776ab' },
  'C++': { icons: [{ component: SiCplusplus, color: '#00599c' }], color: '#00599c' },
  'C#': { icons: [{ component: TbBrandCSharp, color: '#512bd4' }], color: '#512bd4' },
  Swift: { icons: [{ component: SiSwift, color: '#f05138' }], color: '#f05138' },
  JavaScript: { icons: [{ component: SiJavascript, color: '#b79500' }], color: '#b79500' },
  TypeScript: { icons: [{ component: SiTypescript, color: '#3178c6' }], color: '#3178c6' },
  'HTML/CSS': {
    icons: [
      { component: SiHtml5, color: '#e34f26' },
      { component: TbBrandCss3, color: '#1572b6' },
    ],
    color: '#e34f26',
  },
  React: { icons: [{ component: SiReact, color: '#149eca' }], color: '#149eca' },
  'Next.js': { icons: [{ component: SiNextdotjs, color: '#171717' }], color: '#171717' },
  WXT: { icons: [{ component: SiWxt, color: '#7c3aed' }], color: '#7c3aed' },
  'React Flow': { icons: [{ component: TbTopologyStar, color: '#ff0072' }], color: '#ff0072' },
  Browserbase: { icons: [{ component: TbBrowser, color: '#f97316' }], color: '#f97316' },
  'OpenAI API': { icons: [{ component: TbBrandOpenai, color: '#10a37f' }], color: '#10a37f' },
  'Gemini API': { icons: [{ component: SiGooglegemini, color: '#4285f4' }], color: '#4285f4' },
  Supabase: { icons: [{ component: SiSupabase, color: '#3ecf8e' }], color: '#3ecf8e' },
  Git: { icons: [{ component: SiGit, color: '#f05032' }], color: '#f05032' },
}

const fallbackSkillMetadata = {
  icons: [{ component: TbCode, color: '#737373' }],
  color: '#737373',
}

function SkillBadge({ skill }) {
  const metadata = skillMetadata[skill] ?? fallbackSkillMetadata

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs leading-[1.25] text-ink-soft"
      style={{
        backgroundColor: `${metadata.color}14`,
        borderColor: `${metadata.color}40`,
      }}
    >
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {metadata.icons.map(({ component: Icon, color }, index) => <Icon className="size-3.5 shrink-0" style={{ color }} key={`${skill}-${index}`} />)}
      </span>
      {skill}
    </span>
  )
}

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
                  {group.values.map((skill) => <SkillBadge skill={skill} key={skill} />)}
                </div>
              </div>
            </CollapsiblePanel>
          </article>
        )
      })}
    </div>
  )
}
