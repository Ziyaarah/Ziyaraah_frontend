// QuickLinks.jsx
import { Heart, Book, Users } from 'lucide-react';

const quickLinks = [
  {
    // icon: <Heart />,
    title: 'Daily Prayers',
    subtitle: 'Track your spiritual practice',
    bg: 'bg-[#038A62]',
  },
  {
    icon: <Book />,
    title: 'Quran Study',
    subtitle: 'Daily verses and reflection',
    bg: 'bg-yellow-500',
  },
  {
    icon: <Users />,
    title: 'Community',
    subtitle: 'Connect with fellow pilgrims',
    bg: 'bg-blue-600',
  },
];

const QuickLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quickLinks.map((link, i) => (
        <div key={i} className={`text-white p-4 rounded-xl shadow flex flex-col gap-2 ${link.bg}`}>
          <div className="flex items-center gap-2 text-lg font-medium">
            {link.icon}
            {link.title}
          </div>
          <p className="text-sm opacity-90">{link.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickLinks;
