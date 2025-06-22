import React from 'react'
import Signup from './pages/Signup'
import Sigin from './pages/Sigin'
import Header from './component/Header/header'
import Sidebar from './component/Sidebar/sidebar'
import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'

export default function App() {
  return (
    <div>
        <Home/>
      <Header/>
      <Sidebar/>
      <Signup/>
      <Sigin/>
      <TripPlanner/>
    </div>
  )
}
