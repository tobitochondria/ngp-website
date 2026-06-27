import { useState, useEffect, useCallback } from 'react'
import './HeroBanner.css'

const slides = [
  {
    id: 1,
    image: '/hero-1.jpg',
    title: '[Enhanced] National Greening Program',
    paragraphs: [
      'Is a massive forest rehabilitation program of the government implemented in pursuit of sustainable development for poverty alleviation, food security, biodiversity conservation, environmental stability, and climate change adaptation and mitigation.',
      'By virtue of Executive Order (EO) No. 26, s. 2011, the Program aimed to plant 1.5 billion trees in 1.5 million hectares of lands of the public domain for a period of six (6) years from CY 2011 to CY 2016.',
      'By the end of 2015, Executive Order No. 193, s. 2015 was issued to expand the coverage of NGP to rehabilitate all the remaining unproductive, denuded and degraded forestlands from 2016 to 2028.',
    ],
  },
  {
    id: 2,
    image: '/hero-2.jpg',
    title: 'Reforesting the Nation',
    paragraphs: [
      'The National Greening Program is one of the flagship programs of the Philippine government, aiming to restore and protect the country\'s forest ecosystems.',
      'Through collaborative efforts between the government, local communities, and partner organizations, millions of indigenous and endemic tree species have been planted across the archipelago.',
      'The program continues to provide livelihood opportunities for communities while ensuring the long-term health and productivity of Philippine forests.',
    ],
  },
  {
    id: 3,
    image: '/hero-3.jpg',
    title: 'Protecting Our Natural Heritage',
    paragraphs: [
      'The Philippines is one of the world\'s mega-biodiverse countries, home to thousands of endemic plant and animal species that depend on healthy forest ecosystems.',
      'The Enhanced NGP targets critical watersheds, protected areas, and ancestral domains to ensure comprehensive coverage and maximum environmental benefit.',
      'Community-based forest management is at the heart of the program, empowering indigenous peoples and local communities as stewards of the land.',
    ],
  },
]

function ArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      width="22" height="22">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      width="22" height="22">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 700)
  }, [animating])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  // Auto-advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="hero-banner" aria-label="Hero banner">
      {/* Background slides */}
      <div className="hero-banner__slides">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero-banner__slide ${i === current ? 'hero-banner__slide--active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={i !== current}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="hero-banner__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-banner__content" key={current}>
        <h1 className="hero-banner__title">{slide.title}</h1>
        {slide.paragraphs.map((p, i) => (
          <p key={i} className="hero-banner__text">{p}</p>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        id="hero-prev-btn"
        className="hero-banner__arrow hero-banner__arrow--left"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ArrowLeft />
      </button>

      <button
        id="hero-next-btn"
        className="hero-banner__arrow hero-banner__arrow--right"
        onClick={next}
        aria-label="Next slide"
      >
        <ArrowRight />
      </button>

      {/* Dot indicators */}
      <div className="hero-banner__dots" role="tablist" aria-label="Slide indicators">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-banner__dot ${i === current ? 'hero-banner__dot--active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
