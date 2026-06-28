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

const regionalData = [
  { region: 'NCR', data: {
    2011: { planted: 330, seedlings: 164895 },
    2012: { planted: 916, seedlings: 228888 },
    2013: { planted: 801, seedlings: 60045 },
    2014: { planted: 51, seedlings: 34310 },
    2015: { planted: 89, seedlings: 50817 },
    2016: { planted: 372, seedlings: 190937 }
  }},
  { region: 'CAR', data: {
    2011: { planted: 6807, seedlings: 3481222 },
    2012: { planted: 9464, seedlings: 4778184 },
    2013: { planted: 20414, seedlings: 9963593 },
    2014: { planted: 24180, seedlings: 12391491 },
    2015: { planted: 17558, seedlings: 10552695 },
    2016: { planted: 13525, seedlings: 22531070 }
  }, chart: { target: 24200, planted: 24180, seedlings: 12391491, label: 'CAR' }},
  { region: 'Region 1', data: {
    2011: { planted: 5080, seedlings: 2547110 },
    2012: { planted: 7424, seedlings: 3993867 },
    2013: { planted: 12851, seedlings: 9753439 },
    2014: { planted: 13396, seedlings: 9826923 },
    2015: { planted: 16995, seedlings: 17536433 },
    2016: { planted: 6305, seedlings: 9743862 }
  }},
  { region: 'Region 2', data: {
    2011: { planted: 4303, seedlings: 2077688 },
    2012: { planted: 6777, seedlings: 3429060 },
    2013: { planted: 15320, seedlings: 7732366 },
    2014: { planted: 15060, seedlings: 7860551 },
    2015: { planted: 18458, seedlings: 15579230 },
    2016: { planted: 9770, seedlings: 16273231 }
  }, chart: { target: 15150, planted: 15060, seedlings: 7860551, label: 'R2' }},
  { region: 'Region 3', data: {
    2011: { planted: 5740, seedlings: 2867953 },
    2012: { planted: 8447, seedlings: 3925789 },
    2013: { planted: 19825, seedlings: 9538622 },
    2014: { planted: 22343, seedlings: 12045165 },
    2015: { planted: 20613, seedlings: 13715943 },
    2016: { planted: 12736, seedlings: 20790189 }
  }, chart: { target: 22400, planted: 22343, seedlings: 12045165, label: 'R3' }},
  { region: 'Region 4A', data: {
    2011: { planted: 5679, seedlings: 3412661 },
    2012: { planted: 8907, seedlings: 5353775 },
    2013: { planted: 22332, seedlings: 15811733 },
    2014: { planted: 21535, seedlings: 12192725 },
    2015: { planted: 22009, seedlings: 19322350 },
    2016: { planted: 20821, seedlings: 25154557 }
  }},
  { region: 'Region 4B', data: {
    2011: { planted: 5150, seedlings: 2475495 },
    2012: { planted: 6045, seedlings: 1930537 },
    2013: { planted: 15894, seedlings: 9167726 },
    2014: { planted: 19160, seedlings: 10230696 },
    2015: { planted: 27040, seedlings: 12750081 },
    2016: { planted: 19336, seedlings: 32213951 }
  }},
  { region: 'Region 5', data: {
    2011: { planted: 6320, seedlings: 4065005 },
    2012: { planted: 7559, seedlings: 4072053 },
    2013: { planted: 22096, seedlings: 13462675 },
    2014: { planted: 20500, seedlings: 12517681 },
    2015: { planted: 26899, seedlings: 6136190 },
    2016: { planted: 9482, seedlings: 10600486 }
  }, chart: { target: 20600, planted: 20500, seedlings: 12517681, label: 'R5' }},
  { region: 'Region 6', data: {
    2011: { planted: 3963, seedlings: 2028746 },
    2012: { planted: 8324, seedlings: 4364595 },
    2013: { planted: 11143, seedlings: 6275913 },
    2014: { planted: 12108, seedlings: 7688614 },
    2015: { planted: 16694, seedlings: 10879899 },
    2016: { planted: 12276, seedlings: 20500879 }
  }},
  { region: 'Region 7', data: {
    2011: { planted: 5732, seedlings: 4035568 },
    2012: { planted: 6980, seedlings: 5566449 },
    2013: { planted: 25578, seedlings: 14485982 },
    2014: { planted: 18205, seedlings: 11216138 },
    2015: { planted: 20428, seedlings: 13779616 },
    2016: { planted: 15191, seedlings: 25323780 }
  }, chart: { target: 18500, planted: 18205, seedlings: 11216138, label: 'R7' }},
  { region: 'Region 8', data: {
    2011: { planted: 8105, seedlings: 3984801 },
    2012: { planted: 8145, seedlings: 4077075 },
    2013: { planted: 10516, seedlings: 7577250 },
    2014: { planted: 19311, seedlings: 14829272 },
    2015: { planted: 32587, seedlings: 10682834 },
    2016: { planted: 16846, seedlings: 26085213 }
  }, chart: { target: 19500, planted: 19311, seedlings: 14829272, label: 'R8' }},
  { region: 'Region 9', data: {
    2011: { planted: 4806, seedlings: 2306424 },
    2012: { planted: 6058, seedlings: 3040455 },
    2013: { planted: 20998, seedlings: 10494740 },
    2014: { planted: 19160, seedlings: 12132425 },
    2015: { planted: 29328, seedlings: 15987815 },
    2016: { planted: 20675, seedlings: 25765250 }
  }, chart: { target: 19300, planted: 19160, seedlings: 12132425, label: '9' }},
  { region: 'Region 10', data: {
    2011: { planted: 4336, seedlings: 2151270 },
    2012: { planted: 8235, seedlings: 4513160 },
    2013: { planted: 13886, seedlings: 7118500 },
    2014: { planted: 14128, seedlings: 6807796 },
    2015: { planted: 12586, seedlings: 9598993 },
    2016: { planted: 21648, seedlings: 36057729 }
  }, chart: { target: 14200, planted: 14128, seedlings: 6807796, label: 'R10' }},
  { region: 'Region 11', data: {
    2011: { planted: 5634, seedlings: 2867000 },
    2012: { planted: 6250, seedlings: 3135499 },
    2013: { planted: 16855, seedlings: 8435010 },
    2014: { planted: 16224, seedlings: 8821866 },
    2015: { planted: 15935, seedlings: 9345315 },
    2016: { planted: 10920, seedlings: 17873301 }
  }, chart: { target: 16400, planted: 16224, seedlings: 8821866, label: 'R11' }},
  { region: 'Region 12', data: {
    2011: { planted: 5353, seedlings: 2722979 },
    2012: { planted: 8759, seedlings: 4404426 },
    2013: { planted: 15864, seedlings: 7909055 },
    2014: { planted: 15935, seedlings: 9345315 },
    2015: { planted: 16162, seedlings: 9647238 },
    2016: { planted: 31154, seedlings: 51901974 }
  }, chart: { target: 16100, planted: 15935, seedlings: 9345315, label: 'R12' }},
  { region: 'Region 13', data: {
    2011: { planted: 4979, seedlings: 2508797 },
    2012: { planted: 7821, seedlings: 4787068 },
    2013: { planted: 12147, seedlings: 5828848 },
    2014: { planted: 16162, seedlings: 8647238 },
    2015: { planted: 21101, seedlings: 12119900 },
    2016: { planted: 30510, seedlings: 44297276 }
  }, chart: { target: 16300, planted: 16162, seedlings: 8647238, label: 'R13' }}
]

const regionalGrandTotals = {
  2011: { planted: 128559, seedlings: 89624121 },
  2012: { planted: 221763, seedlings: 125596730 },
  2013: { planted: 333160, seedlings: 182548862 },
  2014: { planted: 334302, seedlings: 205414839 },
  2015: { planted: 360357, seedlings: 351014239 },
  2016: { planted: 284089, seedlings: 415564211 }
}

const chartCoordinates = {
  targetY: [205, 130, 50, 50, 50, 100, 130, 170, 250, 230, 200, 230, 260, 250],
  plantedY: [185, 110, 40, 40, 40, 80, 120, 165, 248, 225, 195, 228, 255, 252],
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

const numFmt = (val) => val.toLocaleString()

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('ngp-engp')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [hoveredIdx1, setHoveredIdx1] = useState(null)
  const [hoveredIdx2, setHoveredIdx2] = useState(null)
  const [hoveredIdx3, setHoveredIdx3] = useState(null)
  const [hoveredRegIdx, setHoveredRegIdx] = useState(null)

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

  const getFilteredRegionalRows = () => {
    let list = [...regionalData]
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      list = list.filter((r) => r.region.toLowerCase().includes(term))
    }
    return list
  }

  const rows = getFilteredRows()
  const regRows = getFilteredRegionalRows()

  // Filter out elements that don't have chart info defined
  const regionalChartData = regionalData.filter((r) => r.chart)

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
                  <div className="stats-chart-legend">
                    <span className="legend-item"><span className="legend-dot legend-dot--target"></span>Target Area</span>
                    <span className="legend-item"><span className="legend-dot legend-dot--planted"></span>Area Planted</span>
                  </div>
                  
                  <div className="svg-container" style={{ position: 'relative' }}>
                    <svg
                      viewBox="0 0 800 300"
                      className="interactive-chart"
                      onMouseLeave={() => setHoveredIdx1(null)}
                    >
                      <line x1="50" y1="50" x2="750" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="125" x2="750" y2="125" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="200" x2="750" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="270" x2="750" y2="270" stroke="#e0e0e0" strokeWidth="1.5" />
                      
                      <text x="15" y="55" className="chart-axis-text">400k</text>
                      <text x="15" y="130" className="chart-axis-text">200k</text>
                      <text x="15" y="205" className="chart-axis-text">100k</text>
                      <text x="15" y="275" className="chart-axis-text">0</text>
                      
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

                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <text key={d.year} x={x} y="292" className="chart-label-text" textAnchor="middle">
                            {d.year}
                          </text>
                        )
                      })}

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
                  
                  <div className="svg-container" style={{ position: 'relative' }}>
                    <svg
                      viewBox="0 0 800 300"
                      className="interactive-chart"
                      onMouseLeave={() => setHoveredIdx2(null)}
                    >
                      <line x1="50" y1="50" x2="750" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="125" x2="750" y2="125" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="200" x2="750" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="270" x2="750" y2="270" stroke="#e0e0e0" strokeWidth="1.5" />
                      
                      <text x="15" y="55" className="chart-axis-text">400M</text>
                      <text x="15" y="130" className="chart-axis-text">200M</text>
                      <text x="15" y="205" className="chart-axis-text">100M</text>
                      <text x="15" y="275" className="chart-axis-text">0</text>
                      
                      <path
                        d="M 60,210 L 110,180 L 160,140 L 210,130 L 260,80 L 310,70 L 360,140 L 410,170 L 460,250 L 510,240 L 560,210 L 610,225 L 660,258 L 710,255"
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      
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

                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <text key={d.year} x={x} y="292" className="chart-label-text" textAnchor="middle">
                            {d.year}
                          </text>
                        )
                      })}

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
                  
                  <div className="svg-container" style={{ position: 'relative' }}>
                    <svg
                      viewBox="0 0 800 300"
                      className="interactive-chart"
                      onMouseLeave={() => setHoveredIdx3(null)}
                    >
                      <line x1="50" y1="50" x2="750" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="125" x2="750" y2="125" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="200" x2="750" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="270" x2="750" y2="270" stroke="#e0e0e0" strokeWidth="1.5" />
                      
                      <text x="15" y="55" className="chart-axis-text">1.2M</text>
                      <text x="15" y="130" className="chart-axis-text">500K</text>
                      <text x="15" y="205" className="chart-axis-text">100K</text>
                      <text x="15" y="275" className="chart-axis-text">0</text>
                      
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

                      {rawData.map((d, index) => {
                        const xBase = 60 + index * 50
                        const personsHeight = Math.max(10, (d.persons / 1200000) * 220)
                        const personsY = 270 - personsHeight
                        
                        const jobsHeight = Math.max(15, (d.jobs / 1200000) * 220)
                        const jobsY = 270 - jobsHeight
                        
                        const isHovered = hoveredIdx3 === index
                        
                        return (
                          <g key={d.year}>
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
                      
                      {rawData.map((d, index) => {
                        const x = 60 + index * 50
                        return (
                          <text key={d.year} x={x} y="292" className="chart-label-text" textAnchor="middle">
                            {d.year}
                          </text>
                        )
                      })}

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

        {/* ── Tab Content 2: Regional Breakdown ─────────────────────── */}
        {activeTab === 'regional' && (
          <Reveal className="stats-content">

            {/* Search Controls */}
            <div className="stats-search-bar">
              <div className="stats-search-wrap">
                <input
                  type="search"
                  placeholder="Search region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="stats-search-input"
                  aria-label="Search regional accomplishments table"
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

            {/* Table layout (Regional Breakdown) */}
            <div className="stats-table-card stats-table-card--regional">
              <table className="stats-table stats-table--regional-data">
                <thead>
                  <tr>
                    <th scope="col" rowSpan="2" style={{ textAlign: 'left', verticalAlign: 'middle', borderRight: '1px solid #ccc' }}>Region</th>
                    <th scope="col" colSpan="2" style={{ textAlign: 'center', borderRight: '1px solid #ccc' }}>2011</th>
                    <th scope="col" colSpan="2" style={{ textAlign: 'center', borderRight: '1px solid #ccc' }}>2012</th>
                    <th scope="col" colSpan="2" style={{ textAlign: 'center', borderRight: '1px solid #ccc' }}>2013</th>
                    <th scope="col" colSpan="2" style={{ textAlign: 'center', borderRight: '1px solid #ccc' }}>2014</th>
                    <th scope="col" colSpan="2" style={{ textAlign: 'center', borderRight: '1px solid #ccc' }}>2015</th>
                    <th scope="col" colSpan="2" style={{ textAlign: 'center' }}>2016</th>
                  </tr>
                  <tr>
                    <th scope="col">Area Planted</th>
                    <th scope="col" style={{ borderRight: '1px solid #ccc' }}>Seedlings Planted</th>
                    <th scope="col">Area Planted</th>
                    <th scope="col" style={{ borderRight: '1px solid #ccc' }}>Seedlings Planted</th>
                    <th scope="col">Area Planted</th>
                    <th scope="col" style={{ borderRight: '1px solid #ccc' }}>Seedlings Planted</th>
                    <th scope="col">Area Planted</th>
                    <th scope="col" style={{ borderRight: '1px solid #ccc' }}>Seedlings Planted</th>
                    <th scope="col">Area Planted</th>
                    <th scope="col" style={{ borderRight: '1px solid #ccc' }}>Seedlings Planted</th>
                    <th scope="col">Area Planted</th>
                    <th scope="col">Seedlings Planted</th>
                  </tr>
                </thead>
                <tbody>
                  {regRows.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="stats-table__empty">No matching records found.</td>
                    </tr>
                  ) : (
                    regRows.map((row) => (
                      <tr key={row.region}>
                        <td style={{ textAlign: 'left', fontWeight: 'bold', borderRight: '1px solid #e0e0e0' }}>{row.region}</td>
                        
                        {/* 2011 */}
                        <td>{numFmt(row.data[2011].planted)}</td>
                        <td style={{ borderRight: '1px solid #e0e0e0' }}>{numFmt(row.data[2011].seedlings)}</td>
                        
                        {/* 2012 */}
                        <td>{numFmt(row.data[2012].planted)}</td>
                        <td style={{ borderRight: '1px solid #e0e0e0' }}>{numFmt(row.data[2012].seedlings)}</td>
                        
                        {/* 2013 */}
                        <td>{numFmt(row.data[2013].planted)}</td>
                        <td style={{ borderRight: '1px solid #e0e0e0' }}>{numFmt(row.data[2013].seedlings)}</td>
                        
                        {/* 2014 */}
                        <td>{numFmt(row.data[2014].planted)}</td>
                        <td style={{ borderRight: '1px solid #e0e0e0' }}>{numFmt(row.data[2014].seedlings)}</td>
                        
                        {/* 2015 */}
                        <td>{numFmt(row.data[2015].planted)}</td>
                        <td style={{ borderRight: '1px solid #e0e0e0' }}>{numFmt(row.data[2015].seedlings)}</td>
                        
                        {/* 2016 */}
                        <td>{numFmt(row.data[2016].planted)}</td>
                        <td>{numFmt(row.data[2016].seedlings)}</td>
                      </tr>
                    ))
                  )}

                  {/* Regional Grand Totals */}
                  {searchTerm.trim() === '' && (
                    <tr className="stats-table__total-row stats-table__total-row--green">
                      <td style={{ textAlign: 'left', fontWeight: 'bold', borderRight: '1px solid #2e7d32' }}>GRAND TOTAL</td>
                      
                      {/* 2011 */}
                      <td><strong>{numFmt(regionalGrandTotals[2011].planted)}</strong></td>
                      <td style={{ borderRight: '1px solid #2e7d32' }}><strong>{numFmt(regionalGrandTotals[2011].seedlings)}</strong></td>
                      
                      {/* 2012 */}
                      <td><strong>{numFmt(regionalGrandTotals[2012].planted)}</strong></td>
                      <td style={{ borderRight: '1px solid #2e7d32' }}><strong>{numFmt(regionalGrandTotals[2012].seedlings)}</strong></td>
                      
                      {/* 2013 */}
                      <td><strong>{numFmt(regionalGrandTotals[2013].planted)}</strong></td>
                      <td style={{ borderRight: '1px solid #2e7d32' }}><strong>{numFmt(regionalGrandTotals[2013].seedlings)}</strong></td>
                      
                      {/* 2014 */}
                      <td><strong>{numFmt(regionalGrandTotals[2014].planted)}</strong></td>
                      <td style={{ borderRight: '1px solid #2e7d32' }}><strong>{numFmt(regionalGrandTotals[2014].seedlings)}</strong></td>
                      
                      {/* 2015 */}
                      <td><strong>{numFmt(regionalGrandTotals[2015].planted)}</strong></td>
                      <td style={{ borderRight: '1px solid #2e7d32' }}><strong>{numFmt(regionalGrandTotals[2015].seedlings)}</strong></td>
                      
                      {/* 2016 */}
                      <td><strong>{numFmt(regionalGrandTotals[2016].planted)}</strong></td>
                      <td><strong>{numFmt(regionalGrandTotals[2016].seedlings)}</strong></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Regional Visualizations */}
            <div className="stats-charts-section">
              <div className="stats-chart-card">
                <h3 className="stats-chart-card__title">REGIONAL TARGET AREA, AREA PLANTED &amp; SEEDLINGS PLANTED</h3>
                <div className="stats-chart-visual">
                  <div className="stats-chart-legend">
                    <span className="legend-item"><span className="legend-dot legend-dot--reg-target"></span>Target Area</span>
                    <span className="legend-item"><span className="legend-dot legend-dot--reg-planted"></span>Area Planted</span>
                    <span className="legend-item"><span className="legend-dot legend-dot--reg-seedlings"></span>Seedlings Planted</span>
                  </div>
                  
                  <div className="svg-container" style={{ position: 'relative' }}>
                    <svg
                      viewBox="0 0 850 320"
                      className="interactive-chart"
                      onMouseLeave={() => setHoveredRegIdx(null)}
                    >
                      <line x1="50" y1="50" x2="810" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="125" x2="810" y2="125" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="200" x2="810" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                      <line x1="50" y1="270" x2="810" y2="270" stroke="#e0e0e0" strokeWidth="1.5" />
                      
                      <text x="15" y="55" className="chart-axis-text">15M</text>
                      <text x="15" y="130" className="chart-axis-text">5M</text>
                      <text x="15" y="205" className="chart-axis-text">1M</text>
                      <text x="15" y="275" className="chart-axis-text">0</text>
                      
                      {hoveredRegIdx !== null && (
                        <rect
                          x={70 + hoveredRegIdx * 65 - 28}
                          y="35"
                          width="56"
                          height="235"
                          fill="rgba(46, 125, 50, 0.06)"
                          rx="4"
                        />
                      )}

                      {/* Render grouped bar chart for regions */}
                      {regionalChartData.map((d, index) => {
                        const xBase = 70 + index * 65
                        
                        // Map coordinates based on mock scales
                        const targetHeight = Math.max(10, (d.chart.target / 30000) * 160)
                        const targetY = 270 - targetHeight
                        
                        const plantedHeight = Math.max(10, (d.chart.planted / 30000) * 160)
                        const plantedY = 270 - plantedHeight
                        
                        const seedlingsHeight = Math.max(15, (d.chart.seedlings / 25000000) * 220)
                        const seedlingsY = 270 - seedlingsHeight
                        
                        const isHovered = hoveredRegIdx === index
                        
                        return (
                          <g key={d.region}>
                            {/* Target Area (Green-brown bar) */}
                            <rect
                              x={xBase - 16}
                              y={targetY}
                              width="9"
                              height={targetHeight}
                              fill="#7b8e5c"
                              opacity={hoveredRegIdx !== null && !isHovered ? 0.6 : 1}
                              style={{ transition: 'opacity 0.2s' }}
                              rx="1"
                            />
                            {/* Area Planted (Green bar) */}
                            <rect
                              x={xBase - 5}
                              y={plantedY}
                              width="9"
                              height={plantedHeight}
                              fill="#2e7d32"
                              opacity={hoveredRegIdx !== null && !isHovered ? 0.6 : 1}
                              style={{ transition: 'opacity 0.2s' }}
                              rx="1"
                            />
                            {/* Seedlings Planted (Light grey/purple bar) */}
                            <rect
                              x={xBase + 6}
                              y={seedlingsY}
                              width="9"
                              height={seedlingsHeight}
                              fill="#d1d9e6"
                              opacity={hoveredRegIdx !== null && !isHovered ? 0.6 : 1}
                              style={{ transition: 'opacity 0.2s' }}
                              rx="1"
                            />
                          </g>
                        )
                      })}
                      
                      {/* X Axis Labels */}
                      {regionalChartData.map((d, index) => {
                        const x = 70 + index * 65
                        return (
                          <text key={d.region} x={x} y="292" className="chart-label-text" textAnchor="middle">
                            {d.chart.label}
                          </text>
                        )
                      })}

                      {/* Invisible hover zones */}
                      {regionalChartData.map((d, index) => {
                        const x = 70 + index * 65
                        return (
                          <rect
                            key={d.region}
                            x={x - 30}
                            y="0"
                            width="60"
                            height="300"
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredRegIdx(index)}
                          />
                        )
                      })}
                    </svg>

                    {/* Tooltip Overlay */}
                    {hoveredRegIdx !== null && (
                      <div
                        className="stats-chart-tooltip"
                        style={{
                          left: `${(70 + hoveredRegIdx * 65) / 8.5}%`,
                          top: '15%',
                          transform: hoveredRegIdx > 7 ? 'translateX(-105%)' : 'translateX(5%)',
                        }}
                      >
                        <h4 className="tooltip-year">{regionalChartData[hoveredRegIdx].region}</h4>
                        <p className="tooltip-metric target">
                          Target Area: <strong>{numFmt(regionalChartData[hoveredRegIdx].chart.target)} ha</strong>
                        </p>
                        <p className="tooltip-metric planted">
                          Area Planted: <strong>{numFmt(regionalChartData[hoveredRegIdx].chart.planted)} ha</strong>
                        </p>
                        <p className="tooltip-metric seedlings">
                          Seedlings: <strong>{numFmt(regionalChartData[hoveredRegIdx].chart.seedlings)}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </Reveal>
        )}

      </main>

      {/* ── Comment Form ─────────────────────────────────────────────── */}
      <CommentForm />

    </div>
  )
}
