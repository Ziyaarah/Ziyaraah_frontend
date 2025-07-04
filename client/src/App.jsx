import React from 'react'
import Signup from './pages/Signup'
import Sidebar from './component/Sidebar/sidebar'
import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'
import ResourceLibrary from './pages/ResourceLibrary'
import SignIn from './pages/SignIn'


export default function App() {
  return (
    <div>

        <Home/>
      <Sidebar/>
      <Signup/>
      <SignIn />
      <TripPlanner/>

    </div>
  )
}
