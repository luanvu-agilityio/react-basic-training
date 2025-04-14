import styled from 'styled-components';
import Title from '@components/common/Title';
import NavigationLink from '../common/NavigationLink';
import UserCard from '../UserCard';
import { useAuth } from '@contexts/Auth.context';
import Button from '@components/common/Button';
import { NAV_ITEMS as navItems } from '@constants/nav-item';
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
  activeItem?: NavItem;
}

// Styled Components
const SidebarContainer = styled.aside<{ expanded: boolean }>`
  position: relative;
  width: 27rem;
  padding: 20px;
  background-color: var(--light-brown-color);
  transition: all 0.3s ease;

  /* Media queries */
  @media screen and (max-width: 992px) {
    z-index: 10005;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 1.5rem;
    max-height: ${(props) => (props.expanded ? '30rem' : '8rem')};
    overflow: ${(props) => (props.expanded ? 'auto' : 'hidden')};
    border-top: 1px solid #e0e0e0;
    background-color: var(--light-brown-color) !important;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    height: auto;
    max-height: ${(props) => (props.expanded ? '90%' : '80px')};
    width: 100%;
    z-index: 10002;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    overflow: ${(props) => (props.expanded ? 'auto' : 'hidden')};
  }
`;

const SidebarTitle = styled(Title)`
  padding-left: 2rem;
  margin-bottom: 5.4rem;
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-bold);
  color: var(--black-color);
  text-align: center;
  text-transform: uppercase;

  &::before {
    content: '';
    position: absolute;
    left: 3rem;
    top: 3.5rem;
    height: 2rem;
    width: 0.4rem;
    background-color: #f8d442;
    border-radius: 4px;
  }

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & .nav-link {
    padding: 12px 64px;
  }

  & .nav-text {
    text-decoration: none;
    color: var(--black-color);
  }

  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 10px 0;
    margin: 0;
    margin-bottom: 3rem;
    overflow-x: auto;

    & .nav-link {
      padding: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const LogoutLink = styled(NavigationLink)`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  margin-top: auto;
  margin-left: 1.5rem;
  cursor: pointer;
  color: var(--black-color);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-regular);
  border: none;
  background-color: transparent;
  padding: 12px 64px;

  & .nav-text {
    text-decoration: none;
    color: var(--black-color);
  }

  &:hover {
    background-color: var(--orange-color);
    font-weight: var(--font-weight-bold);
    border-radius: 4px;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 992px) {
    position: relative;
    margin: 0 auto;
    padding: 0.8rem;
    flex-direction: row;
    gap: 2rem;
  }
`;

const ToggleButton = styled(Button)<{ expanded: boolean }>`
  z-index: 1001;
  display: none;
  position: fixed;
  transition: all 0.3s ease;

  img {
    transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
  }

  @media screen and (max-width: 992px) {
    display: block;
    bottom: ${(props) => (props.expanded ? '17rem' : '6rem')};
    right: 2rem;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: var(--orange-color);
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: ${(props) => (props.expanded ? '15rem' : '6rem')};
  }

  @media screen and (max-width: 576px) {
    bottom: ${(props) => (props.expanded ? '16rem' : '7rem')};
    right: 1rem;
    width: 4rem;
    height: 4rem;

    img {
      width: 2rem;
      height: 2rem;
    }
  }
`;

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
  activeItem,
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
    <SidebarContainer expanded={expanded} className={expanded ? 'expanded' : ''}>
      {/* Application title */}
      <SidebarTitle className="sidebar-title" title="crud operations" />

      {/* User profile information */}
      <UserCard username={username} userRole={userRole} userAvatar={userProfileImage} />

      {/* Navigation menu */}
      <SidebarNav className="sidebar-nav">
        {navItems.map((item) => (
          <NavigationLink
            key={item.name}
            text={item.text}
            to={item.to}
            icon={item.icon}
            className={`nav-link ${item.name} ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => {
              onNavItemClick(item.name as NavItem);
            }}
          />
        ))}
      </SidebarNav>

      {/* Logout button  */}
      <LogoutLink
        text="Logout"
        icon={LOGOUT_ICON}
        iconRight={true}
        className="sidebar-logout"
        onClick={() => logout()}
      />

      {/* Mobile-only toggle button with up/down arrows */}
      <ToggleButton
        variant="toggle"
        onClick={onToggleSidebar}
        expanded={expanded}
        className="sidebar-toggle"
      >
        <ImageIcon
          src={TOGGLE_ICON}
          alt={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          className="toggle-icon"
        />
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
