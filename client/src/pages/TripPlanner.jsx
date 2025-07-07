
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateJourney from "../component/CreateJourney";
import { fetchTrips,
  deleteTrip,
  fetchTripById, } 
  from "../Store/api/tripSlice";

export default function TripPlanner() {
  const dispatch = useDispatch();
  const { items: trips, loading } = useSelector((state) => state.trips);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this trip?")) {
      dispatch(deleteTrip(id));
    }
  };
  const handleCreateTrip = async (formData) => {
    try {
      await dispatch(createTrip(formData)).unwrap();
      toast.success("Trip created successfully!");
      setShowModal(false);
      dispatch(fetchTrips()); // refresh list
    } catch (error) {
      toast.error(error.message || "Failed to create trip");
    }
  };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Trip Planner</h1>
                        <p className="text-sm text-gray-500">Plan and organize your spiritual journey</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <span>+</span>
                        <span>New Journey</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {loading ? (
                    <p className="text-gray-500">Loading trips...</p>
                ) : trips.length === 0 ? (                
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">You don't have any trips yet</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Create Your First Journey
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-5 rounded-xl">
                       {trips.map((trip) =>(
  
    <TripCard
      key={trip.id}
      trip={trip}
      onView={() => navigate(`/trip/${trip._id}`)}
    />
  ))}
                    </div>
                )}
            </div>

            {/* Create Journey Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <CreateJourney
                            onSubmit={handleCreateTrip}
                            onClose={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function TripCard({ trip, onView }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{trip.name || "Unnamed Trip"}</h3>
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mt-1">
              {trip.group_code || "No Group Code"}
            </span>
          </div>

          <button
            onClick={onView}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          >
            View Trip
          </button>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-600">          
            <p><strong>Start_Date: <br/>{trip.start_date || "--"}</strong></p>
            <p><strong>Start_Date: <br/>{trip.end_date || "--"}</strong></p>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress</span>
            <span className="font-medium">{trip.progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${trip.progress || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
