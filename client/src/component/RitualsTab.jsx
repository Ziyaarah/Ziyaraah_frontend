import React, { useEffect, useState } from "react";
import { CheckCircle, MapPin, Plus } from "lucide-react";
import { apiFetch } from "../Store/api/auth/apiFetch";
import axios from "axios";

export default function RitualsTab({ tripId }) {
  const [rituals, setRituals] = useState([]);
  console.log("ritualstate",rituals);
  const [steps, setSteps] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState(null);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [adding, setAdding] = useState(false);
  

  // Fetch rituals and steps
  const fetchRitualsAndSteps = async () => {
    console.log ("fetch retuals")
    try {
      setLoading(true);
      setError(null);
        const token = localStorage.getItem("token");

      const ritualsData = await axios.get(`/api/trips/${tripId}/rituals`,{headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),    
      }
  });
  console.log("Rituals Tab",ritualsData.data)

      setRituals(ritualsData.data);

      const allSteps = {};
      for (const ritual of ritualsData) {
        const stepData = await apiFetch(
          `/api/trips/${tripId}/rituals/steps?ritualId=${ritual.id}`
        );
        allSteps[ritual.id] = stepData;
      }
      setSteps(allSteps);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load rituals");
    } finally {
      setLoading(false);
    }
  };

  // Complete a ritual step
  const completeStep = async (stepId) => {
    try {
      setError(null);
  
      await apiFetch(`/api/trips/${tripId}/rituals/steps`, {
        method: "PUT",
        body: JSON.stringify({ stepId, completed: true }),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      await fetchRitualsAndSteps();
      setSelectedStep(null);
    } catch (err) {
      console.error(err);
      setError("Failed to mark step as completed");
    }
  };
  

  // Add new ritual
  const addRitual = async () => {
    if (!newTitle.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setAdding(true);
      setError(null);

      await apiFetch(`/api/trips/${tripId}/rituals`, {
        method: "POST",
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDescription.trim(),
          order: rituals.length + 1,
        }),
      });

      setNewTitle("");
      setNewDescription("");
      setIsAddOpen(false);
      await fetchRitualsAndSteps();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add ritual");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    if (tripId) fetchRitualsAndSteps();
  }, [tripId]);

  const totalSteps = Object.values(steps).flat();
  const completedSteps = totalSteps.filter((s) => s.completed).length;
  const progress =
    totalSteps.length > 0 ? Math.round((completedSteps / totalSteps.length) * 100) : 0;

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Sacred Rituals</h2>
        <button
          onClick={() => {
            setError(null);
            setIsAddOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Ritual
        </button>
      </div>

      {isAddOpen && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAddOpen(false)}
              className="text-sm px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={addRitual}
              disabled={adding}
              className="text-sm px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              {adding ? "Adding..." : "Add Ritual"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-600 mb-1">Ritual Progress</span>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-green-600 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
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
                  step.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
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
                      {step.completed && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
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
