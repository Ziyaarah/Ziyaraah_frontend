// src/components/TripHeader.jsx
import React, { useState } from "react";
import axios from "axios";

export default function TripHeader({ tripId }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tripData, setTripData] = useState({
    name: "Umrah 2024 – Spring",
    type: "Umrah",
    startDate: "2024-03-14",
    endDate: "2024-03-21"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://ziyaarah.vercel.app/api/trips/${tripId}`,
        {
          name: tripData.name,
          start_date: tripData.startDate,
          end_date: tripData.endDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Trip updated successfully:", response.data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update trip:", error.response?.data || error.message);
      alert("Failed to save trip changes. Please check your login and data.");
    }
  };

  return (
    <>
      <div className="bg-green-600 text-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{tripData.name}</h1>
            <p>{tripData.type}</p>
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
            <strong>{tripData.startDate}</strong>
          </div>
          <div className="bg-green-700 p-3 rounded-lg">
            <p className="text-sm">End Date</p>
            <strong>{tripData.endDate}</strong>
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
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-xl font-bold mb-4">Edit Trip Information</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Trip Name *</label>
                <input
                  type="text"
                  name="name"
                  value={tripData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Journey Type *</label>
                <select
                  name="type"
                  value={tripData.type}
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
                    value={tripData.startDate}
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
                    value={tripData.endDate}
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