import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FiCode, FiHome, FiLogIn, FiUserPlus, FiSun, 
  FiMoon, FiLogOut, FiUser, FiMenu, FiX
} from 'react-icons/fi';

const Navbar = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginChoice = (userType) => {
    navigate(`/${userType}/login`);
    setShowLoginOptions(false);
    setMobileMenuOpen(false);
  };

  const handleSignupChoice = (userType) => {
    navigate(`/${userType}/signup`);
    setShowSignupOptions(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo with icon */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-2">
              <FiCode className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>
                DevConnect
              </span>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <FiX className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                ) : (
                  <FiMenu className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <FiHome className="mr-1" /> Home
            </Link>

            {!user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowLoginOptions(!showLoginOptions)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}
                  >
                    <FiLogIn className="mr-1" /> Login
                  </button>
                  
                  {showLoginOptions && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                      <button
                        onClick={() => handleLoginChoice('developer')}
                        className={`block px-4 py-2 text-sm w-full text-left flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiCode className="mr-2" /> As Developer
                      </button>
                      <button
                        onClick={() => handleLoginChoice('user')}
                        className={`block px-4 py-2 text-sm w-full text-left flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiUser className="mr-2" /> As User
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSignupOptions(!showSignupOptions)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    <FiUserPlus className="mr-1" /> Signup
                  </button>
                  
                  {showSignupOptions && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                      <button
                        onClick={() => handleSignupChoice('developer')}
                        className={`block px-4 py-2 text-sm w-full text-left flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiCode className="mr-2" /> As Developer
                      </button>
                      <button
                        onClick={() => handleSignupChoice('user')}
                        className={`block px-4 py-2 text-sm w-full text-left flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiUser className="mr-2" /> As User
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}
              >
                <FiLogOut className="mr-1" /> Logout
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full focus:outline-none"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <FiSun className="h-5 w-5 text-yellow-300" />
              ) : (
                <FiMoon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiHome className="mr-2" /> Home
            </Link>

            {!user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowLoginOptions(!showLoginOptions)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}`}
                  >
                    <FiLogIn className="mr-2" /> Login
                  </button>
                  
                  {showLoginOptions && (
                    <div className="ml-4 mt-1 space-y-1">
                      <button
                        onClick={() => handleLoginChoice('developer')}
                        className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiCode className="mr-2" /> As Developer
                      </button>
                      <button
                        onClick={() => handleLoginChoice('user')}
                        className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiUser className="mr-2" /> As User
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSignupOptions(!showSignupOptions)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    <FiUserPlus className="mr-2" /> Signup
                  </button>
                  
                  {showSignupOptions && (
                    <div className="ml-4 mt-1 space-y-1">
                      <button
                        onClick={() => handleSignupChoice('developer')}
                        className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiCode className="mr-2" /> As Developer
                      </button>
                      <button
                        onClick={() => handleSignupChoice('user')}
                        className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiUser className="mr-2" /> As User
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}`}
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {darkMode ? (
                <>
                  <FiSun className="mr-2 text-yellow-300" /> Light Mode
                </>
              ) : (
                <>
                  <FiMoon className="mr-2 text-gray-700" /> Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;