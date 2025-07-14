import React from 'react';

const ritualData = [
  {
    stage: 'Travel & Arrival',
    description: 'Prepare for departure and arrive safely in the Holy Land',
    progress: 2,
    total: 4,
    items: [
      { text: 'Pack ihram clothing', type: 'Mandatory', done: false },
      { text: 'Obtain necessary documents', type: 'Mandatory', done: false },
      { text: 'Make travel dua', type: 'Sunnah', done: false },
      { text: 'Pack prayer mat and Quran', type: 'Preparation', done: false },
    ],
  },
  {
    stage: 'Miqat',
    description: 'Enter the state of Ihram at the designated boundary',
    progress: 1,
    total: 4,
    items: [
      { text: 'Perform Ghusl (ritual bath)', type: 'Sunnah', done: false },
      { text: 'Wear Ihram clothing', type: 'Mandatory', done: false },
      { text: 'Declare intention (Niyyah)', type: 'Mandatory', done: false },
      { text: 'Recite Talbiyah', type: 'Mandatory', done: false },
    ],
  },
  {
    stage: 'Tawaf',
    description: 'Circumambulate the Kaaba seven times',
    progress: 3,
    total: 4,
    items: [
      { text: 'Kiss or point to Hajar al-Aswad', type: 'Sunnah', done: false },
      { text: 'Complete 7 circuits counter-clockwise', type: 'Mandatory', done: false },
      { text: 'Perform 2 Rak\'ah at Maqam Ibrahim', type: 'Mandatory', done: false },
      { text: 'Make dua during Tawaf', type: 'Sunnah', done: false },
    ],
  },
  {
    stage: 'Sai',
    description: 'Walk between Safa and Marwah hills seven times',
    progress: 2,
    total: 4,
    items: [
      { text: 'Start at Mount Safa', type: 'Mandatory', done: false },
      { text: 'Complete 7 trips between Safa and Marwah', type: 'Mandatory', done: false },
      { text: 'Make dua at both hills', type: 'Sunnah', done: false },
      { text: 'Drink Zamzam water', type: 'Sunnah', done: false },
    ],
  },
];

const typeColors = {
  Mandatory: 'bg-red-100 text-red-700 border-red-200',
  Sunnah: 'bg-blue-100 text-blue-700 border-blue-200',
  Preparation: 'bg-green-100 text-green-700 border-green-200',
};

const RitualTracker = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
     
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Ritual Tracker</h1>
        <p className="text-gray-500 mb-6">Track your spiritual obligations and sunnah practices</p>
        <div className="bg-gray-900 text-white rounded-xl p-6 mb-6">
          <div className="text-lg font-semibold">Umrah 2025 - Spring</div>
          <div className="text-sm text-gray-300">Umrah Pilgrimage</div>
        </div>
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Filter by Stage</label>
            <select className="rounded-lg border-gray-200 text-gray-700 px-3 py-2 w-48">
              <option>All Stages</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Filter by Type</label>
            <select className="rounded-lg border-gray-200 text-gray-700 px-3 py-2 w-48">
              <option>All Types</option>
            </select>
          </div>
        </div>
        {/* Ritual Stages */}
        <div className="flex flex-col gap-8">
          {ritualData.map((stage, idx) => (
            <div key={stage.stage} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-lg text-gray-800">{stage.stage}</div>
                  <div className="text-sm text-gray-500">{stage.description}</div>
                </div>
                <div className="text-xs text-gray-500 font-medium">{stage.progress}/{stage.total} ({Math.round((stage.progress/stage.total)*100)}%)</div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(stage.progress / stage.total) * 100}%` }}
                ></div>
              </div>
              <ul className="flex flex-col gap-2">
                {stage.items.map((item, i) => (
                  <li key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${item.done ? 'bg-green-50 line-through text-green-700' : 'bg-white text-gray-800'} ${typeColors[item.type] || ''}`}>
                    <span className="flex items-center gap-2">
                      {item.done && (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      )}
                      {item.text}
                    </span>
                    <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded border ${typeColors[item.type]}`}>{item.type === 'Mandatory' ? 'Mandatory' : item.type === 'Sunnah' ? 'Sunnah' : 'Preparation'}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Ritual Types Legend */}
        <div className="mt-10 flex gap-6">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> <span className="text-xs text-gray-700">Mandatory (Fard)</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> <span className="text-xs text-gray-700">Sunnah</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> <span className="text-xs text-gray-700">Preparation</span></div>
        </div>
      </main>
    </div>
  );
};

export default RitualTracker;