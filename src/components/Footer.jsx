import './Footer.css'

const bureaus = [
  'Biodiversity Management Bureau',
  'Environmental Management Bureau',
  'Ecosystems Research and Development Bureau',
  'Forest Management Bureau',
  'Land Management Bureau',
  'Mines and Geosciences Bureau',
]

const attachedAgencies = [
  'Laguna Lake Development Authority',
  'National Mapping and Resource Information Authority',
  'Natural Resources Development Corporation',
  'National Water Resources Board',
  'Palawan Council for Sustainable Development',
  'Philippine Mining Development Corporation',
]

const govLinks = [
  'Office of the President',
  'Office of the Vice President',
  'Senate of the Philippines',
  'House of Representatives',
  'Supreme Court',
  'Court of Appeals',
  'Sandiganbayan',
]

function ScrollToTop() {
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <button
      id="scroll-to-top-btn"
      className="footer__scroll-top"
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      {/* ── Upper Footer ── */}
      <div className="footer__upper">
        <div className="footer__upper-inner">

          {/* Office Column */}
          <div className="footer__col footer__col--office">
            <h3 className="footer__col-title">OUR OFFICE</h3>
            <p className="footer__office-address">
              1st Floor FMB Annex Bldg., Visayas Avenue, Diliman, 1100 Quezon City,
              Philippines.
            </p>
            <div className="footer__office-logos" aria-label="Agency logos">
              <img src="/denr-logo.svg" alt="DENR" className="footer__office-logo" />
              <img src="/fmb-logo.png"  alt="FMB"  className="footer__office-logo" />
              <img src="/ngp-logo.png"  alt="NGP"  className="footer__office-logo" />
            </div>
          </div>

          {/* Bureaus Column */}
          <div className="footer__col">
            <h3 className="footer__col-title">BUREAUS</h3>
            <ul className="footer__list">
              {bureaus.map((b) => (
                <li key={b}><a href="#" className="footer__list-link">{b}</a></li>
              ))}
            </ul>
          </div>

          {/* Attached Agencies Column */}
          <div className="footer__col">
            <h3 className="footer__col-title">ATTACHED AGENCIES</h3>
            <ul className="footer__list">
              {attachedAgencies.map((a) => (
                <li key={a}><a href="#" className="footer__list-link">{a}</a></li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Lower Footer ── */}
      <div className="footer__lower">
        <div className="footer__lower-inner">

          {/* Gov Seal */}
          <div className="footer__gov-seal" aria-hidden="true">
            <img src="/govph-seal-mono-footer.jpg" alt="Republic of the Philippines seal" />
          </div>

          {/* Republic Column */}
          <div className="footer__gov-col">
            <p className="footer__gov-title">REPUBLIC OF THE PHILIPPINES</p>
            <p className="footer__gov-text">
              All content is in the public domain unless otherwise stated.
            </p>
          </div>

          {/* About GOVPH Column */}
          <div className="footer__gov-col">
            <p className="footer__gov-title">ABOUT GOVPH</p>
            <p className="footer__gov-text">
              Learn more about the Philippine government, its structure, how government
              works and the people behind it.
            </p>
            <ul className="footer__gov-links">
              <li><a href="https://www.gov.ph/" target="_blank" rel="noreferrer" className="footer__gov-link">GOVPH</a></li>
              <li><a href="https://data.gov.ph/" target="_blank" rel="noreferrer" className="footer__gov-link">Open Data Portal</a></li>
              <li><a href="https://www.officialgazette.gov.ph/" target="_blank" rel="noreferrer" className="footer__gov-link">Official Gazette</a></li>
            </ul>
          </div>

          {/* Government Links Column */}
          <div className="footer__gov-col">
            <p className="footer__gov-title">GOVERNMENT LINKS</p>
            <ul className="footer__gov-links">
              {govLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="footer__gov-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <ScrollToTop />
    </footer>
  )
}
