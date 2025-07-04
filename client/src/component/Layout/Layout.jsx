import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../../pages/Dashboard';
import TripPlanner from '../../pages/TripPlanner';



export default function Layout() {
  return (
   <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet /> {/* 
        This is where child routes will render */}
      </main>

      
    </div>
  )

}


