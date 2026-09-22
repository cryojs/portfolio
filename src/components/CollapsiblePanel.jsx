export function CollapsiblePanel({ id, open, children }) {
  return (
    <div className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ${open ? 'grid-rows-[1fr]' : ''}`} id={id} aria-hidden={!open}>
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}
