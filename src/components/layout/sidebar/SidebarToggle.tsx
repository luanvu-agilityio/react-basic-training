import React from 'react';
import './sidebar.css';
import Button from '@components/common/buttons/Button';

interface SidebarToggleProps {
  onToggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ onToggle }) => {
  return (
    <Button className="sidebar-toggle" id="sidebarToggle" onClick={onToggle}>
      <img
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/menu_xnh4o2.png"
        alt="Toggle menu"
      />
    </Button>
  );
};

export default SidebarToggle;
