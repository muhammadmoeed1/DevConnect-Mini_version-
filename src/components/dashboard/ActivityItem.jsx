import React from 'react';
import { FiCheckCircle, FiDollarSign, FiCode, FiMessageSquare } from 'react-icons/fi';

const ActivityItem = ({ activity, darkMode }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'bid-accepted':
        return <FiDollarSign className="text-blue-500" />;
      case 'milestone-completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'new-message':
        return <FiMessageSquare className="text-purple-500" />;
      case 'code-update':
        return <FiCode className="text-yellow-500" />;
      default:
        return <FiCheckCircle className="text-gray-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'bid-accepted':
        return darkMode ? 'bg-blue-900' : 'bg-blue-100';
      case 'milestone-completed':
        return darkMode ? 'bg-green-900' : 'bg-green-100';
      case 'new-message':
        return darkMode ? 'bg-purple-900' : 'bg-purple-100';
      case 'code-update':
        return darkMode ? 'bg-yellow-900' : 'bg-yellow-100';
      default:
        return darkMode ? 'bg-gray-700' : 'bg-gray-200';
    }
  };

  return (
    <div className="flex items-start py-3">
      <div className={`p-2 rounded-full mr-3 ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {activity.message}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {activity.time}
          </p>
          {activity.project && (
            <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              {activity.project}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;