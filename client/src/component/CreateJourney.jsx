import React, { useState } from 'react';

const CreateJourney = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Umrah',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Journey Created:', formData);
    // You can add API call here
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Create New Journey</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

       
        <div>
          <label className="block text-sm font-medium mb-1">Journey Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Umrah 2024"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">Journey Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Umrah">Umrah</option>
            <option value="Hajj">Hajj</option>
          </select>
        </div>

        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border rounded text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Journey
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJourney;
