import React from 'react';
interface UserRoleProps {
  role: string;
  className?: string;
  style?: React.CSSProperties;
}

export const UserRole: React.FC<UserRoleProps> = ({
  role,
  className = 'sidebar__profile-role',
  style,
}) => (
  <span className={className} style={style}>
    {role}
  </span>
);
