import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const DEFAULT_PROFILE_IMAGE =
  'https://res.cloudinary.com/ds82onf5q/image/upload/v1741144070/dfh4itqdkturgj3yqtwn.jpg';

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

  const navItems = [
    {
      to: '/home',
      name: 'home',
      icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/home_ydi5zu.svg',
      text: 'Home',
    },
    {
      to: '/courses',
      name: 'course',
      icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867570/course_d2jfjd.svg',
      text: 'Course',
    },
    {
      to: '/students',
      name: 'student',
      icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867572/student_irxgld.svg',
      text: 'Students',
    },
    {
      to: '/Payment',
      name: 'payment',
      icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/payment_peqmdt.svg',
      text: 'Payment',
    },
    {
      to: '/Report',
      name: 'report',
      icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/report_rm69ya.svg',
      text: 'Report',
    },
    {
      to: '/Setting',
      name: 'setting',
      icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/setting_qbe1fw.svg',
      text: 'Setting',
    },
  ];

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <h1 className="sidebar__title">crud operations</h1>
      <div className="sidebar__profile">
        <div className="sidebar__profile-image">
          <img
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
                className="sidebar__nav-icon"
                src={item.icon}
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
      <div className="sidebar__logout" onClick={handleLogout}>
        Logout
        <img
          className="sidebar__logout-icon"
          src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/logout_qfh4jb.svg"
          alt="Logout"
        />
      </div>
    </aside>
  );
};
export default Sidebar;
