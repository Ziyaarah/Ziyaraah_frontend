// src/components/Sidebar.jsx
import { FaHome, FaMapMarkedAlt, FaPray, FaBook, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md ${
    isActive ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
  }`;

export default function Sidebar() {
  return (
    <main className="w-64 h-screen bg-white shadow-md flex flex-col justify-between py-6">
      
      {/* Top: Logo + Navigation */}
      <div>

        <div className="px-6 mb-8">
          <h2 className="text-2xl font-bold text-green-700">Ziyaarah</h2>
          <p className="text-sm text-gray-500">Journey Planner</p>
        </div>

        <nav className="flex flex-col gap-2 px-2">
          <NavLink to="/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/trip-planner" className={linkClass}>
            <FaMapMarkedAlt /> Trip Planner
          </NavLink>
          <NavLink to="/ritual-tracker" className={linkClass}>
            <FaPray /> Ritual Tracker
          </NavLink>
          <NavLink to="/resources" className={linkClass}>
            <FaBook /> Resources
          </NavLink>
        </nav>
      </div>

      {/* Bottom: Profile + Sign Out */}
      <div className="px-6 mt-10">
        <div className="flex items-center gap-3 mb-2">
          <FaUserCircle className="text-2xl text-gray-600" />
          <div>
            <p className="font-semibold text-sm">anisa</p>
            <p className="text-xs text-gray-500">anisa@gmail.com</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700">
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </main>
  );
}
