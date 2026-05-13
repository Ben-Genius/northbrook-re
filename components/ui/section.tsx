import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  dark?: boolean
  ink?: boolean
  gray?: boolean
  id?: string
}

export function Section({ children, className, dark, ink, gray, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 lg:py-32 px-6 lg:px-12",
        dark && "section-dark",
        ink && "section-ink",
        gray && "bg-gray-light",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
