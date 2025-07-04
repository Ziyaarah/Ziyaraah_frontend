import React from 'react'
import Signup from './pages/Signup'
import Sigin from './pages/Sigin'
import Header from './component/Header/header'
import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'
import ResourceLibrary from './pages/ResourceLibrary'
import RitualTracker from './pages/RitualTracker'


export default function App() {
  return (
    <div>

        <Home/>
        <ResourceLibrary/>
      <Header/>
      <Signup/>
      <Sigin/>
      <TripPlanner/>
      <RitualTracker/>

    </div>
  )
}
