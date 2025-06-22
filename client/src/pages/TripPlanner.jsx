import {
  Sticker as Sticky,
  Plus,
  List,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CreateJourney from "../component/CreateJourney";

export default function TripPlanner (){
      const { pathname } = useLocation();
       const navigate = useNavigate();
       
  
  // Sample trip data
  const tripData = {
    title: "Umrah 2024 - Spring",
    subtitle: "Omrah Pilgrimage",
    startDate: "3/14/2024",
    endDate: "3/21/2024",
    ritualsCount: 1,
    stagesCount: 4,
    progress: 41
  };

  const handleBackClick = () => navigate(-1);
  const handleEditTrip = () => console.log("Edit trip clicked");

    return (
<>
<div className="bg-gray-50  px-6 py-4 flex items-center justify-between">
    <div>
    <h1 className="text-xl font-bold text-gray-800"> Trip Planner</h1>
    <p className="text-sm text-gray-500"> Plan and organize your spiritual journey</p>
    </div>
     <Link
                  to="/CreateJourney"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${pathname === "/CreateJourney"
                      ? "bg-yellow-100 text-yellow-700"
                      : "hover:bg-green-100 text-gray-700"
                    }`}
                >                    
                 
                   <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + New Journey
          </button>
                </Link>
</div>

      
      {/* Navigation tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className="px-5 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
          Overview
        </button>
        <button className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Rituals
        </button>
        <button className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Stages
        </button>
        <button className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Packing
        </button>
        <button className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Notes
        </button>
      </div>
      
     
    

    
</>
)
}