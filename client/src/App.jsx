import React from 'react'
import Signup from './pages/Signup'
import Sigin from './pages/Sigin'
import Header from './component/Header/header'
import Sidebar from './component/Sidebar/sidebar'
import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'
import ResourceLibrary from './pages/ResourceLibrary'


export default function App() {
  return (
    <div>

        <Home/>
        <ResourceLibrary/>
      <Header/>
      <Sidebar/>
      <Signup/>
      <Sigin/>
      <TripPlanner/>

    </div>
  )
}
