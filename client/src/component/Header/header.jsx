// Header.js
import React from "react";
import { Star } from "lucide-react";

const Header = () => {
  return (
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
  );
};

export default Header;
