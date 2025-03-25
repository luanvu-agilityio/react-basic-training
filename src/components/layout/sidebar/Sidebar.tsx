import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export type NavItem = 'home' | 'course' | 'students' | 'payment' | 'report' | 'setting';

interface ISidebarProps {
  username: string;
  userRole: string;
  userProfileImage?: string;
  activeItem?: NavItem;
  onNavItemClick?: (items: NavItem) => void;
  onLogout?: () => void;
  expanded: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({
  username,
  userRole,
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
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742547439/opzj4nkixf9ftq6bmeyj.jpg"
            alt="Profile"
          />
        </div>
        <h2 className="sidebar__profile-name">{username}</h2>
        <span className="sidebar__profile-role">{userRole}</span>
      </div>

      <nav className="sidebar__nav">
        <Link
          to="/home"
          className={`sidebar__nav-item home ${location.pathname === '/home' ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <img
            className="sidebar__nav-icon"
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/home_ydi5zu.svg"
            alt="Home"
          />
          <p className="sidebar__nav-text">Home</p>
        </Link>
        <Link
          to="/courses"
          className={`sidebar__nav-item course ${location.pathname === '/courses' ? 'active' : ''}`}
          onClick={() => handleNavClick('course')}
        >
          <img
            className="sidebar__nav-icon"
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867570/course_d2jfjd.svg"
            alt="Course"
          />
          <p className="sidebar__nav-text">Course</p>
        </Link>
        <Link
          to="/students"
          className={`sidebar__nav-item student ${location.pathname === '/students' || location.pathname === '/' ? 'active' : ''}`}
          onClick={() => handleNavClick('students')}
        >
          <img
            className="sidebar__nav-icon"
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867572/student_irxgld.svg"
            alt="Student"
          />
          <p className="sidebar__nav-text">Student</p>
        </Link>
        <Link
          to="/payments"
          className={`sidebar__nav-item payment ${location.pathname === '/payments' ? 'active' : ''}`}
          onClick={() => handleNavClick('payment')}
        >
          <img
            className="sidebar__nav-icon"
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/payment_peqmdt.svg"
            alt="Payment"
          />
          <p className="sidebar__nav-text">Payment</p>
        </Link>
        <Link
          to="/reports"
          className={`sidebar__nav-item report ${location.pathname === '/reports' ? 'active' : ''}`}
          onClick={() => handleNavClick('report')}
        >
          <img
            className="sidebar__nav-icon"
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/report_rm69ya.svg"
            alt="Report"
          />
          <p className="sidebar__nav-text">Report</p>
        </Link>
        <Link
          to="/settings"
          className={`sidebar__nav-item setting ${location.pathname === '/settings' ? 'active' : ''}`}
          onClick={() => handleNavClick('setting')}
        >
          <img
            className="sidebar__nav-icon"
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/setting_qbe1fw.svg"
            alt="Setting"
          />
          <p className="sidebar__nav-text">Setting</p>
        </Link>
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
