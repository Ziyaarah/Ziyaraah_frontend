import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Circle,
  CalendarDays,
  Flag,
  Target,
  Star,
  Layers3,
  MapPin,
  BarChart2,
  Sparkles
} from "lucide-react";
import { apiFetch } from "../Store/api/auth/apiFetch";

export default function OverviewTab({ tripId }) {
  const [steps, setSteps] = useState([]);
  const [rituals, setRituals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch rituals
        const ritualsData = await apiFetch(`/api/trips/${tripId}/rituals`);
        console.log ("Rituals Data",ritualsData)
        setRituals(ritualsData);

        // ✅ Fetch steps for each ritual
const allSteps = rituals.flatMap((r) => r.steps || []);
      setStageCount(allSteps.length);
        for (const ritual of ritualsData) {
          const stepsData = await apiFetch(
            `/api/trips/${tripId}/rituals/steps?ritualId=${ritual.id}`
          );

          const enrichedSteps = stepsData.map((step) => ({
            ...step,
            ritualTitle: ritual.title,
            location: ritual.location || null,
          }));

          allSteps.push(...enrichedSteps);
        }

        setSteps(allSteps);
      } catch (err) {
        console.error("Error loading overview data:", err);
      }
    };

    if (tripId) fetchData();
  }, [tripId]);

  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const sacredRituals = rituals.map((r) => ({
    ...r,
    completed: steps.some((s) => s.ritual_id === r.id && s.completed),
  }));

  const stages = ["Travel & Arrival", "Miqaat", "Tawaf", "Sa’i"];
  const stageProgress = (stageName) => {
    const filtered = steps.filter((s) => s.title?.includes(stageName));
    const completed = filtered.filter((s) => s.completed).length;
    return {
      total: filtered.length,
      completed,
      percentage: filtered.length > 0 ? Math.round((completed / filtered.length) * 100) : 0,
    };
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Tasks Progress</span>
          </div>
          <p className="text-2xl font-bold">{progress}%</p>
          <p className="text-sm text-gray-500">{completedSteps}/{totalSteps} completed</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-green-600">
            <Star className="w-5 h-5" />
            <span className="text-sm font-medium">Rituals Progress</span>
          </div>
          <p className="text-2xl font-bold">
            {sacredRituals.filter(r => r.completed).length} / {sacredRituals.length}
          </p>
          <p className="text-sm text-gray-500">Sacred rituals done</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-600">
            <CalendarDays className="w-5 h-5" />
            <span className="text-sm font-medium">Days Until Trip</span>
          </div>
          <p className="text-2xl font-bold">Started</p>
          <p className="text-sm text-gray-500">7 day journey</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-purple-600">
            <Layers3 className="w-5 h-5" />
            <span className="text-sm font-medium">Completed Stages</span>
          </div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-500">of 4 stages</p>
        </div>
      </div>

      {/* Grid for main cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stages Progress */}
        <div className="bg-white p-4 rounded-lg shadow h-full">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Stages Progress</h2>
          </div>
          <div className="space-y-4">
            {stages.map(stage => {
              const p = stageProgress(stage);
              return (
                <div key={stage}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{stage}</span>
                    <span>{p.completed} of {p.total} completed</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-blue-600 h-full rounded"
                      style={{ width: `${p.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sacred Rituals */}
        <div className="bg-white p-4 rounded-lg shadow h-full">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">Sacred Rituals</h2>
          </div>
          <ul className="space-y-2">
            {sacredRituals.map((ritual) => (
              <li key={ritual.id} className="flex items-center gap-2">
                {ritual.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-sm font-medium">{ritual.title}</span>
                {ritual.location && (
                  <span className="flex items-center text-xs text-gray-500 gap-1">
                    <MapPin className="w-3 h-3" />
                    {ritual.location}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Trip Timeline */}
        <div className="bg-white p-4 rounded-lg shadow h-full md:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Trip Timeline</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Flag className="text-blue-500 w-5 h-5" />
              <div>
                <p className="font-medium">Departure</p>
                <p className="text-sm text-gray-500">Thursday, March 14, 2024</p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Star className="text-green-500 w-5 h-5" />
              <div>
                <p className="font-medium">Sacred Journey</p>
                <p className="text-sm text-gray-500">Perform umrah rituals and spiritual practices</p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="text-orange-500 w-5 h-5" />
              <div>
                <p className="font-medium">Return</p>
                <p className="text-sm text-gray-500">Thursday, March 21, 2024</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
