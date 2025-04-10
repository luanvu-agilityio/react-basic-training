import Avatar from '@components/common/Avatar';
import Text from '@components/common/Text';

interface UserCardProps {
  username: string;
  userRole: string;
  userAvatar: string;
}
const UserCard = ({ username, userRole, userAvatar }: UserCardProps) => (
  <div className="user-profile">
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
    <Text
      text={username}
      as="h2"
      style={{
        fontSize: 'var(--font-size-17)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: '0.5rem',
      }}
    />
    <Text text={userRole} as="span" style={{ color: '#830900', fontSize: 'var(--font-size-14)' }} />
  </div>
);
export default UserCard;
