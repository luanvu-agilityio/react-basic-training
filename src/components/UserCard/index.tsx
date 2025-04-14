import Avatar from '@components/common/Avatar';
import Text from '@components/common/Text';
import styled from 'styled-components';

interface UserCardProps {
  username: string;
  userRole: string;
  userAvatar: string;
}

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 4rem;
  padding-bottom: 4rem;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const UserCard = ({ username, userRole, userAvatar }: UserCardProps) => (
  <UserProfile>
    <Avatar
      className="avatar"
      variant="round"
      size="large"
      src={userAvatar}
      alt="Avatar"
      style={{
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
    <Text
      text={userRole}
      as="span"
      style={{ color: 'var(--orange-color)', fontSize: 'var(--font-size-14)' }}
    />
  </UserProfile>
);
export default UserCard;
