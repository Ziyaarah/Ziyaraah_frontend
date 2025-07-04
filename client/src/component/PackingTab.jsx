// src/components/PackingList.jsx
import React, { useState } from 'react';
import {
  Shirt,
  Book,
  FileText,
  HeartPulse,
  Droplets,
  Pencil, 
  Trash
} from "lucide-react";

export default function PackingList() {
  const [categories, setCategories] = useState([
    {
      name: 'Clothing',
      items: [
        { name: 'Ihram clothing (2 sets)', quantity: 2, packed: 0, essential: true },
        { name: 'Comfortable walking shoes', quantity: 2, packed: 0, essential: true },
        { name: 'Casual clothing', quantity: 7, packed: 0, essential: false }
      ],
      collapsed: false
    },
    {
      name: 'Religious Items',
      items: [
        { name: 'Prayer mat', quantity: 1, packed: 0, essential: true },
        { name: 'Quran', quantity: 1, packed: 0, essential: false }
      ],
      collapsed: false
    },
    {
      name: 'Documents',
      items: [
        { name: 'Passport', quantity: 1, packed: 0, essential: true },
        { name: 'Visa documents', quantity: 1, packed: 0, essential: true }
      ],
      collapsed: false
    },
    {
      name: 'Health & Medicine',
      items: [
        { name: 'Medications', quantity: 1, packed: 0, essential: true },
        { name: 'Sunscreen', quantity: 1, packed: 0, essential: false }
      ],
      collapsed: false
    },
    {
      name: 'Personal Care',
      items: [
        { name: 'Toiletries', quantity: 1, packed: 0, essential: false }
      ],
      collapsed: false
    }
  ]);

  const getCategoryIcon = (name) => {
  switch (name) {
    case 'Clothing':
      return <Shirt className="w-5 h-5 text-blue-600" />;
    case 'Religious Items':
      return <Book className="w-5 h-5 text-green-600" />;
    case 'Documents':
      return <FileText className="w-5 h-5 text-purple-600" />;
    case 'Health & Medicine':
      return <HeartPulse className="w-5 h-5 text-red-600" />;
    case 'Personal Care':
      return <Droplets className="w-5 h-5 text-pink-600" />;
    default:
      return null;
  }
};
const [editingItem, setEditingItem] = useState(null);
const [editedName, setEditedName] = useState('');
const [editedQuantity, setEditedQuantity] = useState(1);
const [editedEssential, setEditedEssential] = useState(false);
const startEditing = (catIndex, itemIndex, item) => {
  setEditingItem({ catIndex, itemIndex });
  setEditedName(item.name);
  setEditedQuantity(item.quantity);
  setEditedEssential(item.essential);
};

const saveEdit = () => {
  setCategories(prev => {
    const updated = [...prev];
    const item = updated[editingItem.catIndex].items[editingItem.itemIndex];
    item.name = editedName;
    item.quantity = editedQuantity;
    item.essential = editedEssential;
    if (item.packed > editedQuantity) item.packed = editedQuantity;
    return updated;
  });
  setEditingItem(null);
};

const deleteItem = (catIndex, itemIndex) => {
  setCategories(prev => {
    const updated = [...prev];
    updated[catIndex].items.splice(itemIndex, 1);
    return updated;
  });
};


  // Calculate packing progress
  const calculateProgress = () => {
    let totalItems = 0;
    let packedItems = 0;

    categories.forEach(category => {
      category.items.forEach(item => {
        totalItems += item.quantity;
        packedItems += item.packed;
      });
    });

    return {
      total: totalItems,
      packed: packedItems,
      percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0
    };
  };

  const toggleCategoryCollapse = (index) => {
    setCategories(prev => {
      const updated = [...prev];
      updated[index].collapsed = !updated[index].collapsed;
      return updated;
    });
  };

  const updatePackedCount = (catIndex, itemIndex, value) => {
    setCategories(prev => {
      const updated = [...prev];
      const item = updated[catIndex].items[itemIndex];
      item.packed = Math.max(0, Math.min(value, item.quantity));
      return updated;
    });
  };



  const progress = calculateProgress();

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">Packing List</h1>
      <p className="text-gray-600 mb-4">Keep track of everything you need for your journey</p>

      {/* Add Item Form */}



      {/* Packing Progress */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Packing Progress</h2>
        <div className="flex items-center gap-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium whitespace-nowrap">
            {progress.packed}/{progress.total} ({progress.percentage}%)
          </span>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-6">
        {categories.map((category, catIndex) => {
          const catPacked = category.items.reduce((sum, item) => sum + item.packed, 0);
          const catTotal = category.items.reduce((sum, item) => sum + item.quantity, 0);
          const catPercentage = catTotal > 0 ? Math.round((catPacked / catTotal) * 100) : 0;

          return (
            <div key={category.name} className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleCategoryCollapse(catIndex)}
              >
                <div className="flex items-center gap-3">
                  {getCategoryIcon(category.name)}
                  <h3 className="font-semibold">{category.name}</h3>
                  <span className="text-sm text-gray-600">
                    ({catPacked}/{catTotal})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{catPercentage}% packed</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${category.collapsed ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {!category.collapsed && (
                <ul className="divide-y">
                  {category.items.map((item, itemIndex) => (
                <li key={item.name} className="p-3 flex justify-between items-center">
  <div className="flex items-center gap-3">
    {/* ✅ Radio Button */}
    <input
      type="radio"
      name={`item-${catIndex}-${itemIndex}`}
      checked={item.packed === item.quantity}
      onClick={() =>
        updatePackedCount(catIndex, itemIndex, item.packed === item.quantity ? 0 : item.quantity)
      }
      readOnly
    />

    {/* ✅ Editing Mode */}
    {editingItem &&
    editingItem.catIndex === catIndex &&
    editingItem.itemIndex === itemIndex ? (
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        />
        <input
          type="number"
          min="1"
          value={editedQuantity}
          onChange={(e) => setEditedQuantity(parseInt(e.target.value))}
          className="border px-2 py-1 rounded text-sm"
        />
        <label className="text-sm flex gap-1 items-center">
          <input
            type="checkbox"
            checked={editedEssential}
            onChange={(e) => setEditedEssential(e.target.checked)}
          />
          Essential
        </label>
        <div className="flex gap-2 text-xs mt-1">
          <button onClick={saveEdit} className="text-green-600 hover:underline">Save</button>
          <button onClick={() => setEditingItem(null)} className="text-gray-600 hover:underline">Cancel</button>
        </div>
      </div>
    ) : (
      <div>
        <span className="block font-medium">
          {item.name} {item.quantity > 1 && `x${item.quantity}`}
          {item.essential && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
              Essential
            </span>
          )}
        </span>
        <span className="text-sm text-gray-500">
          {item.packed}/{item.quantity} packed
        </span>
      </div>
    )}
  </div>

  {/* ✅ Action Icons */}
  <div className="flex gap-2 items-center">
    <button
      onClick={() => startEditing(catIndex, itemIndex, item)}
      className="text-blue-500 hover:text-blue-700"
    >
      <Pencil className="w-4 h-4" />
    </button>
    <button
      onClick={() => deleteItem(catIndex, itemIndex)}
      className="text-red-500 hover:text-red-700"
    >
      <Trash className="w-4 h-4" />
    </button>
  </div>
</li>

                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}