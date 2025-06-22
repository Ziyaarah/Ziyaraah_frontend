// Sidebar.jsx
import React from "react";
import {
  Home,
  Calendar,
  CheckCircle,
  BookOpen,
} from "lucide-react"; 

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r h-screen p-6 flex flex-col">
      <div className="mb-10">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-full">
           
            <svg className="w-6 h-6 text-[#038A62]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Ziyaarah</h1>
            <p className="text-sm text-gray-500">Journey Planner</p>
          </div>
        </div>
      </div>

    
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-3 px-4 py-2 bg-[#038A62] text-white rounded-lg font-medium">
          <Home className="w-5 h-5" />
          Dashboard
        </a>
        <a href="" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <Calendar className="w-5 h-5" />
          Trip Planner
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          Ritual Tracker
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <BookOpen className="w-5 h-5" />
          Resources
        </a>
      </nav>
    </aside>
  );
};

        
      




export default Sidebar;
