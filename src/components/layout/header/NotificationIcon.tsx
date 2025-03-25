import React from 'react';
import './Header.css';
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
    <div className="content__notification" onClick={onClick}>
      <img
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/notification_myvxdf.svg"
        alt="Notification"
      />
      {hasNotifications && notificationCount > 0 && (
        <span className="notification-badge">{notificationCount}</span>
      )}
    </div>
  );
};

export default NotificationIcon;
