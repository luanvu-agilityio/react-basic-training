import { Link } from 'react-router-dom';
import Text from '@components/common/Text';
import ImageIcon from '@components/common/ImageIcon';
import Button from '@components/common/Button';
import { KeyboardEvent, MouseEvent } from 'react';
import styled, { css } from 'styled-components';

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
  onClick: (e: MouseEvent) => void;
}

// Define breakpoints for responsive design
const breakpoints = {
  xs: '380px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

// Media query helper function
const media = {
  xs: (styles: string) => `@media screen and (max-width: ${breakpoints.xs}) { ${styles} }`,
  sm: (styles: string) => `@media screen and (max-width: ${breakpoints.sm}) { ${styles} }`,
  md: (styles: string) => `@media screen and (max-width: ${breakpoints.md}) { ${styles} }`,
  lg: (styles: string) => `@media screen and (max-width: ${breakpoints.lg}) { ${styles} }`,
  xl: (styles: string) => `@media screen and (max-width: ${breakpoints.xl}) { ${styles} }`,
};

// Styled Components
const NavLinkStyles = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  width: 100%;

  &:hover {
    background-color: var(--orange-color);
  }

  &:hover .nav-text {
    font-weight: var(--font-weight-bold);
  }

  &.inactive {
    opacity: 0.7;
  }

  &.sidebar-logout .nav-text {
    display: block;
  }

  &.active {
    background-color: var(--orange-color);
    font-weight: var(--font-weight-bold);
  }

  ${media.lg(`
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 0.5rem;
    padding: 0.8rem;
    min-width: 6rem;

    &.active {
      border-radius: 1rem;
    }

    &.active::before {
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      border-radius: 4px 4px 0 0;
    }
  `)}

  ${media.md(`
    min-width: 5rem;

    &.student {
      padding: 8px;
    }
  `)}

  ${media.sm(`
    min-width: 4.5rem;
  `)}

  ${media.xs(`
    min-width: 4rem;
    padding: 0.6rem;
  `)}
`;

const StyledLink = styled(Link)`
  ${NavLinkStyles}
`;

const StyledButton = styled(Button)`
  ${NavLinkStyles}
  width: 20rem;

  ${media.lg(`
    position: relative;
    margin: 0 auto;
    padding: 0.8rem;
    flex-direction: row;
    gap: 2rem;
  `)}
`;

const NavIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;

  ${media.lg(`
    margin-right: 0;
    margin-bottom: 0.5rem;
  `)}

  ${media.md(`
    margin: 0;
  `)}

  ${media.xs(`
    width: 1.8rem;
    height: 1.8rem;
  `)}
`;

const NavIcon = styled(ImageIcon)`
  max-width: 100%;
  max-height: 100%;
  display: block;
`;

const LogoutIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 12px;

  ${media.lg(`
    margin-left: 0;
  `)}

  ${media.xs(`
    width: 1.8rem;
    height: 1.8rem;
  `)}
`;

const NavText = styled(Text)`
  &.nav-text {
    text-decoration: underline;
    color: var(--orange-color);
    font-size: var(--font-size-14);
    display: flex;
    align-items: center;
  }

  &.nav-text:hover {
    font-weight: var(--font-weight-bold);
  }

  ${media.lg(`
    &.nav-text {
      display: none;
    }
  `)}
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  ${media.lg(`
    flex-direction: column;
  `)}
`;

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
  // Combine all class names
  const fullClassName = `${className} ${isActive ? '' : 'inactive'} ${className.includes('active') ? 'active' : ''}`;

  // Handler for keyboard accessibility
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClick(e as unknown as MouseEvent);
    }
  };

  // Content to render inside the link/button
  const content = (
    <ContentWrapper>
      {/* Icon on the left if iconRight is false */}
      {icon && !iconRight && (
        <NavIconWrapper>
          <NavIcon
            loading="lazy"
            src={icon}
            alt={`${text} icon`}
            size={20}
            onError={(e) => {
              e.style.display = 'none';
            }}
          />
        </NavIconWrapper>
      )}

      <NavText className="nav-text" as="p">
        {text}
      </NavText>

      {/* Icon on the right if iconRight is true */}
      {icon && iconRight && (
        <LogoutIconWrapper>
          <NavIcon
            loading="lazy"
            src={icon}
            alt={`${text} icon`}
            size={20}
            onError={(e) => {
              e.style.display = 'none';
            }}
          />
        </LogoutIconWrapper>
      )}
    </ContentWrapper>
  );

  // For regular navigation items, render as React Router Link
  if (to) {
    return (
      <StyledLink
        to={to}
        className={fullClassName}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {content}
      </StyledLink>
    );
  }

  // For action items (like logout), render as a button-like div
  return (
    <StyledButton
      className={fullClassName}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {content}
    </StyledButton>
  );
};

export default NavigationLink;
