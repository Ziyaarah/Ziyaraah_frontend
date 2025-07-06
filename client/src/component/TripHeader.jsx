import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Store/BaseUrl";

export default function TripHeader() {
  const [form, setForm] = useState({
    name: "",
    type: "Umrah",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(`${BASE_URL}/api/trips`, {
        name: form.name,
        type: form.type,
        start_date: form.startDate,
        end_date: form.endDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      navigate(`/trips/${res.data.id}`); // Redirect to trip details
    } catch (err) {
      console.error("Error creating trip", err);
      alert("Trip creation failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create a New Journey</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Trip Name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Umrah">Umrah</option>
          <option value="Hajj">Hajj</option>
        </select>
        <div className="flex gap-4">
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create Trip</button>
      </form>
    </div>
  );
}
