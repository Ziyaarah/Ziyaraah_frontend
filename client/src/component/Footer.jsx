import React from 'react'
import { CircleDot } from 'lucide-react';

export default function Footer() {
  return (

    <footer className="bg-[#1C2331] text-white py-6 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

        <div className="flex items-center space-x-3">
           <div className="text-5xl bg-green-600 whitespace-break-spaces p-2 rounded-md"><CircleDot /></div>
          <div>
            <p className="font-semibold text-sm">Ziyaarah</p>
            <p className="text-xs text-gray-400">Spiritual Journey Planner</p>
          </div>
        </div>
        {/* Right Side: Text */}
        <p className="text-sm text-gray-400 text-center md:text-right">
          © 2024 Ziyaarah. Helping Muslims prepare for their spiritual journey with love and care.
        </p>
      </div>
    </footer>
  );
};




