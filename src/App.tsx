import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PAGE_CONFIG, ROUTES, RouteConfig } from 'route/config';
import LoginForm from '@pages/LoginPage';
import { AuthProvider } from '@contexts/Auth.context';
import { NavigationProvider } from '@contexts/Navigation.context';
import { ToastProvider } from 'contexts/Toast.context';
import ProtectedLayout from '@components/ProtectedLayout';
import { GenericPage } from '@pages/GenericPage';
import './styles/index.css';

/**
 * App Component
 *
 * Root component of the application that sets up routing and context providers.
 * Configures routes based on PAGE_CONFIG and handles authentication protection.
 *
 * Providers:
 * - Router: Handles routing functionality
 * - ToastProvider: Manages notifications
 * - AuthProvider: Handles authentication state
 * - NavigationProvider: Manages navigation state
 *
 * Routes:
 * - Login: Public route for authentication
 * - Dynamic Protected Routes: Based on PAGE_CONFIG
 * - Fallback Route: Redirects unknown paths to home
 *
 * @returns {JSX.Element} Application with routing configuration
 */

function App(): JSX.Element {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <NavigationProvider>
            <Routes>
              {/* Login Route */}
              <Route path={ROUTES.LOGIN} element={<LoginForm />} />

              {/* Dynamic Protected Routes */}
              {PAGE_CONFIG.map(({ path, name, component }: RouteConfig) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedLayout>
                      {component ? React.createElement(component) : <GenericPage pageName={name} />}
                    </ProtectedLayout>
                  }
                />
              ))}

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
            </Routes>
          </NavigationProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
