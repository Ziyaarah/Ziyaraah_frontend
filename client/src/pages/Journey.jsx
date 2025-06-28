// JourneyCards.jsx
const JourneyCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Current Journey Card */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold text-gray-800 mb-1">📍 Current Journey</h3>
        <p className="text-sm font-medium">Umrah 2024 - Spring</p>
        <p className="text-xs text-gray-500 mb-4">Umrah Pilgrimage</p>
        <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#038A62] w-1/2 rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Start: 3/14/2024</span>
          <span>End: 3/21/2024</span>
        </div>
      </div>

      {/* Journey Stages */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold text-gray-800 mb-3">🌐 Journey Stages</h3>
        <div className="space-y-4 overflow-y-auto max-h-48 pr-2">
          {/* Stage 1 */}
          <div>
            <div className="flex justify-between text-sm">
              <p className="font-medium">1. Travel & Arrival</p>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">In Progress</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-full bg-[#038A62]w-1/2 rounded-full" />
            </div>
            <p className="text-xs text-gray-500 mt-1">2 of 4 tasks completed</p>
          </div>

          {/* Stage 2 */}
          <div>
            <div className="flex justify-between text-sm">
              <p className="font-medium">2. Miqat</p>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">In Progress</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-full bg-[#038A62] w-1/4 rounded-full" />
            </div>
            <p className="text-xs text-gray-500 mt-1">1 of 4 tasks completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyCards;
