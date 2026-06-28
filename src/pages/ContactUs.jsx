import { useState, useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './ContactUs.css'

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
      { threshold: 0.05 }
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const regionalCoordinators = [
  { region: 'NCR', focal: 'Arturo Calderon', email: 'denrncrcddpfms@gmail.com' },
  { region: 'CAR', focal: 'Marilyn Malecdan', email: 'car_ngp@yahoo.com' },
  { region: 'Region 1', focal: 'Frank Vincent D. Danglose', email: 'denr1engp2022@gmail.com' },
  { region: 'Region 2', focal: 'Mary Ann R. Lucena', email: 'ngpr2@yahoo.com' },
  { region: 'Region 3', focal: 'Lezette A. Bernales', email: 'ngp_denr3@yahoo.com' },
  { region: 'Region 4A', focal: 'Atty. Carolane P. Gonzales', email: 'denr4a.ngp@yahoo.com' },
  { region: 'Region 4B', focal: 'Jaime M. Ancheta, Jr.', email: 'mimaropaengp@gmail.com' },
  { region: 'Region 5', focal: 'April Bea', email: 'ngpofmsdenr5@yahoo.com' },
  { region: 'Region 6', focal: 'Glenn Gases', email: 'ngofrddr6@yahoo.com' },
  { region: 'Region 7', focal: 'Giselo Albiso', email: 'r7ngpopcen@gmail.com' },
  { region: 'Region 8', focal: 'Marissa Cebuano', email: 'ngpr8@yahoo.com.ph' },
  { region: 'Region 9', focal: 'Cicelia Asuncion', email: 'ngpregion9@gmail.com' },
  { region: 'Region 10', focal: 'Vincent O. Ferolin', email: 'region10engp@gmail.com' },
  { region: 'Region 11', focal: 'Gil V. Bigcas', email: 'forester5811@gmail.com' },
  { region: 'Region 12', focal: 'Jamel Tawantawan', email: 'fms_rtd12@yahoo.com' },
  { region: 'Region 13', focal: 'Luis Gonzaga', email: 'ngp_caraga@yahoo.com' }
]

const socialLinks = [
  {
    name: 'Facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    url: 'https://www.facebook.com/denrfmbofficial',
    handle: '@denrfmb',
    colorClass: 'facebook'
  },
  {
    name: 'YouTube',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
    url: 'https://www.youtube.com/@DENRFMB',
    handle: 'Forest Management Bureau',
    colorClass: 'youtube'
  },
  {
    name: 'X',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
    url: 'https://x.com/denrofficial',
    handle: '@denrofficial',
    colorClass: 'twitter'
  },
  {
    name: 'Instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    url: 'https://www.instagram.com/denrofficial',
    handle: '@denrofficial',
    colorClass: 'instagram'
  }
]

export default function ContactUs() {
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' })

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      })
      return
    }
    // Simulation of a premium success state
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you shortly.'
    })
    // Reset form after submission
    setForm({
      name: '',
      phone: '',
      company: '',
      email: '',
      message: ''
    })
  }

  // Filter regional coordinators based on search input
  const filteredCoordinators = regionalCoordinators.filter(
    (coord) =>
      coord.region.toLowerCase().includes(search.toLowerCase()) ||
      coord.focal.toLowerCase().includes(search.toLowerCase()) ||
      coord.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="contact-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="contact-hero" aria-label="Contact Us page hero">
        <div className="contact-hero__bg" aria-hidden="true" />
        <div className="contact-hero__overlay" aria-hidden="true" />
        <div className="contact-hero__content">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="contact-breadcrumb__link">Home</a>
            <span className="contact-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="contact-breadcrumb__current">Contact Us</span>
          </nav>
          <h1 className="contact-hero__title">Contact Us</h1>
        </div>
      </header>

      {/* ── Main Section: Office Info & Map ───────────────────────────── */}
      <div className="contact-body">
        <section className="office-section" aria-labelledby="office-heading">
          <Reveal className="office-grid">

            {/* Left: Glassmorphic Contact Details */}
            <div className="office-details">
              <span className="office-tagline">CONNECT WITH US</span>
              <h2 id="office-heading" className="office-title">
                National Greening Program Coordinating Office
              </h2>
              <p className="office-subtitle">Forest Management Bureau</p>

              <div className="info-cards-list">

                <div className="info-card">
                  <div className="info-card__icon info-card__icon--location">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="info-card__content">
                    <h3 className="info-card__title">Our Address</h3>
                    <p className="info-card__text">
                      1st Floor FMB Annex Bldg., Visayas Avenue, Diliman, 1100 Quezon City, Philippines
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card__icon info-card__icon--phone">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="info-card__content">
                    <h3 className="info-card__title">Call Us</h3>
                    <p className="info-card__text">
                      <a href="tel:+63289274873" className="info-card__link">(02) 8927 4873</a>
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card__icon info-card__icon--email">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="info-card__content">
                    <h3 className="info-card__title">Email Us</h3>
                    <p className="info-card__text">
                      <a href="mailto:fmb@denr.gov.ph" className="info-card__link">fmb@denr.gov.ph</a>
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card__icon info-card__icon--web">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="info-card__content">
                    <h3 className="info-card__title">Website</h3>
                    <p className="info-card__text">
                      <a href="https://forestry.denr.gov.ph/" target="_blank" rel="noopener noreferrer" className="info-card__link">
                        Forest Management Bureau
                      </a>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Premium OpenStreetMap Card */}
            <div className="map-wrapper">
              <div className="map-container">
                <iframe
                  title="Forestry Management Bureau OpenStreetMap Location"
                  className="map-iframe"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=121.0400%2C14.6495%2C121.0508%2C14.6575&amp;layer=mapnik&amp;marker=14.65347%2C121.04589"
                  allowFullScreen
                  loading="lazy"
                />
                <div className="map-overlay-button-container">
                  <a
                    href="https://www.openstreetmap.org/?mlat=14.65347&amp;mlon=121.04589#map=17/14.65347/121.04589"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-open-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Open in OpenStreetMaps
                  </a>
                </div>
              </div>
            </div>

          </Reveal>
        </section>

        {/* ── Talk to Us Section ───────────────────────────────────────── */}
        <section className="talk-section" aria-labelledby="talk-heading">
          <Reveal className="talk-grid">

            {/* Left Column: Inquiry Form */}
            <div className="talk-form-container">
              <span className="office-tagline">TALK TO US</span>
              <h2 id="talk-heading" className="talk-title">Send a Message</h2>
              <p className="talk-subtitle">Send us your questions, inquiries or feedback.</p>

              {formStatus.submitted && (
                <div className={`form-status-alert ${formStatus.success ? 'form-status-alert--success' : 'form-status-alert--error'}`}>
                  {formStatus.success ? (
                    <svg className="form-status-alert__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg className="form-status-alert__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                  <span>{formStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="interactive-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-name" className="form-label">
                      Full Name <span className="form-required">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Juan Dela Cruz"
                      required
                      value={form.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiry-phone" className="form-label">Phone</label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="09123456789"
                      value={form.phone}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-email" className="form-label">
                      Email Address <span className="form-required">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="juandelacruz@email.com"
                      required
                      value={form.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiry-company" className="form-label">
                      Company or Organization
                    </label>
                    <input
                      id="inquiry-company"
                      name="company"
                      type="text"
                      className="form-input"
                      placeholder="Organization"
                      value={form.company}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-message" className="form-label">
                    Message <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    className="form-textarea"
                    rows={6}
                    placeholder="Enter your message here..."
                    required
                    value={form.message}
                    onChange={handleFormChange}
                  />
                  <div className="form-textarea-footer">
                    <span>* Required fields</span>
                  </div>
                </div>

                <button type="submit" className="form-submit-btn">
                  Submit Message
                  <svg className="form-submit-btn__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right Column: Decorative Portal Card */}
            <div className="talk-decorative-card">
              <div className="decorative-glow" />
              <div className="decorative-content">
                <div className="dec-logo-row">
                  <img src="/ngp-logo.png" alt="NGP Logo" className="dec-logo" />
                </div>
                <h3>Let&apos;s Build a Greener Future Together</h3>
                <p>
                  Your feedback helps us improve the implementation of the Enhanced National Greening Program. Whether you are a partner PO, LGU, volunteer, or citizen, we are ready to hear from you.
                </p>
                <div className="dec-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>General Inquiries</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Partnership Proposals</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Technical Support</span>
                  </div>
                </div>
              </div>
            </div>

          </Reveal>
        </section>

        {/* ── Regional Coordinators Section ─────────────────────────────── */}
        <section className="coordinators-section" aria-labelledby="coordinators-heading">
          <Reveal>
            <div className="coordinators-header">
              <div>
                <span className="office-tagline">REGIONAL OFFICES</span>
                <h2 id="coordinators-heading" className="coordinators-title">
                  NGP Regional Coordinators
                </h2>
                <p className="coordinators-subtitle">
                  Contact focal persons in your specific administrative region.
                </p>
              </div>

              {/* Dynamic Live Filter */}
              <div className="search-bar-container">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Filter region, focal person..."
                  value={search}
                  onChange={handleSearchChange}
                  aria-label="Filter regional coordinators"
                />
                {search && (
                  <button className="search-clear-btn" onClick={() => setSearch('')} aria-label="Clear filter">
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Grid of Cards */}
            {filteredCoordinators.length > 0 ? (
              <div className="coordinators-grid">
                {filteredCoordinators.map((coord, i) => (
                  <div key={coord.region} className="coord-card" style={{ '--reveal-delay': `${i * 30}ms` }}>
                    <div className="coord-card__badge">{coord.region}</div>
                    <h3 className="coord-card__name">{coord.focal}</h3>
                    <p className="coord-card__role">Focal Person</p>
                    <div className="coord-card__divider" />
                    <a href={`mailto:${coord.email}`} className="coord-card__email">
                      <svg className="coord-card__email-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {coord.email}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results-card">
                <svg className="no-results-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <p>No regional coordinators found matching &quot;{search}&quot;</p>
              </div>
            )}
          </Reveal>
        </section>

        {/* ── Social Networks Section ───────────────────────────────────── */}
        <section className="socials-section" aria-labelledby="socials-heading">
          <Reveal>
            <div className="socials-header">
              <span className="office-tagline">STAY UPDATED</span>
              <h2 id="socials-heading" className="socials-title">Follow Us on Social Networks</h2>
              <p className="socials-subtitle">Get the latest updates, stories, and programs from DENR and FMB.</p>
            </div>

            <div className="socials-grid">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-card social-card--${social.colorClass}`}
                >
                  <div className="social-card__icon-wrap">
                    {social.icon}
                  </div>
                  <div className="social-card__content">
                    <h3 className="social-card__name">{social.name}</h3>
                    <p className="social-card__handle">{social.handle}</p>
                  </div>
                  <div className="social-card__arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

      </div>

      {/* ── Leave a Reply (Comments) ─────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
