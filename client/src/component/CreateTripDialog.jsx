// CreateTripModal.jsx – Modal form to create a trip

import React, { useState } from "react";

import { createTrip } from "../Store/api/tripSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function CreateTripDialog({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", start_date: "", end_date: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTrip(form));
      onClose();
      console.log("Trip created successfully:", form);
      toast.success("Trip created successfully!");
    } catch (err) {
      alert("Failed to create trip");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Trip Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
