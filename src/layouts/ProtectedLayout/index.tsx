import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/Auth.context';
import { useNavigation } from '@contexts/Navigation.context';
import { ROUTES, NavItem } from 'route/config';
import Sidebar from '@components/SideBar';
import { ReactNode, useState } from 'react';

/**
 * A layout component that protects routes requiring authentication.
 */
interface ProtectedLayoutProps {
  /** React components to render in the main content area */
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  // Authentication context for user info and auth state
  const { user, isAuthenticated } = useAuth();

  // Navigation context for sidebar state management
  const { sidebarExpanded, toggleSidebar } = useNavigation();
  const [currentPage, setCurrentPage] = useState<NavItem>('students');

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
      {/* Sidebar with user profile and navigation and toggle functionality */}
      <Sidebar
        username={user?.username ?? ''}
        userRole={user?.userRole ?? ''}
        userProfileImage={user?.userProfileImage ?? ''}
        onNavItemClick={(item) => {
          setCurrentPage(item);
          // Additional navigation logic
        }}
        expanded={sidebarExpanded}
        onToggleSidebar={toggleSidebar}
        activeItem={currentPage}
      />

      <main
        style={{ flex: 1 }}
        className={`content ${!sidebarExpanded ? 'content--expanded' : ''}`}
      >
        {children}
      </main>
    </div>
  );
};
export default ProtectedLayout;
