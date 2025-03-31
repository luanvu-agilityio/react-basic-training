import { NAV_ITEMS as navItems } from '@constants/nav-item';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
export type NavItem = 'home' | 'courses' | 'students' | 'payments' | 'reports' | 'settings';
import './index.css';

/**
 * SidebarNavigation Component
 *
 * A navigation component that renders a list of links with icons for sidebar navigation.
 *
 */
interface NavigationLinkProps {
  /** Callback function triggered when a navigation item is clicked */
  onNavItemClick: (item: NavItem) => void;
}

export const SidebarNavigation: React.FC<NavigationLinkProps> = ({ onNavItemClick }) => {
  // Get current location for active route highlighting
  const location = useLocation();

  /**
   * Handles navigation item clicks
   * Triggers the provided callback with the selected item
   *
   * @param item - The navigation item that was clicked
   */
  const handleNavClick = (item: NavItem) => {
    if (onNavItemClick) {
      onNavItemClick(item);
    }
  };

  return (
    <nav className="sidebar__nav">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className={`sidebar__nav-item ${item.name} ${location.pathname === item.to ? 'active' : ''}`}
          onClick={() => handleNavClick(item.name as NavItem)}
        >
          {item.icon && (
            <img
              loading="lazy"
              className="sidebar__nav-icon"
              src={item.icon || undefined}
              alt={item.text}
              onError={(e) => {
                // Hide the image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <p className="sidebar__nav-text">{item.text}</p>
        </Link>
      ))}
    </nav>
  );
};
