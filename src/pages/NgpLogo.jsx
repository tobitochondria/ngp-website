import { useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './NgpLogo.css'

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
      { threshold: 0.08 }
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NgpLogo() {
  return (
    <div className="logo-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="logo-hero" aria-label="NGP Logo page hero">
        <div className="logo-hero__bg" aria-hidden="true" />
        <div className="logo-hero__overlay" aria-hidden="true" />
        <div className="logo-hero__content">
          <nav className="logo-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="logo-breadcrumb__link">Home</a>
            <span className="logo-breadcrumb__sep" aria-hidden="true">›</span>
            <a href="#" className="logo-breadcrumb__link">About Us</a>
            <span className="logo-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="logo-breadcrumb__current">NGP Logo</span>
          </nav>
          <h1 className="logo-hero__title">About our Logo</h1>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="logo-body">
        <Reveal className="logo-display">
          <div className="logo-display__img-wrap">
            <img
              src="/ngp-logo.png"
              alt="NGP Emblem Logo"
              className="logo-display__img"
            />
          </div>
        </Reveal>

        <Reveal className="logo-description" delay={100}>
          <div className="logo-description__text-block">
            <p>
              The six small leaves represents the initial six-year implementation of NGP from 2011-2016.
              The five (5) leaves of the tree represent the five (5) objectives of the National Greening Program:
              poverty reduction, food security, biodiversity conservation, and climate change mitigation and adaptation,
              and environmental stability.
            </p>

            <p>
              The outer circle represents the major players in the implementation of the Program – the DENR and the FMB,
              the DENR Regional and Field Offices, and our partners such as the People’s Organizations (POs),
              academe, Non-Government Organizations (NGOs), etc. The Circle also represents sustainable cycle
              in the environment, economy, and society.
            </p>

            <p>
              The hands represents active engagement of the Department to different stakeholders in working with
              the primary goals of the program.
            </p>

            <p>
              The tree represents the primary goal of the National Greening Program which is to rehabilitate
              denuded forest lands in the country.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
