import { useState, useEffect, useCallback, useRef } from 'react'
import './MainContent.css'

// ─── Data ──────────────────────────────────────────────────────────────────

const whatsNewSlides = [
  {
    id: 1,
    image: '/ngp-placeholder.png',
    title: "National Greening Program Coordinators' Regional Consultation Workshop",
    date: 'April 7, 2025',
    excerpt:
      "The Forest Management Bureau (FMB) conducted the National Greening Program Regional Coordinators' Consultation Workshop at the Tribute Hotel, Quezon City, from March 18 to 21, 2025. This consultation workshop identified recent updates, addressed pressing field concerns, and aligned regional action plans for the coming year.",
  },
  {
    id: 2,
    image: '/ngp-placeholder.png',
    title: 'NGP Monitoring and Assessment Activities in Mindanao Region',
    date: 'March 15, 2025',
    excerpt:
      'The Forest Management Bureau conducted comprehensive monitoring and assessment activities across Mindanao Region, evaluating the progress and impact of NGP plantations established from 2011 to present. Field teams assessed survival rates, species diversity, and community engagement levels across all sites.',
  },
  {
    id: 3,
    image: '/ngp-placeholder.png',
    title: 'Enhanced NGP Partnership with Local Government Units',
    date: 'February 20, 2025',
    excerpt:
      'The Department of Environment and Natural Resources strengthened its partnership with various Local Government Units across the country for the implementation of the Enhanced National Greening Program. Memoranda of Agreement were signed with 45 municipalities covering critical watershed areas.',
  },
  {
    id: 4,
    image: '/ngp-placeholder.png',
    title: 'NGP Tree Planting Activities in Visayas Region',
    date: 'January 30, 2025',
    excerpt:
      "Massive tree planting activities were conducted across the Visayas Region as part of the National Greening Program's annual targets. Over 500,000 seedlings of indigenous tree species were planted across denuded and degraded forestlands in partnership with local communities.",
  },
  {
    id: 5,
    image: '/ngp-placeholder.png',
    title: 'Annual NGP Program Review and Planning Workshop 2025',
    date: 'January 10, 2025',
    excerpt:
      'The Forest Management Bureau conducted its annual NGP Review and Planning Workshop, bringing together regional directors, program coordinators, and key stakeholders to assess accomplishments for the previous year and set ambitious targets for 2025.',
  },
  {
    id: 6,
    image: '/ngp-placeholder.png',
    title: 'NGP Seedling Production Program Update',
    date: 'December 18, 2024',
    excerpt:
      "The National Greening Program's seedling production centers successfully produced over 150 million quality seedlings of indigenous and endemic tree species in preparation for the 2025 planting season — a 15% increase from the previous year.",
  },
]

const regionalStories = [
  {
    id: 1,
    image: '/ngp-placeholder.png',
    title: 'SITE VISIT ON SELECTED ENGP PLANTATIONS IN ZAMBOANGA DEL SUR',
    date: 'April 28, 2023',
    excerpt:
      "The DENR Region 9 – PENRO Zamboanga del Sur conducted site visitation on selected NGP/ENGP plantations within the PENRO's jurisdiction on April 19 to 28, 2023. The activity was spearheaded by OIC, PENR Officer Forester Diomides M. Pablo together with the PENRO ENGP Coordinator Forester Romel A. Candido, CENR Officer of Guipos.",
  },
  {
    id: 2,
    image: '/ngp-placeholder.png',
    title: 'COMMUNITY-BASED FOREST MANAGEMENT IN EASTERN SAMAR',
    date: 'March 12, 2023',
    excerpt:
      'The DENR Region 8 successfully implemented community-based forest management activities in Eastern Samar, engaging local indigenous communities as stewards of the NGP plantations. The program trained over 200 community members in sustainable forest management practices.',
  },
  {
    id: 3,
    image: '/ngp-placeholder.png',
    title: 'NGP BIODIVERSITY ASSESSMENT IN CAGAYAN VALLEY',
    date: 'February 5, 2023',
    excerpt:
      'Scientists and forest rangers conducted a comprehensive biodiversity assessment in NGP plantation areas across Cagayan Valley. The study documented significant increases in wildlife populations and plant diversity in areas where the program has been active for more than five years.',
  },
  {
    id: 4,
    image: '/ngp-placeholder.png',
    title: 'AGROFORESTRY INTEGRATION IN BUKIDNON NGP SITES',
    date: 'January 20, 2023',
    excerpt:
      'The DENR Region 10 successfully integrated agroforestry practices into National Greening Program sites in Bukidnon, providing additional livelihood opportunities for local communities while enhancing the ecological value of the plantations.',
  },
  {
    id: 5,
    image: '/ngp-placeholder.png',
    title: 'WATERSHED REHABILITATION SUCCESS IN ILOCOS REGION',
    date: 'December 10, 2022',
    excerpt:
      "The National Greening Program's watershed rehabilitation efforts in the Ilocos Region have shown remarkable success, with water flow in major river systems improving markedly. Local farmers have reported better water availability for irrigation as a direct result of reforestation activities.",
  },
  {
    id: 6,
    image: '/ngp-placeholder.png',
    title: 'INDIGENOUS TREE SPECIES CONSERVATION IN PALAWAN',
    date: 'November 3, 2022',
    excerpt:
      'The DENR Region 4-B implemented a special conservation program for critically endangered indigenous tree species in Palawan as part of the Enhanced NGP. The project focused on propagation and reintroduction of species listed under the IUCN Red List.',
  },
]

// ─── Shared Hooks ──────────────────────────────────────────────────────────

/**
 * Auto-advancing carousel with pause-on-hover support.
 * Returns [current, setCurrent, pauseHandlers].
 */
function useCarousel(length, interval = 6000) {
  const [current, setCurrent] = useState(0)
  const paused = useRef(false)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % length)
  }, [length])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + length) % length)
  }, [length])

  const goTo = useCallback(i => setCurrent(i), [])

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) next()
    }, interval)
    return () => clearInterval(id)
  }, [next, interval])

  const pauseHandlers = {
    onMouseEnter: () => { paused.current = true },
    onMouseLeave: () => { paused.current = false },
    onFocus:      () => { paused.current = true },
    onBlur:       () => { paused.current = false },
  }

  return [current, goTo, prev, next, pauseHandlers]
}

// ─── Arrow SVGs ────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      width="18" height="18" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      width="18" height="18" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// ─── Calendar Icon ─────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      width="13" height="13" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

// ─── Shared: Carousel Dots & Arrows ───────────────────────────────────────

function CarouselDots({ count, current, onGoTo, prefix }) {
  return (
    <div className="carousel-dots" role="tablist" aria-label="Slide indicators">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Go to slide ${i + 1}`}
          className={`carousel-dot${i === current ? ' carousel-dot--active' : ''}`}
          onClick={() => onGoTo(i)}
          id={`${prefix}-dot-${i}`}
        />
      ))}
    </div>
  )
}

// ─── Clock Widget ──────────────────────────────────────────────────────────

function ClockWidget() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const datePart = now.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const timePart = now.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  return (
    <div className="widget clock-widget" role="status" aria-live="polite" aria-label="Philippine Standard Time">
      <div className="clock-widget__header">
        <span className="clock-widget__dot" aria-hidden="true" />
        Philippine Standard Time
      </div>
      <div className="clock-widget__body">
        <time className="clock-widget__time" dateTime={now.toISOString()}>{timePart}</time>
        <p className="clock-widget__date">{datePart}</p>
      </div>
    </div>
  )
}

// ─── What's New Carousel ───────────────────────────────────────────────────

function WhatsNewCarousel() {
  const [current, goTo, prev, next, pauseHandlers] = useCarousel(whatsNewSlides.length, 7000)
  const slide = whatsNewSlides[current]

  // Keyboard navigation on the image wrap
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <div
      className="wn-carousel"
      {...pauseHandlers}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="What's New articles carousel"
      aria-roledescription="carousel"
    >
      {/* Image + overlay badges */}
      <div className="wn-carousel__track" aria-live="polite">
        {whatsNewSlides.map((s, i) => (
          <div
            key={s.id}
            className={`wn-carousel__slide${i === current ? ' wn-carousel__slide--active' : ''}`}
            aria-hidden={i !== current}
          >
            <img src={s.image} alt={s.title} className="wn-carousel__img" loading="lazy" />
            <div className="wn-carousel__img-overlay" aria-hidden="true" />
          </div>
        ))}

        <button
          id="wn-prev-btn"
          className="carousel-arrow carousel-arrow--left"
          onClick={prev}
          aria-label="Previous article"
        >
          <ChevronLeft />
        </button>
        <button
          id="wn-next-btn"
          className="carousel-arrow carousel-arrow--right"
          onClick={next}
          aria-label="Next article"
        >
          <ChevronRight />
        </button>

        {/* Slide counter badge */}
        <div className="wn-carousel__counter" aria-hidden="true">
          {current + 1} / {whatsNewSlides.length}
        </div>
      </div>

      {/* Text body */}
      <div className="wn-carousel__body">
        <span className="wn-carousel__tag">Latest</span>
        <h3 className="wn-carousel__title">{slide.title}</h3>
        <p className="wn-carousel__meta">
          <CalendarIcon />
          <time>{slide.date}</time>
        </p>
        <p className="wn-carousel__excerpt">{slide.excerpt}</p>
        <a href="#" className="wn-carousel__cta" aria-label={`Read full article: ${slide.title}`}>
          Read Full Article →
        </a>
      </div>

      <CarouselDots count={whatsNewSlides.length} current={current} onGoTo={goTo} prefix="wn" />
    </div>
  )
}

// ─── Regional Stories Carousel ─────────────────────────────────────────────

function RegionalStoriesCarousel() {
  const [current, goTo, prev, next, pauseHandlers] = useCarousel(regionalStories.length, 8000)
  const slide = regionalStories[current]

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <div
      className="rs-carousel"
      {...pauseHandlers}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Regional Stories carousel"
      aria-roledescription="carousel"
    >
      <div className="rs-carousel__track" aria-live="polite">
        {regionalStories.map((s, i) => (
          <div
            key={s.id}
            className={`rs-carousel__slide${i === current ? ' rs-carousel__slide--active' : ''}`}
            aria-hidden={i !== current}
          >
            <img src={s.image} alt={s.title} className="rs-carousel__img" loading="lazy" />
            <div className="rs-carousel__img-overlay" aria-hidden="true" />
          </div>
        ))}

        <button
          id="rs-prev-btn"
          className="carousel-arrow carousel-arrow--left"
          onClick={prev}
          aria-label="Previous story"
        >
          <ChevronLeft />
        </button>
        <button
          id="rs-next-btn"
          className="carousel-arrow carousel-arrow--right"
          onClick={next}
          aria-label="Next story"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="rs-carousel__body">
        <span className="rs-carousel__region-tag">Regional</span>
        <h3 className="rs-carousel__title">{slide.title}</h3>
        <p className="rs-carousel__meta">
          <CalendarIcon />
          <time>{slide.date}</time>
        </p>
        <p className="rs-carousel__excerpt">{slide.excerpt}</p>
        <a href="#" className="rs-carousel__cta" aria-label={`Read story: ${slide.title}`}>
          Read Story →
        </a>
      </div>

      <CarouselDots count={regionalStories.length} current={current} onGoTo={goTo} prefix="rs" />
    </div>
  )
}

// ─── NGP Photo Gallery ─────────────────────────────────────────────────────

const TOTAL_PAGES = 7
const PHOTOS_PER_PAGE = 12

function NgpPhotoGallery() {
  const [page, setPage] = useState(1)
  const [lightbox, setLightbox] = useState(null) // { src, alt }

  const photos = Array.from({ length: PHOTOS_PER_PAGE }, (_, i) => ({
    id: i + 1,
    src: '/ngp-placeholder.png',
    alt: `NGP Photo ${(page - 1) * PHOTOS_PER_PAGE + i + 1}`,
  }))

  const openLightbox = (photo) => setLightbox(photo)
  const closeLightbox = () => setLightbox(null)

  const handleLightboxKey = (e) => {
    if (e.key === 'Escape') closeLightbox()
  }

  // Pagination helper
  const getPageNumbers = () => {
    if (TOTAL_PAGES <= 5) return Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1)
    if (page <= 3) return [1, 2, 3, '…', TOTAL_PAGES]
    if (page >= TOTAL_PAGES - 2) return [1, '…', TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES]
    return [1, '…', page, '…', TOTAL_PAGES]
  }

  return (
    <>
      <div className="ngp-gallery">
        <div className="ngp-gallery__grid" role="list" aria-label="NGP photo gallery">
          {photos.map(photo => (
            <button
              key={photo.id}
              className="ngp-gallery__item"
              role="listitem"
              onClick={() => openLightbox(photo)}
              aria-label={`View ${photo.alt}`}
              id={`ngp-photo-${photo.id}`}
            >
              <img src={photo.src} alt={photo.alt} className="ngp-gallery__img" loading="lazy" />
              <div className="ngp-gallery__hover-overlay" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  width="22" height="22">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <nav className="ngp-gallery__pagination" aria-label="Photo gallery pagination">
          <button
            className="pg-btn pg-btn--arrow"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            id="gallery-prev-btn"
          >
            <ChevronLeft />
          </button>

          {getPageNumbers().map((n, i) =>
            n === '…' ? (
              <span key={`ellipsis-${i}`} className="pg-btn pg-btn--ellipsis" aria-hidden="true">…</span>
            ) : (
              <button
                key={n}
                className={`pg-btn${page === n ? ' pg-btn--active' : ''}`}
                onClick={() => setPage(n)}
                aria-label={`Page ${n}`}
                aria-current={page === n ? 'page' : undefined}
                id={`gallery-page-${n}`}
              >
                {n}
              </button>
            )
          )}

          <button
            className="pg-btn pg-btn--arrow"
            onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page === TOTAL_PAGES}
            aria-label="Next page"
            id="gallery-next-btn"
          >
            <ChevronRight />
          </button>
        </nav>

        {/* See More */}
        <div className="gallery-footer">
          <div className="gallery-footer__line" aria-hidden="true" />
          <a href="#" className="gallery-footer__link" id="ngp-see-more-link">See More</a>
          <div className="gallery-footer__line" aria-hidden="true" />
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={closeLightbox}
          onKeyDown={handleLightboxKey}
          tabIndex={-1}
        >
          <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
            <button
              className="lightbox__close"
              onClick={closeLightbox}
              aria-label="Close photo"
              id="lightbox-close-btn"
            >✕</button>
            <img src={lightbox.src} alt={lightbox.alt} className="lightbox__img" />
            <p className="lightbox__caption">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Main Export ───────────────────────────────────────────────────────────

export default function MainContent() {
  return (
    <main className="main-content" id="main-content">

      {/* ── Row 1: What's New + Sidebar ───────────────────────────── */}
      <div className="mc-layout">

        {/* PRIMARY: What's New */}
        <section className="mc-primary" aria-labelledby="whats-new-heading">
          <header className="section-banner" aria-label="What's New section">
            <div className="section-banner__bg" aria-hidden="true" />
            <h2 id="whats-new-heading" className="section-banner__title">WHAT'S NEW?</h2>
          </header>
          <div className="section-card">
            <WhatsNewCarousel />
            <div className="section-card__footer">
              <div className="card-divider" aria-hidden="true" />
              <a href="#" className="card-link" id="read-more-articles-link">
                Read More Articles
              </a>
              <div className="card-divider" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="mc-sidebar" aria-label="Sidebar widgets">
          <ClockWidget />

          <div className="widget widget--link" aria-label="Philippine Transparency Seal">
            <a href="#" id="transparency-seal-link" className="widget__link-wrap" tabIndex={0}>
              <img
                src="/transparency-seal.png"
                alt="Philippine Transparency Seal"
                className="widget__img widget__img--seal"
              />
            </a>
          </div>

          <div className="widget widget--link" aria-label="Executive Order No. 193">
            <a href="#" id="executive-order-link" className="widget__link-wrap" tabIndex={0}>
              <img
                src="/EO-NO-193.jpg"
                alt="Executive Order No. 193 – Implementing Rules and Regulations"
                className="widget__img widget__img--eo"
              />
            </a>
          </div>

          <div className="widget widget--video">
            <div className="widget__video-wrap">
              <iframe
                id="ngp-youtube-embed"
                src="https://www.youtube.com/embed/IhNvm-ZQ4a4"
                title="National Greening Program YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div className="widget widget--link" aria-label="Did You Know Trivia">
            <a href="#" id="trivia-link" className="widget__link-wrap" tabIndex={0}>
              <img
                src="/Trivia-1.png"
                alt="Did you know – A tree can sequester up to 150 kg of CO₂ per year."
                className="widget__img widget__img--trivia"
              />
            </a>
          </div>
        </aside>
      </div>

      {/* ── Row 2: Regional Stories + NGP Photos ──────────────────── */}
      <div className="mc-bottom">

        <section className="mc-bottom__col" aria-labelledby="regional-stories-heading">
          <div className="tag-header" role="heading" aria-level="2" id="regional-stories-heading">
            <span className="tag-header__badge">REGIONAL STORIES</span>
            <div className="tag-header__rule" aria-hidden="true" />
          </div>
          <div className="section-card">
            <RegionalStoriesCarousel />
          </div>
        </section>

        <section className="mc-bottom__col" aria-labelledby="ngp-photos-heading">
          <div className="tag-header" role="heading" aria-level="2" id="ngp-photos-heading">
            <span className="tag-header__badge">NGP PHOTOS</span>
            <div className="tag-header__rule" aria-hidden="true" />
          </div>
          <NgpPhotoGallery />
        </section>

      </div>
    </main>
  )
}
