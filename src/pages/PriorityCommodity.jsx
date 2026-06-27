import { useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './PriorityCommodity.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const speciesList = [
  {
    id: 'timber',
    title: 'Timber',
    subtitle: 'PAMPLONA CAGAYAN (2003)',
    img: '/TIMBER-1-1024x682.jpg',
    alt: 'Timber plantation with young green trees',
    content: (
      <>
        <p>Local demand based on Master Plan for Forestry Development (2003).</p>
        <p>In 2010 - 3.73 M cu.m.<br />In 2021 - 5.0 M cu.m.<br />Wood and Paper Products (USD 900M)</p>
        <p>Need 750,000 hectares to be sustainable</p>
        <p>
          Higher consumption of wood as construction material instead of steel &amp; concrete in the next decades in the light of climate change.{' '}
          <em>(Source: <span className="species-source">Philippines Forestry Outlook Study, 2009</span>)</em>
        </p>
      </>
    ),
  },
  {
    id: 'bamboo',
    title: 'Bamboo',
    img: '/BAMBOO-1-1024x682.jpg',
    alt: 'Woman holding a bamboo seedling',
    content: (
      <>
        <p>
          From 2011-2020, the DENR planted <strong>101,371 hectares of land with more than 21 million bamboo seedlings</strong> through ENGP.
        </p>
        <p>
          For CY 2021, the DENR targets to plant 5.3 million bamboo planting materials on 26,147 hectares of forestlands.
        </p>
        <p>
          On top of this, <strong>141,802 bamboo planting materials</strong> were planted within <strong>433 hectares of land</strong> under the{' '}
          <strong>Build Back Better (BBB) Program</strong> in support of post disaster rehabilitation and recovery efforts of typhoon-hit areas.
        </p>
      </>
    ),
  },
  {
    id: 'fruit-trees',
    title: 'Fruit Trees',
    img: '/FRUIT-BEARING-TREES-1024x682.jpg',
    alt: 'Guyabano soursop fruit hanging on a tree branch',
    content: (
      <>
        <p>Assorted fruit trees considered to produce lucrative returns for the farmers as well as the industry are being recommended</p>
      </>
    ),
  },
  {
    id: 'coffee',
    title: 'Coffee',
    img: '/COFFEE-1-1024x682.jpg',
    alt: 'Coffee berries ripening on a branch',
    content: (
      <>
        <p>Coffee ranks as 2nd most consumed beverage in the world.</p>
        <p>
          Local demand per Department of Agriculture for coffee beans is pegged at <strong>64,000 metric tons, valued at PHP 2.5 billion</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'cacao',
    title: 'Cacao',
    img: '/CACAO-1-1024x682.jpg',
    alt: 'Cacao pod growing on a tree trunk',
    content: (
      <>
        <p>Local demand for cacao exceeds production.</p>
        <p>In 2005, local consumption reached <strong>50,000 metric tons</strong>.</p>
      </>
    ),
  },
  {
    id: 'fuelwood',
    title: 'Fuelwood',
    img: '/wood-g3879fadbe_1280-1024x682.jpg',
    alt: 'Stacked logs of firewood',
    content: (
      <>
        <p>
          Among the major requirements of the country that has been overlooked in most area developed plans is <strong>wood energy</strong>.{' '}
          9 million households or 46% of the 20.2 million households in the Philippines uses fuelwood (NSO 2012)
        </p>
        <p>
          Households and large-scale industries (i.e., Tobacco <strong>flue curing</strong>, bakeries, potteries, brick making and sugar production amounts to{' '}
          35.46 million cu.m/year with an estimate value of 11.34 billion pesos
        </p>
        <h3 className="species-highlight-title">35.46 million cu. m of fuelwood</h3>
        <ul className="species-highlight-list">
          <li>=15 M. Tons oil equivalent to $5.25 billion</li>
          <li>=210 billion pesos</li>
          <li>=50% of our oil imports in 2012</li>
        </ul>
      </>
    ),
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
    <div className="species-divider" aria-hidden="true">
      <span className="species-divider__line" />
      <span className="species-divider__mark">//</span>
      <span className="species-divider__line" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PriorityCommodity() {
  return (
    <div className="species-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="species-hero" aria-label="Priority Commodity Species page hero">
        <div className="species-hero__bg" aria-hidden="true" />
        <div className="species-hero__overlay" aria-hidden="true" />
        <div className="species-hero__content">
          <nav className="species-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="species-breadcrumb__link">Home</a>
            <span className="species-breadcrumb__sep" aria-hidden="true">›</span>
            <a href="#" className="species-breadcrumb__link">About Us</a>
            <span className="species-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="species-breadcrumb__current">Priority Commodity Species</span>
          </nav>
          <h1 className="species-hero__title">Priority Commodity Species</h1>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="species-body">
        {speciesList.map((item, i) => (
          <div key={item.id}>
            <Reveal className="species-section">
              <article className="species-item" aria-labelledby={`species-title-${item.id}`}>
                <div className="species-item__img-wrap">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="species-item__img"
                  />
                </div>
                <div className="species-item__body">
                  <h2 id={`species-title-${item.id}`} className="species-item__title">
                    {item.title}
                  </h2>
                  {item.subtitle && <h4 className="species-item__subtitle">{item.subtitle}</h4>}
                  <div className="species-item__text">
                    {item.content}
                  </div>
                </div>
              </article>
            </Reveal>
            {i < speciesList.length - 1 && <SectionDivider />}
          </div>
        ))}
      </div>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
