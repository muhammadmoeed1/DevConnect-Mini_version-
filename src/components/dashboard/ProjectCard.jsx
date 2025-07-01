import React from 'react';
import { FiClock, FiDollarSign, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const ProjectCard = ({ project, darkMode, isDeveloper = false }) => {
  const statusColors = {
    'In Progress': {
      bg: darkMode ? 'bg-blue-900' : 'bg-blue-100',
      text: darkMode ? 'text-blue-300' : 'text-blue-800',
      icon: <FiClock className="mr-1" />
    },
    'Pending': {
      bg: darkMode ? 'bg-yellow-900' : 'bg-yellow-100',
      text: darkMode ? 'text-yellow-300' : 'text-yellow-800',
      icon: <FiAlertCircle className="mr-1" />
    },
    'Completed': {
      bg: darkMode ? 'bg-green-900' : 'bg-green-100',
      text: darkMode ? 'text-green-300' : 'text-green-800',
      icon: <FiCheckCircle className="mr-1" />
    },
    'Review': {
      bg: darkMode ? 'bg-purple-900' : 'bg-purple-100',
      text: darkMode ? 'text-purple-300' : 'text-purple-800',
      icon: <FiCheckCircle className="mr-1" />
    }
  };

  const status = project.status || 'Pending';
  const colors = statusColors[status] || statusColors['Pending'];

  return (
    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {project.name || project.title}
        </h4>
        <span className={`text-xs px-2 py-1 rounded-full flex items-center ${colors.bg} ${colors.text}`}>
          {colors.icon}
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="flex items-center">
          <FiClock className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Due: {project.deadline}
          </span>
        </div>

        <div className="flex items-center">
          <FiDollarSign className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isDeveloper ? project.rate : project.budget}
          </span>
        </div>
      </div>

      {project.progress && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{project.progress}%</span>
          </div>
          <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className={`h-full rounded-full ${
                project.progress < 30 ? 'bg-red-500' :
                project.progress < 70 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;