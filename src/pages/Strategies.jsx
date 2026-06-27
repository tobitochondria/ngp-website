import { useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './Strategies.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const incentiveSteps = [
  {
    id: 'iec',
    img: '/IEC.jpg',
    alt: 'IEC Social Preparation',
    label: 'IEC Social Preparation Joint Planning and Site Identification',
  },
  {
    id: 'seedling',
    img: '/SEEDLING-PRODUCTION.jpg',
    alt: 'Seedling Production',
    label: 'Seedling Production',
  },
  {
    id: 'planting',
    img: '/PLANTING.jpg',
    alt: 'Planting',
    label: 'Planting',
  },
  {
    id: 'maintenance',
    img: '/MAINTENANCE.jpg',
    alt: 'Maintenance and Protection',
    label: 'Maintenance and Protection',
  },
  {
    id: 'harvesting',
    img: '/HARVESTING.jpg',
    alt: 'Harvesting Utilization Re-Planting',
    label: 'Harvesting Utilization Re-Planting',
  },
]

const scienceCards = [
  {
    id: 'clonal',
    img: '/CLONAL.jpg',
    alt: 'Clonal Nursery',
    title: 'Clonal Nursery',
    text: 'Based on DENR Memorandum Circular No. 2011-01 Section 8.7, the Ecosystems Research and Development Bureau (ERDB) shall be responsible for overseeing the establishment, maintenance, and operationalization of clonal nurseries and forest tree seed centers at the regional level.',
  },
  {
    id: 'bio',
    img: '/BIO-FERTILIZER.jpg',
    alt: 'Bio-Fertilizers',
    title: 'Bio-Fertilizers',
    text: 'As part of the maintenance and operationalization of clonal nurseries and forest tree seed centers, the Ecosystems Research and Development Bureau shall oversee the production and distribution of bio-fertilizers and organic soil amendments to support healthy plantation establishment.',
  },
  {
    id: 'gis',
    img: '/GIS.jpg',
    alt: 'GIS Mapping and Geotagging',
    title: 'GIS Mapping and Geotagging',
    text: 'The [Enhanced] National Greening Program is using Geographic Information System (GIS) and geotagging applications to monitor and document the progress of plantation establishment, ensuring accurate data collection and transparent reporting across all regions.',
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

function SectionDivider() {
  return (
    <div className="strat-divider" aria-hidden="true">
      <span className="strat-divider__line" />
      <span className="strat-divider__mark">//</span>
      <span className="strat-divider__line" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Strategies() {
  return (
    <div className="strat-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="strat-hero" aria-label="NGP Strategies page hero">
        <div className="strat-hero__bg" aria-hidden="true" />
        <div className="strat-hero__overlay" aria-hidden="true" />
        <div className="strat-hero__content">
          <nav className="strat-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="strat-breadcrumb__link">Home</a>
            <span className="strat-breadcrumb__sep" aria-hidden="true">›</span>
            <a href="#" className="strat-breadcrumb__link">About Us</a>
            <span className="strat-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="strat-breadcrumb__current">Strategies</span>
          </nav>
          <h1 className="strat-hero__title">NGP Strategies</h1>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="strat-body">

        {/* ── Section 1: Harmonizing of Initiatives ───────────────────── */}
        <Reveal className="strat-section">
          <div className="strat-harmonize">
            <div className="strat-harmonize__img-wrap">
              <img
                src="/HARMONIZING.jpg"
                alt="Harmonizing of Initiatives — NGP partnership signing"
                className="strat-harmonize__img"
              />
            </div>
            <div className="strat-harmonize__body">
              <h2 className="strat-harmonize__title">Harmonizing of Initiatives</h2>
              <p className="strat-harmonize__subtitle">Non-Governmental Organization</p>
              <ul className="strat-harmonize__list">
                <li>Foundation for the Philippine Environment (FPE)</li>
                <li>Philippine Tropical Forest Conservation Foundation Incorporated (PTFCF)</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <SectionDivider />

        {/* ── Section 2: Provision of Incentives ──────────────────────── */}
        <Reveal className="strat-section strat-incentives-section">
          <h2 className="strat-incentives-section__title">Provision of Incentives</h2>
          <p className="strat-incentives-section__sub">
            Incentives were given to ENGP partners for the maintenance and protection of the plantations.
          </p>
          <div className="strat-incentives__grid">
            {incentiveSteps.map((step, i) => (
              <Reveal key={step.id} delay={i * 80}>
                <article className="strat-incentive-card" aria-label={step.label}>
                  <div className="strat-incentive-card__img-wrap">
                    <img
                      src={step.img}
                      alt={step.alt}
                      className="strat-incentive-card__img"
                    />
                  </div>
                  <p className="strat-incentive-card__label">{step.label}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>

      </div>{/* /strat-body */}

      {/* ── Section 3: Science & Technology (full-bleed dark) ─────────── */}
      <section className="strat-science" aria-labelledby="science-title">
        <div className="strat-science__bg" aria-hidden="true" />
        <div className="strat-science__overlay" aria-hidden="true" />
        <div className="strat-science__inner">
          <Reveal>
            <h2 id="science-title" className="strat-science__title">
              Maximization of available<br />Science and Technology
            </h2>
          </Reveal>
          <div className="strat-science__grid">
            {scienceCards.map((card, i) => (
              <Reveal key={card.id} delay={i * 100}>
                <article className="strat-science-card" aria-labelledby={`sci-${card.id}`}>
                  <div className="strat-science-card__img-wrap">
                    <img
                      src={card.img}
                      alt={card.alt}
                      className="strat-science-card__img"
                    />
                    <div className="strat-science-card__img-overlay" aria-hidden="true" />
                  </div>
                  <div className="strat-science-card__body">
                    <h3 id={`sci-${card.id}`} className="strat-science-card__title">
                      {card.title}
                    </h3>
                    <div className="strat-science-card__title-bar" aria-hidden="true" />
                    <p className="strat-science-card__text">{card.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
