import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@components/common/Button';
import SearchBar from '@components/common/SearchBar';
import { filterStudentsByQuery } from '@utils/filter-student-by-query';
import { IStudent } from 'types/student';
import ImageIcon from '@components/common/ImageIcon';

interface PageHeaderProps {
  allStudents?: IStudent[];
  /** Callback function when search results change */
  onSearchResults?: (students: IStudent[]) => void;
  /** Callback function for notification button click */
  onNotificationClick?: () => void;
  /** Optional custom back button handler */
  customBackHandler?: () => void;
  /** Flag to show/hide search bar */
  showSearch?: boolean;
  /** Custom search placeholder */
  searchPlaceholder?: string;
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding: 1rem 2rem;
`;

const ContentActions = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationButton = styled(Button)`
  img {
    width: 1.7rem;
    height: 2rem;
  }
`;

const PageHeader = ({
  allStudents = [],
  onSearchResults = () => {},
  onNotificationClick,
  customBackHandler,
  showSearch = true,
  searchPlaceholder = 'Search...',
}: PageHeaderProps) => {
  const navigate = useNavigate();

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

    // Enhanced back navigation - preserves pagination context
    const currentParams = new URLSearchParams(location.search);
    const hasPageParams = currentParams.has('page') || currentParams.has('perPage');

    if (hasPageParams) {
      // If we're on a paginated page, go back to the main page without pagination
      // This preserves the correct navigation flow
      navigate(location.pathname);
    } else {
      // Standard back navigation
      navigate(-1);
    }
  };
  /**
   * Handles search queries and filters students
   * @param query - The search query string
   */
  const handleSearch = (query: string) => {
    const filteredStudents = query.trim() ? filterStudentsByQuery(allStudents, query) : allStudents;
    onSearchResults(filteredStudents);
  };

  return (
    <Header>
      <Button variant="back" onClick={handleBackClick} aria-label="Go back">
        <ImageIcon
          src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/back_sk4lcp.svg"
          alt="Click to get back"
        />
      </Button>
      <ContentActions>
        {showSearch && (
          <SearchBar
            onSearch={handleSearch}
            placeholder={searchPlaceholder}
            debounceTime={500}
            type="search"
          />
        )}
        <NotificationButton
          variant="notification"
          onClick={() => onNotificationClick?.()}
          aria-label="Notifications"
          tabIndex={0}
        >
          <ImageIcon
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/notification_myvxdf.svg"
            alt="Notification"
          />
        </NotificationButton>
      </ContentActions>
    </Header>
  );
};

export default PageHeader;
