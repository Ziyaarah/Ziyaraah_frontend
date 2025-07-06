
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateTripDialog from "../component/CreateTripDialog";
import { fetchTrips,
  deleteTrip,
  fetchTripById, } 
  from "../Store/api/tripSlice";

export default function TripPlanner() {
  const dispatch = useDispatch();
  const { items: trips, loading } = useSelector((state) => state.trips);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this trip?")) {
      dispatch(deleteTrip(id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Journey
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : trips.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-green-600 text-white p-6 rounded-xl shadow-md mb-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{trip.name}</h1>
                <p>Religious Journey</p>
              </div>
              <button
                onClick={() => handleDelete(trip.id)}
                className="bg-white text-green-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-green-700 p-3 rounded">
                <p className="text-sm">Start Date</p>
                <strong>{trip.start_date}</strong>
              </div>
              <div className="bg-green-700 p-3 rounded">
                <p className="text-sm">End Date</p>
                <strong>{trip.end_date}</strong>
              </div>
              <div className="bg-green-700 p-3 rounded">
                <p className="text-sm">Checkpoints</p>
                <strong>{trip.checkpoints_count ?? 0}</strong>
              </div>
              <div className="bg-green-700 p-3 rounded">
                <p className="text-sm">Members</p>
                <strong>{trip.members_count ?? 0}</strong>
              </div>
            </div>

            <div className="bg-green-700 mt-4 p-3 rounded">
              <div className="flex justify-between text-sm mb-1">
                <p>Progress</p>
                <span>{trip.progress || 0}%</span>
              </div>
              <div className="h-2 bg-green-300 rounded-full">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${trip.progress || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))
      )}

      {showModal && <CreateTripDialog onClose={() => setShowModal(false)} />}
    </div>
  );
}
