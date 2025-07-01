// src/components/dashboard/StatsCard.jsx
import React from 'react';

const StatsCard = ({ icon, title, value, darkMode, color = 'blue' }) => {
  const colors = {
    blue: { light: 'bg-blue-100 text-blue-800', dark: 'bg-blue-900 text-blue-200' },
    green: { light: 'bg-green-100 text-green-800', dark: 'bg-green-900 text-green-200' },
    purple: { light: 'bg-purple-100 text-purple-800', dark: 'bg-purple-900 text-purple-200' }
  };

  return (
    <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${darkMode ? colors[color].dark : colors[color].light}`}>
          {icon}
        </div>
        <div>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;