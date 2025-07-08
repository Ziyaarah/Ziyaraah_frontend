import React, { useEffect, useState } from "react";
import { apiFetch } from "../Store/api/auth/apiFetch";

export default function TripHeader({ tripId }) {
  const [trip, setTrip] = useState(null);
  const [ritualCount, setRitualCount] = useState(0);
  const [stageCount, setStageCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Umrah",
    startDate: "",
    endDate: "",
  });

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const tripsWithRituals = await apiFetch(`/api/trips/with-rituals`);
      const tripData = tripsWithRituals.find((t) => t._id === tripId);

      if (!tripData) {
        setError("Trip not found");
        return;
      }

      setTrip(tripData);
      setForm({
        name: tripData.name || "",
        type: tripData.type || "Umrah",
        startDate: tripData.start_date || "",
        endDate: tripData.end_date || "",
      });

      const rituals = tripData.rituals || [];
      setRitualCount(rituals.length);

      const allSteps = rituals.flatMap((r) => r.steps || []);
      setStageCount(allSteps.length);

      const completedSteps = allSteps.filter((s) => s.completed).length;
      const percentage =
        allSteps.length > 0
          ? Math.round((completedSteps / allSteps.length) * 100)
          : 0;

      setProgress(percentage);
    } catch (err) {
      console.error("Failed to load trip data:", err);
      setError("Failed to load trip data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) fetchTripDetails();
  }, [tripId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch(`/api/trips/${tripId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          start_date: form.startDate,
          end_date: form.endDate,
        }),
      });
      setIsEditModalOpen(false);
      await fetchTripDetails();
    } catch (err) {
      console.error("Failed to update trip", err);
      alert("Failed to update trip.");
    }
  };

  if (loading) {
    return (
      <div className="bg-yellow-50 text-yellow-700 p-4 rounded mb-4">
        Loading trip data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
    );
  }

  return (
    <>
      <div className="bg-green-600 text-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{trip.name}</h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Edit Trip
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-700 rounded p-3">
            <p className="text-sm text-green-100">Start Date</p>
            <p className="text-lg font-semibold">{trip.start_date}</p>
          </div>
          <div className="bg-green-700 rounded p-3">
            <p className="text-sm text-green-100">End Date</p>
            <p className="text-lg font-semibold">{trip.end_date}</p>
          </div>
          <div className="bg-green-700 rounded p-3">
            <p className="text-sm text-green-100">Rituals</p>
            <p className="text-lg font-semibold">{ritualCount}</p>
          </div>
          <div className="bg-green-700 rounded p-3">
            <p className="text-sm text-green-100">Stages</p>
            <p className="text-lg font-semibold">{stageCount}</p>
          </div>
        </div>

        <div className="bg-green-700 rounded p-4">
          <p className="text-sm font-semibold mb-1">Overall Progress:</p>
          <div className="w-full bg-green-300 h-3 rounded-full">
            <div
              className="bg-white h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-sm mt-1">{progress}%</p>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-xl font-bold mb-4">Edit Trip</h2>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Trip Name"
              />

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

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
                            <div className="bg-blue-200 p-3 text-sm text-blue-600 mb-6">
                <p><strong>Important Note</strong></p>
                <p>Changing the trip type (Hajj ⇔ Umrah) may affect your rituals and stages. Some rituals are specific to each pilgrimage type.</p>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
