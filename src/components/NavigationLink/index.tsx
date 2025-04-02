import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from '@components/common/Text';
import './index.css';
import ImageIcon from '@components/common/ImageIcon';

/**
 * NavigationLink Component Props
 */
interface NavigationLinkProps {
  /** Text to display in the navigation link */
  text: string;
  /** URL for the link (optional for action items like logout) */
  to?: string;
  /** Icon URL to display */
  icon?: string;
  /** Whether the icon should be displayed on the right side */
  iconRight?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Whether the item is currently active */
  isActive?: boolean;
  /** Click handler for the navigation item */
  onClick: (e: React.MouseEvent) => void;
  /** Optional data-testid for testing */
  testId?: string;
}

/**
 * NavigationLink Component
 *
 * A unified component for sidebar navigation and action items with consistent styling.
 * Supports both navigation links (using React Router) and action buttons.
 */
export const NavigationLink: React.FC<NavigationLinkProps> = ({
  text,
  to,
  icon,
  iconRight = false,
  className = '',
  isActive = false,
  onClick,
  testId,
}) => {
  // Base class for all navigation items
  const baseClass = 'sidebar__nav-item';

  // Combine all class names
  const fullClassName = `${baseClass} ${className} ${isActive ? 'active' : ''}`;

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
          className="sidebar__nav-icon"
          src={icon}
          alt={`${text} icon`}
          onError={(e) => {
            e.style.display = 'none';
          }}
        />
      )}

      <Text text={text} className="sidebar__nav-text" as="p" />

      {/* Icon on the right if iconRight is true */}
      {icon && iconRight && (
        <ImageIcon
          loading="lazy"
          className="sidebar__logout-icon"
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
        data-testid={testId}
      >
        {content}
      </Link>
    );
  }

  // For action items (like logout), render as a button-like div
  return (
    <div
      className={fullClassName}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      data-testid={testId}
    >
      {content}
    </div>
  );
};

export default NavigationLink;
