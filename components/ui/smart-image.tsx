"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

interface SmartImageProps extends Omit<ImageProps, "onError" | "alt"> {
  alt: string
  /** Two-letter or short label baked into the placeholder when image is missing. */
  placeholderLabel?: string
  /** Visual tone of the placeholder. */
  placeholderTone?: "primary" | "ink" | "gray" | "accent"
  /** Optional icon emoji-free SVG path string for the placeholder. */
  placeholderHint?: string
}

const tones: Record<NonNullable<SmartImageProps["placeholderTone"]>, { bg: string; fg: string; sub: string }> = {
  primary: { bg: "var(--nb-primary)", fg: "rgba(255,255,255,0.18)", sub: "rgba(255,255,255,0.35)" },
  ink:     { bg: "var(--nb-ink)",     fg: "rgba(140,0,48,0.35)",   sub: "rgba(255,255,255,0.30)" },
  gray:    { bg: "var(--nb-gray-light)", fg: "rgba(95,96,109,0.18)",  sub: "rgba(95,96,109,0.45)" },
  accent:  { bg: "var(--nb-accent)",  fg: "rgba(255,255,255,0.30)", sub: "rgba(255,255,255,0.55)" },
}

export function SmartImage({
  alt,
  placeholderLabel = "NB",
  placeholderTone = "primary",
  placeholderHint,
  className,
  fill,
  width,
  height,
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  const tone = tones[placeholderTone]

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden ${className ?? ""}`}
        style={{
          backgroundColor: tone.bg,
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
          aspectRatio: fill ? undefined : width && height ? `${width} / ${height}` : undefined,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="text-center px-6">
            <p
              className="font-display text-7xl lg:text-8xl font-light leading-none mb-3"
              style={{ color: tone.fg }}
            >
              {placeholderLabel}
            </p>
            {placeholderHint && (
              <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: tone.sub }}>
                {placeholderHint}
              </p>
            )}
          </div>
        </div>
        <div
          className="absolute top-0 left-0 w-12 h-12 border-t border-l"
          style={{ borderColor: tone.fg }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-12 h-12 border-b border-r"
          style={{ borderColor: tone.fg }}
          aria-hidden
        />
      </div>
    )
  }

  return (
    <Image
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
