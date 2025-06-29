import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../../pages/Header';
import Journey from '../../pages/Journey';
import QuickLinks from '../../pages/QuickLink';
import SummaryCards from '../../pages/SummaryCard';




export default function Layout() {
  return (
   <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet /> {/* 
        This is where child routes will render */}
       <Dashboard />
       <SummaryCards/>
       <Journey/>
       <QuickLinks/>
       
     
       
      </main>
    </div>
  )

}


