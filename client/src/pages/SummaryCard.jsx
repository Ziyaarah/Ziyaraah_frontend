// SummaryCards.jsx
import { Calendar, BarChart2, CheckCircle, BookOpen } from 'lucide-react';

const stats = [
  { icon: <Calendar />, label: 'Active Journeys', value: '3', color: 'text-blue-600' },
  { icon: <BarChart2 />, label: 'Progress', value: '50%', color: 'text-orange-500' },
  { icon: <CheckCircle />, label: 'Completed Tasks', value: '8', color: 'text-green-600' },
  { icon: <BookOpen />, label: 'Total Tasks', value: '16', color: 'text-yellow-600' },
];

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((item, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className={`p-2 rounded-full bg-gray-100 ${item.color}`}>{item.icon}</div>
          <div>
            <p className="text-lg font-semibold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
