import React, { createContext, useContext, useState, useMemo } from 'react';
import { NavItem } from 'route/config';

/**
 * Navigation Context
 *
 * Manages application-wide navigation state including:
 * - Active navigation item tracking
 * - Sidebar expansion state
 * - Navigation state updates
 */

/**
 * Navigation context type definition
 * Defines the shape of the navigation context
 */
interface NavigationContextType {
  /** Currently active navigation item */
  activeItem: NavItem;
  /** Controls sidebar expansion state */
  sidebarExpanded: boolean;
  /** Updates the active navigation item */
  setActiveItem: (item: NavItem) => void;
  /** Toggles sidebar expansion */
  toggleSidebar: () => void;
}

/**
 * Create the navigation context with default values
 */
const NavigationContext = createContext<NavigationContextType>({
  activeItem: 'students',
  sidebarExpanded: false,
  setActiveItem: () => {},
  toggleSidebar: () => {},
});

/**
 * Navigation Provider Component
 *
 * Wraps the application and provides navigation context.
 * Manages navigation state and sidebar visibility.
 *
 * @component NavigationProvider
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  // State for active navigation item and sidebar expansion
  const [activeItem, setActiveItem] = useState<NavItem>('students');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  /**
   * Toggles sidebar expansion state
   * Used for responsive design and user preference
   */
  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  // Memoize context value to prevent unnecessary rerenders
  const value = useMemo(
    () => ({
      activeItem,
      sidebarExpanded,
      setActiveItem,
      toggleSidebar,
    }),
    [activeItem, sidebarExpanded],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

/**
 * Custom hook to use navigation context
 *
 * Provides access to navigation state and functions
 *
 * @throws {Error} If used outside of NavigationProvider
 * @returns {NavigationContextType} Navigation context value
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be use within NavigationProvider');
  }
  return context;
};
