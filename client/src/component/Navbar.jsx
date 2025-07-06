import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and subtitle */}
        <div className="flex items-center gap-3">
          <div className="bg-[#038A62] rounded-lg flex items-center justify-center w-10 h-10">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="6" fill="#fff" />
              <circle cx="12" cy="12" r="2" fill="#10B981" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-800 leading-tight">Ziyaarah</span>
            <span className="text-xs text-green-700 leading-none">Spiritual Journey Planner</span>
          </div>
        </div>

        {/* Hamburger Button (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation links - Desktop */}
        <div className="hidden md:flex gap-8">
          <ul className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 font-medium hover:text-green-600 transition">Home</Link>
            <Link to="/about" className="text-gray-700 font-medium hover:text-green-600 transition">About</Link>
            <Link to="/prayers" className="text-gray-700 font-medium hover:text-green-600 transition">Prayers</Link>
            <Link to="/events" className="text-gray-700 font-medium hover:text-green-600 transition">Events</Link>
            <Link to="/contact" className="text-gray-700 font-medium hover:text-green-600 transition">Contact</Link>
          </ul>
        </div>

        {/* Sign In button */}
        <div className="hidden md:block">
          <button
            className="bg-[#038A62] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            onClick={() => navigate("/signup")}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 font-medium hover:text-green-600">Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 font-medium hover:text-green-600">About</Link>
          <Link to="/prayers" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 font-medium hover:text-green-600">Prayers</Link>
          <Link to="/events" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 font-medium hover:text-green-600">Events</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 font-medium hover:text-green-600">Contact</Link>
          <button
            className="w-full bg-[#038A62] hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/signup");
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
