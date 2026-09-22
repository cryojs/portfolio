import { useState } from 'react'

export function useToggleSet() {
  const [openItems, setOpenItems] = useState(() => new Set())

  const toggle = (key) => {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return { openItems, toggle }
}
