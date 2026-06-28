import { useEffect, useRef, useState } from 'react'
import CommentForm from '../components/CommentForm'
import './SitesContracts.css'

// ─── Data Definitions ────────────────────────────────────────────────────────

const fictionalSites = [
  { name: "Cordillera Reforestation Area", region: "CAR", coords: [17.0224, 120.9852], area: "450 ha", seedlings: "540,000" },
  { name: "Sierra Madre Conservation Site", region: "Region II", coords: [16.1423, 122.0298], area: "680 ha", seedlings: "820,000" },
  { name: "Bataan National Park Buffer", region: "Region III", coords: [14.6853, 120.4285], area: "210 ha", seedlings: "250,000" },
  { name: "Mindoro Watershed Restoration", region: "MIMAROPA", coords: [13.1512, 121.1499], area: "380 ha", seedlings: "460,000" },
  { name: "Mount Isarog Planting Site", region: "Region V", coords: [13.6592, 123.3745], area: "300 ha", seedlings: "360,000" },
  { name: "Panay Highland Forest Project", region: "Region VI", coords: [11.1685, 122.2539], area: "520 ha", seedlings: "620,000" },
  { name: "Bohol Watershed Rehabilitation", region: "Region VII", coords: [9.8500, 124.2000], area: "190 ha", seedlings: "230,000" },
  { name: "Samar Island Biodiversity Site", region: "Region VIII", coords: [11.9542, 125.0483], area: "750 ha", seedlings: "900,000" },
  { name: "Zamboanga Peninsula Green Belt", region: "Region IX", coords: [7.9234, 122.4285], area: "310 ha", seedlings: "370,000" },
  { name: "Mount Kitanglad Buffer Zone", region: "Region X", coords: [8.1333, 124.9167], area: "640 ha", seedlings: "770,000" },
  { name: "Davao Coastal Reforestation", region: "Region XI", coords: [7.1907, 125.4553], area: "400 ha", seedlings: "480,000" },
  { name: "Soccsksargen Agro-forestry Site", region: "Region XII", coords: [6.5000, 124.8500], area: "480 ha", seedlings: "580,000" },
  { name: "Agusan Marsh Peatland Protection Scheme", region: "Region XIII", coords: [8.2667, 125.8667], area: "550 ha", seedlings: "660,000" }
];

const fictionalContracts = [
  { id: 1, name: "Mount Pulag Upland Reforestation Project", partner: "Ambuklao Indigenous Farmers Coop", year: "2024", region: "CAR", area: 150, value: 2450000, status: "Active" },
  { id: 2, name: "Sierra Madre Rainforest Buffer Rehabilitation", partner: "Pinagkaisang Samahan ng Magsasaka", year: "2024", region: "Region II", area: 250, value: 3900000, status: "Active" },
  { id: 3, name: "Bataan Coastal Mangrove Rehabilitation", partner: "Orani Fisherfolk Association", year: "2024", region: "Region III", area: 80, value: 1200000, status: "Active" },
  { id: 4, name: "Mindoro Watershed Agro-Forestry Project", partner: "Mangyan Community Conservation PO", year: "2023", region: "MIMAROPA", area: 180, value: 2700000, status: "Ongoing Maintenance" },
  { id: 5, name: "Mount Isarog Upland Greenery Project", partner: "Isarog Guardians PO", year: "2023", region: "Region V", area: 120, value: 1850000, status: "Ongoing Maintenance" },
  { id: 6, name: "Panay Highland Forest Expansion", partner: "Antique Upland Farmers Coop", year: "2023", region: "Region VI", area: 220, value: 3300000, status: "Ongoing Maintenance" },
  { id: 7, name: "Bohol Watershed Conservation Project", partner: "Loboc Green Community PO", year: "2022", region: "Region VII", area: 90, value: 1400000, status: "Completed" },
  { id: 8, name: "Samar Island Rainforest Protection Initiative", partner: "Samar Biodiversity Guardians PO", year: "2022", region: "Region VIII", area: 300, value: 4500000, status: "Completed" },
  { id: 9, name: "Zamboanga Coastal Mangrove Belt", partner: "Sibugay Fisherfolk & PO Alliance", year: "2022", region: "Region IX", area: 110, value: 1650000, status: "Completed" },
  { id: 10, name: "Mount Kitanglad Buffer Agro-Forestry", partner: "Kitanglad Indigenous Heritage PO", year: "2021", region: "Region X", area: 320, value: 4800000, status: "Completed" },
  { id: 11, name: "Davao Coastal Reforestation & Greenbelt", partner: "Davao Gulf Conservation PO", year: "2021", region: "Region XI", area: 140, value: 2100000, status: "Completed" },
  { id: 12, name: "Agusan Marsh Peatland Protection Scheme", partner: "Agusan Wetland Caretakers PO", year: "2021", region: "Region XIII", area: 200, value: 3000000, status: "Completed" }
];

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

// ─── Page Component ────────────────────────────────────────────────────────────

export default function SitesContracts() {
  const [activeTab, setActiveTab] = useState('year')
  const [searchQuery, setSearchQuery] = useState('')

  // ─── Leaflet Map Loader & Initialization ─────────────────────────────────────
  useEffect(() => {
    let mapInstance = null

    const initMap = () => {
      const L = window.L
      if (!L) return

      const container = document.getElementById('map-container')
      if (!container || container._leaflet_id) return

      // Setup clean icon URLs for default Leaflet markers to prevent CDN path bugs
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Lock view bounds strictly within the Philippines landmass coordinates
      const philippinesBounds = L.latLngBounds(
        L.latLng(4.5, 116.0), // South-West Limit
        L.latLng(21.5, 127.0) // North-East Limit
      )

      mapInstance = L.map('map-container', {
        center: [12.8797, 121.7740],
        zoom: 6,
        minZoom: 5.5,
        maxZoom: 12,
        maxBounds: philippinesBounds,
        maxBoundsViscosity: 1.0
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance)

      // Plot fictional sites with detailed hover tooltips and click popups
      fictionalSites.forEach(site => {
        const marker = L.marker(site.coords).addTo(mapInstance)
        
        marker.bindTooltip(`
          <div class="map-tooltip">
            <strong>${site.name}</strong><br/>
            <span>Region: ${site.region}</span>
          </div>
        `, { direction: 'top', offset: [0, -10] })

        marker.bindPopup(`
          <div class="map-popup">
            <h3>${site.name}</h3>
            <table>
              <tbody>
                <tr>
                  <th>Region:</th>
                  <td>${site.region}</td>
                </tr>
                <tr>
                  <th>Area Planted:</th>
                  <td>${site.area}</td>
                </tr>
                <tr>
                  <th>Seedlings Planted:</th>
                  <td>${site.seedlings}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `)
      })
    }

    // Dynamic library injector
    let link = document.querySelector('link[href*="leaflet.css"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    if (window.L) {
      initMap()
    } else {
      let script = document.querySelector('script[src*="leaflet.js"]')
      if (!script) {
        script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.async = true
        document.head.appendChild(script)
        script.onload = initMap
      } else {
        script.addEventListener('load', initMap)
      }
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [])

  // ─── Filter & Grouping Logic ─────────────────────────────────────────────────
  
  const filteredContracts = fictionalContracts.filter(c => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true
    return (
      c.name.toLowerCase().includes(query) ||
      c.partner.toLowerCase().includes(query) ||
      c.year.toLowerCase().includes(query) ||
      c.region.toLowerCase().includes(query) ||
      c.status.toLowerCase().includes(query)
    )
  })

  // Group by Year
  const groupedByYear = filteredContracts.reduce((acc, c) => {
    if (!acc[c.year]) acc[c.year] = []
    acc[c.year].push(c)
    return acc
  }, {})

  // Group by Region
  const groupedByRegion = filteredContracts.reduce((acc, c) => {
    if (!acc[c.region]) acc[c.region] = []
    acc[c.region].push(c)
    return acc
  }, {})

  // Sort helper keys
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a)
  const sortedRegions = Object.keys(groupedByRegion).sort()

  const formatPHP = (val) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <div className="sites-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="sites-hero" aria-label="Sites and Contracts page hero">
        <div className="sites-hero__bg" aria-hidden="true" />
        <div className="sites-hero__overlay" aria-hidden="true" />
        <div className="sites-hero__content">
          <nav className="sites-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="sites-breadcrumb__link">Home</a>
            <span className="sites-breadcrumb__sep" aria-hidden="true">›</span>
            <a href="#" className="sites-breadcrumb__link">Accomplishments</a>
            <span className="sites-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="sites-breadcrumb__current">Sites &amp; Contracts</span>
          </nav>
          <h1 className="sites-hero__title">Sites &amp; Contracts</h1>
        </div>
      </header>

      {/* ── Body Content ────────────────────────────────────────────── */}
      <div className="sites-body">
        <main className="sites-container">
          
          {/* ── Project Sites Section ─────────────────────────────────── */}
          <RevealSection className="sites-section">
            <div className="contracts-header-block">
              <h2 className="sites-section__title">Project Sites</h2>
              <p className="contracts-section__subtitle">Click on the pin in the map for information about project site</p>
            </div>
            <div className="map-wrapper">
              <div id="map-container" className="sites-map-element" style={{ height: '500px', width: '100%' }}></div>
            </div>
          </RevealSection>

          {/* ── Contracts Section ─────────────────────────────────────── */}
          <RevealSection className="sites-section contracts-section-container">
            <div className="contracts-header-block">
              <h2 className="sites-section__title">Contracts</h2>
              <p className="contracts-section__subtitle">Click to view contract</p>
            </div>
            
            {/* Tab Controls and Search Bar */}
            <div className="contracts-toolbar">
              <div className="contracts-tabs-wrap">
                <nav className="contracts-tabs" aria-label="Arrange contracts display">
                  <button
                    className={`contracts-tab ${activeTab === 'year' ? 'contracts-tab--active' : ''}`}
                    onClick={() => { setActiveTab('year') }}
                  >
                    ARRANGED BY YEAR
                    <span className="contracts-tab__arrow" aria-hidden="true">▼</span>
                  </button>
                  <button
                    className={`contracts-tab ${activeTab === 'region' ? 'contracts-tab--active' : ''}`}
                    onClick={() => { setActiveTab('region') }}
                  >
                    ARRANGED BY REGION
                    <span className="contracts-tab__arrow" aria-hidden="true">▼</span>
                  </button>
                </nav>
              </div>

              <div className="contracts-search-wrap">
                <input
                  type="search"
                  placeholder="Search contracts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="contracts-search-input"
                  aria-label="Search contracts"
                />
                <button className="contracts-search-btn" aria-label="Submit search">
                  <svg className="contracts-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Table / Details display */}
            <div className="contracts-display">
              {filteredContracts.length === 0 ? (
                <div className="contracts-empty-card">
                  <p>No contracts match your search filter.</p>
                </div>
              ) : activeTab === 'year' ? (
                // Arrange by Year rendering
                sortedYears.map(year => (
                  <div key={year} className="contract-group">
                    <h3 className="contract-group-title">{year} Contracts</h3>
                    <div className="contracts-table-card">
                      <table className="contracts-table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '55%' }}>Contract Name</th>
                            <th scope="col" style={{ width: '12%' }}>Region</th>
                            <th scope="col" style={{ width: '12%' }}>Area (ha)</th>
                            <th scope="col" style={{ width: '18%' }}>Funding Value</th>
                            <th scope="col" style={{ width: '13%', textAlign: 'center' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedByYear[year].map(c => (
                            <tr key={c.id}>
                              <td className="font-semibold">
                                <a href="/Sample Contract.pdf" target="_blank" rel="noopener noreferrer" className="contract-table-link">
                                  {c.name}
                                </a>
                              </td>
                              <td>{c.region}</td>
                              <td>{c.area}</td>
                              <td>{formatPHP(c.value)}</td>
                              <td style={{ textAlign: 'center' }}>
                                <span className={`contract-badge badge--${c.status.toLowerCase().replace(' ', '-')}`}>
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                // Arrange by Region rendering
                sortedRegions.map(region => (
                  <div key={region} className="contract-group">
                    <h3 className="contract-group-title">Region: {region}</h3>
                    <div className="contracts-table-card">
                      <table className="contracts-table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '55%' }}>Contract Name</th>
                            <th scope="col" style={{ width: '12%' }}>Year</th>
                            <th scope="col" style={{ width: '12%' }}>Area (ha)</th>
                            <th scope="col" style={{ width: '18%' }}>Funding Value</th>
                            <th scope="col" style={{ width: '13%', textAlign: 'center' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedByRegion[region].map(c => (
                            <tr key={c.id}>
                              <td className="font-semibold">
                                <a href="/Sample Contract.pdf" target="_blank" rel="noopener noreferrer" className="contract-table-link">
                                  {c.name}
                                </a>
                              </td>
                              <td>{c.year}</td>
                              <td>{c.area}</td>
                              <td>{formatPHP(c.value)}</td>
                              <td style={{ textAlign: 'center' }}>
                                <span className={`contract-badge badge--${c.status.toLowerCase().replace(' ', '-')}`}>
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              )}
            </div>
          </RevealSection>

        </main>
      </div>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
