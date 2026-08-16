"use client"

import { useId, useState } from "react"

export default function MenuDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const descriptionId = useId()
  const canExpand = text.length > 110

  return (
    <div className="mt-2 max-w-xl">
      <p
        id={descriptionId}
        className={`text-sm leading-relaxed text-stone-600 ${
          expanded ? "sm:line-clamp-2" : "line-clamp-3 sm:line-clamp-2"
        }`}
      >
        {text}
      </p>
      {canExpand && (
        <button
          type="button"
          className="mt-1.5 inline-flex text-xs font-black uppercase tracking-[0.12em] text-[color:var(--pink)] sm:hidden"
          aria-expanded={expanded}
          aria-controls={descriptionId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Read full description"}
        </button>
      )}
    </div>
  )
}
