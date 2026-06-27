import { useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './ExpectedOutcome.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const outcomes = [
  {
    id: 'annual',
    title: 'Annual Requirement',
    img: '/ANNUAL-REQUIREMENT-960x1024.jpg',
    alt: 'Annual Requirement — coffee berries held in hands',
    items: [
      'Timber (750 T Has.)',
      'Coffee (90T Has.)',
      'Fuelwood (300T Has.)',
    ],
  },
  {
    id: 'environmental',
    title: 'Environmental Stability',
    img: '/ENVI-STABILITY-960x1024.jpg',
    alt: 'Environmental Stability — hands nurturing a young tree',
    items: [
      '12% increase in forest cover based on 2003 level (7.2M has.) with 85% survival',
      '8% increase in carbon sequestration from 36M tons/year to 38.9M tons/year',
      'Increase water holding capacity of watersheds',
      'Minimize occurrence of soil erosion and sedimentation of rivers and lakes',
    ],
  },
  {
    id: 'economic',
    title: 'Economic Security',
    img: '/ECONOMIC-SECURITY-960x1024.jpg',
    alt: 'Economic Security — cacao harvest in the uplands',
    items: [
      'Increased and sustainable supply of forest-based raw materials',
      'Increased economic activity in the uplands',
      'Optimizes utilization of upland resources',
    ],
  },
]

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

function RevealSection({ className = '', children, delay = 0 }) {
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

export default function ExpectedOutcome() {
  return (
    <div className="epo-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="epo-hero" aria-label="Expected Project Outcome page hero">
        <div className="epo-hero__bg" aria-hidden="true" />
        <div className="epo-hero__overlay" aria-hidden="true" />
        <div className="epo-hero__content">
          <nav className="epo-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="epo-breadcrumb__link">Home</a>
            <span className="epo-breadcrumb__sep" aria-hidden="true">›</span>
            <a href="#" className="epo-breadcrumb__link">About Us</a>
            <span className="epo-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="epo-breadcrumb__current">Expected Project Outcome</span>
          </nav>
          <h1 className="epo-hero__title">Expected Project Outcome</h1>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="epo-body">
        <RevealSection className="epo-outcomes-grid">
          {outcomes.map((outcome, i) => (
            <RevealSection key={outcome.id} delay={i * 100}>
              <article className="epo-outcome-card" aria-labelledby={`outcome-${outcome.id}`}>

                {/* Title above image */}
                <h2 id={`outcome-${outcome.id}`} className="epo-outcome-card__title">
                  {outcome.title}
                </h2>

                {/* Photo */}
                <div className="epo-outcome-card__img-wrap">
                  <img
                    src={outcome.img}
                    alt={outcome.alt}
                    className="epo-outcome-card__img"
                  />
                </div>

                {/* Bullet list */}
                <ul className="epo-outcome-card__list">
                  {outcome.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>

              </article>
            </RevealSection>
          ))}
        </RevealSection>
      </div>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
