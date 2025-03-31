import React from 'react';
import Avatar from '@components/common/Avatar';
import { UserName } from '@components/common/UserName';
import { UserRole } from '@components/common/UserRole';

interface UserCardProps {
  username: string;
  userRole: string;
  userAvatar: string;
}
const UserCard: React.FC<UserCardProps> = ({ username, userRole, userAvatar }) => (
  <div className="sidebar__profile">
    <Avatar
      className="avatar"
      src={userAvatar}
      alt="Avatar"
      style={{
        height: '120px',
        width: '120px',
        borderRadius: '50%',
        objectFit: 'cover',
        overflow: 'hidden',
        marginBottom: '15px',
      }}
    />
    <UserName
      name={username}
      style={{
        fontSize: 'var(--font-size-17)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: '0.5rem',
      }}
    />
    <UserRole role={userRole} style={{ color: '#830900', fontSize: 'var(--font-size-14)' }} />
  </div>
);
export default UserCard;
