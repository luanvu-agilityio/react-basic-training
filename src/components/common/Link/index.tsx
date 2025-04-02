import React from 'react';
import Button from '@components/common/Button';
import Text from '@components/common/Text';

/**
 * A reusable Link component
 *
 * This component renders a  clickable link styled as a button.
 *
 *
 * Props:
 * - `onLinkClick` (function): A callback function triggered when the link is clicked.
 */

interface LinkProps {
  onLinkClick: () => void;
}

const Link = ({ onLinkClick }: LinkProps) => {
  return (
    <div
      className="link-container"
      style={{
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'var(--font-weight-regular)',
        color: 'var(--black-color)',
      }}
    >
      <Text text="Forgot your password? " className="link-text" as="span" />
      <Button
        className="link-button"
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          textDecoration: 'underline',
          cursor: 'pointer',
          color: '#830900',
        }}
        onClick={onLinkClick}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default Link;
