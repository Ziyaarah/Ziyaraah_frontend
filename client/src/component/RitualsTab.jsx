// src/components/RitualsTab.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Store/BaseUrl";
import { CheckCircle, MapPin, Info, Plus } from "lucide-react";

export default function RitualsTab({ tripId }) {
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRitual, setSelectedRitual] = useState(null);

  const fetchRituals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/trips/${tripId}/checkpoints`);
      setRituals(
        res.data.map((r) => ({
          ...r,
          id: r.id || r._id,
          completed: r.completed || false
        }))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load rituals");
    } finally {
      setLoading(false);
    }
  };

  const markRitualComplete = async (ritualId) => {
    try {
      await axios.put(`${BASE_URL}/api/checkpoints/${ritualId}/complete`);
      setRituals((prev) =>
        prev.map((r) => (r.id === ritualId ? { ...r, completed: true } : r))
      );
      setSelectedRitual(null);
    } catch (err) {
      setError("Failed to complete ritual");
    }
  };

  useEffect(() => {
    if (tripId) fetchRituals();
  }, [tripId]);

  const progress = Math.round(
    (rituals.filter((r) => r.completed).length / rituals.length) * 100
  );

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Sacred Rituals</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Ritual
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <span className="block text-sm text-gray-600 font-medium mb-1">Ritual Progress</span>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">{progress}% Completed</span>
        </div>

        {rituals.map((ritual) => (
          <div
            key={ritual.id}
            className={`p-4 rounded-md border mb-3 ${
              ritual.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="ritual-select"
                checked={selectedRitual === ritual.id}
                onChange={() => setSelectedRitual(ritual.id)}
                disabled={ritual.completed}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-md font-semibold text-gray-800">
                    {ritual.name || "Unnamed Ritual"}
                  </h3>
                  {ritual.tag && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {ritual.tag}
                    </span>
                  )}
                  {ritual.completed && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {ritual.description || "No description provided"}
                </p>
                {ritual.location && (
                  <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {ritual.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {selectedRitual && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => markRitualComplete(selectedRitual)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Mark as Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
