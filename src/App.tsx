import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import LoginForm from '@pages/LoginPage/LoginPage';
import PageNotAvailable from '@pages/PageNotFound/PageNotFound';
import StudentsPage from '@pages/StudentPage/StudentsPage';
import SidebarToggle from '@components/layout/sidebar/SidebarToggle';
import Sidebar, { NavItem } from '@components/layout/sidebar/Sidebar';
import { ToastProvider, useToast } from 'contexts/Toast.context';
import Header from '@components/layout/header/Header/Header';
import {
  LoadingSpinnerContainer,
  useLoadingSpinner,
} from '@components/common/loading-spinner/LoadingSpinner';
import './styles/index.css';

// Utility function to check login status
export const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Page configuration
const pageConfig = [
  { path: '/', name: 'Students', component: StudentsPage, navItem: 'students' },
  { path: '/home', name: 'Home', component: null, navItem: 'home' },
  { path: '/students', name: 'Students', component: StudentsPage, navItem: 'students' },
  { path: '/courses', name: 'Course', component: null, navItem: 'courses' },
  { path: '/payments', name: 'Payment', component: null, navItem: 'payments' },
  { path: '/reports', name: 'Report', component: null, navItem: 'reports' },
  { path: '/settings', name: 'Settings', component: null, navItem: 'settings' },
];

// Generic page for pages not yet implemented
const GenericPage: React.FC<{ pageName: string }> = ({ pageName }) => {
  return (
    <div>
      <Header showSearch={false} />
      <section className="page">
        <PageNotAvailable pageName={pageName} />
      </section>
    </div>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { show } = useLoadingSpinner();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<NavItem>('students');
  const [userData, setUserData] = useState({
    username: '',
    userRole: '',
    userProfileImage: '',
  });
  const { showConfirmation } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }

    // Get user data from localStorage
    const username = localStorage.getItem('userName') ?? '';
    const userRole = localStorage.getItem('userRole') ?? 'User';
    const userAvatar =
      localStorage.getItem('userAvatar') ??
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1742547439/opzj4nkixf9ftq6bmeyj.jpg';

    setUserData({
      username,
      userRole,
      userProfileImage: userAvatar,
    });
  }, [navigate]);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleNavItemClick = (item: NavItem) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    showConfirmation(
      'Confirm Logout',
      'Are you sure you want to logout ?',
      () => {
        show();

        const userDataKeys = [
          'isLoggedIn',
          'userEmail',
          'userId',
          'userName',
          'userRole',
          'userAvatar',
        ];
        userDataKeys.forEach((key) => localStorage.removeItem(key));
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      },
      () => {
        console.log('Logout cancelled');
      },
    );
  };

  return (
    <div
      className="dashboard"
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh ',
      }}
    >
      <Sidebar
        username={userData.username}
        userRole={userData.userRole}
        userProfileImage={userData.userProfileImage}
        activeItem={activeItem}
        onNavItemClick={handleNavItemClick}
        onLogout={handleLogout}
        expanded={sidebarExpanded}
      />
      <SidebarToggle onToggle={handleSidebarToggle} />

      <main
        style={{ flex: 1 }}
        className={`content ${!sidebarExpanded ? 'content--expanded' : ''}`}
      >
        {children}
      </main>
      <Outlet />
      <LoadingSpinnerContainer />
    </div>
  );
};
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isUserLoggedIn() ? <DashboardLayout>{element}</DashboardLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          {/* Generate routes from configuration */}
          {pageConfig.map(({ path, name, component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute
                  element={
                    component ? React.createElement(component) : <GenericPage pageName={name} />
                  }
                />
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
