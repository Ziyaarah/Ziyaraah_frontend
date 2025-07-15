import React, { useState } from "react";
import { FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Activity,
  BookOpen
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/api/auth/authSlice";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md ${
    isActive
      ? "bg-green-100 text-green-700 font-semibold"
      : "text-gray-700 hover:bg-gray-100"
  }`;

export default function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Toggle Button (Mobile) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow z-30">
        <h2 className="text-xl font-bold text-green-700">Ziyaarah</h2>
        <button onClick={toggleSidebar} className="text-gray-700 text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar (Responsive) */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col justify-between py-6 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        {/* Top Section */}
        <div>
          <div className="px-6 mb-8 hidden md:block">
            <h2 className="text-2xl font-bold text-green-700">Ziyaarah</h2>
            <p className="text-sm text-gray-500">Journey Planner</p>
          </div>

          <nav className="flex flex-col gap-2 px-2">
            <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/tripPlanner" className={linkClass} onClick={() => setIsOpen(false)}>
              <Map size={18} />
              Trip Planner
            </NavLink>

            <NavLink to="/RetualTrips" className={linkClass} onClick={() => setIsOpen(false)}>
              <Activity size={18} />
              RitualTrips
            </NavLink>

            <NavLink to="/ResourceLibrary" className={linkClass} onClick={() => setIsOpen(false)}>
              <BookOpen size={18} />
              ResourcesLibrary
            </NavLink>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-6 mt-10">
          <div className="flex items-center gap-3 mb-2">
            <FaUserCircle className="text-2xl text-gray-600" />
            <div>
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
