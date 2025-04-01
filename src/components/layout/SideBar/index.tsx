import * as React from 'react';
import { SidebarNavigation } from './NavigationLink';
import { Logout } from './Logout';
import { Title } from '@components/common/Title';
import UserCard from './UserCard';
import { useAuth } from '@contexts/Auth.context';
import './index.css';
import Button from '@components/common/Button';
/**
 * Sidebar Component
 *
 * A collapsible sidebar that displays user information, navigation links,
 * and logout functionality.
 *
 * Features:
 * - Expandable/collapsible layout
 * - User profile display
 * - Navigation menu with icons
 * - Logout functionality
 * - Responsive design
 *
 */
export type NavItem = 'home' | 'courses' | 'students' | 'payments' | 'reports' | 'settings';

interface ISidebarProps {
  username: string;
  userRole: string;
  userProfileImage: string;
  /** Callback function for navigation item clicks */
  onNavItemClick: (items: NavItem) => void;
  expanded?: boolean;
  onToggleSidebar: () => void;
}

/**
 * Sidebar component implementation
 * Renders a sidebar with user information, navigation, and logout functionality
 */
const Sidebar: React.FC<ISidebarProps> = ({
  username,
  userRole,
  userProfileImage,
  onNavItemClick,
  expanded = false,
  onToggleSidebar,
}) => {
  // Get logout function from auth context
  const { logout } = useAuth();

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      {/* Application title */}
      <Title className="sidebar__title" title="crud operations" />

      {/* User profile information */}
      <UserCard username={username} userRole={userRole} userAvatar={userProfileImage} />

      {/* Navigation menu */}
      <SidebarNavigation onNavItemClick={onNavItemClick} />

      {/* Logout button */}
      <Logout onLogout={logout} />

      {/* Mobile-only toggle button with up/down arrows */}
      <Button className="mobile-sidebar-toggle" onClick={onToggleSidebar}>
        <img
          src={
            expanded
              ? 'https://res.cloudinary.com/ds82onf5q/image/upload/v1743481498/arrowhead-down_zrhsqk.png'
              : 'https://res.cloudinary.com/ds82onf5q/image/upload/v1743481499/arrowhead-up_wretmt.png'
          }
          alt={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        />
      </Button>
    </aside>
  );
};
export default Sidebar;
