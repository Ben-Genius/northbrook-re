"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const categories = [
  { key: "necessary", label: "Necessary", desc: "Essential for the website to function properly. Cannot be disabled.", required: true },
  { key: "functional", label: "Functional", desc: "Enables personalised features like remembering your preferences.", required: false },
  { key: "analytical", label: "Analytical", desc: "Helps us understand how visitors interact with the site.", required: false },
  { key: "advertisement", label: "Advertisement", desc: "Used to deliver relevant ads and track campaign performance.", required: false },
  { key: "unclassified", label: "Unclassified", desc: "Cookies that have not yet been categorised.", required: false },
]

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    necessary: true, functional: false, analytical: false,
    advertisement: false, unclassified: false,
  })
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem("nb-cookie-consent")
    if (!stored) setVisible(true)
  }, [])

  // Animate in when visible becomes true
  useEffect(() => {
    const el = bannerRef.current
    if (!el) return
    if (visible) {
      gsap.set(el, { display: "block", autoAlpha: 0, y: 20 })
      gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" })
    }
  }, [visible])

  const save = (consent: Record<string, boolean>) => {
    const el = bannerRef.current
    if (el) {
      gsap.to(el, {
        autoAlpha: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(el, { display: "none" })
          setVisible(false)
        },
      })
    } else {
      setVisible(false)
    }
    localStorage.setItem("nb-cookie-consent", JSON.stringify(consent))
  }

  const acceptAll = () => save(Object.fromEntries(categories.map((c) => [c.key, true])))
  const rejectAll = () => save(Object.fromEntries(categories.map((c) => [c.key, c.required])))
  const savePrefs = () => save(prefs)

  return (
    <div
      ref={bannerRef}
      style={{ display: "none" }}
      className="fixed bottom-0 left-0 right-0 z-100 bg-ink border-t border-white/10 p-6 lg:p-8"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-7xl mx-auto">
        {!customizing ? (
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-white font-semibold mb-1 text-lg">
                We value your privacy
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                We use cookies to enhance your experience, analyse traffic, and personalise content.{" "}
                <a href="/privacy" className="text-accent underline">Privacy Policy</a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button onClick={() => setCustomizing(true)} className="px-4 py-2 text-sm border border-white/20 text-white/70 hover:border-white/40 transition-colors">
                Customize
              </button>
              <button onClick={rejectAll} className="px-4 py-2 text-sm border border-white/20 text-white/70 hover:border-white/40 transition-colors">
                Reject All
              </button>
              <button onClick={acceptAll} className="px-5 py-2 text-sm bg-accent text-ink font-medium hover:bg-accent-2 transition-colors">
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-display text-white text-lg mb-4">
              Customize Cookie Preferences
            </p>
            <div className="grid gap-3 mb-6">
              {categories.map((c) => (
                <label key={c.key} className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs[c.key]}
                    disabled={c.required}
                    onChange={(e) => setPrefs((p) => ({ ...p, [c.key]: e.target.checked }))}
                    className="mt-1 accent-accent"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {c.label}{c.required && <span className="text-accent text-xs ml-1">(Required)</span>}
                    </p>
                    <p className="text-white/50 text-xs">{c.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCustomizing(false)} className="px-4 py-2 text-sm border border-white/20 text-white/70">Back</button>
              <button onClick={rejectAll} className="px-4 py-2 text-sm border border-white/20 text-white/70">Reject All</button>
              <button onClick={savePrefs} className="px-5 py-2 text-sm bg-accent text-ink font-medium hover:bg-accent-2 transition-colors">
                Save My Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
