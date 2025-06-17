import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and subtitle */}
        <div className="flex items-center gap-3">
          <div className="bg-green-600 rounded-lg flex items-center justify-center w-10 h-10">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="6" fill="#10B981" />
              <circle cx="12" cy="12" r="6" fill="#fff" />
              <circle cx="12" cy="12" r="2" fill="#10B981" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-800 leading-tight">Ziyaarah</span>
            <span className="text-xs text-green-700 leading-none">Spiritual Journey Planner</span>
          </div>
        </div>
        {/* Navigation links */}
        <div className="hidden md:flex gap-8">
          <a href="#" className="text-gray-700 font-medium hover:text-green-600 transition">Home</a>
          <a href="#" className="text-gray-700 font-medium hover:text-green-600 transition">About Us</a>
          <a href="#" className="text-gray-700 font-medium hover:text-green-600 transition">Prayers</a>
          <a href="#" className="text-gray-700 font-medium hover:text-green-600 transition">Events</a>
          <a href="#" className="text-gray-700 font-medium hover:text-green-600 transition">Contact Us</a>
        </div>
        {/* Sign In button */}
        <div>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;