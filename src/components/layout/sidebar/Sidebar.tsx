import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE } from '@constants/dummy-user';
import { NAV_ITEMS as navItems } from '@constants/nav-item';
import './Sidebar.css';

export type NavItem = 'home' | 'course' | 'students' | 'payment' | 'report' | 'setting';

interface ISidebarProps {
  username: string;
  userRole: string;
  userProfileImage?: string | null;
  activeItem?: NavItem;
  onNavItemClick?: (items: NavItem) => void;
  onLogout?: () => void;
  expanded: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({
  username,
  userRole,
  userProfileImage,
  onNavItemClick,
  onLogout,
  expanded = true,
}) => {
  const location = useLocation();
  const handleNavClick = (item: NavItem) => {
    if (onNavItemClick) {
      onNavItemClick(item);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <h1 className="sidebar__title">crud operations</h1>
      <div className="sidebar__profile">
        <div className="sidebar__profile-image">
          <img
            loading="lazy"
            src={userProfileImage || DEFAULT_PROFILE_IMAGE}
            alt="Profile"
            onError={(e) => {
              // Fallback to default image if the provided image fails to load
              (e.target as HTMLImageElement).src = DEFAULT_PROFILE_IMAGE;
            }}
          />
        </div>
        <h2 className="sidebar__profile-name">{username}</h2>
        <span className="sidebar__profile-role">{userRole}</span>
      </div>

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
      <button
        className="sidebar__logout"
        onClick={handleLogout}
        onKeyDown={(e) => e.key === 'Enter' && handleLogout()}
        tabIndex={0}
      >
        Logout
        <img
          loading="lazy"
          className="sidebar__logout-icon"
          src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/logout_qfh4jb.svg"
          alt="Logout"
        />
      </button>
    </aside>
  );
};
export default Sidebar;
