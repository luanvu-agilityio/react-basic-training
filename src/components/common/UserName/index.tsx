import React from 'react';

interface UserNameProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export const UserName: React.FC<UserNameProps> = ({
  name,
  className = 'sidebar__profile-name',
  style,
}) => (
  <h2 className={className} style={style}>
    {name}
  </h2>
);
