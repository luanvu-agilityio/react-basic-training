import * as React from 'react';
import { useLocation } from 'react-router-dom';
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
  /** Username to display in the user card */
  username: string;
  /** User role to display in the user card */
  userRole: string;
  /** URL of the user's profile image */
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
  // Get current location for active route highlighting
  const location = useLocation();

  // Get logout function from auth context
  const { logout } = useAuth();

  // Icons for toggle button
  const DESCENDING_ICON =
    'https://res.cloudinary.com/ds82onf5q/image/upload/v1743481498/arrowhead-down_zrhsqk.png';
  const ASCENDING_ICON =
    'https://res.cloudinary.com/ds82onf5q/image/upload/v1743481499/arrowhead-up_wretmt.png';

  // Logout icon
  const LOGOUT_ICON =
    'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/logout_qfh4jb.svg';

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      {/* Application title */}
      <Title className="sidebar__title" title="crud operations" />

      {/* User profile information */}
      <UserCard username={username} userRole={userRole} userAvatar={userProfileImage} />

      {/* Navigation menu */}
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavigationLink
            key={item.name}
            text={item.text}
            to={item.to}
            icon={item.icon}
            isActive={location.pathname === item.to}
            className={item.name}
            onClick={() => {
              onNavItemClick(item.name as NavItem);
            }}
            testId={`nav-item-${item.name}`}
          />
        ))}
      </nav>

      {/* Logout button  */}
      <NavigationLink
        text="Logout"
        icon={LOGOUT_ICON}
        iconRight={true}
        className="sidebar__logout"
        onClick={() => logout()}
        testId="logout-button"
      />

      {/* Mobile-only toggle button with up/down arrows */}
      <Button className="mobile-sidebar-toggle" onClick={onToggleSidebar}>
        <ImageIcon
          src={expanded ? DESCENDING_ICON : ASCENDING_ICON}
          alt={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        />
      </Button>
    </aside>
  );
};

export default Sidebar;
