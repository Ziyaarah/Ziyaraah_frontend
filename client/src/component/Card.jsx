import React from 'react'
import { CalendarMinus2 } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Users } from 'lucide-react';


export default function Card() {
  return (

    <div className="p-8 grid grid-cols-4 gap-6">
      {/* <div>
    <h1>Everything You Need For Your Sacred Journey</h1>
      <p>comprehensive tools and resources to help you prepare spiritually and practically.</p>
      </div> */}
      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="text-5xl bg-blue-600 text-white p-2 rounded-md"><CalendarMinus2 /></div>
        <h1 className="text-xl font-semibold mt-4">Trip Planning</h1>
        <p className="text-gray-600 mt-2 text-center">
          Organize your journey with details stage-by-stage Planning and comprehensive  checklists.
        </p>
      </div>

      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="text-5xl bg-green-700 text-white p-2 rounded-md"> <CircleCheckBig /></div>
        <h1 className="text-xl font-semibold mt-4">Ritual Tracker</h1>
        <p className="text-gray-600 mt-2 text-center">
          Track mandatory and sunnah ritual with guided completion checklists and reminders.
        </p>
      </div>

      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="text-5xl bg-yellow-500 text-white p-2 rounded-md"> <BookOpen  /></div>
        <h1 className="text-xl font-semibold mt-4">Learning Resources</h1>
        <p className="text-gray-600 mt-2 text-center">
          Access authentic Islamic resources and educational materials  for each journey stage
        </p>
      </div>

      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
       <div className="text-5xl bg-orange-500 text-white p-2 rounded-md"> <Users /></div>
        <h1 className="text-xl font-semibold mt-4">Personal Dashboard </h1>
        <p className="text-gray-600 mt-2 text-center">
          montors your prograss  with detalled insights and daily spiritual inspiration.
        </p>
      </div>

    </div>
  )
}




