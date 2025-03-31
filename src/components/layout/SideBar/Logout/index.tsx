import Button from '@components/common/Button';
import React from 'react';
import './index.css';
/**
 * A Logout component for the sidebar navigation.
 */
interface LogoutProps {
  /** Callback function to handle logout action */
  onLogout: () => void;
}

export const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  /**
   * Handles the logout action
   * Calls the provided onLogout callback if it exists
   */
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Button
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
    </Button>
  );
};
