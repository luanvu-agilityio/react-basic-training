import React from 'react';
import Sidebar from '@components/SideBar';
import { useNavigation } from '@contexts/Navigation.context';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { sidebarExpanded, setActiveItem, toggleSidebar } = useNavigation();

  return (
    <div
      className="dashboard"
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
      }}
    >
      {/* A version of Sidebar without user info */}
      <Sidebar
        username="Guest"
        userRole="Visitor"
        userProfileImage="https://res.cloudinary.com/ds82onf5q/image/upload/v1743579494/user-default_gisc3v.png"
        onNavItemClick={setActiveItem}
        expanded={sidebarExpanded}
        onToggleSidebar={toggleSidebar}
      />

      <main
        style={{ flex: 1 }}
        className={`content ${!sidebarExpanded ? 'content--expanded' : ''}`}
      >
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
