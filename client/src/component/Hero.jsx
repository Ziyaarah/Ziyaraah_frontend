import React from "react";
import Macca from '../assets/images/Macca.jpg'

const HeroSection = () => {
  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block mb-4 px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            Trusted by 10,000+ Pilgrims
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Begin Your Sacred Journey<br />
            with Faith and <span className="text-green-600">Preparation</span>
          </h1>
          <p className="text-gray-600 mb-6 max-w-md">
            Plan your Hajj or Umrah with confidence using our comprehensive spiritual journey planner. Track rituals, access authentic resources, and prepare both spiritually and practically.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition">Join Our Community</button>
            <button className="border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg transition">Watch Demo</button>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex justify-center md:justify-end w-full">
          <div className="relative w-full max-w-md">
            <img
              src={Macca}
              alt="Kaaba"
              className="rounded-2xl shadow-lg w-full h-72 object-cover"
            />
            {/* Top right badge */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>
              <span className="text-sm font-semibold text-gray-700">Journey Complete</span>
            </div>
            {/* Bottom left badge */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full"></span>
              <span className="text-sm font-semibold text-gray-700">Sacred Journey</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
