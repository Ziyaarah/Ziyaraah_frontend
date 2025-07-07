// src/components/TripHeader.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTripById } from "../Store/api/tripSlice";
import axios from "axios";
import { BASE_URL } from "../Store/BaseUrl";
import { toast } from "react-toastify";

export default function TripHeader({ tripId }) {
  const dispatch = useDispatch();

  // Select the trip from Redux store
  const trip = useSelector((state) =>
    state.trips.items.find((item) => item._id === tripId)
  );

  // Modal and form state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form, setForm] = useState(null);

  // Fetch trip if not in store
  useEffect(() => {
    if (!trip) {
      dispatch(fetchTripById(tripId));
    }
  }, [tripId, trip, dispatch]);

  // Initialize form when modal opens
  useEffect(() => {
    if (isEditModalOpen && trip) {
      setForm({
        name: trip.name || "",
        type: trip.type || "Umrah",
        startDate: trip.start_date || "",
        endDate: trip.end_date || "",
      });
    }
  }, [isEditModalOpen, trip]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${BASE_URL}/api/trips/${tripId}`,
        {
          name: form.name,
          type: form.type,
          start_date: form.startDate,
          end_date: form.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Trip updated successfully!");
      setIsEditModalOpen(false);
      dispatch(fetchTripById(tripId)); // refresh trip info
    } catch (error) {
      console.error("Failed to update trip:", error);
      toast.error("Failed to save trip changes.");
    }
  };

  if (!trip) {
    return <p className="text-gray-500">Loading trip data...</p>;
  }

  return (
    <>
      <div className="bg-green-600 text-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{trip.name}</h1>
            <p>{trip.type}</p>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Edit Trip
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-700 p-3 rounded-lg">
            <p className="text-sm">Start Date</p>
            <strong>{trip.start_date}</strong>
          </div>
          <div className="bg-green-700 p-3 rounded-lg">
            <p className="text-sm">End Date</p>
            <strong>{trip.end_date}</strong>
          </div>
          <div className="bg-green-700 p-3 rounded-lg">
            <p className="text-sm">Ritual</p>
            <strong>1</strong>
          </div>
          <div className="bg-green-700 p-3 rounded-lg">
            <p className="text-sm">Stages</p>
            <strong>2</strong>
          </div>
        </div>

        <div className="bg-green-700 p-4 rounded-lg space-y-1">
          <div className="p-2 flex justify-between items-center">
            <p className="text-sm font-medium">Overall Progress:</p>
            <span className="text-sm font-medium">41%</span>
          </div>
          <div className="bg-green-300 h-2 rounded-full overflow-hidden">
            <div className="bg-white h-full rounded-full" style={{ width: "41%" }}></div>
          </div>
        </div>
      </div>

      {/* Edit Trip Modal */}
      {isEditModalOpen && form && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-xl font-bold mb-4">Edit Trip Information</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Trip Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Journey Type *</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="Umrah">Umrah</option>
                  <option value="Hajj">Hajj</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-200 p-3 text-sm text-blue-600 mb-6">
                <p><strong>Important Note</strong></p>
                <p>Changing the trip type (Hajj ⇔ Umrah) may affect your rituals and stages. Some rituals are specific to each pilgrimage type.</p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
