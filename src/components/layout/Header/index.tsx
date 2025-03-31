import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@components/common/Button';
import SearchBar from '@components/common/SearchBar';
import { IStudent } from 'types/student';
import './index.css';

interface HeaderProps {
  allStudents?: IStudent[];
  /** Callback function when search results change */
  onSearchResults?: (students: IStudent[]) => void;
  /** Callback function for notification button click */
  onNotificationClick?: () => void;
  /** Optional custom back button handler */
  customBackHandler?: () => void;
  /** Flag to show/hide search bar */
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  allStudents = [],
  onSearchResults = () => {},
  onNotificationClick,
  customBackHandler,
  showSearch = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles back button navigation with the following logic:
   * 1. Uses custom handler if provided
   * 2. Preserves pagination parameters when navigating
   * 4. Falls back to browser history navigation
   */
  const handleBackClick = () => {
    if (customBackHandler) {
      customBackHandler();
      return;
    }

    // Extract current pagination parameters
    const currentSearchParams = new URLSearchParams(location.search);
    const currentPage = currentSearchParams.get('page') ?? '1';
    const currentPerPage = currentSearchParams.get('perPage') ?? '5';

    // Check if there's a previous state in browser history
    const historyState = window.history.state;
    const historyIndex = historyState?.idx;

    // If at the beginning of history or coming from login, go to student list
    if (historyIndex <= 1 || window.document.referrer.includes('/login')) {
      navigate(`/?page=${currentPage}&perPage=${currentPerPage}`);
      return;
    }

    // Standard back navigation
    navigate(-1);
  };

  return (
    <header className="content__header">
      <Button className="back-icon" onClick={handleBackClick} aria-label="Go back">
        <img
          src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/back_sk4lcp.svg"
          alt="Click to get back"
          loading="lazy"
        />
      </Button>
      <div className="content-actions">
        {showSearch && (
          <SearchBar
            allStudents={allStudents}
            onSearchResults={onSearchResults}
            placeholder="Search students..."
            debounceTime={300}
          />
        )}
        <Button
          className="content__notification"
          onClick={() => onNotificationClick?.()}
          aria-label="Notifications"
          tabIndex={0}
        >
          <img
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/notification_myvxdf.svg"
            alt="Notification"
          />
        </Button>
      </div>
    </header>
  );
};

export default Header;
