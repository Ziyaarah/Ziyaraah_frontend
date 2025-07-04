// Header.js
import React from "react";
import { Star } from "lucide-react";
import { Calendar, BarChart2, CheckCircle, BookOpen } from 'lucide-react';
import { Heart, Book, Users } from 'lucide-react';


const stats = [
  { icon: <Calendar />, label: 'Active Journeys', value: '3', color: 'text-blue-600' },
  { icon: <BarChart2 />, label: 'Progress', value: '50%', color: 'text-orange-500' },
  { icon: <CheckCircle />, label: 'Completed Tasks', value: '8', color: 'text-green-600' },
  { icon: <BookOpen />, label: 'Total Tasks', value: '16', color: 'text-yellow-600' },
];

const quickLinks = [
  {
    // icon: <Heart />,
    title: 'Daily Prayers',
    subtitle: 'Track your spiritual practice',
    bg: 'bg-[#038A62]',
  },
  {
    icon: <Book />,
    title: 'Quran Study',
    subtitle: 'Daily verses and reflection',
    bg: 'bg-yellow-500',
  },
  {
    icon: <Users />,
    title: 'Community',
    subtitle: 'Connect with fellow pilgrims',
    bg: 'bg-blue-600',
  },
];

const Dashboard = () => {


  return (
  <>
    <header className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-1">Assalamu Alaikum, Welcome Back</h2>
        <p className="text-gray-700">Continue your spiritual journey preparation</p>
      </div>

      <div className="bg-gradient-to-r from-[#038A62] to-[#038A62] text-white p-6 rounded-xl shadow flex items-start gap-4 relative overflow-hidden">
        <div className=" bg-opacity-10 p-2 rounded-full">
          <Star className=" bg-[#038A62] w-6 h-6" />
        </div>
        <div>
          <p className="text-lg font-medium">
            "And Allah is with those who fear Him and those who are doers of good."
          </p>
          <p className="text-sm mt-1">— Quran &amp; Sunnah</p>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px] rounded-xl pointer-events-none"></div>
      </div>
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((item, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className={`p-2 rounded-full bg-gray-100 ${item.color}`}>{item.icon}</div>
          <div>
            <p className="text-lg font-semibold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        </div>
      ))}
    </div>

    {/* jouney */}

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Current Journey Card */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold text-gray-800 mb-1">📍 Current Journey</h3>
        <p className="text-sm font-medium">Umrah 2024 - Spring</p>
        <p className="text-xs text-gray-500 mb-4">Umrah Pilgrimage</p>
        <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#038A62] w-1/2 rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Start: 3/14/2024</span>
          <span>End: 3/21/2024</span>
        </div>
      </div>

      {/* Journey Stages */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold text-gray-800 mb-3">🌐 Journey Stages</h3>
        <div className="space-y-4 overflow-y-auto max-h-48 pr-2">
          {/* Stage 1 */}
          <div>
            <div className="flex justify-between text-sm">
              <p className="font-medium">1. Travel & Arrival</p>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">In Progress</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-full bg-[#038A62]w-1/2 rounded-full" />
            </div>
            <p className="text-xs text-gray-500 mt-1">2 of 4 tasks completed</p>
          </div>

          {/* Stage 2 */}
          <div>
            <div className="flex justify-between text-sm">
              <p className="font-medium">2. Miqat</p>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">In Progress</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-full bg-[#038A62] w-1/4 rounded-full" />
            </div>
            <p className="text-xs text-gray-500 mt-1">1 of 4 tasks completed</p>
          </div>
        </div>
      </div>
    </div>

    {/* quick links */}

     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quickLinks.map((link, i) => (
        <div key={i} className={`text-white p-4 rounded-xl shadow flex flex-col gap-2 ${link.bg}`}>
          <div className="flex items-center gap-2 text-lg font-medium">
            {link.icon}
            {link.title}
          </div>
          <p className="text-sm opacity-90">{link.subtitle}</p>
        </div>
      ))}
    </div>
  </>
  );

 

};

export default Dashboard;
