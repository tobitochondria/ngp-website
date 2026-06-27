import { useState, useEffect, useRef } from 'react'
import CommentForm from '../components/CommentForm'
import './Statistics.css'

// ─── Data definitions ─────────────────────────────────────────────────────────

const rawData = [
  { year: '2011', target: 100000, planted: 128558, acc: '129%', seedlings: 89624121, jobs: 335078, persons: 47868, type: 'ngp' },
  { year: '2012', target: 200000, planted: 221763, acc: '111%', seedlings: 125596730, jobs: 380696, persons: 55146, type: 'ngp' },
  { year: '2013', target: 300000, planted: 333160, acc: '111%', seedlings: 182548862, jobs: 466990, persons: 65198, type: 'ngp' },
  { year: '2014', target: 300000, planted: 334302, acc: '111%', seedlings: 205414639, jobs: 1079792, persons: 152008, type: 'ngp' },
  { year: '2015', target: 350000, planted: 360357, acc: '103%', seedlings: 351014239, jobs: 915729, persons: 123519, type: 'ngp' },
  { year: '2016', target: 247683, planted: 284089, acc: '115%', seedlings: 415564211, jobs: 842792, persons: 114584, type: 'ngp' },
  { year: '2017', target: 193803, planted: 206136, acc: '106%', seedlings: 182185530, jobs: 582070, persons: 84315, type: 'engp' },
  { year: '2018', target: 136466, planted: 141310, acc: '104%', seedlings: 138020616, jobs: 393903, persons: 62375, type: 'engp' },
  { year: '2019', target: 19617, planted: 21925, acc: '110%', seedlings: 25851359, jobs: 268171, persons: 46313, type: 'engp' },
  { year: '2020', target: 46907, planted: 47229, acc: '101%', seedlings: 37206581, jobs: 367195, persons: 55141, type: 'engp' },
  { year: '2021', target: 94667, planted: 95666, acc: '101%', seedlings: 70751170, jobs: 225588, persons: 38547, type: 'engp' },
  { year: '2022', target: 45868, planted: 45997, acc: '100%', seedlings: 34357275, jobs: 284691, persons: 44881, type: 'engp' },
  { year: '2023', target: 13597, planted: 17155, acc: '126%', seedlings: 8642648, jobs: 159750, persons: 34779, type: 'engp' },
  { year: '2024', target: 21462, planted: 18983, acc: '88.45%', seedlings: 10607628, jobs: 202731, persons: 31370, type: 'engp' },
]

const totals = {
  ngp: { target: 1497683, planted: 1662229, acc: '111%', seedlings: 1369762802, jobs: 4021077, persons: 558323 },
  engp: { target: 572387, planted: 594472, acc: '104%', seedlings: 507622807, jobs: 2484099, persons: 397721 },
  combined: { target: 2070070, planted: 2256701, acc: '109%', seedlings: 1877385609, jobs: 6505176, persons: 956044 },
}

// Chart mapping coordinates for lines and plots
const chartCoordinates = {
  // Chart 1
  targetY: [205, 130, 50, 50, 50, 100, 130, 170, 250, 230, 200, 230, 260, 250],
  plantedY: [185, 110, 40, 40, 40, 80, 120, 165, 248, 225, 195, 228, 255, 252],
  // Chart 2
  seedlingsY: [210, 180, 140, 130, 80, 70, 140, 170, 250, 240, 210, 225, 258, 255],
}

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

// Helper to format numbers with commas
const numFmt = (val) => val.toLocaleString()

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('ngp-engp') // 'ngp-engp', 'ngp', 'engp', 'regional', 'current'
  const [searchTerm, setSearchTerm] = useState('')

  // Interactive chart state
  const [hoveredIdx1, setHoveredIdx1] = useState(null)
  const [hoveredIdx2, setHoveredIdx2] = useState(null)
  const [hoveredIdx3, setHoveredIdx3] = useState(null)

  // Filter raw data based on active tab and search term
  const getFilteredRows = () => {
    let list = [...rawData]
    if (activeTab === 'ngp') {
      list = list.filter((r) => r.type === 'ngp')
    } else if (activeTab === 'engp') {
      list = list.filter((r) => r.type === 'engp')
    } else if (activeTab === 'current') {
      list = list.filter((r) => r.year === '2024')
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      list = list.filter(
        (r) =>
          r.year.toLowerCase().includes(term) ||
          r.acc.toLowerCase().includes(term) ||
          numFmt(r.target).includes(term) ||
          numFmt(r.planted).includes(term) ||
          numFmt(r.seedlings).includes(term) ||
          numFmt(r.jobs).includes(term) ||
          numFmt(r.persons).includes(term)
      )
    }
    return list
  }

  const rows = getFilteredRows()

  return (
    <div className="stats-page">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <header className="stats-hero" aria-label="NGP Statistics page hero">
        <div className="stats-hero__bg" aria-hidden="true" />
        <div className="stats-hero__overlay" aria-hidden="true" />
        <div className="stats-hero__content">
          <nav className="stats-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="stats-breadcrumb__link">Home</a>
            <span className="stats-breadcrumb__sep" aria-hidden="true">›</span>
            <a href="#" className="stats-breadcrumb__link">Accomplishments</a>
            <span className="stats-breadcrumb__sep" aria-hidden="true">›</span>
            <span className="stats-breadcrumb__current">Statistics</span>
          </nav>
          <h1 className="stats-hero__title">Statistics</h1>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="stats-container">

        {/* ── Subtitle Block ─────────────────────────────────────────── */}
        <Reveal className="stats-header">
          <h2 className="stats-header__title">
            National Greening Program (NGP)<br />
            and Enhanced National Greening Program (ENGP)<br />
            Accomplishments
          </h2>
          <p className="stats-header__date">as of December 2024</p>
        </Reveal>

        {/* ── Tabs Navigation ────────────────────────────────────────── */}
        <Reveal className="stats-tabs-wrap">
          <nav className="stats-tabs" aria-label="Statistics subsections">
            <button
              className={`stats-tab ${activeTab === 'ngp-engp' ? 'stats-tab--active' : ''}`}
              onClick={() => { setActiveTab('ngp-engp'); setSearchTerm(''); }}
            >
              NGP & ENGP
              <span className="stats-tab__arrow" aria-hidden="true">▼</span>
            </button>
            <button
              className={`stats-tab ${activeTab === 'ngp' ? 'stats-tab--active' : ''}`}
              onClick={() => { setActiveTab('ngp'); setSearchTerm(''); }}
            >
              NGP
              <span className="stats-tab__arrow" aria-hidden="true">▼</span>
            </button>
            <button
              className={`stats-tab ${activeTab === 'engp' ? 'stats-tab--active' : ''}`}
              onClick={() => { setActiveTab('engp'); setSearchTerm(''); }}
            >
              ENGP
              <span className="stats-tab__arrow" aria-hidden="true">▼</span>
            </button>
            <button
              className={`stats-tab ${activeTab === 'regional' ? 'stats-tab--active' : ''}`}
              onClick={() => { setActiveTab('regional'); setSearchTerm(''); }}
            >
              REGIONAL BREAKDOWN
              <span className="stats-tab__arrow" aria-hidden="true">▼</span>
            </button>
            <button
              className={`stats-tab ${activeTab === 'current' ? 'stats-tab--active' : ''}`}
              onClick={() => { setActiveTab('current'); setSearchTerm(''); }}
            >
              CURRENT YEAR
              <span className="stats-tab__arrow" aria-hidden="true">▼</span>
            </button>
          </nav>
        </Reveal>

        {/* ── Tab Content 1: Main Statistics Table (NGP, ENGP, Combined) ─ */}
        {(activeTab === 'ngp-engp' || activeTab === 'ngp' || activeTab === 'engp' || activeTab === 'current') && (
          <Reveal className="stats-content">

            {/* Search Controls */}
            <div className="stats-search-bar">
              <div className="stats-search-wrap">
                <input
                  type="search"
                  placeholder="Search accomplishments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="stats-search-input"
                  aria-label="Search accomplishments table"
                />
                <button className="stats-search-btn" aria-label="Submit search">
                  <svg className="stats-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                <button className="stats-search-arrow-btn" aria-label="Search options">
                  <span className="stats-search-arrow" aria-hidden="true">▼</span>
                </button>
              </div>
            </div>

            {/* Table layout */}
            <div className="stats-table-card">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th scope="col">YEAR</th>
                    <th scope="col">TARGET AREA</th>
                    <th scope="col">AREA PLANTED</th>
                    <th scope="col">% ACCOMP</th>
                    <th scope="col">SEEDLINGS PLANTED</th>
                    <th scope="col">JOBS GENERATED</th>
                    <th scope="col">PERSONS EMPLOYED</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="stats-table__empty">No matching records found.</td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr key={row.year}>
                        <td>{row.year}</td>
                        <td>{numFmt(row.target)}</td>
                        <td>{numFmt(row.planted)}</td>
                        <td className="stats-table__cell--accent">{row.acc}</td>
                        <td>{numFmt(row.seedlings)}</td>
                        <td>{numFmt(row.jobs)}</td>
                        <td>{numFmt(row.persons)}</td>
                      </tr>
                    ))
                  )}

                  {/* Add Row Totals based on Tab (Only when not actively filtering/searching) */}
                  {searchTerm.trim() === '' && (
                    <>
                      {(activeTab === 'ngp-engp' || activeTab === 'ngp') && (
                        <tr className="stats-table__total-row">
                          <td><strong>NGP 2011-2016</strong></td>
                          <td><strong>{numFmt(totals.ngp.target)}</strong></td>
                          <td><strong>{numFmt(totals.ngp.planted)}</strong></td>
                          <td><strong>{totals.ngp.acc}</strong></td>
                          <td><strong>{numFmt(totals.ngp.seedlings)}</strong></td>
                          <td><strong>{numFmt(totals.ngp.jobs)}</strong></td>
                          <td><strong>{numFmt(totals.ngp.persons)}</strong></td>
                        </tr>
                      )}
                      {(activeTab === 'ngp-engp' || activeTab === 'engp') && (
                        <tr className="stats-table__total-row stats-table__total-row--green">
                          <td><strong>ENGP 2017-2024</strong></td>
                          <td><strong>{numFmt(totals.engp.target)}</strong></td>
                          <td><strong>{numFmt(totals.engp.planted)}</strong></td>
                          <td><strong>{totals.engp.acc}</strong></td>
                          <td><strong>{numFmt(totals.engp.seedlings)}</strong></td>
                          <td><strong>{numFmt(totals.engp.jobs)}</strong></td>
                          <td><strong>{numFmt(totals.engp.persons)}</strong></td>
                        </tr>
                      )}
                      {activeTab === 'ngp-engp' && (
                        <tr className="stats-table__total-row">
                          <td><strong>NGP & ENGP TOTAL</strong></td>
                          <td><strong>{numFmt(totals.combined.target)}</strong></td>
                          <td><strong>{numFmt(totals.combined.planted)}</strong></td>
                          <td><strong>{totals.combined.acc}</strong></td>
                          <td><strong>{numFmt(totals.combined.seedlings)}</strong></td>
                          <td><strong>{numFmt(totals.combined.jobs)}</strong></td>
                          <td><strong>{numFmt(totals.combined.persons)}</strong></td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Charts Visualization ───────────────────────────────── */}
            <div className="stats-charts-section">

              {/* Chart 1: TARGET AREA & AREA PLANTED */}
              <div className="stats-chart-card">
                <h3 className="stats-chart-card__title">TARGET AREA & AREA PLANTED</h3>
                <div className="stats-chart-visual">
                  {/* Legend */}
                  <div className="stats-chart-legend">
                    <span className="legend-item"><span className="legend-dot legend-dot--target"></span>Target Area</span>
                    <span className="legend-item"><span className="legend-dot legend-dot--planted"></span>Area Planted</span>
                  </div>

                  {/* Interactive SVG Chart */}
                  <div className="svg-container" style={{ position: 'relative' }}>
                    <svg
                      viewBox="0 0 800 300"
                      className="interactive-chart"
                      onMouseLeave={() => setHoveredIdx1(null)}
                    >
                      {/* Grid lines */}
                      <line x1="50" y1="50" x2="750" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="125" x2="750" y2="125" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="200" x2="750" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="270" x2="750" y2="270" stroke="#e0e0e0" strokeWidth="1.5" />

                      {/* Axes labels */}
                      <text x="15" y="55" className="chart-axis-text">400k</text>
                      <text x="15" y="130" className="chart-axis-text">200k</text>
                      <text x="15" y="205" className="chart-axis-text">100k</text>
                      <text x="15" y="275" className="chart-axis-text">0</text>

                      {/* Line paths (mapped from 2011 to 2024 coordinates) */}
                      <path
                        d="M 60,205 L 110,130 L 160,50 L 210,50 L 260,50 L 310,100 L 360,130 L 410,170 L 460,250 L 510,230 L 560,200 L 610,230 L 660,260 L 710,250"
                        fill="none"
                        stroke="#7d9e7d"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <path
                        d="M 60,185 L 110,110 L 160,40 L 210,40 L 260,40 L 310,80 L 360,120 L 410,165 L 460,248 L 510,225 L 560,195 L 610,228 L 660,255 L 710,252"
                        fill="none"
                        stroke="#2e7d32"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="4 2"
                      />

                      {/* Interactive hover line tracker */}
                      {hoveredIdx1 !== null && (
                        <line
                          x1={60 + hoveredIdx1 * 50}
                          y1="35"
                          x2={60 + hoveredIdx1 * 50}
                          y2="270"
                          stroke="#2e7d32"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Highlight circles on hover */}
                      {hoveredIdx1 !== null && (
                        <>
                          <circle
                            cx={60 + hoveredIdx1 * 50}
                            cy={chartCoordinates.targetY[hoveredIdx1]}
                            r="6"
                            fill="#7d9e7d"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                          <circle
                            cx={60 + hoveredIdx1 * 50}
                            cy={chartCoordinates.plantedY[hoveredIdx1]}
                            r="6"
                            fill="#2e7d32"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                        </>
                      )}

                      {/* Year labels */}
                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <text key={d.year} x={x} y="292" className="chart-label-text" textAnchor="middle">
                            {d.year}
                          </text>
                        )
                      })}

                      {/* Invisible hover zones */}
                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <rect
                            key={d.year}
                            x={x - 25}
                            y="0"
                            width="50"
                            height="300"
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredIdx1(index)}
                          />
                        )
                      })}
                    </svg>

                    {/* Tooltip Overlay */}
                    {hoveredIdx1 !== null && (
                      <div
                        className="stats-chart-tooltip"
                        style={{
                          left: `${(60 + hoveredIdx1 * 50) / 8}%`,
                          top: '15%',
                          transform: hoveredIdx1 > 9 ? 'translateX(-105%)' : 'translateX(5%)',
                        }}
                      >
                        <h4 className="tooltip-year">{rawData[hoveredIdx1].year}</h4>
                        <p className="tooltip-metric target">
                          Target Area: <strong>{numFmt(rawData[hoveredIdx1].target)} ha</strong>
                        </p>
                        <p className="tooltip-metric planted">
                          Area Planted: <strong>{numFmt(rawData[hoveredIdx1].planted)} ha</strong>
                        </p>
                        <p className="tooltip-metric accomp">
                          Accomplishment: <strong>{rawData[hoveredIdx1].acc}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chart 2: SEEDLINGS PLANTED */}
              <div className="stats-chart-card">
                <h3 className="stats-chart-card__title">SEEDLINGS PLANTED</h3>
                <div className="stats-chart-visual">
                  <div className="stats-chart-legend">
                    <span className="legend-item"><span className="legend-dot legend-dot--seedlings"></span>Seedlings</span>
                  </div>

                  {/* Interactive SVG Chart */}
                  <div className="svg-container" style={{ position: 'relative' }}>
                    <svg
                      viewBox="0 0 800 300"
                      className="interactive-chart"
                      onMouseLeave={() => setHoveredIdx2(null)}
                    >
                      {/* Grid lines */}
                      <line x1="50" y1="50" x2="750" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="125" x2="750" y2="125" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="200" x2="750" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="270" x2="750" y2="270" stroke="#e0e0e0" strokeWidth="1.5" />

                      {/* Axes labels */}
                      <text x="15" y="55" className="chart-axis-text">400M</text>
                      <text x="15" y="130" className="chart-axis-text">200M</text>
                      <text x="15" y="205" className="chart-axis-text">100M</text>
                      <text x="15" y="275" className="chart-axis-text">0</text>

                      {/* Seedlings line */}
                      <path
                        d="M 60,210 L 110,180 L 160,140 L 210,130 L 260,80 L 310,70 L 360,140 L 410,170 L 460,250 L 510,240 L 560,210 L 610,225 L 660,258 L 710,255"
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Interactive hover line tracker */}
                      {hoveredIdx2 !== null && (
                        <line
                          x1={60 + hoveredIdx2 * 50}
                          y1="35"
                          x2={60 + hoveredIdx2 * 50}
                          y2="270"
                          stroke="#4caf50"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Highlight circle on hover */}
                      {hoveredIdx2 !== null && (
                        <circle
                          cx={60 + hoveredIdx2 * 50}
                          cy={chartCoordinates.seedlingsY[hoveredIdx2]}
                          r="6.5"
                          fill="#4caf50"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                      )}

                      {/* Year labels */}
                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <text key={d.year} x={x} y="292" className="chart-label-text" textAnchor="middle">
                            {d.year}
                          </text>
                        )
                      })}

                      {/* Invisible hover zones */}
                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <rect
                            key={d.year}
                            x={x - 25}
                            y="0"
                            width="50"
                            height="300"
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredIdx2(index)}
                          />
                        )
                      })}
                    </svg>

                    {/* Tooltip Overlay */}
                    {hoveredIdx2 !== null && (
                      <div
                        className="stats-chart-tooltip"
                        style={{
                          left: `${(60 + hoveredIdx2 * 50) / 8}%`,
                          top: '15%',
                          transform: hoveredIdx2 > 9 ? 'translateX(-105%)' : 'translateX(5%)',
                        }}
                      >
                        <h4 className="tooltip-year">{rawData[hoveredIdx2].year}</h4>
                        <p className="tooltip-metric seedlings">
                          Seedlings Planted: <strong>{numFmt(rawData[hoveredIdx2].seedlings)}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chart 3: JOBS GENERATED & PERSONS EMPLOYED */}
              <div className="stats-chart-card">
                <h3 className="stats-chart-card__title">JOBS GENERATED & PERSONS EMPLOYED</h3>
                <div className="stats-chart-visual">
                  <div className="stats-chart-legend">
                    <span className="legend-item"><span className="legend-dot legend-dot--persons"></span>Persons Employed</span>
                    <span className="legend-item"><span className="legend-dot legend-dot--jobs"></span>Jobs Generated</span>
                  </div>

                  {/* Interactive SVG Chart */}
                  <div className="svg-container" style={{ position: 'relative' }}>
                    <svg
                      viewBox="0 0 800 300"
                      className="interactive-chart"
                      onMouseLeave={() => setHoveredIdx3(null)}
                    >
                      {/* Grid lines */}
                      <line x1="50" y1="50" x2="750" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="125" x2="750" y2="125" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="200" x2="750" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="270" x2="750" y2="270" stroke="#e0e0e0" strokeWidth="1.5" />

                      {/* Axes labels */}
                      <text x="15" y="55" className="chart-axis-text">1.2M</text>
                      <text x="15" y="130" className="chart-axis-text">500K</text>
                      <text x="15" y="205" className="chart-axis-text">100K</text>
                      <text x="15" y="275" className="chart-axis-text">0</text>

                      {/* Interactive hover background tracker band */}
                      {hoveredIdx3 !== null && (
                        <rect
                          x={60 + hoveredIdx3 * 50 - 20}
                          y="35"
                          width="40"
                          height="235"
                          fill="rgba(123, 142, 92, 0.08)"
                          rx="4"
                        />
                      )}

                      {/* Render grouped bar chart */}
                      {rawData.map((d, index) => {
                        const xBase = 60 + index * 50
                        // Map persons employed to height
                        const personsHeight = Math.max(10, (d.persons / 1200000) * 220)
                        const personsY = 270 - personsHeight

                        // Map jobs generated to height
                        const jobsHeight = Math.max(15, (d.jobs / 1200000) * 220)
                        const jobsY = 270 - jobsHeight

                        const isHovered = hoveredIdx3 === index

                        return (
                          <g key={d.year}>
                            {/* Persons Employed (Green-brown bar) */}
                            <rect
                              x={xBase - 12}
                              y={personsY}
                              width="10"
                              height={personsHeight}
                              fill="#7b8e5c"
                              opacity={hoveredIdx3 !== null && !isHovered ? 0.6 : 1}
                              style={{ transition: 'opacity 0.2s' }}
                              rx="1"
                            />
                            {/* Jobs Generated (Grey bar) */}
                            <rect
                              x={xBase}
                              y={jobsY}
                              width="10"
                              height={jobsHeight}
                              fill="#e3e7e8"
                              opacity={hoveredIdx3 !== null && !isHovered ? 0.6 : 1}
                              style={{ transition: 'opacity 0.2s' }}
                              rx="1"
                            />
                          </g>
                        )
                      })}

                      {/* Year labels */}
                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <text key={d.year} x={x} y="292" className="chart-label-text" textAnchor="middle">
                            {d.year}
                          </text>
                        )
                      })}

                      {/* Invisible hover zones */}
                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <rect
                            key={d.year}
                            x={x - 25}
                            y="0"
                            width="50"
                            height="300"
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredIdx3(index)}
                          />
                        )
                      })}
                    </svg>

                    {/* Tooltip Overlay */}
                    {hoveredIdx3 !== null && (
                      <div
                        className="stats-chart-tooltip"
                        style={{
                          left: `${(60 + hoveredIdx3 * 50) / 8}%`,
                          top: '15%',
                          transform: hoveredIdx3 > 9 ? 'translateX(-105%)' : 'translateX(5%)',
                        }}
                      >
                        <h4 className="tooltip-year">{rawData[hoveredIdx3].year}</h4>
                        <p className="tooltip-metric persons">
                          Persons Employed: <strong>{numFmt(rawData[hoveredIdx3].persons)}</strong>
                        </p>
                        <p className="tooltip-metric jobs">
                          Jobs Generated: <strong>{numFmt(rawData[hoveredIdx3].jobs)}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </Reveal>
        )}

        {/* ── Tab Content 2: Regional Breakdown Information ────────── */}
        {activeTab === 'regional' && (
          <Reveal className="stats-empty-state">
            <div className="stats-empty-state__icon">🗺️</div>
            <h3 className="stats-empty-state__title">Regional Breakdown Database</h3>
            <p className="stats-empty-state__text">
              The regional accomplishment datasets are consolidated per calendar year by the respective Regional NGP Coordinators. Detailed geospatial database analysis, including maps and contract details per municipality, are available under the <strong>Maps &amp; Photos</strong> section of the portal.
            </p>
            <a href="/maps/sites" className="stats-empty-state__btn">Go to NGP/ENGP Sites Map</a>
          </Reveal>
        )}

      </main>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
