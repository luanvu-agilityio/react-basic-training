import { createElement, JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PAGE_CONFIG, ROUTES, RouteConfig } from 'route/config';
import LoginForm from '@pages/LoginPage';
import { AuthProvider, useAuth } from '@contexts/Auth.context';
import { NavigationProvider } from '@contexts/Navigation.context';
import { ToastProvider } from 'contexts/Toast.context';
import ProtectedLayout from '@layouts/ProtectedLayout';
import { PageLayout } from 'layouts/PageLayout';
import './styles/index.css';
import PublicLayout from 'layouts/PublicLayout';

/**
 * Route component that handles layout and authentication for each route.
 *
 * Render a route with the appropriate layout based on authentication status and route configuration.
 * If the route is public, it will render the PublicLayout. Otherwise, it will render the ProtectedLayout.
 */
const RouteWithLayout = ({ config }: { config: RouteConfig }) => {
  const { isAuthenticated } = useAuth();
  const { name, component, isPublic } = config;

  if (isPublic) {
    return isAuthenticated ? (
      <ProtectedLayout>
        {component ? createElement(component) : <PageLayout pageName={name} />}
      </ProtectedLayout>
    ) : (
      <PublicLayout>
        {component ? createElement(component) : <PageLayout pageName={name} />}
      </PublicLayout>
    );
  }
  return (
    <ProtectedLayout>
      {component ? createElement(component) : <PageLayout pageName={name} />}
    </ProtectedLayout>
  );
};

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to the default route
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DEFAULT} />;
  }

  // Otherwise, show login form
  return <LoginForm />;
};
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
              <Route path={ROUTES.LOGIN} element={<LoginRoute />} />

              {/* Dynamic Routes */}
              {PAGE_CONFIG.map((config: RouteConfig) => (
                <Route
                  key={config.path}
                  path={config.path}
                  element={<RouteWithLayout config={config} />}
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
