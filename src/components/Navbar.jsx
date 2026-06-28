import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'HOME', href: '/', isRouter: true },
  {
    label: 'ABOUT US',
    href: '#',
    items: [
      { label: 'What is [E]NGP?', href: '/about/what-is-engp', isRouter: true },
      { label: 'Expected Project Outcome', href: '/about/expected-outcomes', isRouter: true },
      { label: 'Strategies', href: '/about/strategies', isRouter: true },
      { label: 'Priority Commodity Species', href: '/about/priority-commodities', isRouter: true },
      { label: 'NGP Logo', href: '/about/ngp-logo', isRouter: true }
    ]
  },
  {
    label: 'REFERENCES',
    href: '#',
    items: [
      { label: 'Issuances & Legal Bases', href: '/references/issuances', isRouter: true },
      { label: 'Memorandum of Agreement', href: '/references/moa', isRouter: true },
      { label: 'NSIC Registered Varieties', href: '/references/nsic-varieties', isRouter: true }
    ]
  },
  {
    label: 'ACCOMPLISHMENTS',
    href: '#',
    items: [
      { label: 'Statistics', href: '/accomplishments/statistics', isRouter: true },
      { label: 'Sites & Contracts', href: '/accomplishments/sites-contracts', isRouter: true }
    ]
  },
  {
    label: 'MAPS & PHOTOS',
    href: '#',
    items: [
      { label: 'NGP/ENGP Sites', href: '/maps/ngp-engp-sites', isRouter: true },
      { label: 'ERDB Sites', href: '/maps/erdb-sites', isRouter: true },
      { label: 'DAR-DENR Sites', href: '/maps/dar-denr-sites', isRouter: true },
      { label: 'Proposed NGP Sites (2023)', href: '/maps/proposed-ngp-sites', isRouter: true },
      { label: 'NGP Geotagged Photos', href: '/maps/geotagged-photos', isRouter: true },
      { label: 'Bamboo', href: '/maps/bamboo', isRouter: true }
    ]
  },
  {
    label: 'EVENTS & STORIES',
    href: '#',
    items: [
      { label: 'Bamboo Month', href: '/events/bamboo-month', isRouter: true },
      { label: 'ENGP Stories', href: '/events/engp-stories', isRouter: true },
      { label: 'Regional Stories', href: '/events/regional-stories', isRouter: true },
      { label: 'Regional Gallery', href: '/events/regional-gallery', isRouter: true },
      { label: 'Photo Gallery', href: '/events/photo-gallery', isRouter: true },
      { label: 'Video Gallery', href: '/events/video-gallery', isRouter: true }
    ]
  },
  { label: 'CONTACT US', href: '/contact-us', isRouter: true }
]

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)
  const searchInputRef = useRef(null)

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const toggleMobileDropdown = (label) => {
    if (activeMobileDropdown === label) {
      setActiveMobileDropdown(null)
    } else {
      setActiveMobileDropdown(label)
    }
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        {/* Logos */}
        <div className="navbar__logos">
          <a href="#" aria-label="DENR Logo">
            <img src="/denr-logo.svg" alt="DENR" className="navbar__logo" />
          </a>
          <a href="#" aria-label="FMB Logo">
            <img src="/fmb-logo.png" alt="FMB" className="navbar__logo" />
          </a>
          <a href="#" aria-label="NGP Logo">
            <img src="/ngp-logo.png" alt="NGP" className="navbar__logo" />
          </a>
        </div>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="menubar">
          {navLinks.map((link) => {
            const hasDropdown = !!link.items
            return (
              <li key={link.label} className={`navbar__item ${hasDropdown ? 'navbar__item--has-dropdown' : ''}`} role="none">
                {link.isRouter ? (
                  <Link
                    to={link.href}
                    className="navbar__link"
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="navbar__link"
                    role="menuitem"
                    aria-haspopup={hasDropdown ? 'true' : undefined}
                  >
                    {link.label}
                    {hasDropdown && (
                      <span className="navbar__chevron" aria-hidden="true">
                        <ChevronDown />
                      </span>
                    )}
                  </a>
                )}

                {hasDropdown && (
                  <ul className="navbar__dropdown" role="menu" aria-label={`${link.label} submenu`}>
                    {link.items.map((subItem) => (
                      <li key={subItem.label} role="none">
                        {subItem.isRouter ? (
                          <Link to={subItem.href} className="navbar__dropdown-link" role="menuitem">
                            {subItem.label}
                          </Link>
                        ) : (
                          <a href={subItem.href} className="navbar__dropdown-link" role="menuitem">
                            {subItem.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            id="navbar-search-btn"
            className={`navbar__action-btn ${searchOpen ? 'navbar__action-btn--active' : ''}`}
            aria-label="Toggle search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <SearchIcon />
            <span className="navbar__action-label">Search</span>
          </button>

          <div className="navbar__divider" aria-hidden="true" />

          <button
            id="navbar-menu-btn"
            className={`navbar__action-btn navbar__action-btn--menu ${mobileMenuOpen ? 'navbar__action-btn--active' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="navbar__hamburger" aria-hidden="true">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
            <span className="navbar__action-label">Menu</span>
          </button>
        </div>
      </nav>

      {/* Floating / Sliding Search Overlay */}
      <div className={`navbar__search-overlay ${searchOpen ? 'navbar__search-overlay--open' : ''}`} aria-hidden={!searchOpen}>
        <div className="navbar__search-container">
          <form className="navbar__search-form" onSubmit={(e) => e.preventDefault()}>
            <SearchIcon />
            <input
              ref={searchInputRef}
              type="text"
              className="navbar__search-input"
              placeholder="Search the National Greening Program website..."
              aria-label="Search site"
            />
            <button
              type="button"
              className="navbar__search-close"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              ✕
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`navbar__drawer-overlay ${mobileMenuOpen ? 'navbar__drawer-overlay--open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="navbar__drawer" onClick={(e) => e.stopPropagation()}>
          <div className="navbar__drawer-header">
            <span className="navbar__drawer-title">NGP NAVIGATION</span>
            <button className="navbar__drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">✕</button>
          </div>

          <ul className="navbar__drawer-list">
            {navLinks.map((link) => {
              const hasDropdown = !!link.items
              const isOpen = activeMobileDropdown === link.label

              return (
                <li key={link.label} className="navbar__drawer-item">
                  {hasDropdown ? (
                    <>
                      <button
                        className={`navbar__drawer-link navbar__drawer-link--dropdown ${isOpen ? 'navbar__drawer-link--open' : ''}`}
                        onClick={() => toggleMobileDropdown(link.label)}
                        aria-expanded={isOpen}
                      >
                        {link.label}
                        <span className="navbar__drawer-chevron">
                          <ChevronDown />
                        </span>
                      </button>

                      <ul className={`navbar__drawer-submenu ${isOpen ? 'navbar__drawer-submenu--open' : ''}`}>
                        {link.items.map((subItem) => (
                          <li key={subItem.label}>
                            {subItem.isRouter ? (
                              <Link
                                to={subItem.href}
                                className="navbar__drawer-sublink"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ) : (
                              <a
                                href={subItem.href}
                                className="navbar__drawer-sublink"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : link.isRouter ? (
                    <Link
                      to={link.href}
                      className="navbar__drawer-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="navbar__drawer-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
