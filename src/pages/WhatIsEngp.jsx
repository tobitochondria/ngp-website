import { useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './WhatIsEngp.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    id: 'harmonization',
    img: '/HARMONIZATION-OF-INITIATIVES-1-1024x684.jpg',
    alt: 'Harmonization of Initiatives',
    title: 'Harmonization of Initiatives',
    paragraphs: [
      <>The NGP is <em>"first"</em> as it consolidates and harmonizes all greening efforts, such as the Upland Development Program, Green Philippine Highways, <em>Luntiang Pilipinas</em>, and other similar activities of the government, private sector, local government units, and the civil society.</>
    ],
  },
  {
    id: 'incentives',
    img: '/PROVISION-OF-INCENTIVES-1024x684.jpg',
    alt: 'Provision of Incentives',
    title: 'Provision of Incentives',
    paragraphs: [
      <>All proceeds from agroforestry plantations, duly accounted by the DENR, shall accrue to the NGP beneficiary communities. This shall be given priority in the Conditional Cash Transfer (CCT) Program of the Department of Social Welfare and Development.</>
    ],
  },
  {
    id: 'social',
    img: '/SOCIAL-MOBILIZATION-768x513.jpg',
    alt: 'Social mobilization',
    title: 'Social mobilization',
    paragraphs: [
      <>The government, private sector, people&apos;s organizations, non-government organizations, and civil society join hands in the activities of the NGP – as volunteer planters, long-term plantation stewards, or donors.</>,
      <>For the first time, the NGP is driven, not just by one, but by all government agencies through a National Convergence Initiative.</>
    ],
  },
  {
    id: 'science',
    img: '/USE-OF-APPROPRIATE-SCIENCE-AND-TECHNOLOGY-768x513.jpg',
    alt: 'Use of Appropriate Science and Technology',
    title: 'Use of Appropriate Science and Technology (S&T)',
    paragraphs: [
      <>Target areas and inputs will be identified; land use optimized (determining site-specific crops/trees and markets); seedling quality ensured; and organic/biofertilizers, such as Mycorrhizal fungi and vermicomposting, employed.</>
    ],
  },
]

const targets = [
  { year: 'Year 1: 100,000 ha', target: '100 M' },
  { year: 'Year 2: 200,000 ha', target: '200 M' },
  { year: 'Year 3: 300,000 ha', target: '300 M' },
  { year: 'Year 4: 300,000 ha', target: '300 M' },
  { year: 'Year 5: 300,000 ha', target: '300 M' },
  { year: 'Year 6: 300,000 ha', target: '300 M' },
]

const objectives = [
  {
    id: 'env',
    img: '/ENVIRONMENTAL-STABILITY-300x300.png',
    label: 'Environmental Stability',
  },
  {
    id: 'climate',
    img: '/CLIMATE-CHANGE-MITIGATION-AND-ADAPTATION-300x300.png',
    label: 'Climate Change Mitigation & Adaptation',
  },
  {
    id: 'food',
    img: '/FOOD-SECURITY-300x300.png',
    label: 'Food Security',
  },
  {
    id: 'poverty',
    img: '/POVERTY-ALLEVIATION-300x300.png',
    label: 'Poverty Alleviation',
  },
  {
    id: 'biodiversity',
    img: '/OBJECTIVES-BIODIVERSITY-CONSERVATION-300x300.png',
    label: 'Biodiversity Conservation',
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
    <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </div>
  )
}

// ─── Section Divider ──────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div className="engp-divider" aria-hidden="true">
      <span className="engp-divider__line" />
      <span className="engp-divider__mark">//</span>
      <span className="engp-divider__line" />
    </div>
  )
}

// ─── Page Component ────────────────────────────────────────────────────────────

export default function WhatIsEngp() {
  return (
    <div className="engp-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="engp-hero" aria-label="Page hero">
        <div className="engp-hero__bg" aria-hidden="true" />
        <div className="engp-hero__overlay" aria-hidden="true" />
        <div className="engp-hero__content">
          <nav className="engp-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="engp-breadcrumb__link">Home</a>
            <span className="engp-breadcrumb__sep" aria-hidden="true">›</span>
            <a href="#" className="engp-breadcrumb__link">About Us</a>
            <span className="engp-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="engp-breadcrumb__current">What is [E]NGP?</span>
          </nav>
          <h1 className="engp-hero__title">What is [E]NGP?</h1>
        </div>
      </header>

      {/* ── Main Body ────────────────────────────────────────────────── */}
      <div className="engp-body">

        {/* ── Logos ────────────────────────────────────────────────── */}
        <RevealSection className="engp-logos-row">
          <div className="engp-logos-row__inner" aria-label="Agency logos">
            <img src="/denr-logo.svg"  alt="DENR Logo"  className="engp-logos-row__img" />
            <img src="/fmb-logo.png"   alt="FMB Logo"   className="engp-logos-row__img" />
            <img src="/ngp-logo.png"   alt="NGP Logo"   className="engp-logos-row__img" />
          </div>
        </RevealSection>

        {/* ── Section 1: What is ENGP ───────────────────────────────── */}
        <RevealSection className="engp-section" delay={80}>
          <h2 className="engp-section__heading">
            What is [Enhanced] National Greening Program (ENGP)?
          </h2>
          <div className="engp-text-block">
            <p>
              <strong>The Enhanced National Greening Program</strong> or the NGP as the DENR banner
              program is a convergence initiative of DA-DAR-DENR where the DENR stands as the lead
              agency. As a government priority pursuant to EO Nos. 23 and 26, both series of 2011,
              the NGP aims to:
            </p>
            <p>
              1) contribute in reducing poverty among upland and lowland poor households, indigenous
              peoples, and in coastal and urban areas;
            </p>
            <p>
              2) implement sustainable management of natural resources through resource conservation,
              protection, and productivity enhancement;
            </p>
            <p>
              3) provide food, goods and services such as timber, fiber, non-timber forest products,
              aesthetic values, air enhancement values, water regulation values, and mitigate climate
              change by expanding forest cover that serve as carbon sink;
            </p>
            <p>
              4) promote public awareness as well as instill social and environmental consciousness
              on the value of forests and watersheds;
            </p>
            <p>
              5) enhance the formation of positive values among the youth and other partners through
              shared responsibilities in sustainable management of tree plantations and forest
              resources, and 6) consolidate and harmonize all greening efforts of the government,
              civil society, and the private sector.
            </p>
          </div>
        </RevealSection>

        <SectionDivider />

        {/* ── Section 2: What Difference ───────────────────────────── */}
        <RevealSection className="engp-section" delay={80}>
          <h2 className="engp-section__heading">
            What difference can the [E]NGP make?
          </h2>
          <div className="engp-text-block">
            <p>
              Since the establishment of the program in 2011, the Department of Environment and
              Natural Resources has planted more than <strong>1.8</strong> billion seedlings within{' '}
              <strong>2.17</strong> million hectares of land within the country.
            </p>
            <p>
              While NGP promotes agroforestry for its potential for carbon sequestration in climate
              change mitigation, soil erosion, runoff control, and economic productivity, it also
              serves as an alternative livelihood to our fellow Filipinos through economical upland
              activities using forest products.
            </p>
            <p>
              Millions of jobs are being generated by the program alone. In 2016, the National
              Greening Program generated approximately <strong>3.3</strong> million jobs in the
              first 6 six years. In 2021, the program tops its 2020 record by 176% accomplishment
              wherein <strong>60.4</strong> million seedlings were planted, creating more than{' '}
              <strong>50,000</strong> jobs between January and August 2021. As of January 2022, the
              National Greening Program has created around <strong>5.6</strong> million jobs in
              upland and rural communities since 2011.
            </p>
          </div>
        </RevealSection>

        <SectionDivider />

        {/* ── Section 3: What Will Make It Work ───────────────────── */}
        <RevealSection className="engp-section" delay={80}>
          <h2 className="engp-section__heading">What will make it work?</h2>
          <div className="engp-pillars">
            {pillars.map((pillar, i) => (
              <RevealSection key={pillar.id} delay={i * 80}>
                <article className="engp-pillar" aria-labelledby={`pillar-${pillar.id}`}>
                  <div className="engp-pillar__img-wrap">
                    <img
                      src={pillar.img}
                      alt={pillar.alt}
                      className="engp-pillar__img"
                    />
                  </div>
                  <div className="engp-pillar__body">
                    <h3 id={`pillar-${pillar.id}`} className="engp-pillar__title">
                      {pillar.title}
                    </h3>
                    {pillar.paragraphs.map((p, j) => (
                      <p key={j} className="engp-pillar__text">{p}</p>
                    ))}
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </RevealSection>

        <SectionDivider />

        {/* ── Section 4: The NGP Targets ───────────────────────────── */}
        <RevealSection className="engp-section" delay={80}>
          <h2 className="engp-section__heading">The NGP Targets</h2>
          <div className="engp-targets__table-wrap" role="region" aria-label="NGP Targets table">
            <table className="engp-targets__table">
              <thead>
                <tr>
                  <th scope="col">YEAR</th>
                  <th scope="col">TARGET</th>
                </tr>
              </thead>
              <tbody>
                {targets.map((row, i) => (
                  <tr key={i}>
                    <td>{row.year}</td>
                    <td>{row.target}</td>
                  </tr>
                ))}
                <tr className="engp-targets__row--total">
                  <td><strong>1.5 million hectares</strong></td>
                  <td><strong>1.5 billion seedlings</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="engp-targets__footnote">
            <em>All in all, this target is more than the accomplishment over the past 25 years.</em>
          </p>
        </RevealSection>

        <SectionDivider />

        {/* ── Section 5: NGP Objectives ───────────────────────────── */}
        <RevealSection className="engp-section" delay={80}>
          <h2 className="engp-section__heading">The NGP Objectives</h2>
          <div className="engp-objectives__grid">
            {objectives.map((obj, i) => (
              <RevealSection key={obj.id} delay={i * 70}>
                <article className="engp-objective-card" aria-label={obj.label}>
                  <div className="engp-objective-card__icon">
                    <img
                      src={obj.img}
                      alt={obj.label}
                      className="engp-objective-card__img"
                    />
                  </div>
                  <p className="engp-objective-card__label">{obj.label}</p>
                </article>
              </RevealSection>
            ))}
          </div>
        </RevealSection>

      </div>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
