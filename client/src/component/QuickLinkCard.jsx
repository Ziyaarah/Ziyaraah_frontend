import React from 'react'
import { CalendarMinus2, BookOpen, Users, Star } from 'lucide-react';


export default function QuickLinkCard() {
  return (
    <div className="p-8 grid grid-cols-4 gap-6">

      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="text-5xl bg-blue-600 text-white p-2 rounded-md"><CalendarMinus2 /></div>
        <h1 className="text-xl font-semibold mt-4">Prayer Times</h1>
        <p className="text-gray-600 mt-2 text-center">
          Daily Prayer schedule and reminders.
        </p>
      </div>

      
      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="text-5xl bg-yellow-500 text-white p-2 rounded-md"> <BookOpen  /></div>
        <h1 className="text-xl font-semibold mt-4"> Quran Study</h1>
        <p className="text-gray-600 mt-2 text-center">
          Daily reverse and interpretation.
        </p>
      </div>

      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
       <div className="text-5xl bg-orange-500 text-white p-2 rounded-md"> <Users /></div>
        <h1 className="text-xl font-semibold mt-4">Community </h1>
        <p className="text-gray-600 mt-2 text-center">
          connect with fellow believers.
        </p>
      </div>

      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="text-5xl bg-green-700 text-white p-2 rounded-md">  <Star /></div>
        <h1 className="text-xl font-semibold mt-4">Events</h1>
        <p className="text-gray-600 mt-2 text-center">
          Upcoming Community gatherings .
        </p>
      </div>

    </div>
  )
}




