import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setTimeout(() => navigate('/user/login'), 2000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6 bg-green-600 text-white">
            <h2 className="text-xl md:text-2xl font-bold">Signup Successful!</h2>
            <p className="text-sm md:text-base">Please proceed to login</p>
          </div>
          <div className="p-4 md:p-6 text-center">
            <p className={`text-sm md:text-base mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You'll be redirected to the login page shortly...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-6 bg-green-600 text-white">
          <h2 className="text-xl md:text-2xl font-bold">User Sign Up</h2>
          <p className="text-sm md:text-base">Create your account to find developers</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-3 md:space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={`block text-sm md:text-base font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`pl-9 md:pl-10 w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'
                } dark:bg-gray-700 text-gray-900 dark:text-gray-200`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs md:text-sm text-red-600">{errors.name}</p>}
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={`block text-sm md:text-base font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-9 md:pl-10 w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'
                } dark:bg-gray-700 text-gray-900 dark:text-gray-200`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs md:text-sm text-red-600">{errors.email}</p>}
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className={`block text-sm md:text-base font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-9 md:pl-10 w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'
                } dark:bg-gray-700 text-gray-900 dark:text-gray-200`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 md:h-5 w-4 md:w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <FiEye className="h-4 md:h-5 w-4 md:w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs md:text-sm text-red-600">{errors.password}</p>}
          </div>
          
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className={`block text-sm md:text-base font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`pl-9 md:pl-10 w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'
                } dark:bg-gray-700 text-gray-900 dark:text-gray-200`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="h-4 md:h-5 w-4 md:w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <FiEye className="h-4 md:h-5 w-4 md:w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs md:text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          
          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
              required
            />
            <label htmlFor="terms" className={`ml-2 block text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I agree to the Terms and Conditions
            </label>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-2 md:py-3 px-4 rounded-lg transition duration-300 ${
              isSubmitting ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'
            } text-white font-medium md:font-bold text-sm md:text-base`}
          >
            {isSubmitting ? (
              'Creating Account...'
            ) : (
              <>
                Sign Up <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
          
          {/* Error Message */}
          {errors.submit && (
            <div className="p-2 md:p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-xs md:text-sm">
              {errors.submit}
            </div>
          )}
          
          {/* Login Link */}
          <p className={`text-center text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/user/login')}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;