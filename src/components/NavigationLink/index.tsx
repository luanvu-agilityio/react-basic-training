import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from '@components/common/Text';
import './index.css';
import ImageIcon from '@components/common/ImageIcon';
import Button from '@components/common/Button';

/**
 * NavigationLink Component Props
 */
interface NavigationLinkProps {
  /** Text to display in the navigation link */
  text: string;
  /** URL for the link */
  to?: string;
  /** Icon URL to display */
  icon?: string;
  /** Whether the icon should be displayed on the right side */
  iconRight?: boolean;
  className?: string;
  isActive?: boolean;
  /** Click handler for the navigation item */
  onClick: (e: React.MouseEvent) => void;
}

/**
 * NavigationLink Component
 *
 * A component for sidebar navigation and action items with consistent styling.
 *
 */
export const NavigationLink = ({
  text,
  to,
  icon,
  iconRight = false,
  className = '',
  isActive = true,
  onClick,
}: NavigationLinkProps) => {
  // Base class for all navigation items
  const baseClass = 'nav-link';

  // Combine all class names
  const fullClassName = `${baseClass} ${className} ${isActive ? '' : 'inactive'}`;

  // Handler for keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClick(e as unknown as React.MouseEvent);
    }
  };

  // Content to render inside the link/button
  const content = (
    <>
      {/* Icon on the left if iconRight is false */}
      {icon && !iconRight && (
        <ImageIcon
          loading="lazy"
          className="nav-icon"
          src={icon}
          alt={`${text} icon`}
          onError={(e) => {
            e.style.display = 'none';
          }}
        />
      )}

      <Text text={text} className="nav-text" as="p" />

      {/* Icon on the right if iconRight is true */}
      {icon && iconRight && (
        <ImageIcon
          loading="lazy"
          className="logout-icon"
          src={icon}
          alt={`${text} icon`}
          onError={(e) => {
            e.style.display = 'none';
          }}
        />
      )}
    </>
  );

  // For regular navigation items, render as React Router Link
  if (to) {
    return (
      <Link
        to={to}
        className={fullClassName}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {content}
      </Link>
    );
  }

  // For action items (like logout), render as a button-like div
  return (
    <Button className={fullClassName} onClick={onClick} onKeyDown={handleKeyDown} tabIndex={0}>
      {content}
    </Button>
  );
};

export default NavigationLink;
