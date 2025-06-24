import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Sigin from './pages/Sigin'
import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'
import ResourceLibrary from './pages/ResourceLibrary'
import Dashboard from './pages/Dashboard'
import Layout from './component/Dashboard/Layout'



export default function App() {
  return (
    <div>
 
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Sigin />} />
        <Route path='/dashboard'  element={<Layout/>} />
       </Routes>
        
       {/* <ResourceLibrary/>
      <Sidebar/>
      <Signup/>
      <Sigin/>
      <TripPlanner/> */}

    </div>
  )
}
