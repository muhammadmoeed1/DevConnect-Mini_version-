import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Here you would typically call an API
    console.log('Reset password email sent to:', email);
    setIsSubmitted(true);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {isSubmitted ? (
          <>
            <div className="p-6 bg-green-600 text-white">
              <h2 className="text-2xl font-bold">Email Sent!</h2>
              <p>We've sent a password reset link to your email</p>
            </div>
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <FiCheck className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Please check your inbox at <span className="font-medium">{email}</span> and follow the instructions to reset your password.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="p-6 bg-green-600 text-white">
              <h2 className="text-2xl font-bold">Forgot Password</h2>
              <p>Enter your email to reset your password</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'
                    } dark:bg-gray-700 text-gray-900 dark:text-gray-200`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                Send Reset Link
              </button>
              
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`mt-4 flex items-center text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <FiArrowLeft className="mr-1" /> Back to login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;