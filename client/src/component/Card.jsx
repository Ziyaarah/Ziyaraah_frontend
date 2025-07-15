import React from 'react'
import { CalendarMinus2, CircleCheckBig, BookOpen, Users } from 'lucide-react';

export default function Card() {
  return (
    <div className='mb-14'>
      {/* Header Section */}
      <div className="px-4 md:px-8 text-center font-semibold mb-6">
        <h1 className='text-xl sm:text-2xl font-bold mb-2'>
          Everything You Need For Your Sacred Journey
        </h1>
        <p className='text-sm text-gray-600'>
          Comprehensive tools and resources to help you prepare spiritually and <br className="hidden sm:inline" />
          practically.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {/* Card 1 */}
        <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl sm:text-5xl bg-blue-600 text-white p-3 rounded-md">
            <CalendarMinus2 />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mt-4">Trip Planning</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Organize your journey with stage-by-stage planning and detailed checklists.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl sm:text-5xl bg-green-700 text-white p-3 rounded-md">
            <CircleCheckBig />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mt-4">Ritual Tracker</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Track mandatory and sunnah rituals with guided checklists and reminders.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl sm:text-5xl bg-yellow-500 text-white p-3 rounded-md">
            <BookOpen />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mt-4">Learning Resources</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Access authentic Islamic resources and educational materials for each stage.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl sm:text-5xl bg-orange-500 text-white p-3 rounded-md">
            <Users />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mt-4">Personal Dashboard</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Monitor your progress with insights and daily spiritual inspiration.
          </p>
        </div>
      </div>
    </div>
  );
}
