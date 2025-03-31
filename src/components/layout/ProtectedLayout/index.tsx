import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/Auth.context';
import { useNavigation } from '@contexts/Navigation.context';
import { ROUTES } from 'route/config';
import Sidebar from '../SideBar';
import SidebarToggle from '../SidebarToggle';
import { LoadingSpinnerContainer } from '@components/common/LoadingSpinner';

/**
 * A layout component that protects routes requiring authentication.
 */
interface ProtectedLayoutProps {
  /** React components to render in the main content area */
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  // Authentication context for user info and auth state
  const { user, isAuthenticated } = useAuth();

  // Navigation context for sidebar state management
  const { sidebarExpanded, setActiveItem, toggleSidebar } = useNavigation();

  /**
   * Authentication check
   * Redirects to login page if user is not authenticated
   */
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div
      className="dashboard"
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
      }}
    >
      {/* Sidebar with user profile and navigation */}
      <Sidebar
        username={user?.username ?? ''}
        userRole={user?.userRole ?? ''}
        userProfileImage={user?.userProfileImage ?? ''}
        onNavItemClick={setActiveItem}
        expanded={sidebarExpanded}
      />

      {/* Toggle button for sidebar expansion */}
      <SidebarToggle onToggle={toggleSidebar} />

      <main
        style={{ flex: 1 }}
        className={`content ${!sidebarExpanded ? 'content--expanded' : ''}`}
      >
        {children}
      </main>

      {/* Global loading spinner container */}
      <LoadingSpinnerContainer />
    </div>
  );
};
export default ProtectedLayout;
