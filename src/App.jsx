import React from 'react'
import HeroSection from './components/Herosection'
import MissionStats from './components/Missionstats'
import GlobalGrid from './components/Globalgrid'

const App = () => {
  return (
    <main className="relative">
      <GlobalGrid />
    <HeroSection />
    <MissionStats />
    {/* Other sections... */}
  </main>
  )
}

export default App