import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from './Header';
import { Department } from './Department';
import Employee from './Employee';
import Footer from './Footer';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import apiService from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = apiService.getAccessToken();
      if (accessToken && !apiService.isTokenExpired(accessToken)) {
        try {
          const userData = await apiService.getCurrentUser();
          console.log('Authenticated user:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear storage
          apiService.clearTokens();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      const refreshToken = apiService.getRefreshToken();
      if (refreshToken) {
        await apiService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiService.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // Dashboard Component with Header and Footer
  const DashboardLayout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-grow mt-4 w-[80vw] mx-auto">
        <div className="w-full px-6 py-8">
          <Dashboard />
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Landing />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register onRegisterSuccess={handleRegisterSuccess} />
              )
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/department" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Header user={user} onLogout={handleLogout} />
                  <main className="flex-grow mt-4 w-[80vw] mx-auto">
                    <div className="w-full px-6 py-8">
                      <Department />
                    </div>
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Header user={user} onLogout={handleLogout} />
                  <main className="flex-grow mt-4 w-[80vw] mx-auto">
                    <div className="w-full px-6 py-8">
                      <Employee />
                    </div>
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;