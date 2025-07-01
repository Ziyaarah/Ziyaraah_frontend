import React from 'react'
import Card from '../component/Card'
import QuickLinkCard from '../component/QuickLinkCard'
import Footer from '../component/Footer'
import PilgrimageOptions from '../component/pilgrimage'
import Hero from '../component/Hero'
import Navbar from '../component/Navbar'


export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
       <Card/>
       <PilgrimageOptions />
       <QuickLinkCard/>
      <Footer/>
    </div>
         

  )
}

