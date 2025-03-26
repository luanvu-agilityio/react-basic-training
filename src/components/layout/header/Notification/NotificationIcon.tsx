import React from 'react';
import '../Header/Header.css';
export interface NotificationIconProps {
  onClick?: () => void;
  hasNotifications?: boolean;
  notificationCount?: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  onClick,
  hasNotifications = false,
  notificationCount = 0,
}) => {
  return (
    <button
      className="content__notification"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label="Notifications"
      tabIndex={0}
    >
      <img
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/notification_myvxdf.svg"
        alt="Notification"
      />
      {hasNotifications && notificationCount > 0 && (
        <span className="notification-badge">{notificationCount}</span>
      )}
    </button>
  );
};

export default NotificationIcon;
