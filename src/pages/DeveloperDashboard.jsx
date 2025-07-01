import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiBriefcase, FiUser, FiMessageSquare, FiLogOut, FiDollarSign, FiMenu, FiX } from 'react-icons/fi';
import ProjectCard from '../components/dashboard/ProjectCard';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityItem from '../components/dashboard/ActivityItem';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock data
  const activeProjects = [
    { id: 1, name: 'E-commerce Website', progress: 75, deadline: '2023-12-15', rate: '$75/hr', status: 'In Progress' },
    { id: 2, name: 'Mobile App Development', progress: 30, deadline: '2024-02-20', rate: '$90/hr', status: 'Pending' },
  ];
  
  const recentBids = [
    { id: 1, project: 'Social Media Platform', amount: '$5000', status: 'Pending' },
    { id: 2, project: 'API Integration', amount: '$2500', status: 'Accepted' },
  ];

  const recentActivity = [
    { id: 1, type: 'bid-accepted', message: 'John Doe accepted your bid for E-commerce Website', time: '2 hours ago' },
    { id: 2, type: 'milestone-completed', message: 'You completed milestone for Mobile App Development', time: '1 day ago' },
  ];

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
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
      <div className={`fixed inset-y-0 left-0 w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">DevConnect</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/developer/dashboard" 
                className={`flex items-center p-2 rounded-lg font-medium ${darkMode ? 'text-white bg-gray-700' : 'text-blue-600 bg-blue-50'}`}
              >
                <FiBriefcase className="mr-3" />
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/developer/profile" 
                className={`flex items-center p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                <FiUser className="mr-3" />
                Profile
              </Link>
            </li>
            <li>
              <Link 
                to="/developer/messages" 
                className={`flex items-center p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                <FiMessageSquare className="mr-3" />
                Messages
              </Link>
            </li>
            <li>
              <button 
                onClick={() => navigate('/')}
                className={`w-full flex items-center p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-red-500 hover:bg-gray-700' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'}`}
              >
                <FiLogOut className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Welcome back, Developer!
          </h2>
          <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Here's what's happening with your projects today.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatsCard 
            icon={<FiBriefcase className="text-blue-600 dark:text-blue-300" />}
            title="Active Projects"
            value={activeProjects.length}
            darkMode={darkMode}
            color="blue"
          />
          <StatsCard 
            icon={<FiDollarSign className="text-green-600 dark:text-green-300" />}
            title="Total Earnings"
            value="$7,500"
            darkMode={darkMode}
            color="green"
          />
          <StatsCard 
            icon={<FiMessageSquare className="text-purple-600 dark:text-purple-300" />}
            title="Unread Messages"
            value="3"
            darkMode={darkMode}
            color="purple"
          />
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Active Projects */}
          <div className={`p-4 md:p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <FiBriefcase className="mr-2 text-blue-500" />
              Active Projects
            </h3>
            
            {activeProjects.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {activeProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    darkMode={darkMode} 
                    isDeveloper={true}
                  />
                ))}
              </div>
            ) : (
              <div className={`p-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiBriefcase className="mx-auto h-10 w-10 mb-3 md:h-12 md:w-12 md:mb-4" />
                <p className="text-sm md:text-base">No active projects yet</p>
                <button 
                  onClick={() => navigate('/projects/new')}
                  className="mt-3 text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Create your first project
                </button>
              </div>
            )}
          </div>
          
          {/* Recent Bids */}
          <div className={`p-4 md:p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <FiDollarSign className="mr-2 text-green-500" />
              Recent Bids
            </h3>
            
            <div className="space-y-3 md:space-y-4">
              {recentBids.map(bid => (
                <div key={bid.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} pb-3 md:pb-4 last:border-0 last:pb-0`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm md:text-base font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {bid.project}
                    </h4>
                    <span className={`text-xs md:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {bid.amount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${
                      bid.status === 'Accepted' 
                        ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                        : bid.status === 'Rejected' 
                          ? darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                          : darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bid.status}
                    </span>
                    <button className="text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className={`p-4 md:p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <svg className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Recent Activity
          </h3>
          
          <div className="space-y-2 md:space-y-3">
            {recentActivity.map(activity => (
              <ActivityItem 
                key={activity.id} 
                activity={activity} 
                darkMode={darkMode} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;