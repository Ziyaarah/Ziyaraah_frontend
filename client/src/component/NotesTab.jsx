import React, { useState } from "react";
import {
  FileText,
  Pencil,
  Trash,
  Clock
} from "lucide-react";
import classNames from "classnames";

export default function NotesTab() {
  const [notes, setNotes] = useState([
    {
      category: "Spiritual",
      title: "Personal Duas",
      tag: "Spiritual",
      date: "6/27/2025",
      content: `Duas to remember:
1. For parents: "Rabbi irhamhuma kama rabbayani sagheera"
2. For forgiveness: "Astaghfirullah al-azeem"
3. For guidance: "Ihdinas siratal mustaqeem"

Special intentions:
-Health for family
-Success in studies
-Guidance for the community`
    },
    {
      category: "Schedule",
      title: "Daily Schedule",
      tag: "Schedule",
      date: "6/27/2025",
      content: `Day 1: Arrival and Umrah
- AM: Flight and hotel
- PM: Rest and prepare
- PM: Perform Umrah

Day 2: Madinah Visit
- 6 AM: Depart for Madinah
- 10 PM: Visit Prophet's Mosque
- 4 PM: Historical sites tour`
    },
    {
      category: "Contacts",
      title: "Important Contacts",
      tag: "Contacts",
      date: "6/27/2025",
      content: `Hotel: +966 56 293 0789
Tour Guide: +966 53 124 4537
Emergency: 911

Group Leader: Ahmed
Meeting Point: Hotel Lobby at 6 AM`
    }
  ]);


  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("Spiritual");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const startEdit = (index) => {
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
  };

  const saveEdit = (index) => {
    const updated = [...notes];
    updated[index].title = editTitle;
    updated[index].content = editContent;
    setNotes(updated);
    setEditIndex(null);
  };

  const deleteNote = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };
  const addNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const tag = newCategory;
    const newNote = {
      category: newCategory,
      title: newTitle,
      tag,
      date: new Date().toLocaleDateString(),
      content: newContent
    };
    setNotes([newNote, ...notes]);

    // Reset form
    setNewTitle("");
    setNewContent("");
    setNewCategory("Spiritual");
    setShowForm(false);
  };

  const categories = [...new Set(notes.map(note => note.category))];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Trip Notes</h1>
          <p className="text-sm text-gray-500">Keep track of important information and memories</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700">
          + Add Note
        </button>
      </div>
      {showForm && (
        <div className="bg-white rounded-lg border p-4 mb-6 shadow">
          <h2 className="text-lg font-semibold mb-3">Create New Note</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option>Spiritual</option>
                <option>Schedule</option>
                <option>Contacts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="Note title"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full border rounded px-2 py-2"
              rows={4}
              placeholder="Write note content..."
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={addNote}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {categories.map(category => (
        <div key={category} className="mb-10">
          <h2 className="bg-gray-100 p-3 rounded-xl text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2 p-3">
            <FileText className="w-5 h-5 text-gray-600" />

            {category} ({notes.filter(note => note.category === category).length})
          </h2>

          <div className="space-y-5">
            {notes
              .filter(note => note.category === category)
              .map((note, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 shadow p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                        {editIndex === i ? (
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="border-b border-gray-300 text-sm px-1 py-0.5"
                          />
                        ) : (
                          note.title
                        )}
                      </h3>
                      <span
                        className={classNames(
                          "text-xs font-medium px-2 py-1 mt-1 inline-block rounded-full",
                          {
                            "bg-green-100 text-green-800": note.tag === "Spiritual",
                            "bg-blue-100 text-blue-800": note.tag === "Schedule",
                            "bg-pink-100 text-pink-800": note.tag === "Contacts"
                          }
                        )}
                      >
                        {note.tag}
                      </span>
                    </div>

                    <div className="flex gap-2 text-gray-500">
                      {editIndex === i ? (
                        <button
                          onClick={() => saveEdit(i)}
                          className="text-blue-600 text-sm font-medium"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button onClick={() => startEdit(i)}>
                            <Pencil className="w-4 h-4 hover:text-blue-600" />
                          </button>
                          <button onClick={() => deleteNote(i)}>
                            <Trash className="w-4 h-4 hover:text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Created {note.date}
                  </p>

                  {editIndex === i ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border rounded p-2 text-sm text-gray-700"
                      rows={4}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                      {note.content}
                    </pre>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
