import { useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './NotFound.css'

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Reveal({ className = '', children, delay = 0 }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─── Page Component ────────────────────────────────────────────────────────────

export default function NotFound() {
  return (
    <div className="notfound-page">

      {/* Main content area */}
      <main className="notfound-container">
        <Reveal className="maintenance-card">
          <h1 className="maintenance-title">SOON!</h1>
          <div className="maintenance-divider" aria-hidden="true" />
          <p className="maintenance-subtitle">WE ARE UNDER MAINTENANCE.</p>
        </Reveal>
      </main>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
