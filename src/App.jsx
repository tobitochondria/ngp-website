import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import MainContent from './components/MainContent'
import CommentForm from './components/CommentForm'
import Footer from './components/Footer'
import WhatIsEngp from './pages/WhatIsEngp'
import ExpectedOutcome from './pages/ExpectedOutcome'
import Strategies from './pages/Strategies'
import PriorityCommodity from './pages/PriorityCommodity'
import NgpLogo from './pages/NgpLogo'
import Statistics from './pages/Statistics'
import NotFound from './pages/NotFound'
import './App.css'

function HomePage() {
  return (
    <>
      <HeroBanner />
      <MainContent />
      <CommentForm />
    </>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/what-is-engp" element={<WhatIsEngp />} />
        <Route path="/about/expected-outcomes" element={<ExpectedOutcome />} />
        <Route path="/about/strategies" element={<Strategies />} />
        <Route path="/about/priority-commodities" element={<PriorityCommodity />} />
        <Route path="/about/ngp-logo" element={<NgpLogo />} />
        <Route path="/accomplishments/statistics" element={<Statistics />} />
        <Route path="/accomplishments/sites-contracts" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
