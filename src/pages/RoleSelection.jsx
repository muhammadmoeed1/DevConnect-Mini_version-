import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiCode, FiUsers, FiArrowRight } from 'react-icons/fi';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Join DevConnect as
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Select your role to get started with DevConnect
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div 
          onClick={() => navigate('/developer/signup')}
          className={`p-8 rounded-xl shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-500 hover:shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
        >
          <div className={`p-4 rounded-full mb-6 inline-flex ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
            <FiCode className={`h-12 w-12 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
          </div>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            I'm a Developer
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Looking for projects to work on and grow my portfolio
          </p>
          <div className="flex items-center justify-center text-blue-500">
            <span>Get started</span>
            <FiArrowRight className="ml-2" />
          </div>
        </div>
        
        <div 
          onClick={() => navigate('/user/signup')}
          className={`p-8 rounded-xl shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-500 hover:shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
        >
          <div className={`p-4 rounded-full mb-6 inline-flex ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
            <FiUsers className={`h-12 w-12 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
          </div>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            I'm a User
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Looking to hire developers for my projects
          </p>
          <div className="flex items-center justify-center text-green-500">
            <span>Get started</span>
            <FiArrowRight className="ml-2" />
          </div>
        </div>
      </div>
      
      <p className={`mt-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Already have an account? 
        <button 
          onClick={() => navigate('/login')} 
          className={`ml-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default RoleSelection;