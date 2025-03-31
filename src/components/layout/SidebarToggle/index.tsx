import React from 'react';
import '../SideBar/index.css';
import Button from '@components/common/Button';

/**
 * SidebarToggle Component
 *
 * A button component that controls the expansion/collapse state of the sidebar.
 */
interface SidebarToggleProps {
  /** Callback function triggered when toggle button is clicked */
  onToggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ onToggle }) => {
  return (
    <Button className="sidebar-toggle" onClick={onToggle}>
      <img
        loading="lazy"
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/menu_xnh4o2.png"
        alt="Toggle menu"
      />
    </Button>
  );
};

export default SidebarToggle;
