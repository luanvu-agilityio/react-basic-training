import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'route/config';
import { useToast } from './Toast.context';
import LoadingSpinner from '@components/common/LoadingSpinner';

/**
 * Authentication Context Provider
 *
 * Manages application-wide authentication state and user data.
 *
 */

/**
 * Interface for user data structure
 */
export interface UserData {
  username: string;
  userRole: string;
  userProfileImage: string;
}

/**
 * Authentication context type definition
 */
interface AuthContextType {
  /** Current user data or null if not authenticated */
  user: UserData | null;
  /** Flag indicating if user is authenticated */
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Function to handle user login */
  login: (userData: UserData) => void;
  /** Function to handle user logout */
  logout: () => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

/**
 * Authentication Provider Component
 *
 * Wraps the application and provides authentication context.
 *
 * @component AuthProvider
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State management
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast, showConfirmation } = useToast();

  /**
   * Check for existing auth session on mount
   * Restores user session from localStorage if available
   */
  useEffect(() => {
    //Check authentication on initial load
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * Handles user login
   * - Updates auth state
   * - Stores session data
   * - Navigates to dashboard
   * - Shows success toast
   *
   * @param {UserData} userData - User information
   */
  const login = async (userData: UserData) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      navigate(ROUTES.STUDENTS, { replace: true }); // Redirect immediately after login
      showToast('success', 'Login Successful', `Welcome back, ${userData.username}`);
    } catch (error) {
      console.error('Login error:', error);
      showToast('error', 'Login Failed', 'An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user logout
   * - Shows confirmation dialog
   * - Clears auth state
   * - Removes session data
   * - Navigates to login
   * - Shows logout toast
   */
  const logout = () => {
    showConfirmation(
      'Confirm Logout',
      'Are you sure you want to logout ?',
      () => {
        setIsLoading(true);
        setTimeout(() => {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('userData');
          localStorage.removeItem('isLoggedIn');

          showToast('info', 'Logged Out', 'You have been successfully logged out.');
          navigate(ROUTES.LOGIN);
          setIsLoading(false);
        }, 500);
      },
      () => {},
    );
  };

  // Memoize context value to prevent unnecessary rerenders
  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, logout }),
    [user, isAuthenticated],
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading && <LoadingSpinner loadingText="Processing..." />}
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 *
 * @throws {Error} If used outside of AuthProvider
 * @returns {AuthContextType} Authentication context value
 *
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider');
  }
  return context;
};
