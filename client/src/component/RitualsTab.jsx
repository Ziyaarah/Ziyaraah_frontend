import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Store/BaseUrl";
import { CheckCircle, MapPin, Plus } from "lucide-react";

export default function RitualsTab({ tripId }) {
  const token = localStorage.getItem("token");

  const [rituals, setRituals] = useState([]);
  const [steps, setSteps] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState(null);
  const [error, setError] = useState(null);

  // Fetch rituals and their steps
  const fetchRitualsAndSteps = async () => {
    try {
      setLoading(true);
      const ritualRes = await axios.get(`${BASE_URL}/api/trips/${tripId}/rituals`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const ritualsData = ritualRes.data;
      setRituals(ritualsData);

      // Fetch steps for each ritual
      const allSteps = {};
      for (const ritual of ritualsData) {
        const stepRes = await axios.get(
          `${BASE_URL}/api/trips/${tripId}/rituals/steps?ritualId=${ritual.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        allSteps[ritual.id] = stepRes.data;
      }

      setSteps(allSteps);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to load rituals");
    } finally {
      setLoading(false);
    }
  };

  // Mark a step as complete
  const completeStep = async (stepId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/trips/${tripId}/rituals/steps`,
        { stepId, completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh rituals
      await fetchRitualsAndSteps();
      setSelectedStep(null);
    } catch (err) {
      setError("Failed to mark step as completed");
    }
  };

  useEffect(() => {
    if (tripId) fetchRitualsAndSteps();
  }, [tripId]);

  const totalSteps = Object.values(steps).flat();
  const completedSteps = totalSteps.filter((s) => s.completed).length;
  const progress = totalSteps.length > 0 ? Math.round((completedSteps / totalSteps.length) * 100) : 0;

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

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
          <span className="block text-sm font-medium text-gray-600 mb-1">Ritual Progress</span>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div className="bg-green-600 h-3 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-gray-500">{progress}% Completed</span>
        </div>

        {rituals.map((ritual) => (
          <div key={ritual.id} className="mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">{ritual.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{ritual.description}</p>

            {(steps[ritual.id] || []).map((step) => (
              <div
                key={step.id}
                className={`p-3 mb-2 rounded border ${
                  step.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="ritual-step-select"
                    checked={selectedStep === step.id}
                    onChange={() => setSelectedStep(step.id)}
                    disabled={step.completed}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-800">{step.title}</h4>
                      {step.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{step.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {selectedStep && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => completeStep(selectedStep)}
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
