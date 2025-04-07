import * as React from 'react';
import Title from '@components/common/Title';
import NavigationLink from '../NavigationLink';
import UserCard from '../UserCard';
import { useAuth } from '@contexts/Auth.context';
import Button from '@components/common/Button';
import { NAV_ITEMS as navItems } from '@constants/nav-item';
import './index.css';
import ImageIcon from '@components/common/ImageIcon';

/**
 * Type definition for navigation items
 */
export type NavItem = 'home' | 'courses' | 'students' | 'payments' | 'reports' | 'settings';

/**
 * Props for the Sidebar component
 */
interface ISidebarProps {
  username: string;
  userRole: string;
  userProfileImage: string;
  /** Callback function for navigation item clicks */
  onNavItemClick: (item: NavItem) => void;
  /** Whether the sidebar is expanded or collapsed */
  expanded?: boolean;
  /** Callback function to toggle sidebar expansion */
  onToggleSidebar: () => void;
}

/**
 * Sidebar Component
 *
 * A collapsible sidebar that displays user information, navigation links,
 * and logout functionality
 */
const Sidebar = ({
  username,
  userRole,
  userProfileImage,
  onNavItemClick,
  expanded = false,
  onToggleSidebar,
}: ISidebarProps) => {
  // Get logout function from auth context
  const { logout } = useAuth();

  // Icons for toggle button
  const TOGGLE_ICON =
    'https://res.cloudinary.com/ds82onf5q/image/upload/v1743481499/arrowhead-up_wretmt.png';

  // Logout icon
  const LOGOUT_ICON =
    'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/logout_qfh4jb.svg';

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      {/* Application title */}
      <Title className="sidebar-title" title="crud operations" />

      {/* User profile information */}
      <UserCard username={username} userRole={userRole} userAvatar={userProfileImage} />

      {/* Navigation menu */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavigationLink
            key={item.name}
            text={item.text}
            to={item.to}
            icon={item.icon}
            className={item.name}
            onClick={() => {
              onNavItemClick(item.name as NavItem);
            }}
          />
        ))}
      </nav>

      {/* Logout button  */}
      <NavigationLink
        text="Logout"
        icon={LOGOUT_ICON}
        iconRight={true}
        className="sidebar-logout"
        onClick={() => logout()}
      />

      {/* Mobile-only toggle button with up/down arrows */}
      <Button variant="toggle" onClick={onToggleSidebar}>
        <ImageIcon src={TOGGLE_ICON} alt={expanded ? 'Collapse sidebar' : 'Expand sidebar'} />
      </Button>
    </aside>
  );
};

export default Sidebar;
