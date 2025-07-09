// Rituals.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle, Plus } from "lucide-react";
import { apiFetch } from "../Store/api/auth/apiFetch";
import axios from "axios";

export default function RitualsTab({ tripId }) {
  const [rituals, setRituals] = useState([]);
  const [steps, setSteps] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState(null);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [adding, setAdding] = useState(false);

  const [creatingStepFor, setCreatingStepFor] = useState(null);
  const [newStepTitle, setNewStepTitle] = useState("");

  const fetchRitualsAndSteps = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const response = await axios.get(`/api/trips/with-rituals`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const tripData = response.data.find((t) => t._id === tripId);
      if (!tripData) {
        setRituals([]);
        setSteps({});
        return;
      }

      const ritualsList = tripData.rituals.map((r) => r.ritual);
      setRituals(ritualsList);

      const allSteps = {};
      tripData.rituals.forEach((ritualObj) => {
        allSteps[ritualObj.ritual._id] = ritualObj.steps;
      });
      setSteps(allSteps);
    } catch (err) {
      console.error(err);
      setError("Failed to load rituals");
      setRituals([]);
      setSteps({});
    } finally {
      setLoading(false);
    }
  };

  const completeStep = async (stepId) => {
    try {
      setError(null);

      await apiFetch(`/api/trips/${tripId}/rituals/steps`, {
        method: "PUT",
        body: JSON.stringify({ stepId, completed: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await fetchRitualsAndSteps();
      setSelectedStep(null);
    } catch (err) {
      console.error(err);
      setError("Failed to mark step as completed");
    }
  };

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
      setError("Failed to add ritual");
    } finally {
      setAdding(false);
    }
  };

  const addStep = async (ritualId) => {
    if (!newStepTitle.trim()) {
      setError("Step title is required");
      return;
    }

    try {
      setError(null);

      await apiFetch(
        `/api/trips/${tripId}/rituals/steps?ritualId=${ritualId}`,
        {
          method: "POST",
          body: JSON.stringify({
            title: newStepTitle.trim(),
            type: "action",
            order: (steps[ritualId]?.length || 0) + 1,
          }),
        }
      );

      setNewStepTitle("");
      setCreatingStepFor(null);
      await fetchRitualsAndSteps();
    } catch (err) {
      console.error(err);
      setError("Failed to add step");
    }
  };

  useEffect(() => {
    if (tripId && !isAddOpen) fetchRitualsAndSteps();
  }, [tripId, isAddOpen]);

  const totalSteps = Object.values(steps).flat();
  const completedSteps = totalSteps.filter((s) => s.completed).length;
  const progress =
    totalSteps.length > 0
      ? Math.round((completedSteps / totalSteps.length) * 100)
      : 0;

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Sacred Ritual</h2>
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
          <span className="block text-sm font-medium text-gray-600 mb-1">
            Ritual Progress
          </span>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-green-600 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{progress}% Completed</span>
        </div>

        {rituals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No rituals found for this trip.</p>
            <p className="text-sm mt-2">
              Add your first ritual to get started!
            </p>
          </div>
        ) : (
          rituals.map((ritual) => {
            const ritualId = ritual._id || ritual.id;
            return (
              <div key={ritualId} className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  {ritual.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {ritual.description}
                </p>

                {(steps[ritualId] || []).length === 0 ? (
                  <div className="text-xs text-gray-400 mb-2">
                    No steps for this ritual.
                  </div>
                ) : (
                  steps[ritualId].map((step) => (
                    <div
                      key={step._id || step.id}
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
                          checked={selectedStep === (step.id || step._id)}
                          onChange={() =>
                            setSelectedStep(step.id || step._id)
                          }
                          disabled={step.completed}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-gray-800">
                              {step.title}
                            </h4>
                            {step.completed && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500 capitalize">
                            {step.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {creatingStepFor === ritualId ? (
                  <div className="space-y-2 mt-2">
                    <input
                      type="text"
                      value={newStepTitle}
                      onChange={(e) => setNewStepTitle(e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Step title"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setCreatingStepFor(null)}
                        className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => addStep(ritualId)}
                        className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Add Step
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setError(null);
                        setCreatingStepFor(ritualId);
                      }}
                      className="text-sm text-green-600 hover:underline"
                    >
                      + Add Step
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}

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