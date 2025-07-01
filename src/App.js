// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import LoginForm from './components/auth/LoginForm';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/common/Navbar';
import DeveloperDashboard from './pages/DeveloperDashboard';
import UserDashboard from './pages/auth/UserDashboard';
import DeveloperSignup from './pages/auth/DeveloperSignup';
import UserSignup from './pages/auth/UserSignup';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-role" element={<RoleSelection />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginForm userType="user" />} />
        <Route path="/developer/login" element={<LoginForm userType="developer" />} />
        <Route path="/user/login" element={<LoginForm userType="user" />} />
        
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/developer/signup" element={<DeveloperSignup />} />
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/developer/dashboard" 
          element={
            <ProtectedRoute requiredRole="developer">
              <DeveloperDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Other Routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;