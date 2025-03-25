import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import SearchBar from './SearchBar';
import NotificationIcon from './NotificationIcon';
import { IStudent } from 'types/student';
import './Header.css';

interface HeaderProps {
  allStudents?: IStudent[];
  onSearchResults?: (students: IStudent[]) => void;
  onNotificationClick?: () => void;
  customBackHandler?: () => void;
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

  const handleBackClick = () => {
    if (customBackHandler) {
      customBackHandler();
      return;
    }

    // Check current URL parameters
    const currentSearchParams = new URLSearchParams(location.search);
    const currentPage = currentSearchParams.get('page') || '1';
    const currentPerPage = currentSearchParams.get('perPage') || '5';

    // Check if there's a previous state in browser history
    const historyState = window.history.state;
    const historyIndex = historyState?.idx;

    // If at the beginning of history or coming from login, go to student list
    if (historyIndex <= 1 || window.document.referrer.includes('/login')) {
      navigate(`/?page=${currentPage}&perPage=${currentPerPage}`);
      return;
    }

    // Try to preserve pagination when going back
    navigate(-1);
  };

  return (
    <header className="content__header">
      <BackButton onClick={handleBackClick} />
      <div className="content-actions">
        {showSearch && (
          <SearchBar
            allStudents={allStudents}
            onSearchResults={onSearchResults}
            placeholder="Search students..."
            debounceTime={300}
          />
        )}
        <NotificationIcon onClick={onNotificationClick} />
      </div>
    </header>
  );
};

export default Header;
