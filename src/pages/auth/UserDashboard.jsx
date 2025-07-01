import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { FiBriefcase, FiDollarSign, FiMessageSquare, FiUser, FiLogOut, FiClock, FiMenu, FiX } from 'react-icons/fi';
import ProjectCard from '../../components/dashboard/ProjectCard';
import StatsCard from '../../components/dashboard/StatsCard';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const activeProjects = [
    { id: 1, title: 'E-commerce Website', budget: '$5000', status: 'In Progress', deadline: '2023-12-15' },
    { id: 2, title: 'Mobile App Development', budget: '$7500', status: 'Review', deadline: '2024-01-20' }
  ];

  const recentMessages = [
    { id: 1, developer: 'John Smith', project: 'E-commerce Website', time: '2 hours ago' },
    { id: 2, developer: 'Sarah Johnson', project: 'Mobile App', time: '1 day ago' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-md ${darkMode ? 'text-white bg-gray-700' : 'text-gray-700 bg-white'}`}
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-green-600 dark:text-green-400">DevConnect</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">User Dashboard</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/user/dashboard" 
                className={`flex items-center p-2 rounded-lg font-medium ${darkMode ? 'text-white bg-gray-700' : 'text-green-600 bg-green-50'}`}
              >
                <FiBriefcase className="mr-3" /> My Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/user/messages" 
                className={`flex items-center p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiMessageSquare className="mr-3" /> Messages
              </Link>
            </li>
            <li>
              <Link 
                to="/user/profile" 
                className={`flex items-center p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiUser className="mr-3" /> Profile
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400"
              >
                <FiLogOut className="mr-3" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Here's what's happening with your projects
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatsCard 
            icon={<FiBriefcase className="text-green-600 dark:text-green-300" />}
            title="Active Projects"
            value={activeProjects.length}
            darkMode={darkMode}
            color="green"
          />
          <StatsCard 
            icon={<FiDollarSign className="text-blue-600 dark:text-blue-300" />}
            title="Total Budget"
            value="$12,500"
            darkMode={darkMode}
            color="blue"
          />
          <StatsCard 
            icon={<FiMessageSquare className="text-purple-600 dark:text-purple-300" />}
            title="Unread Messages"
            value={recentMessages.length}
            darkMode={darkMode}
            color="purple"
          />
        </div>

        {/* Active Projects */}
        <div className={`p-4 md:p-6 rounded-lg shadow mb-6 md:mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <FiBriefcase className="mr-2 text-green-600 dark:text-green-400" />
            Active Projects
          </h3>
          
          <div className="space-y-3 md:space-y-4">
            {activeProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                darkMode={darkMode} 
                isDeveloper={false}
              />
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className={`p-4 md:p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <FiMessageSquare className="mr-2 text-purple-600 dark:text-purple-400" />
            Recent Messages
          </h3>
          
          <div className="space-y-3 md:space-y-4">
            {recentMessages.map(message => (
              <div 
                key={message.id} 
                className={`p-3 md:p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className={`text-sm md:text-base font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{message.developer}</h4>
                    <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message.project}</p>
                  </div>
                  <div className="flex items-center">
                    <FiClock className={`mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {message.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;