import React from 'react';
import Button from '../Button';
import './index.css';

/**
 * A reusable Link component for React applications.
 *
 * This component renders a footer with a clickable link styled as a button.
 * It is typically used for actions like password reset or navigation.
 *
 * Props:
 * - `onLinkClick` (function): A callback function triggered when the link is clicked.
 */

interface LinkProps {
  onLinkClick: () => void;
}

const Link: React.FC<LinkProps> = ({ onLinkClick }) => {
  return (
    <footer className="card__footer">
      <p className="footer__text">
        Forgot your password?{' '}
        <Button
          className="footer__link"
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={onLinkClick}
        >
          Reset Password
        </Button>
      </p>
    </footer>
  );
};

export default Link;
